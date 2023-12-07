from django.urls import path
from . import views

urlpatterns = [
    path('job', views.JobView.as_view(), name='job'),

    path('download/<int:pk>',
         views.application_success, name="application_success"),

]
