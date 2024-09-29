# serializers.py

from rest_framework import serializers
from .models import OrderItem, Product
from .models import Order
from decimal import Decimal

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'category', 'new_price', 'old_price']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product_name', 'quantity', 'size', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['user', 'name', 'email', 'phone', 'address', 'city', 'state', 'zip_code', 'payment_method', 'total_cost', 'payment_status', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order