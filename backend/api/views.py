import datetime
from django.shortcuts import render
from django.db.models import Q
from django.utils import timezone
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
# JWT token settings.
from rest_framework_jwt.settings import api_settings

from api.mixins import (
    SessionResponseMixin
)

from api.models import (
    Task
)

from api.serializers import (
    TaskSerializer,
    UserSerializer,
)

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_expiration_delta = api_settings.JWT_EXPIRATION_DELTA

User = get_user_model()


def indexView(req):
    return render(req, 'index.html', {})


class TaskViewSet(viewsets.ModelViewSet):
    '''
        Task View set for all the methods.
    '''
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class RegisterView(SessionResponseMixin, views.APIView):
    '''
        Register view for the user to register into the app.
    '''

    def post(self, req, *args, **kwargs):
        (user, error, token) = (None, None, None)
        print(req)
        user = req.POST.get('user')
        return self.render_to_response(user, error, token, status.HTTP_200_OK)


class SessionView(SessionResponseMixin, views.APIView):
    '''
        Session view for the user to maintain the app session.
    '''
    permission_classes = (permissions.AllowAny,)

    def get(self, req, *args, **kwargs):
        (user, error, token) = (None, None, req.GET.get('token'))
        data = jwt_decode_handler(token)
        if data is not None or data != '':
            user = User.objects.filter(
                Q(username__iexact=data.get('username'))
            ).distinct().first() or None
            if user is not None or user.is_active:
                return self.render_to_response(user, error, token, status.HTTP_200_OK)
            else:
                error = 'User has no access privilages.'
                return self.render_to_response(user, error, token, status.HTTP_403_FORBIDDEN)
        else:
            error = 'User is not authenticated.'
            return self.render_to_response(user, error, token, status.HTTP_401_UNAUTHORIZED)

    def post(self, req, *args, **kwargs):
        (username, password) = (req.data.get('username'), req.data.get('password'))
        (user, error, token) = (None, None, None)
        # user = authenticate(username=username, password=password)
        user = User.objects.filter(
            Q(username__iexact=username) |
            Q(email__iexact=username)
        ).distinct().first() or None
        if user is not None or user.is_active:
            if user.check_password(password):
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                expiry = timezone.now() + jwt_expiration_delta
                print(expiry)
                return self.render_to_response(user, error, token, status.HTTP_200_OK)
            error = 'Invalid username or password!'
            return self.render_to_response(user, error, token, status.HTTP_403_FORBIDDEN)
        error = 'User has no access privilages.'
        return self.render_to_response(user, error, token, status.HTTP_403_FORBIDDEN)

    def delete(self, req, *args, **kwargs):
        (user, error, token) = (None, None, None)
        logout(req)
        return self.render_to_response(user, error, token, status.HTTP_204_NO_CONTENT)
