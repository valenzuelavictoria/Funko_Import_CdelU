# funko_import/urls.py
from django.urls import path, include
from rest_framework import routers
from . import views
from .views import process_payment

router = routers.DefaultRouter()

router.register(r'Usuario', views.UsuarioView, 'Usuario')
router.register(r'Coleccion', views.ColeccionView, 'Coleccion')
router.register(r'Carrito', views.CarritoView, 'Carrito')
router.register(r'Descuento', views.DescuentoView, 'Descuento')
router.register(r'Producto', views.ProductoView, 'Producto')
router.register(r'Promocion', views.PromocionView, 'Promocion')
router.register(r'resenaComentario', views.resenaComentarioView, 'resenaComentario')
router.register(r'pregunta', views.preguntaView, 'Pregunta')

urlpatterns = [
    path('', include(router.urls)),  # Rutas del router bajo el prefijo 'api/auth/'
    path('auth/google-login/', views.google_login, name='google_login'),  # Ahora está bajo 'api/auth/google-login/'
    path("process_payment/", process_payment, name="process_payment"),
    path('auth/completar-perfil/', views.completar_perfil, name='completar_perfil'),
]