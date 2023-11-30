from rest_framework import serializers
from jobs.models import Job
from jobs.api.serializers import SSLCSerializer ,HSCSerializer , UGSerializer,PGSerializer,ExperienceSerializer,PreferedExperienceSerializer

POSITION_ABBREVIATIONS = {
    'Cluster Program Manager': 'CPM',
    'Clinical Service Officer': 'CSO',
    'Data Monitoring Documentation Officer': 'DMDO',
    'Deputy Director (LS)': 'DD_LS',
    'Deputy Director (SI)': 'DD_SI',
    'Assistent Director (ICTC)': 'AD_ICTC',
    'Assistent Director (TI)': 'AD_TI',
    'Assistent Director (IEC)': 'AD_IEC',
    # Add abbreviations for other positions here
}


class JobApplicantsCountSerializer(serializers.Serializer):
    position = serializers.CharField()
    applicants_count = serializers.IntegerField()
    abbreviation = serializers.SerializerMethodField()
    def get_abbreviation(self, obj):
        position_name = obj['position']
        return POSITION_ABBREVIATIONS.get(position_name, '')
    


class ApplicantSerializer(serializers.Serializer):
    application_id = serializers.CharField()
    name = serializers.CharField()
    email = serializers.EmailField()
    mark = serializers.IntegerField()




class JobDataSerializer(serializers.ModelSerializer):
    user_full_name = serializers.SerializerMethodField()
    username = serializers.CharField(source='user.username')
    application_id = serializers.CharField()
    score = serializers.IntegerField(source='mark')
    job_id = serializers.IntegerField(source='id')

    class Meta:
        model = Job
        fields = ['user_full_name', 'username', 'application_id', 'score', 'job_id']

    def get_user_full_name(self, obj):
        return f"{obj.user.profile.first_name} {obj.user.profile.last_name}"
    
class JobSerializer(serializers.ModelSerializer):
    sslc = SSLCSerializer()
    hsc = HSCSerializer()
    ug = UGSerializer()
    pg = PGSerializer(many=True)
    experience = ExperienceSerializer(many=True)
    prefered_experience = PreferedExperienceSerializer(many=True)

    class Meta:
        model = Job
        fields = '__all__'

