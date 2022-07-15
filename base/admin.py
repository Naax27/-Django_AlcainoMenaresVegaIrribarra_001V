from django.contrib import admin
from .models import Producto, Categoria, User


@admin.register(User)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'rut', 'fono')

admin.site.register(Producto)
admin.site.register(Categoria)