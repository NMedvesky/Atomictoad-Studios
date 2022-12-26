from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home-homepage'),
	path('projects/', views.projects, name='home-projectspage'),
	path('coding/', views.coding, name='home-codingpage'),
	path('python/', views.pythonide, name='home-pythonpage'),
	path('projects/kingdom/', views.kingdom, name='home-kingdompage'),
	path('projects/blenderrender/', views.blenderrender, name='home-blenderrenderpage'),
	path('about/', views.about, name='home-aboutpage'),
]
