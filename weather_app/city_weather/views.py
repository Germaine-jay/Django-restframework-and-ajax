from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import TaskSerializer


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'create':'/task-create/<str:pk>/',
        'Delete':'/task-delete/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET']) 
def tasklist(request):
    tasks = City.objects.all().order_by('-id')
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)


@api_view(['POST']) 
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE']) 
def taskDelete(request, pk):
    task = City.objects.get(id=pk)
    task.delete()

    return Response('success')