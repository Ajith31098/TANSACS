from jobs.models import Job
import random

AbbrevationPosition = {
    'CPM' : Job.POSITION.CLUSTER_MANAGER,
    'CSO': Job.POSITION.CLINICAL_OFFICER,
    'DMDO': Job.POSITION.DATA_MONITORING_OFFICER,
    'DD_LS': Job.POSITION.DEPUTY_LS_DIRECTOR,
    'DD_SI': Job.POSITION.DEPUTY_SI_DIRECTOR,
    'AD_ICTC': Job.POSITION.ASSISTANT_ICTC_DIRECTOR,
    'AD_TI': Job.POSITION.ASSISTANT_TI_DIRECTOR,
    'AD_IEC': Job.POSITION.ASSISTANT_IEC_DIRECTOR,
}



def generate_unique_random_number():
    while True:
        random_number = f'{random.randint(10000, 99999)}'
        if not Job.objects.filter(application_id__endswith=random_number).exists():
            return random_number