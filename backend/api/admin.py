from django.contrib import admin
from api.v1.models import (
    Task,
)

# Register your models here.
admin.site.register(Task)
