from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^response/', include('data_viewer_app.urls')),
    url(r'^admin/', include(admin.site.urls)),
]
