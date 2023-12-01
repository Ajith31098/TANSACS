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


from .serializer import UserSerializer,CustomUserSerializer,ProfileSerializer , ProfileImageSerializer , VerifyPhoneNumberSerializer
from .permissions import IsUnauthenticated
from .utils import sendOTP
from jobs.models import Job

class JobVerification(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request,  *args, **kwargs):
        # Get the user from the request
        # user = request.user
        token = Token.objects.get(key=request.auth)
        position = request.data.get('position')        

        # Check if the user has applied for the job
        has_applied = Job.objects.filter( user=token.user , position = position).exists()

        return Response({'has_applied': has_applied}, status=status.HTTP_200_OK)



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
            if not user.is_active:
                return{'valid':False , 'email' : user.username , 'active' : False}
            if user.check_password(password):
                return {'valid' : True }
            else:
                return {'valid' : False , "password" : "invalid password"}

        except:
            return None


class SetPassword(APIView):

    def post (self,request,email,format =  None):
        try:
            print(email , self.kwargs['email'])
            user = User.objects.get(username=email)
        except User.DoesNotExist:
            return Response("User does not exist", status=status.HTTP_404_NOT_FOUND)
        
        new_password = request.data.get('password' )
        if new_password:
            user.set_password(new_password)
            user.save()
            return Response("Password reset successfully", status=status.HTTP_200_OK)
        else:
            return Response("New password not provided",  status=status.HTTP_404_NOT_FOUND)


class SignUpView(APIView):
    def post(self, request, format=None):
        try:
            serializer = ProfileSerializer(data=request.data)
            if serializer.is_valid():
                profile = serializer.save()
                return Response({'profile_id' : profile.id }, status=status.HTTP_201_CREATED)
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
           
            return Response( status=status.HTTP_503_SERVICE_UNAVAILABLE)
   

class UpdateProfileImageView(APIView):

    parser_classes = (MultiPartParser , FormParser)

    def patch(self, request, id):
        profile = Profile.objects.get(id=id)
        serializer = ProfileImageSerializer(profile, data=request.data, partial=True)
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


class ForgotView(APIView):
    def post(self, request, format=None):
        
        try:
            serializer = VerifyPhoneNumberSerializer(data=request.data)  # Pass 'data=' argument here
            
            if serializer.is_valid():
                return Response({'email': serializer.validated_data['username']}, status=status.HTTP_200_OK)
            # print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response( status=status.HTTP_503_SERVICE_UNAVAILABLE)




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


import boto3
from django.http import FileResponse

from django.conf import settings

def download_file(request, file_name):
    s3 = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID, aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    s3.download_file(settings.AWS_STORAGE_BUCKET_NAME,  f'static/{file_name}', '/tmp/tempfile')
    with open('/tmp/tempfile', 'rb') as f:
        return FileResponse(f)




