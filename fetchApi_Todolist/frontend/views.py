from django.shortcuts import render

def list(request):
    return render(request, 'frontend/todo.html')