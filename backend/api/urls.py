from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from django.views.decorators.csrf import csrf_exempt
from rest_framework_jwt.views import obtain_jwt_token

from api.views import (
    indexView,
    TaskViewSet,
    RegisterView,
    SessionView
)

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api/session', csrf_exempt(SessionView.as_view())),
    url(r'^api/register', csrf_exempt(RegisterView.as_view())),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^', indexView, name='index'),
]
