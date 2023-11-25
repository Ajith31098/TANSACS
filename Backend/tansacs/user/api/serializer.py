from django.contrib.auth.models import User
from rest_framework import serializers
from user.models import Profile
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import re

class UserSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ['id', 'username', 'email', 'first_name', 'last_name']


class CustomUserSerializer(serializers.Serializer):
   username = serializers.CharField(max_length=100)
   password = serializers.CharField(max_length=100)

   def validate_username(self, value):
       if not User.objects.filter(username=value).exists():
           raise serializers.ValidationError("Invalid username")
       return value

   def validate_password(self, value):
       user = User.objects.filter(username=self.initial_data['username']).first()
       if not user or not user.check_password(value):
           raise serializers.ValidationError("Invalid password")
       return value
   
   def validate(self, data):
    user = User.objects.filter(username=data['username']).first()
    if not user or not user.is_active:
        raise serializers.ValidationError("User is not active")
    return data
   

class ProfileSerializer(serializers.ModelSerializer):
   class Meta:
       model = Profile
       fields = ['first_name', 'last_name', 'gender', 'DOB', 'age', 'aadhar', 'phone_number', 'alternate_phone_number', 'email', 'profile_image', 'guardian_name']

   def validate_email(self, value):
       if User.objects.filter(email=value).exists():
           raise serializers.ValidationError("There is already a user with this email")
       try:
           validate_email(value)
       except ValidationError:
           raise serializers.ValidationError("Enter a valid email address")
       return value
   

class UserRegisterSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ['username', 'password']

   def validate_password(self, value):
       if not re.search(r'[a-z]', value):
           raise serializers.ValidationError("Password must contain at least one lowercase letter")
       if not re.search(r'[A-Z]', value):
           raise serializers.ValidationError("Password must contain at least one uppercase letter")
       if not re.search(r'[0-9]', value):
           raise serializers.ValidationError("Password must contain at least one digit")
       if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
           raise serializers.ValidationError("Password must contain at least one special character")
       return value





