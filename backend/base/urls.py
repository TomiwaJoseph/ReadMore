from django.urls import path, re_path
from base.views import index, get_single_book
# from django.views.generic import TemplateView

urlpatterns = [
    # path('', TemplateView.as_view('index.html')),
    path('', index),
    path('shop', index),
    path('shop/<slug:book_name>/<slug:book_isbn>', get_single_book),
    path('cart', index),
    path('shop/checkout', index),
    path('contact-us', index),
    path('sign-up', index),
    path('login', index),
    path('shop/search', index),
    path('user/dashboard', index),
    re_path(r'^.*/$', index),
]
