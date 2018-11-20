from rest_framework.responses import Response


class HttpResponseMixin():
    def render_to_reponse(self, data, status):
        return Response(data, status)
