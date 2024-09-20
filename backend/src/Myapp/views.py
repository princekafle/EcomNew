from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.decorators import api_view
from .models import Order 
from django.utils import timezone

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()  # Order by creation timestamp
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer



@csrf_exempt
def signup(request):
    # note: frontend bata request ma JSON format ma data backend ma pathako xa 
    if request.method =='POST':
        try:
            data = JSONParser().parse(request)
            # frontend bata ako json format ko data lai python dictionary ma convert gareko 
            user = User.objects.create_user(username=data['username'], password=data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return JsonResponse({'token': str(token)}, status=200)
        except IntegrityError:
            return JsonResponse({'error': 'Username is already taken by another'}, status=400)
        
@csrf_exempt

def login(request):
    if request.method =="POST":
        data = JSONParser().parse(request)
        # This parses the incoming JSON data from the request body and converts it into a Python dictionary (data).
        user = authenticate(request, username = data['username'], password = data['password'])
        # yesle chai request ma ako username ra password lai django database ma vako username ra password sgnaa check hanxa if correct xa vane matra it returns user haina vane it returns none
        if user is None:
            return JsonResponse({'error':'username and password didnot match'}, status=400)
        # edi user authenticated ho vane talako code will run
        else:
            try:
              token= Token.objects.get(user=user)
            #   authenticated user ko token xa vane Django’s Token model or simply database bata linxa if token xa vane json format ma dekhauxa if xaina vane except block ma janxa
            except:
                token=  Token.objects.create(user=user)
                # else authenticated user ko token create garxa ra last ma json form ma display garxa tala ko line le
            return JsonResponse({
                'token': str(token),         # Token as string
                'username': user.username,   # Username from authenticated user
                'password': data['password'] # Return the same password (be careful with sensitive data)
            }, status=200)


@api_view(['POST'])
def checkout(request):
    if request.method == "POST":
        data = JSONParser().parse(request)

        # Assuming 'user' is passed in the request data, or you can get it from the request
        user = request.user
        
        # Create a new Order instance with all details
        order = Order.objects.create(
            user=user,
            total_amount=data['total_cost'],  # Total cost from the request
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            address=data['address'],
            city=data['city'],
            state=data['state'],
            zip_code=data['zip_code'],
            payment_method=data['payment_method'],
            created_at=timezone.now(),
            product_name= data['product_name'],
            quantity =data['quantity'],
            size = data['size'],
            price = data['price'],
            # Add any other necessary fields for the Order model
        )
        
        return JsonResponse({'message': 'Order placed successfully!', 'order_id': order.id}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=400)






@api_view(['POST'])
def checkout(request):
    if request.method == 'POST':
        try:
            data = request.data
            
            # Create an order for each product in the products list
            for item in data['products']:
                order = Order.objects.create(
                    user=data['user'],
                    total_cost=data['total_cost'],  # You may want to adjust this for individual items
                    name=data['name'],
                    email=data['email'],
                    phone=data['phone'],
                    address=data['address'],
                    city=data['city'],
                    state=data['state'],
                    zip_code=data['zip_code'],
                    payment_method=data['payment_method'],
                    created_at=timezone.now(),
                    product_name=item['product_name'],  # Product-specific details
                    quantity=item['quantity'],
                    size=item['size'],
                    price=item['price']
                )
            
            return Response({'message': 'Order placed successfully!', 'order_id': order.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)