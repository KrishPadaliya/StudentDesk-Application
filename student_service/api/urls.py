from django.urls import path, include
from .views import StudentViewSet, raw_sql_insert
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"students", StudentViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/students_add/", raw_sql_insert),
]
