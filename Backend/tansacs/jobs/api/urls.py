from django.urls import path
from . import views

urlpatterns = [
    path('job' , views.JobView.as_view() , name='job'),

]