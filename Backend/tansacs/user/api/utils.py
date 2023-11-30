from django.core.mail import send_mail 
import random
from django.conf import settings
from smtplib import  SMTPException, SMTPRecipientsRefused



def sendOTP(email , body = False , position = ''):

    otp = str(random.randint(1000,9999))
    subject = 'OTP verification'
    message  = f"Your OTP is {otp}"  
    if body:
        subject = 'Job Application'
        message = f'Your application for {position} post has been succesfully submited.we will be in touch with you.'
    
         
    send_mail(subject , message , settings.EMAIL_HOST_USER , [email])
    return otp 


