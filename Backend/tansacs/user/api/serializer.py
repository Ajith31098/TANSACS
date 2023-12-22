from django.contrib.auth.models import User
from rest_framework import serializers
from user.models import Profile
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import re
from django.db import models
from user.models import Address

# class UserSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = User
#        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class CustomUserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100)

    def validate_username(self, value):
        value = value.lower()
        if not User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Invalid username")
        return value

    def validate_password(self, value):
        username = self.initial_data['username']
        user = User.objects.filter(
            username=self.initial_data['username']).first()
        if not user or not user.check_password(value):
            raise serializers.ValidationError("Invalid password")
        return value


class VerifyPhoneNumberSerializer(serializers.Serializer):
    username = serializers.EmailField()
    # number = serializers.CharField(max_length=20)

    def validate(self, data):
        username = data.get('username')
        # number = data.get('number')

        try:
            profile = Profile.objects.get(user__username=username)
        except Profile.DoesNotExist:
            raise serializers.ValidationError(
                {'username': ['Profile with this username does not exist']})

        # if profile.phone_number != number:
        #     raise serializers.ValidationError({'number': ['Phone number does not match with the provided username']})

        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            is_active=False
        )
        return user


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['address_line1', 'address_line2', 'city',
                  'state', 'district', 'pincode', 'address_type']


class ProfileSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False, many=True)
    permanent_address = AddressSerializer(required=False, many=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'gender', 'DOB', 'age', 'aadhar', 'phone_number', 'alternate_phone_number',
                  'email', 'guardian_name', 'guardian_name_initial', 'address', 'permanent_address', 'password']
        extra_kwargs = {
            'last_name': {'required': False, 'allow_blank': True},
            'guardian_name_initial': {'required': False, 'allow_blank': True}
        }

    def create(self, validated_data):
        email = validated_data['email'].lower()
        validated_data['email'] = email
        address_data = validated_data.pop('address', [])
        permanent_address_data = validated_data.pop('permanent_address', [])
        password = validated_data.pop('password')
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=password,
            is_active=False
        )
        profile = Profile.objects.create(user=user, **validated_data)
        for address in address_data:
            # print(address)
            Address.objects.create(user=profile, **address)
        for address in permanent_address_data:
            Address.objects.create(user=profile, **address)
        return profile


class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['profile_image']


# from rest_framework import serializers

# class ProfileSerializer(serializers.ModelSerializer):
#   address = AddressSerializer()
#   permanent_address = AddressSerializer()

#   class Meta:
#       model = Profile
#       fields = ['aadhar', 'first_name', 'last_name', 'gender', 'age', 'email', 'guardian_name', 'guardian_name_initial', 'phone_number', 'alternate_phone_number']

#   def validate_email(self, value):
#       """
#       Custom validation to check if email is unique.
#       """
#       if Profile.objects.filter(email=value).exists():
#           raise serializers.ValidationError("This email is already in use.")
#       return value

#   def to_internal_value(self, data):
#       # Manually parse the incoming data
#       parsed_data = {}
#       for key, value in data.items():
#           if key.startswith('address['):
#               parsed_data['address'] = value
#           elif key.startswith('permanent_address['):
#               parsed_data['permanent_address'] = value
#           else:
#               parsed_data[key] = value
#       return parsed_data


# class ProfileSerializer(serializers.ModelSerializer):
#     address = AddressSerializer()
#     permanent_address = AddressSerializer()

#     class Meta:
#         model = Profile
#         exclude = ('user','DOB')

#     def validate_email(self, value):
#         """
#         Custom validation to check if email is unique.
#         """
#         if Profile.objects.filter(email=value).exists():
#             raise serializers.ValidationError("This email is already in use.")
#         return value
