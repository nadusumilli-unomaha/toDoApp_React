from rest_framework.response import Response


class SessionResponseMixin(object):
    def render_to_response(self, user, error, token, status):
        response = dict(id=None, username='', email='', isAuthenticated=False,
                        isAdmin=False, error=error, token=token)
        if user is not None:
            response = dict(id=user.id, username=user.username, email=user.email,
                            isAuthenticated=user.is_authenticated, isAdmin=user.is_superuser, error=error, token=token)
        return Response(response, status)
