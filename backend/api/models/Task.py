from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Task(models.Model):
    '''
        Task Model for the app.
    '''
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    participants = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='tasks')
    content = models.CharField(max_length=200, blank=True, null=True)
    status = models.BooleanField(default=False)
    priority = models.IntegerField()
    due_date = models.DateField()
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.content or ''
