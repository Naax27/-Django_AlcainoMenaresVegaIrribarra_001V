from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.template import loader
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from .forms import ProductoForm
from .models import Producto, Categoria, User


def loginPage(request):
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request, 'Usuario incorrecto.')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Usuario o contraseña invalidos.')
    
    return render(request, 'login.html')

def logoutUser(request):
    logout(request)
    return redirect('home')


def index(request):
    return render(request, 'index.html')
    

def registro(request):
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST.get('user')
        password = request.POST.get('psw0')

        nombre = request.POST.get('nom')

        rut = request.POST.get('rut')
        email = request.POST.get('email')
        fono = request.POST.get('fon')
        direccion = request.POST.get('route')
        numero = request.POST.get('street_number')
        region = request.POST.get('state')
        comuna = request.POST.get('locality')
        
        try:
            user = User.objects.create_user(username=username,
                                            password=password,
                                            nombre=nombre,
                                            rut = rut,
                                            email=email,
                                            fono = fono,
                                            direccion = direccion,
                                            numero = numero,
                                            region = region,
                                            comuna = comuna
                                            )
            user.username = user.username.lower()
            user.password = make_password(password)
            user.save()
        except:
            messages.error(request, 'Problema en el registro.')
            return redirect('registro')
            
        
    # if request.method == 'POST':
    #     form = RegistroForm(request.POST)
        
    #     if form.is_valid():
    #         user = form.save(commit=False)
    #         user.username = user.username.lower()
    #         user.save()
    #         return redirect('home')
            
    # form = RegistroForm()
    # context = {'form': form}
    
    return render(request, 'registro_old.html')

def existeUsuario(request):
    pass

def cotiza(request):
    return render(request, 'cotizacion.html')


def galeria(request):
    return render(request, 'galeria.html')


def nosotros(request):
    return render(request, 'nosotros.html')


def filtrarCategoria(request, pk):
    if pk == 'all':
        productos = Producto.objects.all()
    else:
        productos = Producto.objects.filter(categoria = pk)
        
    categorias = Categoria.objects.all()
    
    context = {'productos': productos,
               'categorias': categorias}

    return render(request, 'tienda.html', context)

@login_required(login_url='login')
def crearProducto(request):
    if not request.user.is_staff:
        return redirect('home')

    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('/categoria/all')
         
    form = ProductoForm()
    context = {'form': form}
    return render(request, 'producto_form.html', context)


@login_required(login_url='login')
def modificarProducto(request, pk):
    if not request.user.is_staff:
        return redirect('home')
    
    producto = Producto.objects.get(id = pk)
    form = ProductoForm(instance = producto)
    
    if request.method == 'POST':
        # form = ProductoForm(request.POST, instance = producto, request.FILES)
        form = ProductoForm(request.POST, request.FILES, instance = producto)
        
        if form.is_valid():
            form.save()
            return redirect('/categoria/all')
    
    context = {'form': form, 'edit': True}
    return render(request, 'producto_form.html', context)


@login_required(login_url='login')
def borrarProducto(request, pk):
    if not request.user.is_staff:
        return redirect('home')
    
    producto = Producto.objects.get(id = pk)
    producto.delete()
    return redirect('/categoria/all')

def buscar(request):
    q = request.GET.get('q')
    productos = Producto.objects.filter(nombre__icontains = q)
    categorias = Categoria.objects.all()
    
    context = {'productos': productos,
               'categorias': categorias}

    return render(request, 'tienda.html', context)


