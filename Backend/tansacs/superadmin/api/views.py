from django.db.models import Prefetch
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from jobs.models import Job
from .serializers import JobApplicantsCountSerializer, ApplicantSerializer, JobDataSerializer, JobSerializer
from .utiils import AbbrevationPosition


class JobApplicantsCount(APIView):
    authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAdminUser]

    def get(self, request):
        print(request.auth)
        # Get counts of applicants for each position using the custom manager
        counts = Job.c_objects.get_applicants_count_by_position()
        print(counts)
        # Serialize the counts using the serializer
        serializer = JobApplicantsCountSerializer([
            {'position': position, 'applicants_count': count} for position, count in counts.items()
        ],
            many=True
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


class ApplicantByPosition(APIView):

    authentication_classes = [TokenAuthentication]

    def get(self, request, position):
        # Use the custom manager to retrieve applicant details based on position
        # applicants = Job.c_objects.get_applicants_by_position(AbbrevationPosition[position])
        # print(AbbrevationPosition[position])
        obj = Job.objects.filter(
            position=AbbrevationPosition[position]).order_by('-mark')
        # Serialize the data using the ApplicantSerializer
        serializer = JobDataSerializer(obj, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


# class JobDetailsAPIView(APIView):
#     def get(self, request, job_id):
#         try:
#             job = Job.objects.select_related(
#                 'sslc', 'hsc', 'ug', 'pg', 'pexp', 'exp').get(id=job_id)
#             serializer = JobSerializer(job)
#             return Response(serializer.data)
#         except Job.DoesNotExist:
#             return Response({"error": "Job does not exist"}, status=status.HTTP_404_NOT_FOUND)


class JobDetailsAPIView(APIView):
    def get(self, request, job_id):
        try:
            job = Job.objects.prefetch_related(
                'pg', 'exp', 'pexp',
                Prefetch('sslc'), Prefetch('hsc'), Prefetch('ug')
            ).get(id=job_id)

            serializer = JobSerializer(job)
            return Response(serializer.data)
        except Job.DoesNotExist:
            return Response({"error": "Job does not exist"}, status=status.HTTP_404_NOT_FOUND)
