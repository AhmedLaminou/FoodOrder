from .models import Order, OrderItem, Payment, Delivery, OrderHistory
from django.db import transaction
from django.db.models import Q

def create_order(user, total_price, delivery_address=None):
    order = Order.objects.create(
        user=user,
        total_price=total_price,
        delivery_address=delivery_address,
        status='Pending',
        payment_status='Not Paid'
    )
    return order

def update_order_status(order_id, status):
    order = Order.objects.get(orderId=order_id)
    order.status = status
    order.save()

    OrderHistory.objects.create(order=order, status=status, note=f"Order status updated to {status}")
    return order

def add_order_item(order, menu_item, quantity, price):
    order_item = OrderItem.objects.create(
        order=order,
        menu_item=menu_item,
        quantity=quantity,
        price=price
    )
    order.total_price += price * quantity
    order.save()
    return order_item

def remove_order_item(order_item_id):
    order_item = OrderItem.objects.get(orderItemId=order_item_id)
    order = order_item.order
    order.total_price -= order_item.price * order_item.quantity
    order_item.delete()
    order.save()
    return order

def create_payment(order, amount, payment_method):
    payment = Payment.objects.create(
        order=order,
        amount=amount,
        payment_method=payment_method,
        payment_status='Pending'
    )
    order.payment_status = 'Paid'
    order.save()
    return payment

def update_payment_status(payment_id, status):
    payment = Payment.objects.get(paymentId=payment_id)
    payment.payment_status = status
    payment.save()
    return payment

def create_delivery(order, delivery_address, delivery_date):
    delivery = Delivery.objects.create(
        order=order,
        delivery_address=delivery_address,
        delivery_date=delivery_date,
        status='Pending'
    )
    return delivery

def update_delivery_status(delivery_id, status):
    delivery = Delivery.objects.get(deliveryId=delivery_id)
    delivery.status = status
    delivery.save()
    return delivery

def create_order_history(order, status, note=""):
    history = OrderHistory.objects.create(
        order=order,
        status=status,
        note=note
    )
    return history



def get_order_by_id(order_id):
    try:
        return Order.objects.get(orderId=order_id)
    except Order.DoesNotExist:
        return None

def get_orders_by_user(user):
    return Order.objects.filter(user=user)

def get_orders_by_status(status):
    return Order.objects.filter(status=status)

def get_order_items(order):
    return order.order_items.all()

def get_payments_for_order(order):
    return order.payments.all()

def get_deliveries_for_order(order):
    return order.deliveries.all()

def get_order_history(order):
    return order.order_histories.all()

def update_delivery_address(order_id, new_address):
    order = get_order_by_id(order_id)
    if order:
        order.delivery_address = new_address
        order.save()
        return order
    return None
