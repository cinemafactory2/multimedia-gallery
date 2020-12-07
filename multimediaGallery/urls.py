from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views
from django.conf import settings
from django.urls import path, include, re_path
from django.views.generic.base import TemplateView

admin.autodiscover()


# To add a new path, first import the app:
# import blog
#
# Then add the new path:
# path('blog/', blog.urls, name="blog")
#
# Learn more here: https://docs.djangoproject.com/en/2.1/topics/http/urls/

urlpatterns = [

    path("admin/", admin.site.urls),
    path('', include('gallery.urls', namespace="multimedia")),
    re_path(r'^$', TemplateView.as_view(
        template_name="index.html"), name="home")
]
