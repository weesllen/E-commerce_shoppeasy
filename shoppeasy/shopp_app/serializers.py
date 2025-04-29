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
        fields = ['id','name','price','slug','image','description','similar_products']


    def get_similar_products(self,product):
       products = Product.objects.filter(category = product.category).exclude(id=product.id)  
       serializer = ProductSerializers(products, many= True)
       return serializer.data
    
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializers(read_only = True)
    total = serializers.SerializerMethodField() 
    class Meta:
        model = CartItem
        fields = ['id','quantity','product','total'] 

    def get_total(self,cartItem):
        price = cartItem.product.price * cartItem.quantity
        return price
    

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only= True, many= True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ['id','cart_code','sum_total','num_of_items','created_at','modified_at','items']

    def get_sum_total(self,cart):
         items = cart.items.all()
         total = sum([item.product.price * item.quantity for item in items])
         return total      
    
    def get_num_of_items(self,cart):
         items = cart.items.all()
         total = sum([item.quantity for item in items])
         return total


class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ['id','cart_code','num_of_items']

    def get_num_of_items(self,cart):
        num_of_items = sum([item.quantity for item in cart.items.all()])
        return num_of_items


