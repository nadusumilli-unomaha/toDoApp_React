from rest_framework.response import Response
from django.core import serializers


class SessionResponseMixin(object):
    '''
        Class: SessionResponseMixin:
        Arguments:
            - Object: mixin object
        Defenition:
            Creates a valid object that needs to be returned
            as the response for the client request.
        Return params: 
            - Reponse: contains json data and status of the request.
    '''

    def render_to_response(self, user, token, status, error, token_expiry=None):
        response_data = dict(id=None, username='', email='', first_name='', last_name='', profile='', is_authenticated=False,
                             is_admin=False, token=token, error=error, token_expiry=token_expiry)
        if user:
            profile = dict()
            if hasattr(user, 'profile'):
                profile = user.profile.getObject()
            response_data = dict(id=user.id, username=user.username, profile=profile, email=user.email, first_name=user.first_name, last_name=user.last_name, is_authenticated=user.is_authenticated,
                                 is_admin=user.is_superuser, token=token, error=error, token_expiry=token_expiry)
        return Response(response_data, status)
