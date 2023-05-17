from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', include('base.urls')),
    re_path(r'^static/(?P<path>.*)$', serve,
            {'document_root': settings.STATIC_ROOT})
]
