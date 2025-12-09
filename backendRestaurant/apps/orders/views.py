from django.shortcuts import get_object_or_404

from .serializers import OrderSerializer
from .models import Order, OrderItem, Payment, Delivery, OrderHistory
from .services import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status 


@csrf_exempt
@require_GET 
def get_all_orders(request):
    "Fonction qui renvoie toutes les commandes passées"
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt  
def create_new_order(request):
    """
    Fonction qui permet de créer une nouvelle commande pour l'utilisateur.
    Elle reçoit les informations nécessaires (prix total, adresse de livraison) via une requête POST,
    crée la commande, et renvoie l'ID de la commande ainsi que le prix total.
    """
    if request.method == "POST":
        total_price = float(request.POST.get('total_price'))
        delivery_address = request.POST.get('delivery_address')
        order = create_order(user=request.user, total_price=total_price, delivery_address=delivery_address)
        return JsonResponse({'status': 'success', 'orderId': order.orderId, 'total_price': order.total_price})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@csrf_exempt
def update_order_status_view(request, order_id):
    """
    Fonction qui permet de mettre à jour le statut d'une commande existante.
    Elle reçoit le nouveau statut via une requête POST et met à jour la commande correspondante.
    """
    order = get_object_or_404(Order, orderId=order_id)
    if request.method == "POST":
        status = request.POST.get('status')
        order = update_order_status(order_id, status)
        return JsonResponse({'status': 'success', 'new_status': order.status})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@csrf_exempt
def add_item_to_order(request, order_id):
    """
    Fonction qui permet d'ajouter un article à une commande existante.
    Elle reçoit l'ID de l'article du menu, la quantité et le prix via une requête POST,
    puis met à jour la commande avec les informations fournies.
    """
    order = get_object_or_404(Order, orderId=order_id)
    if request.method == "POST":
        menu_item_id = request.POST.get('menu_item_id')
        quantity = int(request.POST.get('quantity'))
        price = float(request.POST.get('price'))
        add_order_item(order, menu_item_id, quantity, price)
        return JsonResponse({'status': 'success', 'total_price': order.total_price})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@csrf_exempt
def process_payment(request, order_id):
    """
    Fonction qui permet de traiter un paiement pour une commande.
    Elle reçoit le montant et le mode de paiement via une requête POST, puis enregistre le paiement effectué.
    """
    order = get_object_or_404(Order, orderId=order_id)
    if request.method == "POST":
        amount = float(request.POST.get('amount'))
        payment_method = request.POST.get('payment_method')
        payment = create_payment(order, amount, payment_method)
        return JsonResponse({'status': 'success', 'payment_status': payment.payment_status})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@csrf_exempt
def create_delivery_for_order(request, order_id):
    """
    Fonction qui permet de créer une livraison pour une commande existante.
    Elle reçoit l'adresse de livraison et la date de livraison via une requête POST.
    """
    order = get_object_or_404(Order, orderId=order_id)
    if request.method == "POST":
        delivery_address = request.POST.get('delivery_address')
        delivery_date = request.POST.get('delivery_date')
        delivery = create_delivery(order, delivery_address, delivery_date)
        return JsonResponse({'status': 'success', 'delivery_status': delivery.status})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@csrf_exempt
def add_order_history(request, order_id):
    """
    Fonction qui permet d'ajouter une entrée dans l'historique d'une commande.
    Elle reçoit un statut et une note via une requête POST et enregistre l'historique de la commande.
    """
    order = get_object_or_404(Order, orderId=order_id)
    if request.method == "POST":
        status = request.POST.get('status')
        note = request.POST.get('note', '')
        create_order_history(order, status, note)
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@csrf_exempt
def get_order(request, order_id):
    """
    Fonction qui permet de récupérer les informations d'une commande spécifique.
    Elle renvoie l'ID de la commande, le statut, le prix total, l'adresse de livraison et le statut du paiement.
    """
    order = get_order_by_id(order_id)
    if order:
        return JsonResponse({
            'status': 'success',
            'orderId': order.orderId,
            'status': order.status,
            'total_price': str(order.total_price),
            'delivery_address': order.delivery_address,
            'payment_status': order.payment_status
        })
    return JsonResponse({'status': 'error', 'message': 'Order not found.'})

@csrf_exempt
def get_user_orders(request):
    """
    Fonction qui permet de récupérer toutes les commandes d'un utilisateur.
    Elle renvoie une liste de commandes avec l'ID, le statut, le prix total et le statut du paiement.
    """
    if request.method == "GET":
        orders = get_orders_by_user(request.user)
        order_list = [{
            'orderId': order.orderId,
            'status': order.status,
            'total_price': str(order.total_price),
            'payment_status': order.payment_status
        } for order in orders]
        return JsonResponse({'status': 'success', 'orders': order_list})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@csrf_exempt
def get_orders_by_status_view(request):
    """
    Fonction qui permet de récupérer toutes les commandes ayant un statut spécifique.
    Elle renvoie une liste de commandes filtrées par statut.
    """
    if request.method == "GET":
        status = request.GET.get('status')
        orders = get_orders_by_status(status)
        order_list = [{
            'orderId': order.orderId,
            'status': order.status,
            'total_price': str(order.total_price),
            'payment_status': order.payment_status
        } for order in orders]
        return JsonResponse({'status': 'success', 'orders': order_list})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@csrf_exempt
def get_order_items_view(request, order_id):
    """
    Fonction qui permet de récupérer les articles d'une commande spécifique.
    Elle renvoie les informations des articles (nom, quantité, prix).
    """
    order = get_order_by_id(order_id)
    if order:
        items = get_order_items(order)
        item_list = [{
            'menu_item': item.menu_item.name,
            'quantity': item.quantity,
            'price': str(item.price)
        } for item in items]
        return JsonResponse({'status': 'success', 'items': item_list})
    return JsonResponse({'status': 'error', 'message': 'Order not found.'})

@csrf_exempt
def get_order_payments_view(request, order_id):
    """
    Fonction qui permet de récupérer les paiements effectués pour une commande spécifique.
    Elle renvoie les informations du paiement (mode de paiement, montant et statut).
    """
    order = get_order_by_id(order_id)
    if order:
        payments = get_payments_for_order(order)
        payment_list = [{
            'payment_method': payment.payment_method,
            'amount': str(payment.amount),
            'payment_status': payment.payment_status
        } for payment in payments]
        return JsonResponse({'status': 'success', 'payments': payment_list})
    return JsonResponse({'status': 'error', 'message': 'Order not found.'})

@csrf_exempt
def get_order_deliveries_view(request, order_id):
    """
    Fonction qui permet de récupérer les informations de livraison d'une commande spécifique.
    Elle renvoie l'adresse de livraison, la date de livraison et le statut de la livraison.
    """
    order = get_order_by_id(order_id)
    if order:
        deliveries = get_deliveries_for_order(order)
        delivery_list = [{
            'delivery_address': delivery.delivery_address,
            'delivery_date': delivery.delivery_date,
            'status': delivery.status
        } for delivery in deliveries]
        return JsonResponse({'status': 'success', 'deliveries': delivery_list})
    return JsonResponse({'status': 'error', 'message': 'Order not found.'})

@csrf_exempt
def get_order_history_view(request, order_id):
    """
    Fonction qui permet de récupérer l'historique des changements d'état d'une commande.
    Elle renvoie une liste d'entrées d'historique avec les informations sur le statut, la date de mise à jour et les notes.
    """
    order = get_order_by_id(order_id)
    if order:
        history = get_order_history(order)
        history_list = [{
            'status': h.status,
            'updated_at': h.updated_at,
            'note': h.note
        } for h in history]
        return JsonResponse({'status': 'success', 'history': history_list})
    return JsonResponse({'status': 'error', 'message': 'Order not found.'})

@csrf_exempt
def update_delivery_address_view(request, order_id):
    """
    Fonction qui permet de mettre à jour l'adresse de livraison d'une commande.
    Elle reçoit la nouvelle adresse via une requête POST et met à jour la commande correspondante.
    """
    if request.method == "POST":
        new_address = request.POST.get('new_address')
        order = update_delivery_address(order_id, new_address)
        if order:
            return JsonResponse({'status': 'success', 'new_address': order.delivery_address})
        return JsonResponse({'status': 'error', 'message': 'Order not found or failed to update address.'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@api_view(['POST'])
def create_delivery(request, order_id):
    try:
        order = Order.objects.get(orderId=order_id)
        delivery_address = request.data.get('delivery_address')
        delivery_date = request.data.get('delivery_date')

        if not delivery_address or not delivery_date:
            return Response({'error': 'Missing address or date'}, status=status.HTTP_400_BAD_REQUEST)

        delivery = Delivery.objects.create(
            order=order,
            delivery_address=delivery_address,
            delivery_date=delivery_date
        )
        return Response({'message': 'Delivery created successfully'}, status=status.HTTP_201_CREATED)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



