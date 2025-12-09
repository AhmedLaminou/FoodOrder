from django.shortcuts import get_object_or_404, redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Reservation, Table, MenuItem
from .services import *
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
@login_required
def create_new_reservation(request):
    """
    Méthode créant une nouvelle réservation. Elle prend la date, l'heure, le nombre d'invités, 
    et les demandes spéciales à partir de la requête POST et crée une réservation dans le système. 
    Elle renvoie l'ID de la nouvelle réservation.
    """
    if request.method == "POST":
        date_time = request.POST.get('date_time')
        num_of_guests = int(request.POST.get('num_of_guests'))
        special_requests = request.POST.get('special_requests', '')
        reservation = create_reservation(request.user, date_time, num_of_guests, special_requests)
        return JsonResponse({'reservation_id': reservation.reservationId})
    return JsonResponse({'error': 'Invalid request method'}, status=400)
@csrf_exempt
@login_required
def reservation_detail(request, reservation_id):
    """
    Méthode récupérant les détails d'une réservation existante en fonction de son ID. 
    Elle renvoie des informations telles que la date, l'heure, le nombre d'invités, 
    les demandes spéciales et le statut de la réservation.
    """
    reservation = get_object_or_404(Reservation, reservationId=reservation_id)
    return JsonResponse({'reservation': {
        'id': reservation.reservationId,
        'date_time': reservation.date_time,
        'num_of_guests': reservation.num_of_guests,
        'special_requests': reservation.special_requests,
        'status': reservation.status
    }})
@csrf_exempt
@login_required
def cancel_reservation(request, reservation_id):
    """
    Méthode annulant une réservation existante en modifiant son statut en "Cancelled". 
    Elle renvoie un message de confirmation indiquant que la réservation a été annulée.
    """
    reservation = get_object_or_404(Reservation, reservationId=reservation_id)
    reservation.status = "Cancelled"
    reservation.save()
    return JsonResponse({'status': 'cancelled'})
@csrf_exempt
@login_required
def assign_table(request, reservation_id, table_id):
    """
    Méthode assignant une table à une réservation spécifique. 
    Elle récupère la réservation et la table à partir de leurs ID, 
    et associe la table à la réservation en appelant une fonction de service.
    """
    reservation = get_object_or_404(Reservation, reservationId=reservation_id)
    table = get_object_or_404(Table, tableId=table_id)
    assign_table_to_reservation(reservation, table)
    return JsonResponse({'status': 'success'})
@csrf_exempt
@login_required
def release_table_view(request, table_id):
    """
    Méthode libérant une table spécifique, la rendant disponible pour d'autres réservations. 
    Elle modifie l'état de la table pour indiquer qu'elle est désormais disponible.
    """
    release_table(table_id)
    return JsonResponse({'status': 'table released'})
@csrf_exempt
@login_required
def menu_list(request):
    """
    Méthode récupérant tous les éléments du menu. Elle renvoie une liste d'éléments de menu avec 
    leur ID, nom, description et prix.
    """
    menu_items = get_menu_items()
    return JsonResponse({'menu_items': [{'id': item.menuItemId, 'name': item.name, 'description': item.description, 'price': item.price} for item in menu_items]})
@csrf_exempt
@login_required
def add_menu_item_view(request):
    """
    Méthode ajoutant un nouvel élément au menu. Elle prend les informations de l'élément du menu 
    (nom, description et prix) à partir de la requête POST et ajoute cet élément au système.
    """
    if request.method == "POST":
        name = request.POST.get('name')
        description = request.POST.get('description')
        price = float(request.POST.get('price'))
        add_menu_item(name, description, price)
        return JsonResponse({'status': 'menu item added'})
    return JsonResponse({'error': 'Invalid request method'}, status=400)
@csrf_exempt
@login_required
def add_item_to_reservation(request, reservation_id):
    """
    Méthode ajoutant un élément du menu à une réservation spécifique. 
    Elle récupère l'ID de l'élément du menu et la quantité demandée, puis ajoute cet élément à la réservation.
    """
    reservation = get_object_or_404(Reservation, reservationId=reservation_id)
    if request.method == "POST":
        menu_item_id = request.POST.get('menu_item_id')
        quantity = int(request.POST.get('quantity'))
        menu_item = get_object_or_404(MenuItem, menuItemId=menu_item_id)
        add_menu_item_to_reservation(reservation, menu_item, quantity)
        return JsonResponse({'status': 'success'})
    return JsonResponse({'error': 'Invalid request method'}, status=400)
@csrf_exempt
@login_required
def all_reservations(request):
    """
    Méthode récupérant toutes les réservations existantes dans le système. 
    Elle renvoie une liste de réservations avec des informations sur la date, l'heure, 
    le nombre d'invités et le statut de chaque réservation.
    """
    reservations = get_all_reservations()
    return JsonResponse({'reservations': [
        {'id': res.reservationId, 'date_time': res.date_time, 'num_of_guests': res.num_of_guests, 'status': res.status}
        for res in reservations
    ]})
@csrf_exempt
@login_required
def reservations_by_date(request, date):
    """
    Méthode récupérant toutes les réservations pour une date spécifique. 
    Elle renvoie une liste des réservations avec les détails de la réservation pour cette date.
    """
    reservations = get_reservations_by_date(date)
    return JsonResponse({'reservations': [
        {'id': res.reservationId, 'date_time': res.date_time, 'num_of_guests': res.num_of_guests, 'status': res.status}
        for res in reservations
    ]})
@csrf_exempt

def available_tables(request):
    """
    Méthode récupérant toutes les tables disponibles pour une date et une heure spécifiques.
    Elle renvoie une liste des tables avec leur numéro et leur capacité.
    """
  
    date_time = request.GET.get('date_time')

    if not date_time:
        return JsonResponse({'error': 'La date et l\'heure sont obligatoires.'}, status=400)

    
    tables = get_available_tables(date_time)

    return JsonResponse({'available_tables': [
        {'id': table.tableId, 'number': table.table_number, 'capacity': table.seating_capacity}
        for table in tables
    ]})
@csrf_exempt
@login_required
def cancel_reservation_and_release_view(request, reservation_id):
    """
    Méthode annulant une réservation spécifique et libérant la table qui lui est assignée. 
    Elle renvoie un message de confirmation indiquant que la réservation a été annulée 
    et que la table a été libérée.
    """
    cancel_reservation_and_release_table(reservation_id)
    return JsonResponse({'status': 'reservation cancelled and table released'})
