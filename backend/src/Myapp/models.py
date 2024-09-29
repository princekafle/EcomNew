from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone



class Category(models.Model):
 category_name = models.CharField(max_length=200, null=True, unique=True)
 def __str__(self):
     return self.category_name

class Product(models.Model):
    name = models.CharField(max_length=255, default='Default Product Name')  # Provide a default value here
    category = models.CharField(max_length=50)
    image = models.ImageField(upload_to='products/')  # Ensure you have media settings configured
    new_price = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Order(models.Model):
    PAYMENT_CHOICES = [
        ('Cash', 'Cash on Delivery'),
        ('Esewa', 'eSewa'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    payment_method = models.CharField(choices=PAYMENT_CHOICES, max_length=10)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    size = models.CharField(max_length=20, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"