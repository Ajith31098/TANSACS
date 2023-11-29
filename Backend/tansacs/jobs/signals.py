from django.db import models
from django.db.models.signals import post_save , pre_save
from django.dispatch import receiver
from .models import Job

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Job
from superadmin.api.utiils import generate_unique_random_number



# Define the abbreviation dictionary
ABBREVIATION_POSITION = {
    'CPM': Job.POSITION.CLUSTER_MANAGER,
    'CSO': Job.POSITION.CLINICAL_OFFICER,
    'DMDO': Job.POSITION.DATA_MONITORING_OFFICER,
    'DD_LS': Job.POSITION.DEPUTY_LS_DIRECTOR,
    'DD_SI': Job.POSITION.DEPUTY_SI_DIRECTOR,
    'AD_ICTC': Job.POSITION.ASSISTANT_ICTC_DIRECTOR,
    'AD_TI': Job.POSITION.ASSISTANT_TI_DIRECTOR,
    'AD_IEC': Job.POSITION.ASSISTANT_IEC_DIRECTOR,
}

@receiver(post_save, sender=Job)
def calculate_mark(sender, instance, **kwargs):
    # Calculate marks based on the related fields
    sslc_percentage = instance.sslc.percentage / 100 * 10 if instance.sslc else 0
    hsc_percentage = instance.hsc.percentage / 100 * 20 if instance.hsc else 0
    ug_percentage = instance.ug.percentage / 100 * 30 if instance.ug else 0

    # Calculate PG marks if PG exists
    pg_count = instance.pg.count()
    pg_total_percentage = sum(pg.percentage for pg in instance.pg.all()) if pg_count > 0 else 0
    pg_percentage = pg_total_percentage / pg_count * 10 if pg_count > 0 else 0

    # Calculate experience marks if experience exists
    exp_total_years = sum(exp.years for exp in instance.experience.all()) 
    exp_percentage = 0

    if exp_total_years >= 5:
        exp_percentage = 20
    elif exp_total_years == 4:
        exp_percentage = 16
    elif exp_total_years == 3:
        exp_percentage = 12
    elif exp_total_years == 2:
        exp_percentage = 8
    elif exp_total_years == 1:
        exp_percentage = 4
    else:
        exp_percentage = 0

    # Calculate mark
    mark = sslc_percentage + hsc_percentage + ug_percentage + pg_percentage + exp_percentage

    # Add 10 if preferred_experience exists
    if instance.prefered_experience.exists():
        mark += 10

    # Set the calculated mark to the Job instance
    instance.mark = mark


@receiver(pre_save, sender=Job )
def calculate_mark_and_application_id(sender, instance,created, **kwargs):
   
    if created:

        random_number = generate_unique_random_number()

        # Get the abbreviation based on position
        abbreviation = ABBREVIATION_POSITION.get(instance.position, '')

        instance.application_id = f"TAN{abbreviation}{random_number}"
        instance.save()
