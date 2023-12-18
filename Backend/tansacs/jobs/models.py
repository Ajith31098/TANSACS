from django.db import models
from django.core.validators import MaxValueValidator
from jobs.validators import validate_year
from django.contrib.auth.models import User
from .jobManager import JobManager
# Create your models here.


class Board(models.TextChoices):

    STATE = 'State Board'
    CBSE = 'CBSE'
    ICSE = 'ICSE'
    MATRIC = 'Matric'


class SSLC(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    register_number = models.CharField(max_length=20)
    month = models.CharField(max_length=20)
    year = models.IntegerField(validators=[validate_year])
    percentage = models.DecimalField(
        max_digits=5,  # Increase the total digits to accommodate larger numbers
        decimal_places=2,  # Increase decimal places to 3
        validators=[MaxValueValidator(100)],
    )
    board = models.CharField(choices=Board.choices)
    marksheet = models.FileField(upload_to="SSLC/", blank=True, null=True)


class HSC(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    register_number = models.CharField(max_length=20)
    month = models.CharField(max_length=20)
    year = models.IntegerField(validators=[validate_year])

    percentage = models.DecimalField(
        max_digits=5,  # Increase the total digits to accommodate larger numbers
        decimal_places=2,  # Increase decimal places to 3
        validators=[MaxValueValidator(100)],
    )
    board = models.CharField(choices=Board.choices)
    marksheet = models.FileField(upload_to="HSC/", blank=True, null=True)


class UG(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    register_number = models.CharField(max_length=20)
    degree = models.CharField(max_length=200)
    department = models.CharField(max_length=20)
    month = models.CharField(max_length=20)
    year = models.IntegerField(validators=[validate_year])
    percentage = models.DecimalField(
        max_digits=5,  # Increase the total digits to accommodate larger numbers
        decimal_places=2,  # Increase decimal places to 3
        validators=[MaxValueValidator(100)],
    )

    marksheet = models.FileField(upload_to="UG/", blank=True, null=True)


class Job(models.Model):

    class POSITION(models.TextChoices):
        CLUSTER_MANAGER = 'Cluster Program Manager'
        CLINICAL_OFFICER = 'Clinical Service Officer'
        DATA_MONITORING_OFFICER = 'Data Monitoring Documentation Officer'
        DEPUTY_LS_DIRECTOR = 'Deputy Director (LS)'
        DEPUTY_SI_DIRECTOR = 'Deputy Director (SI)'
        ASSISTANT_ICTC_DIRECTOR = 'Assistent Director (BSD) /(ICTC)'
        ASSISTANT_TI_DIRECTOR = 'Assistent Director (PREVENTION) /(TI)'
        ASSISTANT_IEC_DIRECTOR = 'Assistent Director (IEC)'

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="jobs")
    application_id = models.CharField(max_length=50, default="TAN00000")
    sslc = models.OneToOneField(
        SSLC, on_delete=models.CASCADE, related_name='detailOfJob_sslc')
    hsc = models.OneToOneField(
        HSC, on_delete=models.CASCADE, related_name='detailOfJob_hsc')
    ug = models.OneToOneField(
        UG, on_delete=models.CASCADE, related_name='detailOfJob_ug')
    # pg = models.ManyToManyField(PG, related_name='detailOfJob_pg')
    # experience = models.ManyToManyField(
    #     Experience, related_name='detailOfJob_experience')
    # prefered_experience = models.ManyToManyField(
    #     PreferedExperience, related_name='detailOfJob_prefered_experience')
    mark = models.DecimalField(
        max_digits=5,  # Increase the total digits to accommodate larger numbers
        decimal_places=2,  # Increase decimal places to 3
        validators=[MaxValueValidator(100)],
        default=0
    )
    position = models.CharField(max_length=100, choices=POSITION.choices)
    objects = models.Manager()
    c_objects = JobManager()
    signature = models.FileField(
        upload_to="signature/", blank=True, null=True)


class PG(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    register_number = models.CharField(max_length=20)
    degree = models.CharField(max_length=200)
    department = models.CharField(max_length=20)
    month = models.CharField(max_length=20)
    year = models.IntegerField(validators=[validate_year])
    percentage = models.DecimalField(
        max_digits=5,  # Increase the total digits to accommodate larger numbers
        decimal_places=2,  # Increase decimal places to 3
        validators=[MaxValueValidator(100)],
    )

    marksheet = models.FileField(upload_to="PG/", blank=True, null=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE,
                            related_name="pg", blank=True, null=True, default=None)


class Experience(models.Model):
    class Course(models.TextChoices):
        UG = 'UG'
        PG = 'PG'
    degree = models.CharField(max_length=200)
    company = models.CharField(max_length=100)
    year = models.IntegerField()
    certificate = models.FileField(
        upload_to="Experience/", blank=True, null=True)
    course = models.CharField(
        max_length=50, choices=Course.choices, default=Course.UG)

    job = models.ForeignKey(Job, on_delete=models.CASCADE,
                            related_name="exp", blank=True, null=True, default=None)


class PreferedExperience(models.Model):

    class Company(models.TextChoices):
        NACO = 'NACO'
        TANSACS = 'TANSACS'
        TSU = 'TSU'

    company = models.CharField(max_length=100, choices=Company.choices)
    year = models.IntegerField()
    certificate = models.FileField(
        upload_to="PreferedExperience/", blank=True, null=True)
    NOC = models.FileField(upload_to="NOC/", blank=True, null=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE,
                            related_name="pexp", blank=True, null=True, default=None)
