from rest_framework.serializers import ModelSerializer
from Todo.models import Todo



class TodoSerializerList(ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id','user','content','completed']
    read_only_fields = ["id"]


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id','user','content']
    read_only_fields = ["id"]