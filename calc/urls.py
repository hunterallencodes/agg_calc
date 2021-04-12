from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name="calc-home"),
    path('about/', views.about, name="calc-about"),
    path('instructions/', views.instructions, name="calc-instructions"),
]
