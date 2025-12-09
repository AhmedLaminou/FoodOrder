from decimal import Decimal
from .models import User
from django.test import TestCase

from .models import Order  


class OrderModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="1234")
    
    def test_order_creation_default_values(self):
        order = Order.objects.create(
            user=self.user,
            total_price=Decimal("15.00"),
            delivery_address="123 Rue Principale"
        )
        self.assertEqual(order.status, "Pending")
        self.assertEqual(order.payment_status, "Not Paid")
        self.assertEqual(order.total_price, Decimal("15.00"))
        self.assertEqual(order.delivery_address, "123 Rue Principale")
        self.assertEqual(str(order), f"Order #{order.orderId} by {self.user.username}")