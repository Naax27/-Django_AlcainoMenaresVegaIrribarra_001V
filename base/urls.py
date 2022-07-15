from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('galeria/', views.galeria, name='galeria'),
    path('search/', views.buscar, name='search'),
    path('nosotros/', views.nosotros, name='nosotros'),
    path('registro/', views.registro, name='registro'),
    path('cotiza/', views.cotiza, name='cotiza'),
    path('crear-producto/', views.crearProducto, name='crear-producto'),
    path('mod-producto/<str:pk>/', views.modificarProducto, name='mod-producto'),
    path('del-producto/<str:pk>/', views.borrarProducto, name='del-producto'),
    path('categoria/<str:pk>/', views.filtrarCategoria, name='categoria'),
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutUser, name='logout'),
    
    # path('cuentas/', include('django.contrib.auth.urls')),
    # path('login/', views.loginPage)
]