from django.shortcuts import render
from shopp_app.models import Product,Cart,CartItem,Transaction
from shopp_app.serializers import ProductSerializers,CartItemSerializer,SimpleCartSerializer,CartSerializer,UserSerializer,UserRegisterSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from shopp_app.serializers import DetailedProductSerializers
from django.contrib.auth import get_user_model
from rest_framework import status
from django.conf import settings
from rest_framework.permissions import IsAuthenticated,AllowAny
from decimal import Decimal
import uuid
import paypalrestsdk



BASE_URL = 'https://localhost:5143'

paypalrestsdk.configure({
    'mode': settings.PAYPAL_MODE,
    'client_id': settings.PAYPAL_CLIENT_ID,
    'client_secret': settings.PAYPAL_CLIENT_SECRET  # ← CORRETO AQUI
})

@api_view(['GET'])
@permission_classes([AllowAny])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializers(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request,slug):
    products = Product.objects.get(slug=slug)
    serializer = DetailedProductSerializers(products)
    return Response(serializer.data)


# User = get_user_model()

@api_view(['POST'])
def add_item(request):
    cart_code = request.data.get('cart_code')
    product_id = request.data.get('product_id')

    try:
        cart = Cart.objects.get(cart_code=cart_code)
        product = Product.objects.get(id=product_id)
    except Cart.DoesNotExist:
       # anonymous_user, _ = User.objects.get_or_create(username='anonymous_user')
        cart = Cart.objects.create(cart_code=cart_code)

    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response({'datat': serializer.data,'message': 'cartItem created successfully'}, status= 201)


@api_view(['GET'])
def products_in_cart(request):
    cart_code = request.query_params.get('cart_code')
    product_id = request.query_params.get('product_id')


    cart = Cart.objects.get(cart_code = cart_code)
    product = Product.objects.get(id = product_id)

    products_exist_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()

    return Response ({'products_in_cart': products_exist_in_cart})

@api_view(['GET'])
@permission_classes([AllowAny])
def get_cart_stat(request):
    cart_code = request.query_params.get('cart_code')
    cart = Cart.objects.get(cart_code=cart_code, paid = False)
    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_cart(request):
    cart_code = request.query_params.get('cart_code')
    cart = Cart.objects.get(cart_code=cart_code, paid = False)
    serializer = CartSerializer(cart)
    return Response(serializer.data)    


@api_view(['PATCH']) 
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
    

@api_view(['POST'])
def delete_cart_item(request):
    cart_item_id = request.data.get('item_id')
    cart_item = CartItem.objects.get(id = cart_item_id)
    cart_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_username(request):
    user = request.user
    return Response({'username': user.username})


@api_view(['GET','PATCH'])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user    
    
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = UserSerializer(user, data = request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return({'data':serializer.data,'message':'Informações atualizadas com sucesso!'})
        else:
            return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def UserRegister(request):
    serializer = UserRegisterSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()    
        return Response({'data':serializer.data, 'message': 'Usuario criado com sucesso'})
    return Response({'errors': serializer.errors}, status=400)


@api_view(['POST'])
def initiate_paypal_payment(request):
    if request.method == 'POST' and request.user.is_authenticated:

            tx_ref = str(uuid.uuid4())
            user = request.user
            cart_code = request.data.get('cart_code')
            cart = Cart.objects.get(cart_code=cart_code)
            amount = sum([item.quantity * item.product.price for item in cart.items.all()])
            tax = Decimal('4.00')
            total_amount = amount + tax
            total_amount_str = format(total_amount,'.2f')


            payment = paypalrestsdk.Payment({
                'intent': 'sale',
                'payer': {
                    'payment_method': 'paypal'
                },
                'redirect_urls': {
                    'return_url': f'{BASE_URL}/payment-status?paymentStatus=success&ref={tx_ref}',
                    'cancel_url': f'{BASE_URL}/payment-status?paymentStatus=cancel'
                }, 
                'transactions':[{
                      'item_list': {
                          'items': [{
                              'name': 'Cart Items',
                              'sku': 'cart',
                              'price': total_amount_str,
                              'currency': 'BRL',
                                'quantity': 1
                          }]
                      },
                      'amount': {
                          'total': total_amount_str,
                          'currency': 'BRL'
                      },
                      'description': 'Payment for cart items'  
                }]
            })    
            print('pay_id',payment)

            transaction, created = Transaction.objects.get_or_create(
                ref=tx_ref,
                cart=cart,
                amount=total_amount_str,
                user=user,
                status='pending'
            )

            if payment.create(): 
                for link in payment.links:
                    if link.rel == 'approval_url':
                        approval_url = str(link.href)
                        return Response({'approval_url': approval_url})
            else:
                return Response ({'error': payment.error}, status=400)


@api_view(['POST'])
def paypal_payment_callback(request):
    payment_id = request.query_params.get('payments')
    payer_id = request.query_params.get('PayedID')
    ref = request.quey_params.get('ref')

    user = request.user

    print('refff',ref)

    transaction = Transaction.objects.get(ref=ref)

    if payment_id and payer_id:
        payment = paypalrestsdk.Payment.find(payment_id)

        transaction.status = 'completed'
        transaction.save()
        cart = transaction
        cart.paid = True
        cart.user = user
        cart.save()

        return Response ({'message': 'Pagamento Aprovado', 'subMessage':'O pagamento das suas compras foram realizado com sucesso'})    


    else: Response({'error': 'Erro na  realização do pagamento'}, status=200)