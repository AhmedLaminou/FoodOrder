from django.test import TestCase
from .models import  MenuCategory , MenuItem
from decimal import Decimal


class MenuItemModelTest(TestCase):
    def setUp(self):
        self.category = MenuCategory.objects.create(name="Boissons")
    
    def test_menu_item_creation(self):
        item = MenuItem.objects.create(
            name="Café",
            description="Café noir sans sucre",
            price=Decimal("2.50"),
            category=self.category,
            available=True,
            rating=4.5
        )
        self.assertEqual(item.name, "Café")
        self.assertEqual(item.price, Decimal("2.50"))
        self.assertTrue(item.available)
        self.assertEqual(item.rating, Decimal("4.5"))
        self.assertEqual(str(item), "Café")