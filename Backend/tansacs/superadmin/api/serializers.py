from rest_framework import serializers


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
