from django.db import models

# Create your models here.

class TaskMetadata(models.Model):
    task_id = models.CharField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    video_filename = models.CharField(max_length=255)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    duration = models.FloatField(null=True, blank=True)
    number_of_images = models.IntegerField(null=True, blank=True)
    video_length = models.FloatField(null=True, blank=True)