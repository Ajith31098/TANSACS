# Generated by Django 4.2.7 on 2023-12-18 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0009_job_signature'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='position',
            field=models.CharField(choices=[('Cluster Programme Manager', 'Cluster Manager'), ('Clinical Services Officer', 'Clinical Officer'), ('Data Monitoring and Documentation Officer', 'Data Monitoring Officer'), ('Deputy Director (LS)', 'Deputy Ls Director'), ('Deputy Director (SI)', 'Deputy Si Director'), ('Assistant Director (BSD) /(ICTC)', 'Assistant Ictc Director'), ('Assistant Director (PREVENTION) /(TI)', 'Assistant Ti Director'), ('Assistant Director (IEC)', 'Assistant Iec Director')], max_length=100),
        ),
    ]
