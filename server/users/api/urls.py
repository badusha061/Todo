from django.urls import path
from .views import * 


urlpatterns = [    
    path('list', UserList.as_view(),name='user-listing'),
    path('create', UserList.as_view(),name='create-user'),
    path('delete/<int:pk>/', UserDelete.as_view(),name='delete-user'),
    path('edit/<int:pk>/', UserList.as_view(),name='edit-user'),
]