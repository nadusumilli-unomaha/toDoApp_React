# django declarations.
from django.shortcuts import render
from django.contrib.auth import (
    get_user_model,
)

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone

from rest_framework_jwt.settings import api_settings

jwt_expiration_delta = api_settings.JWT_EXPIRATION_DELTA

# rest_framework declarations.
from rest_framework import (
    viewsets,
    views,
    generics,
    permissions,
    parsers
)

# Mixins for rendering responses.
from api.v1.mixins import (
    SessionResponseMixin
)

# Model imports for the views.
from api.v1.models import (
    Task
)

# Serializer imports for the views.
from api.v1.serializers import (
    TaskSerializer,
    RegisterSerializer,
    UserSessionSerializer,
    UserSerializer
)

# Base user model import.
User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    '''
        User View set for all the methods.
    '''
    resource_name = 'users'
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAdminUser,)


class TaskViewSet(viewsets.ModelViewSet):
    '''
        Task View set for all the methods.
    '''
    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Task.objects.all()


@method_decorator(csrf_exempt, name='dispatch')
class SessionView(SessionResponseMixin, views.APIView):
    '''
        Class: SessionView:
        Arguments:
            - SessionResponseMixin: A mixin to send a response to client.
        Defenition:
            This class process all the requests for session management.
            login(post) is used to create a token and send to client.
            logout(delete) is used to close the active user session.
            status(get) is used to check is the token is still valid.
        Return params:
            - Object: It contains the user information, token information,
                      errors if any and status of the request.
    '''
    permission_classes = (permissions.AllowAny,)  # permission for the class.

    def get(self, req, *args, **kwargs):
        '''
            Function: get (status):
            Arguments:
                -req: Request object from the client.
                -args: Any additional arguments from client.
                -kwargs: Any additional keyword arguments from client.
            Defenition:
                Processes the token using the rest framework jwt and
                checks if the token is valid and if it is valid returns
                values or errors.
            Return params:
                - Object: It contains the user information, token information,
                          errors if any and status of the request.
        '''
        (user, token, status, error) = (None, None, None, None)
        serializer = UserSessionSerializer()
        (user, token, status) = serializer.validate_get(req.GET.get('token'))
        return self.render_to_response(user, token, status, error)

    def post(self, req, *args, **kwargs):
        '''
            Function: post (login):
            Arguments:
                -req: Request object from the client.
                -args: Any additional arguments from client.
                -kwargs: Any additional keyword arguments from client.
            Defenition:
                Processes the username and password and checks for errors
                if there are no errors get the user model and checks the
                password if everything is valid returns values or errors.
            Return params:
                - Object: It contains the user information, token information,
                          errors if any and status of the request.
        '''
        (user, token, status, error) = (None, None, None, None)
        serializer = UserSessionSerializer()
        (user, token, status) = serializer.validate_post(req.data)
        token_expiry = timezone.now() + jwt_expiration_delta
        return self.render_to_response(user, token, status, error, token_expiry)

    def delete(self, req, *args, **kwargs):
        '''
            Function: delete (logout):
            Arguments:
                -req: Request object from the client.
                -args: Any additional arguments from client.
                -kwargs: Any additional keyword arguments from client.
            Defenition:
                Processes the request logs the user out and sends the values.
            Return params:
                - Object: It contains the user information, token information,
                          errors if any and status of the request.
        '''
        (user, token, status, error) = (None, None, None, None)
        serializer = UserSessionSerializer()
        (user, token, status) = serializer.validate_delete(req)
        return self.render_to_response(user, token, status, error)


@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(generics.CreateAPIView):
    '''
        Class: RegisterView:
        Arguments:
            - CreateView: A view to process post requests.
        Defenition:
            This class process all the data that has been posted from
            the client and creates a user model if everything is valid
            otherwise it returns the errors.
        Return params:
            - Object: It contains the user information, token information,
                      errors if any and status of the request.
    '''
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)
