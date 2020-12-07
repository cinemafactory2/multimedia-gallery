from django.conf.urls import url, include
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


app_name = 'gallery'

urlpatterns = [
    url(r'^signIn/$', views.sign_in, name='signIn'),
    url(r'^add/$', views.add_multimedia, name='addMultimedia'),
    url(r'^signUp/$', views.signUp, name='signUp'),
    url(r'^userDetails/$', views.get_user, name='userDetails'),
    url(r'^userDetails/editUser/$', views.edit_profile, name='editUser'),
    url(r'^change_password/$', views.change_password, name='change_password'),
    url(r'^api/getMulti/$', views.getMulti, name='getMulti'),
    url(r'^getUser/$', views.getUser, name='getUser'),
    url(r'^api/addClip/$', views.clip_create, name='clip_Create'),
    url(r'^api/clips$', views.get_clips),
    url(r'^api/clips/(?P<idMultimedia>\d+)$', views.get_id_clip),
    url(r'^api/login/$', views.login, name='login'),
    url(r'^api/createMultimedia/$', views.create_multimedia, name='create_multimedia'),
    url(r'^api/addUser/$', views.UserCreateAPIView.as_view(), name='create_user'),
    url(r'^api/categories/$', views.get_category, name='get_category'),
]
urlpatterns += staticfiles_urlpatterns()
