from django.db import models

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