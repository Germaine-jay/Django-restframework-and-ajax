from django.urls import path, include 
from . import views



# from rest_framework import routers

# router = routers.SimpleRouter()
# router.register('todolists', tasklist)

urlpatterns = [
    # path('', include(router.urls)),
    path('', views.apiOverview, name='api-overview'),
    path('task-list', views.tasklist, name='task-list'),
    path('task-create', views.taskCreate, name='task-create'),
    # path('task-detail/<str:pk>/', views.taskDetail, name='task-detail'),
    path('task-update/<int:pk>/', views.taskUpdate, name='task-update'),
    path('task-delete/<int:pk>/', views.taskDelete, name='task-delete'),
    path('completetask/<int:pk>/', views.completetask, name='completetask'),
]