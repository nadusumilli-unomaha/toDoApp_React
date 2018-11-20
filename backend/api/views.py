from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import (
    viewsets,
    views,
    permissions,
    parsers,
)

from api.models import (
    Task
)

from api.serializers import (
    TaskSerializer,
    UserSerializer,
)

User = get_user_model()


def indexView(req):
    return render(req, 'index.html', {})


class TaskView(viewsets.ModelViewSet):
    '''
        Task View set for all the methods.
    '''
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class RegisterView(views.APIView):
    '''
        Register view for the user to register into the app.
    '''

    def post(self, req, *args, **kwargs):
        print(req)
        user = req.POST.get('user')
        profile = req.POST.get('profile')


class SessionView(views.APIView):
    '''
        Session view for the user to maintain the app session.
    '''

    def get(self, req, *args, **kwargs):
        print(req)
