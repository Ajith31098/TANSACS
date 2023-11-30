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
    last_name = models.CharField(max_length=30)
    register_number =  models.CharField(max_length=20)
    month  = models.CharField(max_length=20)
    year = models.IntegerField(validators=[validate_year])
    percentage = models.IntegerField(validators=[MaxValueValidator(100)])
    board =  models.CharField(choices=Board.choices)
    marksheet =  models.ImageField(upload_to="SSLC/" ,blank=True , null=True)

class HSC(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30)
    register_number =  models.CharField(max_length=20)
    month  = models.CharField(max_length=20)
    year = models.IntegerField(validators=[validate_year])
    percentage = models.IntegerField(validators=[MaxValueValidator(100)])
    board =  models.CharField(choices=Board.choices)
    marksheet =  models.ImageField(upload_to="HSC/" ,blank=True , null=True)

class UG(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30)
    register_number =  models.CharField(max_length=20)
    degree =  models.CharField(max_length=50)
    department =  models.CharField(max_length=20)
    month  = models.CharField(max_length=20)
    year = models.IntegerField(validators=[validate_year])
    percentage = models.IntegerField(validators=[MaxValueValidator(100)])
    marksheet =  models.ImageField(upload_to="UG/" ,blank=True , null=True)


class PG(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30)
    register_number =  models.CharField(max_length=20)
    degree =  models.CharField(max_length=50)
    department =  models.CharField(max_length=20)
    month  = models.CharField(max_length=20)
    year = models.IntegerField(validators=[validate_year])
    percentage = models.IntegerField(validators=[MaxValueValidator(100)])
    marksheet =  models.ImageField(upload_to="PG/" ,blank=True , null=True)

class Experience(models.Model):

    degree =  models.CharField(max_length=50)
    company =  models.CharField(max_length=100)
    year = models.IntegerField()
    certificate =  models.ImageField(upload_to="Experience/" ,blank=True , null=True)

class PreferedExperience(models.Model):

    class Company(models.TextChoices):
        NACO = 'NACO'
        TANSACS = 'TANSACS'
        TSU = 'TSU'

    company =  models.CharField(max_length=100 , choices=Company.choices)
    year = models.IntegerField()
    certificate =  models.ImageField(upload_to="PreferedExperience/" ,blank=True , null=True)

class Job(models.Model):

    class POSITION(models.TextChoices):
        CLUSTER_MANAGER = 'Cluster Program Manager' 
        CLINICAL_OFFICER= 'Clinical Service Officer'
        DATA_MONITORING_OFFICER= 'Data Monitoring Documentation Officer'
        DEPUTY_LS_DIRECTOR = 'Deputy Director (LS)'
        DEPUTY_SI_DIRECTOR = 'Deputy Director (SI)'
        ASSISTANT_ICTC_DIRECTOR = 'Assistent Director (ICTC)'
        ASSISTANT_TI_DIRECTOR = 'Assistent Director (TI)'
        ASSISTANT_IEC_DIRECTOR = 'Assistent Director (IEC)'

    user  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="jobs")
    application_id = models.CharField(max_length=50 , default="TAN00000")
    sslc = models.OneToOneField(SSLC , on_delete=models.CASCADE , related_name='detailOfJob_sslc')
    hsc = models.OneToOneField(HSC , on_delete=models.CASCADE , related_name='detailOfJob_hsc')
    ug = models.OneToOneField(UG , on_delete=models.CASCADE , related_name='detailOfJob_ug')
    pg = models.ManyToManyField(PG , related_name='detailOfJob_pg')
    experience = models.ManyToManyField(Experience , related_name='detailOfJob_experience')
    prefered_experience = models.ManyToManyField(PreferedExperience , related_name='detailOfJob_prefered_experience')
    mark  =  models.IntegerField(validators=[MaxValueValidator(100)] , default=0)
    position = models.CharField(max_length=100 , choices=POSITION.choices)
    objects = models.Manager()
    c_objects = JobManager() 
    NOC =  models.ImageField(upload_to="NOC/" ,blank=True , null=True)

    
