from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import JobSerializer
from jobs.models import Job

class JobView(generics.CreateAPIView):
   queryset = Job.objects.all()
   serializer_class = JobSerializer

   def perform_create(self, serializer):
       serializer.save(user=self.request.user)
