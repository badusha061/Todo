from .serializer import UserSerializer
from django.shortcuts import render
from rest_framework import generics , status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAdminUser , IsAuthenticated , AllowAny
from django.contrib.auth.models import User



class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserDelete(generics.DestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()