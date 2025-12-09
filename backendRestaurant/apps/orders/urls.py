from django.urls import path
from .views import *
urlpatterns = [
  
    path('api/create/', create_new_order, name='create_order'),

    path('api/update-status/<int:order_id>/', update_order_status_view, name='update_order_status'),

    path('api/<int:order_id>/add-item/', add_item_to_order, name='add_item_to_order'),

    path('api/<int:order_id>/payment/', process_payment, name='process_payment'),

    path('api/<int:order_id>/delivery/', create_delivery_for_order, name='create_delivery_for_order'),

    path('api/<int:order_id>/history/', add_order_history, name='add_order_history'),

    path('api/<int:order_id>/', get_order, name='get_order'),

    path('api/user-orders/', get_user_orders, name='get_user_orders'),

    path('api/status/', get_orders_by_status_view, name='get_orders_by_status'),

    path('api/<int:order_id>/items/', get_order_items_view, name='get_order_items'),

    path('api/<int:order_id>/payments/', get_order_payments_view, name='get_order_payments'),

    path('api/<int:order_id>/deliveries/', get_order_deliveries_view, name='get_order_deliveries'),

    path('api/<int:order_id>/history/', get_order_history_view, name='get_order_history'),
    path('api/all-orders/', get_all_orders, name='get_all_orders'),

    path('api/orders/<int:order_id>/delivery-address/', update_delivery_address_view, name='update_delivery_address') , 
    path('api/orders/<int:order_id>/delivery/', create_delivery, name='create-delivery'),
]
