from django.urls import (
    include,
    path,
)
from rest_framework.routers import DefaultRouter

from api.v1.views import (
    TaskViewSet,
    UserViewSet,
    RegisterView,
    SessionView
)

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('session/', SessionView.as_view(), name='session'),
    path('', include(router.urls)),
]
