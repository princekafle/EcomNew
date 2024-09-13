from django.urls import path
from Myapp import views
from .views import login, signup

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
]