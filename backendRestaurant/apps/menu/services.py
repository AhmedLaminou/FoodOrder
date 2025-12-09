from .models import MenuCategory, MenuItem, MenuItemTagAssignment, MenuPromotion, MenuItemTag

def get_all_categories():
    """Récupérer toutes les catégories de menu."""
    return MenuCategory.objects.all()

def get_menu_item_by_id(menu_item_id):
    """Récupérer un MenuItem par son ID."""
    return MenuItem.objects.get(menuItemId=menu_item_id)

def get_menu_items_by_category(category_id):
    """Récupérer tous les MenuItems par catégorie."""
    return MenuItem.objects.filter(category_id=category_id)

def get_all_menu_items():
    """Récupérer tous les MenuItems."""
    return MenuItem.objects.all()

def create_menu_item(name, description, price, category, image=None, available=True):
    """Créer un nouveau MenuItem."""
    menu_item = MenuItem.objects.create(
        name=name,
        description=description,
        price=price,
        category=category,
        image=image,
        available=available
    )
    return menu_item

def create_promotion(name, description, discount_percentage, start_date, end_date, menu_item):
    """Créer une promotion pour un MenuItem."""
    promotion = MenuPromotion.objects.create(
        name=name,
        description=description,
        discount_percentage=discount_percentage,
        start_date=start_date,
        end_date=end_date,
        menu_item=menu_item
    )
    return promotion

def assign_tag_to_menu_item(menu_item_id, tag_id):
    """Assigner un tag à un MenuItem."""
    menu_item = MenuItem.objects.get(menuItemId=menu_item_id)
    tag = MenuItemTag.objects.get(menuItemTagId=tag_id)
    MenuItemTagAssignment.objects.create(menu_item=menu_item, tag=tag)
