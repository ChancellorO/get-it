from rest_framework import serializers
from .models import Person

class RegisterSerializer(serializers.Serializer):
    class Meta:
        model = Person
        fields = ('id', 'username', 'fname', 'lname', 'email', 'password', 'tags')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # You can add custom logic for password encryption, but for simplicity,
        # we're assuming the password is passed in plaintext
        user = Person.objects.create(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128)