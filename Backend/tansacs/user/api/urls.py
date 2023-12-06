from django.urls import path
from . import views

urlpatterns = [
    path('login' , views.LoginView.as_view() , name='login'),
    path('signup', views.SignUpView.as_view(), name="signup"),
    path('profile/<int:id>' , views.UpdateProfileImageView.as_view() , name='profile'),
    path('send-otp', views.send_otp.as_view(), name='send_otp'),
    path('verified' , views.verified.as_view() , name = 'verified'),
    path('logout' , views.LogoutView.as_view() , name ="logout"),
    path('forgot' , views.ForgotView.as_view() , name='forgot'),
    path('setpassword/<str:email>' , views.SetPassword.as_view() , name="set_password"),
    path('download_file/<str:file_name>', views.download_file, name='download_file'),
    path('get_detail' , views.JobVerification.as_view() , name='get_detail'),
    path('download_success_pdf/<int:pk>' , views.download_success_file, name="download_success_pdf")

]