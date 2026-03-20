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




BASE_URL = settings.REACT_BASE_URL

paypalrestsdk.configure({
    'mode': settings.PAYPAL_MODE,
    'client_id': settings.PAYPAL_CLIENT_ID,
    'client_secret': settings.PAYPAL_CLIENT_SECRET  # ← CORRETO AQUI
})

@api_view(['GET'])
@permission_classes([AllowAny])
def api_home(request):
    """API Home - Lista de endpoints disponíveis"""
    return Response({
        'message': 'ShoppEasy API está funcionando!',
        'version': '1.0',
        'endpoints': {
            'products': '/products/',
            'product_detail': '/product_detail/<slug>',
            'add_item': '/add_item/',
            'cart': '/get_cart/',
            'cart_stats': '/get_cart_stat/',
            'register': '/UserRegister/',
            'user_info': '/user_info/',
            'token': '/token/',
            'token_refresh': '/token/refresh/',
            'admin': '/admin/',
        }
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
@permission_classes([AllowAny])
def add_item(request):
    cart_code = request.data.get('cart_code')
    product_id = request.data.get('product_id')

    if not cart_code or not product_id:
        return Response({'error': 'cart_code e product_id são obrigatórios.'}, status=400)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Produto não encontrado.'}, status=404)

    cart = Cart.objects.filter(cart_code=cart_code, paid=False).first()
    if cart is None:
        cart_user = request.user if request.user.is_authenticated else None
        cart = Cart.objects.create(cart_code=cart_code, user=cart_user)

    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response({'data': serializer.data, 'message': 'cartItem created successfully'}, status=201)


@api_view(['GET'])
@permission_classes([AllowAny])
def products_in_cart(request):
    cart_code = request.query_params.get('cart_code')
    product_id = request.query_params.get('product_id')

    if not cart_code or not product_id:
        return Response({'products_in_cart': False})

    cart = Cart.objects.filter(cart_code=cart_code, paid=False).first()
    if cart is None:
        return Response({'products_in_cart': False})

    products_exist_in_cart = CartItem.objects.filter(cart=cart, product_id=product_id).exists()

    return Response ({'products_in_cart': products_exist_in_cart})

@api_view(['GET'])
@permission_classes([AllowAny])
def get_cart_stat(request):
    cart_code = request.query_params.get('cart_code')
    if not cart_code:
        return Response({'error': 'cart_code é obrigatório.'}, status=400)

    cart = Cart.objects.filter(cart_code=cart_code, paid=False).first()
    if cart is None:
        return Response({'id': None, 'cart_code': cart_code, 'num_of_items': 0})

    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_cart(request):
    cart_code = request.query_params.get('cart_code')
    if not cart_code:
        return Response({'error': 'cart_code é obrigatório.'}, status=400)

    cart = Cart.objects.filter(cart_code=cart_code, paid=False).first()
    if cart is None:
        return Response({
            'id': None,
            'cart_code': cart_code,
            'sum_total': 0,
            'num_of_items': 0,
            'created_at': None,
            'modified_at': None,
            'items': [],
        })

    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['PATCH']) 
@permission_classes([AllowAny])
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
    except CartItem.DoesNotExist:
        return Response({'error': 'Item do carrinho não encontrado.'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def delete_cart_item(request):
    cart_item_id = request.data.get('item_id')
    try:
        cart_item = CartItem.objects.get(id = cart_item_id)
    except CartItem.DoesNotExist:
        return Response({'error': 'Item do carrinho não encontrado.'}, status=404)
    cart_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_username(request):
    user = request.user
    if user.is_authenticated:
        return Response({'username': user.username, 'authenticated': True})
    return Response({'username': None, 'authenticated': False})


@api_view(['GET','PATCH'])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user    
    
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    if request.method == 'PATCH':
        serializer = UserSerializer(user, data = request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data,'message':'Informações atualizadas com sucesso!'})
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
@permission_classes([IsAuthenticated])
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
@permission_classes([AllowAny])
def paypal_payment_callback(request):
    payment_id = request.query_params.get('paymentId') or request.query_params.get('payments')
    payer_id = (
        request.query_params.get('payerId')
        or request.query_params.get('PayerID')
        or request.query_params.get('payerID')
        or request.query_params.get('PayedID')
    )
    ref = request.query_params.get('ref') or request.query_params.get('tx_ref')

    user = request.user if request.user.is_authenticated else None

    print('refff',ref)

    if not ref:
        return Response({'error': 'Referência da transação não encontrada.'}, status=400)

    try:
        transaction = Transaction.objects.get(ref=ref)
    except Transaction.DoesNotExist:
        return Response({'error': 'Transação não encontrada.'}, status=404)

    if payment_id and payer_id:
        payment = paypalrestsdk.Payment.find(payment_id)
        execute_result = payment.execute({'payer_id': payer_id})

        if not execute_result:
            return Response({'error': 'Falha ao confirmar pagamento no PayPal.'}, status=400)

        transaction.status = 'completed'
        transaction.save()
        cart = transaction.cart
        cart.paid = True
        if user is not None:
            cart.user = user
        cart.save()

        return Response ({'message': 'Pagamento Aprovado', 'subMessage':'O pagamento das suas compras foram realizado com sucesso'})    


    return Response({'error': 'Erro na realização do pagamento'}, status=400)