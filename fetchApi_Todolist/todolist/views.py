from urllib import response
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import TaskSerializer



@api_view(['GET'])
def apiOverview(request):
    api_urls = {

        'List':'/task-list',
        'Detail-view':'/task-detail/<str:pk>/',
        'create':'/task-create/<str:pk>/',
        'Update':'/task-update/<str:pk>/',
        'Delete':'/task-delete/<str:pk>/',

    }
    return Response(api_urls)
    # return Response('API BASE POINT', safe=False)

@api_view(['GET']) 
def tasklist(request):
    tasks = Task.objects.all().order_by('-id')
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)


# @api_view(['GET']) 
# def taskDetail(request, pk ):
#     tasks = Task.objects.get(id=pk)
#     serializer = TaskSerializer(tasks, many=False)

#     return Response(serializer.data)


@api_view(['POST']) 
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST']) 
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE']) 
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()

    return Response('success')


@api_view(['POST']) 
def completetask(request, pk):
    item = Task.objects.get(id=pk)
    item.complete = True
    item.save()
    return response('Sucessful')
