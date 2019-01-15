from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Task(models.Model):
    '''
        Task Model for the app.
    '''
    HIGH_PRIORITY = 'HP'
    MEDIUM_PRIORITY = 'MP'
    LOW_PRIORITY = 'LP'
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='owned_tasks')
    participants = models.ManyToManyField(
        User, related_name='tasks')
    content = models.CharField(max_length=200, blank=True, null=True)
    PRIORITY_CHOICES = ((HIGH_PRIORITY, "High"),
                        (LOW_PRIORITY, 'Low'),
                        (MEDIUM_PRIORITY, 'Medium'))
    priority = models.CharField(
        max_length=2, choices=PRIORITY_CHOICES, default=LOW_PRIORITY)
    status = models.BooleanField(default=False)
    due_date = models.DateField()
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.content or ''
