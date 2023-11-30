from django.urls import path
from . import views

urlpatterns = [
    path('applicant_count' , views.JobApplicantsCount.as_view() , name='applicant_count'),
    path('applicants/<str:position>/', views.ApplicantByPosition.as_view(), name='applicants_by_position'),
    path('api/job/<int:job_id>/', views.JobDetailsAPIView.as_view(), name='job-details-api'),
]