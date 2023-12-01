from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import JobSerializer,SSLCSerializer,HSCSerializer,UGSerializer,PGSerializer,ExperienceSerializer,PreferedExperienceSerializer
from jobs.models import Job
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser , FormParser
from django.core.files.base import ContentFile
import base64
from .utils import get_list_dict
from user.api.utils import sendOTP
from rest_framework.authtoken.models import Token
from django.conf import settings


class JobView(APIView):
    parser_classes = (MultiPartParser , FormParser)
    authentication_classes = [TokenAuthentication]
   
    def post(self, request, format=None):
        token = request.auth
       
        validated_data = request.data
        sslc_data = {k.replace('sslc[', '').replace(']', ''): v for k, v in validated_data.items() if k.startswith('sslc[')}
        hsc_data = {k.replace('hsc[', '').replace(']', ''): v for k, v in validated_data.items() if k.startswith('hsc[')}
        ug_data = {k.replace('ug[', '').replace(']', ''): v for k, v in validated_data.items() if k.startswith('ug[')}
        pg_data =get_list_dict(validated_data , 'pg')
        experience_data = get_list_dict(validated_data,'experience','degree')
        prefered_experience_data =get_list_dict(validated_data,'prefered_experience','year')
        token = Token.objects.get(key=request.auth)

        position = validated_data['position']

        # NOC = validated_data['NOC']

        

        sslc_serializer = SSLCSerializer(data = sslc_data)
        hsc_serializer = HSCSerializer(data = hsc_data)
        ug_serializer = UGSerializer(data = ug_data)
        pg_serializer = PGSerializer(data = pg_data ,many = True)
        experience_serializer = ExperienceSerializer(data = experience_data,many = True)
        prefered_experience_serializer = PreferedExperienceSerializer(data = prefered_experience_data,many = True)
        if sslc_serializer.is_valid() and hsc_serializer.is_valid() and ug_serializer.is_valid() and  pg_serializer.is_valid() and experience_serializer.is_valid() and  prefered_experience_serializer.is_valid():
            
            sslc , hsc , ug , pg , experience , prefered_experience = sslc_serializer.save(),hsc_serializer.save(),ug_serializer.save(),pg_serializer.save(),experience_serializer.save(),prefered_experience_serializer.save()
           
            
            job_serializer = JobSerializer(data = {'position' :position,'sslc': sslc.id,'hsc': hsc.id,'ug': ug.id , 'user' :token.user.id })
            
            if job_serializer.is_valid():
                
                job = job_serializer.save()
                job.pg.set(pg)
                job.experience.set(experience)
                job.prefered_experience.set(prefered_experience)

                applicant_email = job.user.username
                applicant_name = job.user.profile.first_name
                job_title = job.position
                application_id = job.application_id
                send_application_email(applicant_email,applicant_name,job_title,application_id)
                # job.NOC = NOC
                # job.save()
                # sendOTP(token.user.username , True , position)

                return Response (status= status.HTTP_200_OK)

             
        return Response( status=status.HTTP_400_BAD_REQUEST)


from django.core.mail import send_mail
from django.template.loader import render_to_string

def send_application_email(applicant_email, applicant_name, job_title, application_id):
    subject = "Your Application ID: Next Steps Await!"
    html_content = render_to_string(
        'email.html', 
        {
            'applicant_name': applicant_name,
            'job_title': job_title,
            'application_id': application_id,
        }
    )
    send_mail(
        subject,
        '',
         settings.EMAIL_HOST_USER ,# From email address (can be None or your sender address)
        [applicant_email],  # To email address
        html_message=html_content,
    )



