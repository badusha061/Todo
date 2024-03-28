from rest_framework.serializers import ModelSerializer
from Todo.models import Todo



class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id','user','content']
    read_only_fields = ["id"]