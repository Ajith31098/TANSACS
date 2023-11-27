from django.urls import path
from . import views

urlpatterns = [
    path('login' , views.LoginView.as_view() , name='login'),
    path('signup', views.SignUpView.as_view(), name="signup"),
    path('profile/<int:id>' , views.UpdateProfileImageView.as_view() , name='profile'),
    path('send-otp', views.send_otp.as_view(), name='send_otp'),
    path('verified' , views.verified.as_view() , name = 'verified')

]