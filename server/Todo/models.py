from django.db import models
from django.contrib.auth.models import User

# Create your models here.



class Todo(models.Model):
    user  = models.ForeignKey(User,on_delete=models.CASCADE)
    content = models.CharField(max_length=250)
    completed = models.BooleanField(default = False)


    def __str__(self) -> str:
        return  self.user.username