from datetime import date
from django.core.exceptions import ValidationError



def validate_year(value):
 current_year = date.today().year
 if value < current_year - 60 or value > current_year:
     raise ValidationError('Year must be within the last 60 years from the current year.')