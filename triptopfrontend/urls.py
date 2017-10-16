# helloworld/urls.py
from django.conf.urls import url
from django.conf.urls.static import static
from triptopfrontend import views

urlpatterns = [

    url(r'^$', views.HomePageView.as_view()),
    url('itinerary', views.ItineraryBuilderPageView.as_view()),
    url('login', views.LoginPageView.as_view()),
]


