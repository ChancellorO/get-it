
from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
import os
import hashlib

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

    def validated_password (self, password):

        if not re.search(r"[A-Z]", password):
            return Response({
            "result": "Password must contain at least one uppercase letter."})
        if not re.search(r"[a-z]", password):
            return Response({
            "result": "Password must contain at least one lowercase letter."}) 
        if not re.search(r"[0-9]", password):
            return Response({
            "result":"Password must contain at least one digit."}) 
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            return Response({
            "result":"Password must contain at least one special character."}) 

        return None
    
        pass
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        print('im here')
        print(serializer)
        # user = serializer.save()

        # user.save()

        return Response({
            "result": "Successfully Created User" })
 

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        # Validate input data using serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        username = data['username']
        password = data['password']

        user= authenticate(username= username, password= password)

        if user is not None:
            Token, created = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Login successful",
                "token": token.key
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'something'}, status=status.HTTP_403_FORBIDDEN)

