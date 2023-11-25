from django.db import models
from django.core.validators import MaxValueValidator
from jobs.validators import validate_year
from django.contrib.auth.models import User

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
    marksheet =  models.ImageField(upload_to="SSLC/")

class HSC(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30)
    register_number =  models.CharField(max_length=20)
    month  = models.CharField(max_length=20)
    year = models.IntegerField(validators=[validate_year])
    percentage = models.IntegerField(validators=[MaxValueValidator(100)])
    board =  models.CharField(choices=Board.choices)
    marksheet =  models.ImageField(upload_to="HSC/")

class UG(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30)
    register_number =  models.CharField(max_length=20)
    degree =  models.CharField(max_length=50)
    department =  models.CharField(max_length=20)
    month  = models.CharField(max_length=20)
    year = models.IntegerField(validators=[validate_year])
    percentage = models.IntegerField(validators=[MaxValueValidator(100)])
    board =  models.CharField(choices=Board.choices)
    marksheet =  models.ImageField(upload_to="UG/")


class PG(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30)
    register_number =  models.CharField(max_length=20)
    degree =  models.CharField(max_length=50)
    department =  models.CharField(max_length=20)
    month  = models.CharField(max_length=20)
    year = models.IntegerField(validators=[validate_year])
    percentage = models.IntegerField(validators=[MaxValueValidator(100)])
    board =  models.CharField(choices=Board.choices)
    marksheet =  models.ImageField(upload_to="PG/")

class Experience(models.Model):

    degree =  models.CharField(max_length=50)
    company =  models.CharField(max_length=100)
    year = models.IntegerField()
    certificate =  models.ImageField(upload_to="Experience/")

class PreferedExperience(models.Model):

    class Company(models.TextChoices):
        NACO = 'NACO'
        TANSACS = 'TANSACS'
        TSU = 'TSU'

    degree =  models.CharField(max_length=50)
    company =  models.CharField(max_length=100)
    year = models.IntegerField()
    certificate =  models.ImageField(upload_to="PreferedExperience/")
    NOC =  models.ImageField(upload_to="NOC/")

class Job(models.Model):

    user  = models.ForeignKey(User, on_delete=models.PROTECT, related_name="jobs")
    sslc = models.OneToOneField(SSLC , on_delete=models.PROTECT , related_name='detailOfJob_sslc')
    hsc = models.OneToOneField(HSC , on_delete=models.PROTECT , related_name='detailOfJob_hsc')
    ug = models.OneToOneField(UG , on_delete=models.PROTECT , related_name='detailOfJob_ug')
    pg = models.ManyToManyField(PG , related_name='detailOfJob_pg')
    experience = models.ManyToManyField(Experience , related_name='detailOfJob_experience')
    prefered_experience = models.ManyToManyField(PreferedExperience , related_name='detailOfJob_prefered_experience')
    mark  =  models.IntegerField(validators=[MaxValueValidator(100)])


    
