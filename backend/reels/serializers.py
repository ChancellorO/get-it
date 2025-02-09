from rest_framework import serializers
from .models import Person

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'username', 'fname', 'lname', 'email', 'password', 'tags')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print("Create Method - Validated Data:", validated_data)

        user = Person.objects.create(**validated_data) 
        
        user.save()
        
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128)

