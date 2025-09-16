from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.db import connection
import json


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


@csrf_exempt
@api_view(["POST"])
def raw_sql_insert(request):
    try:
        data = request.data  # Handles JSON automatically with @api_view
        name = data.get("name")
        email = data.get("email")
        roleNumber = data.get("roleNumber")

        if not (name and email and roleNumber):
            return JsonResponse(
                {"status": "error", "message": "Missing fields"}, status=400
            )

        with connection.cursor() as cursor:
            cursor.execute(
                'INSERT INTO api_student("name", email, "roleNumber") VALUES (%s, %s, %s)',
                [name, email, roleNumber],
            )

        return JsonResponse(
            {"status": "success", "message": "Student added successfully"}
        )
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
