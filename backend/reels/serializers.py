from rest_framework import serializers
from .models import Person

class RegisterSerializer(serializers.Serializer):
    class Meta:
        model = Person
        fields = ('id', 'username', 'fname', 'lname', 'email', 'password', 'tags')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # This is the point where validated_data should be passed in correctly
        print("Create Method - Validated Data:", validated_data)  # Debug print

        password = validated_data.pop('password', None)  # Handle password separately
        user = Person.objects.create(**validated_data)  # Create the user object
        
        if password:
            user.set_password(password)  # Hash the password before saving
        user.save()  # Save the user instance
        
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128)