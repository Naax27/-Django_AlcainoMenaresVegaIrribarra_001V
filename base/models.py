from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not username:
            raise ValueError('Los usuarios deben tener un nombre de usuario.')
        if not email:
            raise ValueError('Los usuarios deben tener un correo.')
        
        user = self.model(
            email = self.normalize_email(email),
            username = username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, null=False)
    rut = models.CharField(max_length=11, null=False)
    nombre = models.CharField(max_length=70)
    email = models.EmailField(unique=True, null=True)
    fono = models.CharField(max_length=9, null=True)
    direccion = models.CharField(max_length=200, null=True)
    numero = models.CharField(max_length=50, null=True, default="s/n")
    region = models.CharField(max_length=100, null=False)
    comuna = models.CharField(max_length=100, null=False)
    
    REQUIRED_FIELDS = ['email']


class Categoria(models.Model):
    nombre = models.CharField(max_length=200)
    
    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length = 150)
    descripcion = models.TextField(null = True, blank = True)
    imagen = models.ImageField( upload_to = 'productos/', null = True, default = 'img/productos/prod1.jpg')
    precio = models.IntegerField()
    stock = models.IntegerField()
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True)
    
    class Meta:
        ordering = ['-id']
    
    def __str__(self):
        return self.nombre