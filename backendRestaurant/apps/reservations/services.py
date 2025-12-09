from .models import Reservation, Table, ReservationTable, MenuItem, ReservationMenuItem
from django.utils import timezone
from django.core.exceptions import ValidationError

# /*--------------------------- Services pour les réservations ----------------------------------------------------*/

def get_all_reservations():
    return Reservation.objects.all()

def get_reservations_by_date(date):
    return Reservation.objects.filter(date_time__date=date)


def create_reservation(user, date_time, num_of_guests, special_requests=None):
    reservation = Reservation.objects.create(
        user=user,
        date_time=date_time,
        num_of_guests=num_of_guests,
        special_requests=special_requests
    )
    return reservation

def update_reservation(reservation_id, **kwargs):
    reservation = Reservation.objects.get(reservationId=reservation_id)
    for key, value in kwargs.items():
        setattr(reservation, key, value)
    reservation.save()
    return reservation

def delete_reservation(reservation_id):
    Reservation.objects.get(reservationId=reservation_id).delete()

def get_reservation(reservation_id):
    return Reservation.objects.get(reservationId=reservation_id)

def get_user_reservations(user):
    return Reservation.objects.filter(user=user)

# /*--------------Services pour la gestion des tables -------------------------------------------*/


def get_available_tables(date_time):
    reserved_tables = ReservationTable.objects.filter(reservation__date_time=date_time).values_list('table', flat=True)
    return Table.objects.exclude(tableId__in=reserved_tables).filter(available=True)

def cancel_reservation_and_release_table(reservation_id):
    reservation = Reservation.objects.get(reservationId=reservation_id)
    reservation.status = "Cancelled"
    reservation.save()
    
    # Libérer la table associée
    ReservationTable.objects.filter(reservation=reservation).delete()
    return reservation

def get_reserved_tables(date):
    return Table.objects.filter(reservationtable__reservation__date_time__date=date)

def add_table(table_number, seating_capacity, available=True):
    return Table.objects.create(
        table_number=table_number,
        seating_capacity=seating_capacity,
        available=available
    )

def update_table(table_id, **kwargs):
    table = Table.objects.get(tableId=table_id)
    for key, value in kwargs.items():
        setattr(table, key, value)
    table.save()
    return table

def delete_table(table_id):
    Table.objects.get(tableId=table_id).delete()

def check_table_availability(table_id):
    table = Table.objects.get(tableId=table_id)
    return table.available

def assign_table_to_reservation(reservation, table):
    if not table.available:
        raise ValidationError("La table est déjà réservée")
    reservation_table = ReservationTable.objects.create(
        reservation=reservation,
        table=table,
        reserved_at=timezone.now()
    )
    table.available = False
    table.save()
    return reservation_table

def release_table(table_id):
    table = Table.objects.get(tableId=table_id)
    table.available = True
    table.save()

# 3. /*-------------------- Services pour les élements du menu --------------------------*/
def add_menu_item(name, description, price):
    return MenuItem.objects.create(name=name, description=description, price=price)

def update_menu_item(menu_item_id, **kwargs):
    menu_item = MenuItem.objects.get(menuItemId=menu_item_id)
    for key, value in kwargs.items():
        setattr(menu_item, key, value)
    menu_item.save()
    return menu_item

def delete_menu_item(menu_item_id):
    MenuItem.objects.get(menuItemId=menu_item_id).delete()

def get_menu_items():
    return MenuItem.objects.all()

# 4. /* ------------------- Services pour les articles de menu dans une réservation -------------------------------*/
def add_menu_item_to_reservation(reservation, menu_item, quantity):
    return ReservationMenuItem.objects.create(
        reservation=reservation,
        menu_item=menu_item,
        quantity=quantity
    )

def update_reservation_menu_item(reservation_menu_item_id, quantity):
    reservation_menu_item = ReservationMenuItem.objects.get(reservationMenuItemId=reservation_menu_item_id)
    reservation_menu_item.quantity = quantity
    reservation_menu_item.save()
    return reservation_menu_item

def remove_menu_item_from_reservation(reservation_menu_item_id):
    ReservationMenuItem.objects.get(reservationMenuItemId=reservation_menu_item_id).delete()

def get_reservation_menu_items(reservation):
    return ReservationMenuItem.objects.filter(reservation=reservation)
