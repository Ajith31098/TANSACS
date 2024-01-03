from django.contrib.auth.models import User
from datetime import date
from django.core.validators import MaxValueValidator
from user.validators import validate_phone_number, validate_pincode
from django.db import models


class Profile(models.Model):

    class Gender(models.TextChoices):
        MALE = 'male'
        FEMALE = 'female'
        OTHER = 'other'

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile")
    is_verified = models.BooleanField(default=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(
        max_length=30, blank=True, null=True, default="")
    gender = models.CharField(max_length=10, choices=Gender.choices)
    DOB = models.DateField()
    age = models.IntegerField()
    aadhar = models.CharField(max_length=12)
    phone_number = models.CharField(
        max_length=13)
    alternate_phone_number = models.CharField(
        max_length=13)
    email = models.EmailField(max_length=50, unique=True)
    profile_image = models.ImageField(
        upload_to="profile/", blank=True, null=True)

    guardian_name = models.CharField(max_length=50)
    guardian_name_initial = models.CharField(
        max_length=50, blank=True, null=True)

    # Add other fields as needed for your user profile

    @property
    def age_job(self):
        specific_date = date(2023, 6, 30)
        age = specific_date.year - self.DOB.year - \
            ((specific_date.month, specific_date.day)
             < (self.DOB.month, self.DOB.day))
        return age

    def __str__(self):
        return self.user.username


class Address(models.Model):

    class AddressType(models.TextChoices):
        PERMANENT = 'permanent'
        COMMUNICATION = 'communication'

    user = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="address")
    address_type = models.CharField(choices=AddressType.choices)
    address_line1 = models.TextField(max_length=250)
    address_line2 = models.TextField(max_length=250,  blank=True, null=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=30, default="Tamil Nadu")
    district = models.CharField(max_length=50)
    pincode = models.CharField(validators=[validate_pincode])

    def __str__(self):
        return self.user.email

# {
#    "user": 1,
#    "is_verified": true,
#    "first_name": "John",
#    "last_name": "Doe",
#    "gender": "male",
#    "DOB": "2000-01-01",
#    "age": 23,
#    "aadhar": "123456789012",
#    "phone_number": "1234567890",
#    "alternate_phone_number": "0987654321",
#    "email": "john.doe@example.com",
#    "profile_image": "profile/image.jpg",
#    "guardian_name": "Jane Doe"
# }
