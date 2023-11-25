from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.views import APIView

from smtplib import  SMTPException, SMTPRecipientsRefused


from .serializer import UserSerializer,CustomUserSerializer,UserRegisterSerializer,ProfileSerializer
from .permissions import IsUnauthenticated
from .utils import sendOTP


class LoginView(APIView):
  permission_classes = [IsUnauthenticated]

  def post(self, request, *args, **kwargs):
      serializer = CustomUserSerializer(data=request.data)
      if serializer.is_valid():
          user = User.objects.get(username=serializer.validated_data['username'])
          token, created = Token.objects.get_or_create(user=user)
          return Response({
              'token': token.key,
              'user':  UserSerializer(user, context={'request': request}).data,
              'is_active': user.is_active,
              'message': 'Success'
          }, status=status.HTTP_200_OK)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignupView(APIView):
    permission_classes = [IsUnauthenticated]

    def post(self, request, *args, **kwargs):
        user_serializer = UserRegisterSerializer(data=request.data)
        profile_serializer = ProfileSerializer(data=request.data)
        if user_serializer.is_valid() and profile_serializer.is_valid():
            user = user_serializer.save(is_active=False)
            profile = profile_serializer.save(user=user, is_verified=False)
            try:
                sendOTP(profile.email)
            except SMTPRecipientsRefused:
                print("invalid email")
                return Response({'error' : 'invalid email'})
            except SMTPException:
                return Response({'error' : 'Server issue'})

            except Exception:
                return Response({'error' : 'error occured'})

            return Response({
                'user': UserSerializer(user).data,
                'profile': ProfileSerializer(profile).data,
                'message': 'Success'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'user_errors': user_serializer.errors if not user_serializer.is_valid() else None,
                'profile_errors': profile_serializer.errors if not profile_serializer.is_valid() else None
            }, status=status.HTTP_400_BAD_REQUEST)



