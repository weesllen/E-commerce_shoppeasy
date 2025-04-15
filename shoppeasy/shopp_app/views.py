from django.shortcuts import render
from rest_framework import generics
from shopp_app.models import Product,Cart,CartItem
from shopp_app.serializers import ProductSerializers,CartItemSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from shopp_app.serializers import DetailedProductSerializers


@api_view(['GET'])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializers(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request,slug):
    products = Product.objects.get(slug=slug)
    serializer = DetailedProductSerializers(products)
    return Response(serializer.data)


@api_view(['POST'])
def add_item(request):
    try:
        cart_code = request.data.get('cart_code')
        product_id = request.data.get('product_id')

        cart, created = Cart.objects.get_or_create(cart_code = cart_code)
        product_id = Product.objects.get(id = product_id)

        cartItem, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cartItem.quantity = 1
        cartItem.save

        serializer = CartItemSerializer(cartItem)
        return Response({'datat': serializer.data,'message': 'cartItem created sucessfully'}, status= 201)
    except Exception as e:
        return Response({'error': str(e)},status=400)



# class Product(generics.ListAPIView):
#     produto = Products.objects.all()
#     serializer_class = ProductSerializers
