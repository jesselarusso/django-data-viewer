from django.conf.urls import url
from data_viewer_app import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
]
