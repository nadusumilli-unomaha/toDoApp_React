"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import (
    path,
    re_path,
    include
)
from rest_framework import urls as rest_framework_urls

# App specific imports.
from api import urls as api_urls
from todo.views import (
    indexView
)

'''
    Url patterns for the app.

    -admin/ view render has admin.site.urls
    -api/ view renders urls from api/urls.py
    -"" or index route renders ./views.py/indexView
'''
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urls)),
    path('api-auth/', include(rest_framework_urls, namespace='rest_framework')),
    re_path('', indexView),
]
