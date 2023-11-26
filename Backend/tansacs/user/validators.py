from django.core.exceptions import ValidationError


def validate_phone_number(value):
   if not value.isdigit() or len(value) != 10:
       raise ValidationError('Phone number must be a 10-digit number.')

def validate_pincode(value):
   if not value.isdigit() or len(value) != 6:
       raise ValidationError('Pincode number must be a 6-digit number.')