<<<<<<< HEAD
 # triptop/views.py
from django.shortcuts import render
from django.views.generic import TemplateView



# Create your views here.
class HomePageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)

class ItineraryBuilderPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'itinBuilder.html', context=None)

class LoginPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'login.html', context=None)

class ProfilePageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'myProfile.html', context=None)



=======
 # triptop/views.py
from django.shortcuts import render
from django.views.generic import TemplateView



# Create your views here.
class HomePageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)

class ItineraryBuilderPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'itinBuilder.html', context=None)

class LoginPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'login.html', context=None)

class ProfilePageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'myProfile.html', context=None)



>>>>>>> 7d24be8c984cb632a45a78b98928eb4b36907850
