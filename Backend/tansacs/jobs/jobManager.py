from django.db import models
from django.db.models import Count
from django.db.models import F, Value
from django.db.models.functions import Concat

class JobManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()

    def get_applicants_count_by_position(self):
        # Aggregate the count of applicants for each position
        counts = self.get_queryset().values('position').annotate(applicants_count=Count('id'))

        # Prepare a dictionary to store counts for each position
        position_counts = {position['position']: position['applicants_count'] for position in counts}

        return position_counts
    

    def get_applicants_by_position(self, position):
        print(position , "lhfosdghj")
        # Query to fetch applicant details for a specific position
        applicants = self.filter(position=position).annotate(
            name=Concat('user__profile__first_name', Value(' '), 'user__profile__last_name')
        ).values(
            'application_id',
            'name',
            'user__email',
            'mark'
        )