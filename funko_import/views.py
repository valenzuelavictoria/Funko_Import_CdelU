from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import Usuario, Coleccion, carrito, Descuento, Producto, Promocion, IngresoStock, PeticionProducto, ResenaComentario, Pregunta, CarritoDescuento, Factura, LineaFactura, FacturaDescuento, ProductoCarrito, CodigoSeguimiento
from django.views.generic import CreateView, TemplateView
from .serializers import UsuarioSerializer, ColeccionSerializer, CarritoSerializer, DescuentoSerializer, ProductoSerializer, PromocionSerializer, IngresoStockSerializer, PeticionProductoSerializer, ResenaComentarioSerializer, PreguntaSerializer, CarritoDescuentoSerializer, FacturaSerializer, LineaFacturaSerializer, FacturaDescuentoSerializer, ProductoCarritoSerializer, CodigoSeguimientoSerializer
from .forms import UsuarioForm, ColeccionForm, DescuentoForm, productoForm, promocionForm, IngresoStockForm, PeticionProductoForm, ResenaComentarioForm, PreguntaForm, RespuestaForm
from django.urls import reverse_lazy
from rest_framework import viewsets
import mercadopago
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.parsers import MultiPartParser, JSONParser


#CRUDS
class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class ColeccionView(viewsets.ModelViewSet): 
    serializer_class = ColeccionSerializer
    queryset = Coleccion.objects.all()

class CarritoView(viewsets.ModelViewSet): 
    serializer_class = CarritoSerializer
    queryset = carrito.objects.all()

class DescuentoView(viewsets.ModelViewSet): 
    serializer_class = DescuentoSerializer
    queryset = Descuento.objects.all()

class ProductoView(viewsets.ModelViewSet): 
    parser_classes = [MultiPartParser, JSONParser]
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

class PromocionView(viewsets.ModelViewSet):
    serializer_class = PromocionSerializer
    queryset = Promocion.objects.all()

class resenaComentarioView(viewsets.ModelViewSet): 
    serializer_class = ResenaComentarioSerializer
    queryset = ResenaComentario.objects.all()

class preguntaView(viewsets.ModelViewSet):
    serializer_class = PreguntaSerializer
    queryset = Pregunta.objects.all()

#GET ALL

def getUsuarios(request):
    usuarios = Usuario.objects.all()
    serializer = UsuarioSerializer(usuarios, many=True)
    return JsonResponse(serializer.data, safe=False)

def getColecciones(request):
    colecciones = Coleccion.objects.all()
    serializer = ColeccionSerializer(colecciones, many=True)
    return JsonResponse(serializer.data, safe=False)

def getCarritos(request):
    carritos = carrito.objects.all()
    serializer = CarritoSerializer(carritos, many=True)
    return JsonResponse(serializer.data, safe=False)

def getDescuentos(request):
    descuentos = Descuento.objects.all()
    serializer = DescuentoSerializer(descuentos, many=True)
    return JsonResponse(serializer.data, safe=False)

def getProductos(request):
    productos = Producto.objects.all()
    serializer = ProductoSerializer(productos, many=True)
    return JsonResponse(serializer.data, safe=False)

def getPromociones(request):
    promociones = Promocion.objects.all()
    serializer = PromocionSerializer(promociones, many=True)
    return JsonResponse(serializer.data, safe=False)

def getResenasComentarios(request):
    resenasComentarios = ResenaComentario.objects.all()
    serializer = ResenaComentarioSerializer(resenasComentarios, many=True)
    return JsonResponse(serializer.data, safe=False)

def getPreguntas(request):
    preguntas = Pregunta.objects.all()
    serializer = PreguntaSerializer(preguntas, many=True)
    return JsonResponse(serializer.data, safe=False)

#REST
def UsuariosRest (request):
    usuario=getUsuarios()
    return JsonResponse(usuario)

def ColeccionesRest (request):
    coleccion=getColecciones()
    return JsonResponse(coleccion)

def CarritosRest (request):
    carrito=getCarritos()
    return JsonResponse(carrito)

def DescuentosRest (request):
    descuento=getDescuentos()
    return JsonResponse(descuento)

def ProductosRest (request):
    producto=getProductos()
    return JsonResponse(producto)

def PromocionesRest (request):
    promocion=getPromociones()
    return JsonResponse(promocion)

def ResenasComentariosRest (request):
    resenaComentario=getResenasComentarios()
    return JsonResponse(resenaComentario)

def PreguntasRest (request):
    pregunta=getPreguntas()
    return JsonResponse(pregunta)

#MercadoPago
# Credenciales de acceso (Access Token)
ACCESS_TOKEN = "token"

@csrf_exempt
def process_payment(request):
    if request.method == "POST":
        try:
            # Inicializar el SDK de Mercado Pago
            sdk = mercadopago.SDK(ACCESS_TOKEN)
            
            # Obtener los datos del cuerpo de la solicitud
            body = json.loads(request.body)

            # Crear el pago
            payment_data = {
                "transaction_amount": float(body["transaction_amount"]),
                "token": body["token"],
                "description": body["description"],
                "installments": int(body["installments"]),
                "payment_method_id": body["payment_method_id"],
                "payer": {
                    "email": body["payer"]["email"]
                }
            }

            # Procesar el pago
            payment_response = sdk.payment().create(payment_data)
            payment = payment_response["response"]

            # Retornar la respuesta del pago al cliente
            return JsonResponse({
                "status": payment.get("status"),
                "status_detail": payment.get("status_detail"),
                "id": payment.get("id"),
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=400)


#Login Google

from django.http import JsonResponse
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

# CLIENT_ID de tu aplicación en Google Cloud

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from .models import Usuario

GOOGLE_CLIENT_ID = "ClientID"

#maneja la autenticación de usuarios en tu aplicación utilizando Google OAuth 2.0
@csrf_exempt
def google_login(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        data = json.loads(request.body)
        token = data.get("token")

        if not token:
            return JsonResponse({"error": "Token no proporcionado"}, status=400)

        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), GOOGLE_CLIENT_ID)

        if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
            return JsonResponse({"error": "Emisor no válido"}, status=403)

        email = idinfo["email"]
        nombre = idinfo.get("given_name", "")
        apellido = idinfo.get("family_name", "")

        usuario, created = Usuario.objects.get_or_create(
            correo=email,
            defaults={
                "nombre": nombre,
                "apellido": apellido,
                "direccion": "",
                "telefono": "",
                "rol": False
            }
        )

        es_admin = email == "funkoimportcdelu@gmail.com"
        if es_admin and not usuario.rol:
            usuario.rol = True
            usuario.save()

        user_data = {
            "email": usuario.correo,
            "nombre": usuario.nombre,
            "apellido": usuario.apellido,
            "rol": usuario.rol,
            "first_time": created,  # Indica si es un nuevo usuario
        }

        return JsonResponse({"message": "Autenticación exitosa", "user": user_data})

    except ValueError:
        return JsonResponse({"error": "Token inválido"}, status=403)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Formato JSON inválido"}, status=400)

#@csrf_exempt  # Para permitir peticiones sin CSRF Token (solo en desarrollo)
#permite que los usuarios completen su información personal en la base de datos después de registrarse con Google
@csrf_exempt
def completar_perfil(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get("correo")
        nombre = data.get("nombre")
        apellido = data.get("apellido")
        direccion = data.get("direccion")
        telefono = data.get("telefono")

        if not all([email, nombre, apellido, direccion, telefono]):
            return JsonResponse({"error": "Faltan datos obligatorios"}, status=400)

        usuario = Usuario.objects.filter(correo=email).first()

        if not usuario:
            return JsonResponse({"error": "Usuario no encontrado"}, status=404)

        usuario.nombre = nombre
        usuario.apellido = apellido
        usuario.direccion = direccion
        usuario.telefono = telefono
        usuario.save()

        return JsonResponse({"message": "Perfil actualizado correctamente", "user": {
            "email": usuario.correo,
            "nombre": usuario.nombre,
            "apellido": usuario.apellido,
            "direccion": usuario.direccion,
            "telefono": usuario.telefono
        }})

    except json.JSONDecodeError:
        return JsonResponse({"error": "Formato JSON inválido"}, status=400)


#permite que los usuarios actualicen su perfil en la base de datos
    
# def update_user(request):
#     if request.method != "POST":
#         return JsonResponse({"error": "Método no permitido"}, status=405)

#     try:
#         data = json.loads(request.body)
#         email = data.get("email")
#         nombre_completo = data.get("nombreCompleto")
#         dni = data.get("dni")
#         direccion = data.get("direccion")

#         if not all([email, nombre_completo, dni, direccion]):
#             return JsonResponse({"error": "Faltan datos obligatorios"}, status=400)

#         usuario = Usuario.objects.filter(correo=email).first()
#         if not usuario:
#             return JsonResponse({"error": "Usuario no encontrado"}, status=404)

#         usuario.nombre = nombre_completo  # Asegúrate de que tu modelo tiene este campo
#         usuario.dni = dni
#         usuario.direccion = direccion
#         usuario.save()

#         return JsonResponse({"message": "Perfil actualizado correctamente", "user": {
#             "email": usuario.correo,
#             "nombre": usuario.nombre,
#             "dni": usuario.dni,
#             "direccion": usuario.direccion
#         }})

#     except json.JSONDecodeError:
#         return JsonResponse({"error": "Formato JSON inválido"}, status=400)
