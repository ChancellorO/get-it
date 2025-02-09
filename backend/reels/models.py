from django.db import models
from django.utils.timezone import now

# Create your models here.

class Person(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    fname = models.CharField(max_length=255)
    lname = models.CharField(max_length=255)
    email = models.EmailField()
    tags = models.JSONField(default=list)

class Reels(models.Model):
    link = models.CharField(max_length=10000)
    tag = models.CharField(max_length=255)
    date = models.DateTimeField(default=now)

class PersonPercent(models.Model):
    video = models.CharField(max_length=10000)
    topic = models.CharField(max_length=255)
    watch_percent = models.IntegerField(default=0)