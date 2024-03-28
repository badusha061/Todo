from django.shortcuts import render
from rest_framework import generics , status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAdminUser , IsAuthenticated , AllowAny
from django.contrib.auth.models import User
from Todo.models import Todo
from .serializer import TodoSerializer


class TodoCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    


class TodoUser(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

