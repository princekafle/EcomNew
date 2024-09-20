# serializers.py

from rest_framework import serializers
from .models import Product
from .models import Order
from decimal import Decimal

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'category', 'new_price', 'old_price']

