from django.urls import path
from . import views

urlpatterns = [
    path('fetch-wishlist-dresses/', views.get_wishlist_dresses),
    path('delete-wishlist-dress/', views.delete_wishlist_dress),
    path('get-user-orders/', views.get_user_orders),
    path('add-to-wishlist/', views.add_to_wishlist),
    path('add-to-cart/', views.add_to_cart),
    path('get-cart-content/', views.get_cart_content),
    path('remove-cart-item/', views.remove_cart_item),
    path('remove-cart/', views.remove_cart),
    path('get-cart-count/', views.get_cart_count),

    # AUTHENTICATION URLS
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('login-demo-user/', views.login_demo_user, name='demo-login'),
    path('auth/logout/', views.logout),
    path('auth/user/', views.fetch_user, name='fetch_user'),
    path('auth/check-authentication/',
         views.check_authentication, name='authenticate_user'),

    # STRIPE URL
    path('save-stripe-info/', views.save_stripe_info, name='save-stripe-info'),
]
