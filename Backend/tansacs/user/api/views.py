from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser , FormParser
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from user.models import Profile

from rest_framework.decorators import api_view
from smtplib import  SMTPException, SMTPRecipientsRefused


from .serializer import UserSerializer,CustomUserSerializer,ProfileSerializer , ProfileImageSerializer
from .permissions import IsUnauthenticated
from .utils import sendOTP


class LoginView(APIView):
  permission_classes = [IsUnauthenticated]

  def post(self, request, *args, **kwargs):
      serializer = CustomUserSerializer(data=request.data)
      if serializer.is_valid():
          user = User.objects.get(username=serializer.validated_data['username'])
          token, created = Token.objects.get_or_create(user=user)
          print(token, created)
          return Response({
              'token': token.key,
              'user_age':  user.profile.age_job,
              'is_active': user.is_active,
              'message': 'Success'
          }, status=status.HTTP_200_OK)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class SignupView(APIView):
#     permission_classes = [IsUnauthenticated]

#     def post(self, request, *args, **kwargs):
#         user_serializer = UserRegisterSerializer(data=request.data)
#         profile_serializer = ProfileSerializer(data=request.data)
#         if user_serializer.is_valid() and profile_serializer.is_valid():
#             user = user_serializer.save(is_active=False)
#             profile = profile_serializer.save(user=user, is_verified=False)
#             try:
#                 sendOTP(profile.email)
#             except SMTPRecipientsRefused:
#                 print("invalid email")
#                 return Response({'error' : 'invalid email'})
#             except SMTPException:
#                 return Response({'error' : 'Server issue'})

#             except Exception:
#                 return Response({'error' : 'error occured'})

#             return Response({
#                 'user': UserSerializer(user).data,
#                 'profile': ProfileSerializer(profile).data,
#                 'message': 'Success'
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({
#                 'user_errors': user_serializer.errors if not user_serializer.is_valid() else None,
#                 'profile_errors': profile_serializer.errors if not profile_serializer.is_valid() else None
#             }, status=status.HTTP_400_BAD_REQUEST)



class RegistrationView(APIView):
    def post(self, request):
        print(request.data)
        serializer = ProfileSerializer(data=request.data)
        # address_serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success':True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignUpView(APIView):
   def post(self, request, format=None):
       print(request.data)
       serializer = ProfileSerializer(data=request.data)
    #    parser_classes = [FileUploadParser]
       if serializer.is_valid():
           profile = serializer.save()
           print(profile)
           sendOTP(profile.email)
           return Response({'profile_id' : profile.id }, status=status.HTTP_201_CREATED)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class UpdateProfileImageView(APIView):

    parser_classes = (MultiPartParser , FormParser)

    def patch(self, request, id):
        print(id)
        profile = Profile.objects.get(id=id)
        serializer = ProfileImageSerializer(profile, data=request.data, partial=True)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'email' : profile.email}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class send_otp(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')
        if email:           
            otp = sendOTP(email)
          
            return Response({'otp': otp}, status=status.HTTP_201_CREATED)

class verified(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')  # Use request.data to access POST data
        user = User.objects.get(email=email)
        user.is_active = True
        user.save()
        return Response(status=status.HTTP_201_CREATED)


   
# class SignUpView(CreateAPIView):
#  queryset = Profile.objects.all()
#  serializer_class = ProfileSerializer

#  def perform_create(self, serializer):
#     validated_data = serializer.validated_data
#     password = validated_data.pop('password')
    
#     profile = serializer.save(user=user)
#     return profile


