from django.urls import path
from shopp_app import views


urlpatterns = [
    path('products/',views.products, name='products'),
    path('product_detail/<slug:slug>',views.product_detail, name='product_detail'),
    path('add_item/',views.add_item, name='add_item'),
    path('products_in_cart/',views.products_in_cart, name='products_in_cart'),
    path('get_cart_stat/',views.get_cart_stat, name='get_cart_stat'),
    path('get_cart/',views.get_cart,name='get_cart'),
    path('update_quantity/',views.update_quantity, name='update_quantity'),
    path('delete_cart_item/',views.delete_cart_item, name='delete_cart_item'),
    path('UserRegister/',views.UserRegister,name='UserRegister'),
    path('get_username', views.get_username,name='get_username'),
    path('user_info/',views.user_info,name='user_info'),
    path('initiate_paypal_payment/',views.initiate_paypal_payment,name='initiate_paypal_payment'),
    path('paypal_payment_callback/',views.paypal_payment_callback,name='paypal_payment_callback'),

]

#fetching all products: http://127.0.0.1:8001/products