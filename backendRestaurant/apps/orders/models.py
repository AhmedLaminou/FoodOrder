from django.db import models
from apps.users.models import User
from apps.menu.models import MenuItem  

class Order(models.Model):
    orderId = models.AutoField(primary_key=True , default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    
    order_date = models.DateTimeField(auto_now_add=True) 
    status_choices = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Preparing', 'Preparing'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    status = models.CharField(max_length=20, choices=status_choices, default='Pending')  
    total_price = models.DecimalField(max_digits=10, decimal_places=2)  
    payment_status_choices = [
        ('Not Paid', 'Not Paid'),
        ('Paid', 'Paid'),
    ]
    payment_status = models.CharField(max_length=20, choices=payment_status_choices, default='Not Paid')  
    delivery_address = models.TextField(blank=True, null=True)  

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Order #{self.orderId} by {self.user.username}'
    
class OrderItem(models.Model):
    orderItemId = models.AutoField(primary_key=True , default=1)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items")
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)  
    quantity = models.PositiveIntegerField()  
    price = models.DecimalField(max_digits=7, decimal_places=2)  

    def __str__(self):
        return f'{self.quantity} of {self.menu_item.name} for Order #{self.order.orderId}'

class Payment(models.Model):
    paymentId = models.AutoField(primary_key=True , default=1)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="payments")
    payment_date = models.DateTimeField(auto_now_add=True) 
    amount = models.DecimalField(max_digits=10, decimal_places=2)  
    payment_method_choices = [
        ('Credit Card', 'Credit Card'),
        ('Cash', 'Cash'),
        ('PayPal', 'PayPal'),
        ('Bank Transfer', 'Bank Transfer'),
    ]
    payment_method = models.CharField(max_length=20, choices=payment_method_choices)
    payment_status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Completed', 'Completed')], default='Pending')

    def __str__(self):
        return f'Payment of {self.amount} for Order #{self.order.orderId}'
    
class Delivery(models.Model):
    deliveryId = models.AutoField(primary_key=True , default=1)  
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="deliveries")
    delivery_address = models.TextField()  
    delivery_date = models.DateTimeField()  
    status_choices = [
        ('Pending', 'Pending'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Failed', 'Failed'),
    ]
    status = models.CharField(max_length=20, choices=status_choices, default='Pending')  
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self):
        return f'Delivery for Order #{self.order.orderId} to {self.delivery_address}'
    
class OrderHistory(models.Model):
    orderHistoryId = models.AutoField(primary_key=True ,default=1)  
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_histories")
    status = models.CharField(max_length=20)  
    updated_at = models.DateTimeField(auto_now_add=True)
    note = models.TextField(blank=True, null=True)  

    def __str__(self):
        return f'History for Order #{self.order.orderId} - {self.status}'
