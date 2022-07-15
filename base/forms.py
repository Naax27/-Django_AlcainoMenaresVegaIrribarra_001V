from django.forms import ModelForm, TextInput, Textarea, Select
from .models import Producto, User

class ProductoForm(ModelForm):
    class Meta:
        model = Producto
        fields = '__all__'

        widgets = {
            'nombre': TextInput(attrs={'class': 'form-control'}),
            'descripcion': Textarea(attrs={'class': 'form-control'}),
            'precio': TextInput(attrs={'class': 'form-control'}),
            'stock': TextInput(attrs={'class': 'form-control'}),
            'categoria': Select(attrs={'class': 'form-control'}),
        }

# class RegistroForm(ModelForm):
#     class Meta:
#         model = User
#         fields = ['username', 'password', 'nombre', 'rut',
#                   'email', 'fono', 'direccion', 'numero',
#                   'region', 'comuna']
#         widgets = {
#             'username': TextInput(attrs={'class': 'form-control'}),
#             'password': TextInput(attrs={'class': 'form-control'}),
#             'nombre': TextInput(attrs={'class': 'form-control'}),
#             'rut': TextInput(attrs={'class': 'form-control'}),
#             'email': TextInput(attrs={'class': 'form-control'}),
#             'fono': TextInput(attrs={'class': 'form-control'}),
#             'direccion': TextInput(attrs={'class': 'form-control'}),
#             'numero': TextInput(attrs={'class': 'form-control'}),
#             'region': TextInput(attrs={'class': 'form-control'}),
#             'comuna': TextInput(attrs={'class': 'form-control'}),
#         }