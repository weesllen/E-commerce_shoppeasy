from rest_framework import serializers
from shopp_app.models import Product,Cart,CartItem

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','name','slug','image','description','category','price']


class DetailedProductSerializers(serializers.ModelSerializer):
    
    similar_products = serializers.SerializerMethodField() 
    class Meta:
        model = Product
        fields = ['id','name','slug','image','description','similar_products']


    def get_similar_products(self,product):
       products = Product.objects.filter(category = product.category).exclude(id=product.id)  
       serializer = ProductSerializers(products, many= True)
       return serializer.data
    
    
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id','cart_code','created_at','modified_at']


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializers(read_only = True)
    cart = CartSerializer(read_only = True)
    class Meta:
        model = CartItem
        fields = ['id','quantity','product','cart']            
