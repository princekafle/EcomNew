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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default='john')
    email = models.EmailField(default='kaflezee1@gmail.com')
    phone = models.CharField(max_length=15, default='981111111')
    address = models.TextField()
    city = models.CharField(max_length=100,default='Default City')
    state = models.CharField(max_length=100, default='bagmati')
    zip_code = models.CharField(max_length=10, default='zippcode')
    payment_method = models.CharField(max_length=50,)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, default=200.02)
    created_at = models.DateTimeField(auto_now=True)
    product_name = models.CharField(max_length=255, default='Achar')
    quantity = models.PositiveIntegerField(default=1)
    size = models.CharField(max_length=10, default='XL')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=20.00)
    def __str__(self):
        return self.name


    
