from django.shortcuts import render
from rest_framework import generics
from shopp_app.models import Product,Cart,CartItem
from shopp_app.serializers import ProductSerializers,CartItemSerializer,SimpleCartSerializer,CartSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from shopp_app.serializers import DetailedProductSerializers
from django.contrib.auth import get_user_model
from rest_framework import status


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


# @api_view(['POST'])
# def add_item(request):
#     try:
#         cart_code = request.data.get('cart_code')
#         product_id = request.data.get('product_id')

#         cart, created = Cart.objects.get_or_create(cart_code = cart_code)
#         product = Product.objects.get(id = product_id)

#         cartitem, created = CartItem.objects.get_or_create(cart=cart, product=product)
#         cartitem.quantity = 1
#         cartitem.save()

#         serializer = CartItemSerializer(cartitem)
#         return Response({'datat': serializer.data,'message': 'cartItem created sucessfully'}, status= 201)
#     except Exception as e:
#         return Response({'error': str(e)},status=400)
User = get_user_model()

@api_view(['POST'])
def add_item(request):
    cart_code = request.data.get('cart_code')
    product_id = request.data.get('product_id')

    try:
        cart = Cart.objects.get(cart_code=cart_code)
    except Cart.DoesNotExist:
        anonymous_user, _ = User.objects.get_or_create(username='anonymous_user')
        cart = Cart.objects.create(cart_code=cart_code, user=anonymous_user)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Produto não encontrado'}, status=404)

    
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response({'datat': serializer.data,'message': 'cartItem created sucessfully'}, status= 201)


@api_view(['GET'])
def products_in_cart(request):
    cart_code = request.query_params.get('cart_code')
    product_id = request.query_params.get('product_id')


    cart = Cart.objects.get(cart_code = cart_code)
    product = Product.objects.get(id = product_id)

    products_exist_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()

    return Response ({'products_in_cart': products_exist_in_cart})

@api_view(['GET'])
def get_cart_stat(request):
    cart_code = request.query_params.get('cart_code')
    cart = Cart.objects.get(cart_code=cart_code, paid = False)
    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)


@api_view(['GET'])
def get_cart(request):
    cart_code = request.query_params.get('cart_code')
    cart = Cart.objects.get(cart_code=cart_code, paid = False)
    serializer = CartSerializer(cart)
    return Response(serializer.data)    


api_view(['PATCH']) 
def update_quantity(request):
    try:
        cart_item_id = request.data.get('item_id')
        quantity = request.data.get('quantity')
        quantity = int(quantity)
        cart_item = CartItem.objects.get(id = cart_item_id)
        cart_item.quantity = quantity
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response({'data':serializer.data, 'message': 'Carrinho atualizado com sucesso'})
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    

api_view(['POST'])
def delete_cart_item(request):
    cart_item_id = request.data.get('item_id')
    cart_item = CartItem.objects.get(id = cart_item_id)
    cart_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
