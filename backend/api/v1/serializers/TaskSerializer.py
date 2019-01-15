from rest_framework import serializers

from api.v1.models import (
    Task
)


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    '''
        A serializer for validating Tasks
        that are to be added in the app.
    '''

    class Meta:
        model = Task
        fields = ('id', "participants", "content", "status",
                  'priority', 'due_date', 'owner')

    def validate_content(self, value):
        if len(value) > 10000:
            raise serializers.ValidationError(
                "Please be brief about your content.")
        return value

    def validate_priority(self, value):
        return value
