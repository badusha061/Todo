from django.urls import path
from .views import * 


urlpatterns = [    
    path('todocreate', TodoCreate.as_view(),name='create-user'),
    path('tododelete/<int:pk>/', TodoUser.as_view(),name='delete-user'),
    path('todoedit/<int:pk>/', TodoUser.as_view(),name='edit-user'),
]