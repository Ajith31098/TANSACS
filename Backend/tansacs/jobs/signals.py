from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Job

from django.db import models
from django.db.models.signals import post_save
from .models import Job
from superadmin.api.utiils import generate_unique_random_number
from .models import Experience
from .ScoreValidatorJobs.cpm import cpm_exp_score
from .ScoreValidatorJobs.cso import cso_exp_score
from .ScoreValidatorJobs.dmdo import dmdo_exp_score
from .ScoreValidatorJobs.ddls import ddls_exp_score
from .ScoreValidatorJobs.ddsi import ddsi_exp_score
from .ScoreValidatorJobs.adictc import adictc_exp_score
from .ScoreValidatorJobs.adti import adti_exp_score
from .ScoreValidatorJobs.adiec import adiec_exp_score
from django.dispatch import Signal

ABBREVIATION_POSITIONS = {
    Job.POSITION.CLUSTER_MANAGER: cpm_exp_score,
    Job.POSITION.CLINICAL_OFFICER: cso_exp_score,
    Job.POSITION.DATA_MONITORING_OFFICER: dmdo_exp_score,
    Job.POSITION.DEPUTY_LS_DIRECTOR: ddls_exp_score,
    Job.POSITION.DEPUTY_SI_DIRECTOR: ddsi_exp_score,
    Job.POSITION.ASSISTANT_ICTC_DIRECTOR: adictc_exp_score,
    Job.POSITION.ASSISTANT_TI_DIRECTOR: adti_exp_score,
    Job.POSITION.ASSISTANT_IEC_DIRECTOR: adiec_exp_score,
}


def get_score(instance):

    return ABBREVIATION_POSITIONS[instance.position](instance)


# Define the abbreviation dictionary
ABBREVIATION_POSITION = {
    Job.POSITION.CLUSTER_MANAGER: 'CPM',
    Job.POSITION.CLINICAL_OFFICER: 'CSO',
    Job.POSITION.DATA_MONITORING_OFFICER: 'DMDO',
    Job.POSITION.DEPUTY_LS_DIRECTOR: 'DDLS',
    Job.POSITION.DEPUTY_SI_DIRECTOR: 'DDSI',
    Job.POSITION.ASSISTANT_ICTC_DIRECTOR: 'ADICTC',
    Job.POSITION.ASSISTANT_TI_DIRECTOR: 'ADTI',
    Job.POSITION.ASSISTANT_IEC_DIRECTOR: 'ADIEC',
}

my_custom_signal = Signal()


@receiver(my_custom_signal)
def my_custom_signal_receiver(sender, **kwargs):
    instance = kwargs.get('instance')
    # Perform your custom logic here
    sslc_percentage = instance.sslc.percentage / 100 * 10 if instance.sslc else 0
    hsc_percentage = instance.hsc.percentage / 100 * 20 if instance.hsc else 0
    ug_percentage = instance.ug.percentage / 100 * 30 if instance.ug else 0
    pg_count = instance.pg.count()
    pg_total_percentage = sum(
        pg.percentage for pg in instance.pg.all()) if pg_count > 0 else 0
    pg_percentage = ((pg_total_percentage / pg_count) /
                     100) * 10 if pg_count > 0 else 0
    # exp_percentage = get_score(instance)
    exp_total_years_ug = sum(exps.year for exps in instance.exp.all(
    ) if exps.course == Experience.Course.UG)
    exp_total_years_pg = sum(exps.year for exps in instance.exp.all(
    ) if exps.course == Experience.Course.PG)
    # print("exp_score", exp_percentage)
    exp_total_years = exp_total_years_ug + exp_total_years_pg
    exp_percentage = 0

    if exp_total_years >= 4:
        exp_percentage = 20
    elif exp_total_years >= 3:
        exp_percentage = 18
    elif exp_total_years >= 2:
        exp_percentage = 13
    elif exp_total_years >= 1:
        exp_percentage = 8
    else:
        exp_percentage = 0
    print(sslc_percentage, hsc_percentage,
          ug_percentage, pg_percentage, exp_percentage)
    mark = sslc_percentage + hsc_percentage + \
        ug_percentage + pg_percentage + exp_percentage

    # Add 10 if preferred_experience exists
    if instance.pexp.all().exists():
        mark += 10

    # Set the calculated mark to the Job instance
    instance.mark = mark
    instance.save()


@receiver(post_save, sender=Job)
def calculate_mark_and_application_id(sender, instance, created,  **kwargs):

    if created:
        random_number = generate_unique_random_number()

        print(instance.position)

        # Get the abbreviation based on position
        abbreviation = ABBREVIATION_POSITION.get(instance.position, '')

        instance.application_id = f"TAN{random_number}"
        instance.save()

# @receiver(post_save, sender=Job)
# def calculate_mark(sender, instance, **kwargs):
#     # Calculate marks based on the related fields


#     # Calculate PG marks if PG exists


#     # Calculate experience marks if experience exists
#     # exp_total_years_ug = sum(exp.year for exp in instance.experience.all() if exp.course == Experience.Course.UG)
#     # exp_total_years_pg = sum(exp.year for exp in instance.experience.all() if exp.course == Experience.Course.PG)

#     # exp_total_years = exp_total_years_ug + exp_total_years_pg


#     exp_percentage = get_score(instance)

#     print(exp_percentage)

#     # Calculate mark
