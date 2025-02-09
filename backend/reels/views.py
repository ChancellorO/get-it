
from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

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
        
        return Response({"result": user}, status=status.HTTP_200_OK)

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
        tag_values = request.data.get('tag')
        reels = Reels.objects.filter(tag__in=tag_values)
        reels_data = list(reels.values("link", "tag"))
        print(reels_data)
        return Response({"result": reels_data}, status=status.HTTP_200_OK)


