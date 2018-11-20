from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    '''
        A serializer for users registering into the app.
    '''
    class Meta:
        fields = ('username', 'email')
        model = User
