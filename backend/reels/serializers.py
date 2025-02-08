from rest_framework import serializers

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255)
    fname = serializers.CharField(max_length=255)
    lname = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    tags = serializers.ListField(child=serializers.CharField(max_length=255), required=False)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128)