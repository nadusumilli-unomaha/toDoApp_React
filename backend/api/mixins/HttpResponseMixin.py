from rest_framework.response import Response


class HttpResponseMixin(object):
    def render_to_response(self, data, status):
        return Response(data, status)
