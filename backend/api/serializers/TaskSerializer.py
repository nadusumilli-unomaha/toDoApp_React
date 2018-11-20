from rest_framework import serializers
from django.contrib.auth import get_user_model

from api.models import (
    Task
)

User = get_user_model()


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    '''
        A serializer for validating Tasks
        that are to be added in the app.
    '''

    class Meta:
        fields = ("participants", "content", "status")
        model = Task

    def validate_content(self, value):
        if len(value) > 10000:
            raise serializers.ValidationError(
                "Please be brief about your content.")

    def validate_priority(self, value):
        if(type(value) is not int):
            raise serializers.ValidationError(
                'Priority has to be a number.')
