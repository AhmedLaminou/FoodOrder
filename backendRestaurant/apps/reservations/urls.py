from django.urls import path
from .views import *

urlpatterns = [
    
    path('api/new/', create_new_reservation, name='create_reservation'),
    path('api/<int:reservation_id>/', reservation_detail, name='reservation_detail'),
    path('api/<int:reservation_id>/cancel/', cancel_reservation, name='cancel_reservation'),
    path('api/all-reservations/' , all_reservations , name='all_reservations') , 
    path('api/available-tables/' , available_tables , name='available_tables') ,

    path('api/reservations/<int:reservation_id>/assign_table/<int:table_id>/', assign_table, name='assign_table'),
    path('api/reservations/tables/<int:table_id>/release/', release_table_view, name='release_table'),

    path('api/reservations/menu/', menu_list, name='menu_list'),
    path('api/reservations/menu/add/', add_menu_item_view, name='add_menu_item'),

    path('api/reservations/<int:reservation_id>/add_item/', add_item_to_reservation, name='add_item_to_reservation'),
]
