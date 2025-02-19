# backend/backend/urls.py
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [

    path("admin/", admin.site.urls),
    # الخاص بانشاء مستخدم جديد
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    # الخاص بتسجيل الدخول
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # الخاصة بتحديث ال token
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),

    path("api-auth/", include("rest_framework.urls")),

    path("api/", include("api.urls")),
]