from django.urls import include, path 
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'producto', views.ProductoViewSet, basename='producto')
router.register(r'categoria', views.CategoriaViewSet, basename='categoria')

urlpatterns = router.urls