# Generated by Django 4.2.7 on 2023-12-16 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0008_alter_experience_certificate_alter_hsc_marksheet_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='signature',
            field=models.FileField(blank=True, null=True, upload_to='signature/'),
        ),
    ]
