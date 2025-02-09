
from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from collections import defaultdict

import openai
from dotenv import load_dotenv


import os
import hashlib

from .models import Person, Reels
from .serializers import RegisterSerializer, LoginSerializer

def hash_password(password, salt=None):
    if salt == None:
        salt = os.urandom(16)
    # Combine the password and salt, then hash it
    hashed_password = hashlib.sha256((password.encode() + salt)).hexdigest()
    
    # Concatenate the salt with the hashed password
    salted_hash = hashed_password + ":" + salt.hex()
    
    return salted_hash



class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(serializer)
        
        if not serializer.is_valid(raise_exception=True):
            return Response({"result": "Error, please enter all fields"}, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        
        return Response({"result": ""}, status=status.HTTP_200_OK)

class submitChangesAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    queryset = Person.objects.all()
    def post(self, request, *args, **kwargs):

        Person.objects.filter(username="").update(field_name="New Value")

        return Response({"result": ""}, status=status.HTTP_200_OK)


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    queryset = Person.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        if Person.objects.filter(username=data["username"], password=data["password"]).exists():
            users = Person.objects.filter(username=data["username"], password=data["password"])
            user_data = list(users.values("id", "username", "email", "fname", "lname", "tags"))  # Convert QuerySet to list of dicts
            print(user_data)
            return Response({"result": user_data}, status=status.HTTP_200_OK)    

        return Response({"result": "User Doesn't Exist or Password is Incorrect"}, status=status.HTTP_400_BAD_REQUEST)        

class GrabReelsAPI(generics.GenericAPIView):
    
    def post(self, request, *args, **kwargs):
        reels = Reels.objects.all().order_by('date')
        reels_data = list(reels.values("link", "tag"))
        print(reels_data)
        return Response({"result": reels_data}, status=status.HTTP_200_OK)



import random
import numpy as np
import xgboost as xgb

# Constants
HIGH_ENGAGEMENT = 80  # % watched
LOW_ENGAGEMENT = 30   # % watched
DIVERSITY_THRESHOLD = 3  # Consecutive topic count before introducing diversity

# Rule-Based Filtering to Get Candidate Videos
def get_candidate_videos(user_history, user_interests, topics, videos_per_topic):
    """Filters two candidate sets: one for engagement, one for diversity."""
    
    # If the user is new, recommend from interest topics
    if not user_history:
        interest_topic = random.choice(user_interests)
        diverse_topic = random.choice([t for t in topics if t not in user_interests])
        return random.choice(videos_per_topic[interest_topic]), random.choice(videos_per_topic[diverse_topic])

    # Get last watched video info
    last_video = user_history[-1]
    last_topic = last_video["topic"]
    watch_percent = last_video["watch_percent"]

    # Count consecutive videos watched in the same topic
    consecutive_count = sum(1 for v in reversed(user_history) if v["topic"] == last_topic)

    # Rule 1: High engagement → Recommend from the same topic
    if watch_percent >= HIGH_ENGAGEMENT and consecutive_count < DIVERSITY_THRESHOLD:
        engagement_topic = last_topic
    else:
        engagement_topic = random.choice(user_interests)  # Stick to user's interest

    # Rule 2: Low engagement → Switch topics
    if watch_percent < LOW_ENGAGEMENT or consecutive_count >= DIVERSITY_THRESHOLD:
        diverse_topic = random.choice([t for t in topics if t != engagement_topic])
    else:
        diverse_topic = random.choice([t for t in topics if t not in [last_topic]])

    return random.choice(videos_per_topic[engagement_topic]), random.choice(videos_per_topic[diverse_topic])

# ML Model Prediction for Final Ranking
def rank_videos_with_ml(candidate_videos, user_features, model):
    """Uses ML model to rank candidate videos."""
    feature_matrix = np.array([extract_features(video, user_features) for video in candidate_videos])
    
    # Predict engagement scores
    scores = model.predict(feature_matrix)
    
    # Rank videos based on predicted score
    ranked_videos = [video for _, video in sorted(zip(scores, candidate_videos), reverse=True)]
    
    return ranked_videos[0], ranked_videos[1]  # Return top two videos

# Feature Extraction Function
def extract_features(video, user_features):
    """Converts video and user data into feature vectors."""
    return np.array([
        user_features.get("avg_watch_time", 0),
        user_features.get("topic_engagement", {}).get(video, 0),
        random.uniform(0, 1)  # Placeholder for additional computed features
    ])


class GrabReelsRecommendationAPI(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        user_interests = request.data.get('tag')
        reels = Reels.objects.all()
        reels_data = list(reels.values("link", "tag"))
        user_history = [
            {"video": "https://getithacknyu.s3.us-east-1.amazonaws.com/Download+(5).mp4", "topic": "Stocks", "watch_percent": 85},
            {"video": "https://getithacknyu.s3.us-east-1.amazonaws.com/Download+(9).mp4", "topic": "Real Estate", "watch_percent": 90},
        ]

        # Create a dictionary to store videos grouped by topic (tag)
        videos_per_topic = defaultdict(list)

        # Populate the dictionary
        for reel in reels_data:
            print(reel)
            tag = reel["tag"]  # Convert tag to lowercase for consistency
            link = reel["link"]
            if link not in videos_per_topic[tag]:  # Ensure uniqueness
                videos_per_topic[tag].append(link)

        # Convert defaultdict to a normal dictionary
        videos_per_topic = dict(videos_per_topic)

        topics = ["Stocks", "Economics", "Tax", "Real Estate"]

        # insert fake data here
        X_train = np.array([[70, 0.5, 0.2], [85, 0.8, 0.7]]) # Example data, replace with your actual training data
        y_train = np.array([1, 0])  # Example target variable, replace with your actual training data
        ml_model = xgb.XGBRegressor()  # Load pretrained model
        ml_model.fit(X_train, y_train) # Fit the model before using it for prediction

        # Example Execution
        candidate_videos = get_candidate_videos(user_history, user_interests, topics, videos_per_topic)
        user_features = {"avg_watch_time": 75, "topic_engagement": {"Tech": 0.8, "Finance": 0.3}}
        final_videos = rank_videos_with_ml(candidate_videos, user_features, ml_model)

        result = [{"link": final_videos[0]}, {"link": final_videos[1]}]
        print(result)
        return Response({"result": result}, status=status.HTTP_200_OK)

class AskGPT(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        # Load environment variables from .env file

        user_input = request.data.get('user_input')

        load_dotenv()

        # Get API key from .env
        api_key = os.getenv("OPENAI_API_KEY")

        # Initialize OpenAI Client
        client = openai.OpenAI(api_key=api_key)

        # Allowed financial topics
        FINANCIAL_KEYWORDS = [
            "stock", "investment", "finance", "crypto", "bank", "economy", "market",
            "loan", "mortgage", "trading", "ETF", "bonds", "mutual funds", "dividend",
            "inflation", "interest rate", "budget", "financial planning", "tax", "forex"
        ]

        def is_financial_question(question):
            """Check if the question is related to financial topics"""
            lower_input = question.lower()
            return any(keyword in lower_input for keyword in FINANCIAL_KEYWORDS)

        def test_openai(question):
            """Sends financial-related questions to OpenAI and returns a response"""
            if not is_financial_question(question):
                return "Error: Only financial-related questions are allowed."

            try:
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",  # Use "gpt-4o" if available
                    messages=[{"role": "user", "content": question}]
                )
                return response.choices[0].message.content
            except openai.OpenAIError as e:
                return f"Error: {e}"

        answer = test_openai(user_input)
        
        Response({"result": answer}, status=status.HTTP_200_OK)