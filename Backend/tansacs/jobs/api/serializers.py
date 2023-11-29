from rest_framework import serializers
from jobs.models import SSLC, HSC, UG, PG, Experience, PreferedExperience, Job

class SSLCSerializer(serializers.ModelSerializer):
   class Meta:
       model = SSLC
       fields = '__all__'

class HSCSerializer(serializers.ModelSerializer):
   class Meta:
       model = HSC
       fields = '__all__'

class UGSerializer(serializers.ModelSerializer):
   class Meta:
       model = UG
       fields = '__all__'

class PGSerializer(serializers.ModelSerializer):
   class Meta:
       model = PG
       fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
   class Meta:
       model = Experience
       fields = '__all__'

class PreferedExperienceSerializer(serializers.ModelSerializer):
   class Meta:
       model = PreferedExperience
       fields = '__all__'

from django.core.files.base import ContentFile
import base64



class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['position' , 'sslc' , 'hsc' , 'ug' ,'user'] # No fields are included in the serializer



    
    



