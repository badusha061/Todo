from rest_framework import generics , status 
from rest_framework.viewsets import ModelViewSet 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializer import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import *


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CustomerTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomerTokenObtainPairSerialzer
