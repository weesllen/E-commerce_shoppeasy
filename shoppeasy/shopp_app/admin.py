from django.contrib import admin
from shopp_app.models import Product,Cart,CartItem


admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CartItem)