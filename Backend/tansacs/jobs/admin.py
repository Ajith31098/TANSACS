from django.contrib import admin
from jobs import models

# Register your models here.


admin.site.register(models.SSLC)
admin.site.register(models.HSC)
admin.site.register(models.UG)
admin.site.register(models.PG)
admin.site.register(models.Experience)
admin.site.register(models.PreferedExperience)
admin.site.register(models.Job)