# Generated by Django 5.0.6 on 2025-02-09 04:17

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("reels", "0002_reels_alter_person_username"),
    ]

    operations = [
        migrations.AddField(
            model_name="reels",
            name="date",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
