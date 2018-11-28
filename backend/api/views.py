from django.shortcuts import render
from django.contrib.auth import (
    get_user_model,
    authenticate,
    login,
    logout
)
from rest_framework import (
    viewsets,
    views,
    permissions,
    parsers,
    status
)

from api.mixins import HttpResponseMixin

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


class TaskViewSet(viewsets.ModelViewSet):
    '''
        Task View set for all the methods.
    '''
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class RegisterView(HttpResponseMixin, views.APIView):
    '''
        Register view for the user to register into the app.
    '''

    def post(self, req, *args, **kwargs):
        print(req)
        user = req.POST.get('user')
        profile = req.POST.get('profile')


class SessionView(HttpResponseMixin, views.APIView):
    '''
        Session view for the user to maintain the app session.
    '''
    permission_classes = (permissions.AllowAny,)

    def get(self, req, *args, **kwargs):
        print(req)

    def post(self, req, *args, **kwargs):
        data = dict(id=None, username='', email='',
                    isAuthenticated=False, isAdmin=False, error=None, token=None)
        user = authenticate(
            username=req.data['username'], password=req.data['password'])
        if user is not None:
            if user.is_active:
                login(req, user)
                data = dict(id=user.id, username=user.username, email=user.email,
                            isAuthenticated=user.is_authenticated, isAdmin=user.is_superuser, error=None, token=None)
                return self.render_to_response(data, status.HTTP_200_OK)
            return self.render_to_response(data, status.HTTP_403_FORBIDDEN)
        data['error'] = 'Invalid username or Password'
        return self.render_to_response(data, status.HTTP_200_OK)
