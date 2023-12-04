from rest_framework import serializers
from jobs.models import SSLC, HSC, UG, PG, Experience, PreferedExperience, Job

class SSLCSerializer(serializers.ModelSerializer):
   class Meta:
       model = SSLC
       fields = '__all__'
       extra_kwargs = {
            'last_name': {'required': False},
        }


class HSCSerializer(serializers.ModelSerializer):
   class Meta:
       model = HSC
       fields = '__all__'
       extra_kwargs = {
            'last_name': {'required': False},
        }

class UGSerializer(serializers.ModelSerializer):
   class Meta:
       model = UG
       fields = '__all__'
       extra_kwargs = {
            'last_name': {'required': False},
        }

class PGSerializer(serializers.ModelSerializer):
   class Meta:
       model = PG
       fields = '__all__'
       extra_kwargs = {
            'last_name': {'required': False},
        }

class ExperienceSerializer(serializers.ModelSerializer):
   class Meta:
       model = Experience
       fields = '__all__'

class PreferedExperienceSerializer(serializers.ModelSerializer):
   NOC = serializers.FileField(allow_empty_file=True, required=False)
   class Meta:
       model = PreferedExperience
       fields = '__all__'
       extra_kwargs = {
            'NOC': {'required': False},
        }

from django.core.files.base import ContentFile
import base64



class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['position' , 'sslc' , 'hsc' , 'ug' ,'user'] # No fields are included in the serializer



    
    



