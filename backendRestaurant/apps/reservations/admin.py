from django.contrib import admin
from .models import Reservation, Table, ReservationTable, MenuItem, ReservationMenuItem

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reservationId', 'user', 'date_time', 'num_of_guests', 'status', 'created_at')
    list_filter = ('status', 'date_time')
    search_fields = ('user__username', 'status')
    list_display_links=('reservationId' , 'date_time' , 'num_of_guests' , 'status')

@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ('tableId', 'table_number', 'seating_capacity', 'available')
    list_filter = ('available',)
    search_fields = ('table_number',)
    list_display_links=('tableId', 'table_number', 'seating_capacity', 'available')

@admin.register(ReservationTable)
class ReservationTableAdmin(admin.ModelAdmin):
    list_display = ('reservationTableId', 'reservation', 'table', 'reserved_at')
    list_filter = ('reserved_at',)
    search_fields = ('reservation__user__username', 'table__table_number')
    list_display_links=('reservationTableId', 'table', 'reserved_at')

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('menuItemId', 'name', 'price')
    search_fields = ('name',)
    list_display_links=('menuItemId', 'name', 'price')

@admin.register(ReservationMenuItem)
class ReservationMenuItemAdmin(admin.ModelAdmin):
    list_display = ('reservationMenuItemId', 'reservation', 'menu_item', 'quantity')
    search_fields = ('reservation__user__username', 'menu_item__name')
    list_display_links=('reservationMenuItemId', 'reservation', 'menu_item', 'quantity')

