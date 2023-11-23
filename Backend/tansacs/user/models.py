from django.contrib.auth.models import User
from datetime import date
from django.core.validators import MaxValueValidator
from user.validators import validate_phone_number , validate_pincode
from django.db import models




class Profile(models.Model):

    class Gender(models.TextChoices):
        MALE = 'male'
        FEMALE = 'female'
        OTHER = 'other'

    user = models.OneToOneField(User, on_delete=models.PROTECT, related_name="profile")
    is_verified = models.BooleanField(default=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=30)
    gender = models.CharField(max_length=10, choices=Gender.choices)
    DOB = models.DateField()
    age = models.IntegerField(validators=[MaxValueValidator(60)])   
    aadhar =  models.CharField(max_length=12)
    phone_number = models.CharField(max_length=10, validators=[validate_phone_number])
    alternate_phone_number = models.CharField(max_length=10, validators=[validate_phone_number])
    email =  models.EmailField(max_length=50,unique=True)
    profile_image = models.ImageField(upload_to="profile/")


    guardian_name = models.CharField(max_length=50)

    # Add other fields as needed for your user profile

    @property
    def age_job(self):
        specific_date = date(2023, 6, 30)
        age = specific_date.year - self.birthdate.year - ((specific_date.month, specific_date.day) < (self.birthdate.month, self.birthdate.day))
        return age


    def __str__(self):
        return self.user.username
    

class Address(models.Model):

    class AddressType(models.TextChoices):
        PERMANENT = 'permanent'
        COMMUNICATION = 'communication'

    user = models.ForeignKey(Profile , on_delete=models.PROTECT, related_name="address")
    address_type = models.CharField(choices=AddressType.choices)
    address_line1 = models.TextField(max_length=250)
    address_line2 = models.TextField(max_length=250 ,  blank=True , null=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=30 , default="Tamil Nadu")
    district = models.CharField(max_length=50)
    pincode = models.CharField(validators=[validate_pincode])