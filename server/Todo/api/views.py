from django.shortcuts import render
from rest_framework import generics , status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAdminUser , IsAuthenticated , AllowAny
from django.contrib.auth.models import User
from Todo.models import Todo
from .serializer import *
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination


class ListTodo(APIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs['pk']
        paginator = PageNumberPagination()
        data = Todo.objects.filter(user=user_id)
        paginated_data = paginator.paginate_queryset(data, request)
        serializer = TodoSerializerList(paginated_data, many=True)
        return paginator.get_paginated_response(serializer.data)


class TodoCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    


class TodoUser(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()



class MarkCompleted(APIView):
    def post(self , request ,*args, **kwargs):
        id = kwargs['pk']
        todo = Todo.objects.get(id = id)
        todo.completed = True
        todo.save()
        return Response(status=status.HTTP_200_OK)