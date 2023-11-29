from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser , FormParser
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from user.models import Profile
from django.contrib.auth import login
from rest_framework.authtoken.views import ObtainAuthToken

from rest_framework.decorators import api_view
from smtplib import  SMTPException, SMTPRecipientsRefused
from rest_framework.authentication import TokenAuthentication


from .serializer import UserSerializer,CustomUserSerializer,ProfileSerializer , ProfileImageSerializer
from .permissions import IsUnauthenticated
from .utils import sendOTP


class LoginView(ObtainAuthToken):
    permission_classes = [IsUnauthenticated]

    def post(self, request, *args, **kwargs):
        serializer = CustomUserSerializer(data=request.data)
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        
        username = request.data.get('username')
        password = request.data.get('password')
        user = self.authenticate_user(username, password)
        if user.get("valid"):
            print(user)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            user_age = user.profile.age_job if not user.is_superuser else 0  
            return Response({
                    'token': token.key,
                    'user_age':  user_age,
                    'is_active': user.is_active,
                    'is_superuser':user.is_superuser,
                    'message': 'Success'
                }, status=status.HTTP_200_OK)

        return Response(user, status=status.HTTP_400_BAD_REQUEST)
    
    def authenticate_user(self, username, password):
        if not username or not password:
            return {'valid' : False ,"username":"invalid" , "password" : "invalid"}

        try:
            if not User.objects.filter(username=username).exists():
                return {'valid' : False ,"username":"invalid username" }

            user = User.objects.get(username=username)
            if user.check_password(password):
                return {'valid' : True }
            else:
                return {'valid' : False , "password" : "invalid password"}

        except:
            return None


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

from rest_framework.permissions import IsAuthenticated

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        # Get the token associated with the current user
        try:
            token = request.auth
            print(token )
            token = Token.objects.get(user=request.user)
            # Delete the token
            token.delete()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({"detail": "User does not have an active token."}, status=status.HTTP_400_BAD_REQUEST)
   
# class SignUpView(CreateAPIView):
#  queryset = Profile.objects.all()
#  serializer_class = ProfileSerializer

#  def perform_create(self, serializer):
#     validated_data = serializer.validated_data
#     password = validated_data.pop('password')
    
#     profile = serializer.save(user=user)
#     return profile


