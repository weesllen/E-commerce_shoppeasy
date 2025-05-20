from rest_framework import serializers
from shopp_app.models import Product,Cart,CartItem
from django.contrib.auth import get_user_model

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


class newCartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializers(read_only=True)
    order_id = serializers.SerializerMethodField()
    order_date = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields = ['id','product','quantity','order_id','order_date']

    def get_order_id(self,cart_item):
        order_id = cart_item.cart.cart_code
        return order_id
    
    def get_order_date(self,cart_item):
        order_date = cart_item.modified_at
        return order_date


class UserSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        fields = ['id','username','first_name','last_name','email','city', 'state', 'address', 'phone','items']    

    def get_items(self,user):
        cart_items = CartItem.objects.filter(cart__user=user,cart__paid=True)[:10]
        serializer = newCartItemSerializer(cart_items,many=True)
        return serializer.data 


class UserRegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['username','email','first_name','last_name','password1',
                       'password2','city','state','address','phone']    
        
    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("As senhas não coincidem.")
        if len(data['password1']) < 8:
            raise serializers.ValidationError("A senha deve ter pelo menos 8 caracteres.")
        return data
        
    def create(self, validated_data):
        password = validated_data.pop('password1')
        validated_data.pop('password2')
        user = self.Meta.model(**validated_data)
        user.set_password(password)
        user.save()
        return user