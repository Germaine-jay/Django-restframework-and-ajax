from tabnanny import verbose
from rest_framework import serializers
from .models import City


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'
