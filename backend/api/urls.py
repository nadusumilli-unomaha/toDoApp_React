from django.conf.urls import include, url

from api.views import (
    indexView
)

urlpatterns = [
    url(r'^', indexView, name='index')
]
