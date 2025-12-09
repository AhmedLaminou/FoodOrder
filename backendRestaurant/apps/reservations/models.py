import uuid
from django.db import models
from apps.users.models import User


class Reservation(models.Model):
    reservationId = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reservations")
    
    date_time = models.DateTimeField()  
    num_of_guests = models.PositiveIntegerField()  
    status_choices = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
        ('Completed', 'Completed'),
    ]
    status = models.CharField(max_length=20, choices=status_choices, default='Pending')  
    special_requests = models.TextField(blank=True, null=True)  

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'date_time')

    def __str__(self):
        return f'Reservation #{self.reservationId} by {self.user.username} on {self.date_time}'
    
class Table(models.Model):
    tableId = models.AutoField(primary_key=True)
    table_number = models.CharField(max_length=10) 
    seating_capacity = models.PositiveIntegerField()  
    available = models.BooleanField(default=True)  

    def __str__(self):
        return f'Table {self.table_number}'
    
class ReservationTable(models.Model):
    reservationTableId = models.AutoField(primary_key=True)
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, related_name="reservation_tables")
    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name="reservation_tables")
    reserved_at = models.DateTimeField()  

    def __str__(self):
        return f'Reservation for {self.reservation.user.username} at table {self.table.table_number}'
    
class MenuItem(models.Model):
    menuItemId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)  
    description = models.TextField(blank=True, null=True) 
    price = models.DecimalField(max_digits=7, decimal_places=2)  

    def __str__(self):
        return self.name
    
class ReservationMenuItem(models.Model):
    reservationMenuItemId = models.AutoField(primary_key=True)
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, related_name="menu_items")
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField() 

    def __str__(self):
        return f'{self.quantity} of {self.menu_item.name} for Reservation #{self.reservation.reservationId}'
