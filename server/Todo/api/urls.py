from django.urls import path
from .views import * 


urlpatterns = [    
    path('todolist/<int:pk>/',ListTodo.as_view(), name='list-user'),
    path('todocreate', TodoCreate.as_view(),name='create-user'),
    path('tododelete/<int:pk>/', TodoUser.as_view(),name='delete-user'),
    path('todoedit/<int:pk>/', TodoUser.as_view(),name='edit-user'),
    path('todomark/<int:pk>/', MarkCompleted.as_view(),name='completed-user'),
]