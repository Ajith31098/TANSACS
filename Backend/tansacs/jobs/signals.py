from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Job

from django.db import models
from django.db.models.signals import post_save
from .models import Job
from superadmin.api.utiils import generate_unique_random_number
from .models import Experience
from .ScoreValidatorJobs.cpm import get_score_cpm
from .ScoreValidatorJobs.cso import get_score_cso
from .ScoreValidatorJobs.dmdo import get_score_dmdo
from .ScoreValidatorJobs.ddls import get_score_ddls
from .ScoreValidatorJobs.ddsi import get_score_ddsi
from .ScoreValidatorJobs.adictc import get_score_adictc
from .ScoreValidatorJobs.adti import get_score_adti
from .ScoreValidatorJobs.adiec import get_score_adiec
from django.dispatch import Signal

ABBREVIATION_POSITIONS = {
    Job.POSITION.CLUSTER_MANAGER: get_score_cpm,
    Job.POSITION.CLINICAL_OFFICER: get_score_cso,
    Job.POSITION.DATA_MONITORING_OFFICER: get_score_dmdo,
    Job.POSITION.DEPUTY_LS_DIRECTOR: get_score_ddls,
    Job.POSITION.DEPUTY_SI_DIRECTOR: get_score_ddsi,
    Job.POSITION.ASSISTANT_ICTC_DIRECTOR: get_score_adictc,
    Job.POSITION.ASSISTANT_TI_DIRECTOR: get_score_adti,
    Job.POSITION.ASSISTANT_IEC_DIRECTOR: get_score_adiec,
}


def get_score(ug, pg, position):

    return ABBREVIATION_POSITIONS[position](ug, pg)


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
    exp_total_years_ug = sum(exps.year for exps in instance.exp.all(
    ) if exps.course == Experience.Course.UG)
    exp_total_years_pg = sum(exps.year for exps in instance.exp.all(
    ) if exps.course == Experience.Course.PG)
    # print("exp_score", exp_percentage)
    # exp_percentage = exp_total_years_ug * \
    #     4 if exp_total_years_pg == 0 else exp_total_years_pg*7

    # print(exp_percentage)

    exp_percentage = get_score(
        exp_total_years_ug, exp_total_years_pg, instance.position)

    exp_percentage = exp_percentage if exp_percentage <= 20 else 20

    # if exp_total_years >= 4:
    #     exp_percentage = 20
    # elif exp_total_years >= 3:
    #     exp_percentage = 18
    # elif exp_total_years >= 2:
    #     exp_percentage = 13
    # elif exp_total_years >= 1:
    #     exp_percentage = 8
    # else:
    #     exp_percentage = 0
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
