from rest_framework import authentication, permissions
# # from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import ProductoSerializer, CategoriaSerializer
from rest_framework import status
from base.models import Producto, Categoria


# estas vistas por clases incluyen automaticamente las operaciones CRUD, pero solo aparecen create (POST) y update (PUT) en la API
# porque eran las rutas que queriamos proteger, que solo se pudieran usar siendo administradores

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    
    def create(self, request):
        if not request.user.is_staff:
            return Response({"message": "No tiene permisos para la operacion."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = ProductoSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    

    def update (self, request, pk=None):
        if not request.user.is_staff:
            return Response({"message": "No tiene permisos para la operacion."}, status=status.HTTP_403_FORBIDDEN)
        
        producto = Producto.objects.get(pk=pk)
        
        serializer = ProductoSerializer(data=request.data, instance=producto)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
    def create(self, request):
        if not request.user.is_staff:
            return Response({"message": "No tiene permisos para la operacion."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = CategoriaSerializer()(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    def update(self, request, pk=None):
        if not request.user.is_staff:
            return Response({"message": "No tiene permisos para la operacion."}, status=status.HTTP_403_FORBIDDEN)
        
        categoria = Categoria.objects.get(pk=pk)
        
        serializer = CategoriaSerializer(data=request.data, instance=categoria)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)