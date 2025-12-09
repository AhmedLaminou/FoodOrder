from django.contrib import admin
from .models import Order, OrderItem, Payment, Delivery, OrderHistory



class OrderAdmin(admin.ModelAdmin):
    list_display = ('orderId', 'user', 'order_date', 'status', 'total_price', 'payment_status', 'created_at', 'updated_at')
    list_filter = ('status', 'payment_status', 'order_date')
    search_fields = ('user__username', 'orderId')
    list_display_links = ("order_date","total_price" , "payment_status" , "created_at") 

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'menu_item', 'quantity', 'price')
    search_fields = ('order__orderId', 'menu_item__name')
    list_display_links = ("menu_item","quantity" , "price") 

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('paymentId', 'order', 'payment_date', 'amount', 'payment_method', 'payment_status')
    list_filter = ('payment_method', 'payment_status', 'payment_date')
    search_fields = ('order__orderId', 'payment_method')
    list_display_links = ("payment_date","paymentId" , "payment_method" , "payment_status") 

class DeliveryAdmin(admin.ModelAdmin):
    list_display = ('deliveryId', 'order', 'delivery_address', 'delivery_date', 'status')
    list_filter = ('status', 'delivery_date')
    search_fields = ('order__orderId', 'delivery_address')
    list_display_links = ("deliveryId", "delivery_address" , "delivery_date" , "status") 

class OrderHistoryAdmin(admin.ModelAdmin):
    list_display = ('order', 'status', 'updated_at', 'note')
    list_filter = ('status', 'updated_at')
    search_fields = ('order__orderId', 'status')
    list_display_links = ("order", "status", "updated_at")

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(Delivery, DeliveryAdmin)
admin.site.register(OrderHistory, OrderHistoryAdmin)
