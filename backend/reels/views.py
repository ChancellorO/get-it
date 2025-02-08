
from django.shortcuts import render
from urbanForest.models import reels
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer

class RegisterAPI(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, _):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data})

class LoginAPI(ObtainAuthToken):

    def post(self, request, _):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if not user.is_active:
            return Response({"error": "Account is not active"}, status=status.HTTP_403_FORBIDDEN)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
