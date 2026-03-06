from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


# Home test page
def home(request):
    return HttpResponse("API Systeme Reparti fonctionne 🚀")


urlpatterns = [
    path("", home, name="home"),
    # Admin
    path("admin/", admin.site.urls),
    # API routes
    path("api/", include("api.urls")),
    # Auth JWT
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
