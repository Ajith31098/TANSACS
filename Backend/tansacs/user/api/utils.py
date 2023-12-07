from django.core.mail import send_mail
import random
from django.conf import settings
from smtplib import SMTPException, SMTPRecipientsRefused


def sendOTP(email, body=False, position=''):

    otp = str(random.randint(1000, 9999))
    subject = f"Your One-Time Password (OTP) for TANSACS Job Recruitment"
    message = f"Your One-Time Password (OTP) for {otp} TANSACS Job Recruitment"
    if body:
        subject = 'Job Application'
        message = f'Your application for {position} post has been succesfully submited.we will be in touch with you.'

    send_mail(subject, message, settings.EMAIL_HOST_USER, [email])
    return otp
