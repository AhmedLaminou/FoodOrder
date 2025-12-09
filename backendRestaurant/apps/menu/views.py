from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .services import get_all_categories, get_menu_item_by_id, create_menu_item, get_menu_items_by_category, get_all_menu_items, create_promotion, assign_tag_to_menu_item
from .models import MenuCategory, MenuItem, MenuItemTag, MenuItemTagAssignment, MenuPromotion
import json
from .serializers import MenuItemSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view


def category_list(request):
    """Récupérer toutes les catégories de menu."""
    categories = get_all_categories()
    if not categories:
        return JsonResponse({"error": "No categories found"}, status=404)
    data = [
        {
            "id": category.menuCategoryId,
            "name": category.name,
            "description": category.description,
            "created_at": category.created_at,
            "updated_at": category.updated_at,
        }
        for category in categories
    ]
    return JsonResponse(data, safe=False)


def menu_item_detail(request, menu_item_id):
    """Récupérer un MenuItem par ID."""
    try:
        menu_item = get_menu_item_by_id(menu_item_id)
        data = {
            "id": menu_item.menuItemId, 
            "name": menu_item.name,
            "description": menu_item.description,
            "price": str(menu_item.price), 
            "category": menu_item.category.name,
            "available": menu_item.available
        }
        return JsonResponse(data)
    except MenuItem.DoesNotExist:
        return JsonResponse({"error": "Menu item not found"}, status=404)

@csrf_exempt
def create_menu_item_view(request):
    """Créer un nouveau MenuItem."""
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            category = MenuCategory.objects.get(menuCategoryId=data["category_id"]) 
            menu_item = create_menu_item(
                name=data["name"],
                description=data.get("description", ""),
                price=data["price"],
                category=category,
                image=data.get("image", None),
                available=data.get("available", True)
            )
            response_data = {
                "id": menu_item.menuItemId, 
                "name": menu_item.name,
                "price": str(menu_item.price)
            }
            return JsonResponse(response_data, status=201)
        except MenuCategory.DoesNotExist:
            return JsonResponse({"error": "Category not found"}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)
@csrf_exempt
def menu_items_by_category(request, category_id):
    """Récupérer tous les MenuItems d'une catégorie."""
    items = get_menu_items_by_category(category_id)
    data = [{
        "id": item.menuItemId,  
        "name": item.name,
        "description": item.description,
        "price": str(item.price),
        "available": item.available
    } for item in items]
    return JsonResponse(data, safe=False)
@csrf_exempt
def all_menu_items(request):
    """Récupérer tous les MenuItems avec leurs images."""
    items = get_all_menu_items()
    data = [{
        "id": item.menuItemId,
        "name": item.name,
        "description": item.description,
        "price": str(item.price),
        "available": item.available,
        "image": request.build_absolute_uri(item.image.url) if item.image else None
    } for item in items]
    
    return JsonResponse(data, safe=False)

@csrf_exempt
def create_promotion_view(request):
    """Créer une promotion pour un MenuItem."""
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            menu_item = MenuItem.objects.get(menuItemId=data["menu_item_id"])  
            promotion = create_promotion(
                name=data["name"],
                description=data.get("description", ""),
                discount_percentage=data["discount_percentage"],
                start_date=data["start_date"],
                end_date=data["end_date"],
                menu_item=menu_item
            )
            response_data = {
                "id": promotion.menuPromotionId,  
                "name": promotion.name,
                "discount_percentage": str(promotion.discount_percentage)
            }
            return JsonResponse(response_data, status=201)
        except MenuItem.DoesNotExist:
            return JsonResponse({"error": "Menu item not found"}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)

@csrf_exempt
def assign_tag_view(request):
    """Assigner un tag à un MenuItem."""
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            assign_tag_to_menu_item(data["menu_item_id"], data["tag_id"])
            return JsonResponse({"message": "Tag assigned successfully"}, status=200)
        except (MenuItem.DoesNotExist, MenuItemTag.DoesNotExist):
            return JsonResponse({"error": "Invalid menu item or tag"}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)

def promotions_list(request):
    """Récupérer toutes les promotions avec les informations du MenuItem associé."""
    promotions = MenuPromotion.objects.all()
    data = [
        {
            "id": promo.menuPromotionId,
            "name": promo.name,
            "description": promo.description,  
            "discount_percentage": promo.discount_percentage,
            "start_date": promo.start_date,
            "end_date": promo.end_date,
            "menu_item": {  
                "id": promo.menu_item.menuItemId,
                "name": promo.menu_item.name, 
                "price": promo.menu_item.price, 
                "image": promo.menu_item.image.url if promo.menu_item.image else None,
                "rating": promo.menu_item.rating  
            }
        }
        for promo in promotions
    ]
    return JsonResponse(data, safe=False)

def get_tags_for_menu_item(request, menu_item_id):
    """Récupérer tous les tags d'un MenuItem."""
    menu_item = get_object_or_404(MenuItem, menuItemId=menu_item_id) 
    tags = MenuItemTagAssignment.objects.filter(menu_item=menu_item)
    data = [
        {
            "id": tag.tag.menuItemTagId,
            "name": tag.tag.name,  
            "description": tag.tag.description, 
        }
        for tag in tags
    ]
    return JsonResponse(data, safe=False)

@api_view(["GET"])
def filtered_menu_items(request):
    """
    Récupérer les MenuItems filtrés selon les paramètres suivants :
    - category_id
    - min_price
    - max_price
    - available (true/false)
    - tag_id
    - promotion_only (true/false)
    """
    queryset = MenuItem.objects.all()

    category_id = request.GET.get("category_id")
    min_price = request.GET.get("min_price")
    max_price = request.GET.get("max_price")
    available = request.GET.get("available")
    tag_id = request.GET.get("tag_id")
    promotion_only = request.GET.get("promotion_only")

    if category_id:
        queryset = queryset.filter(category__menuCategoryId=category_id)

    if min_price:
        queryset = queryset.filter(price__gte=min_price)
    if max_price:
        queryset = queryset.filter(price__lte=max_price)

    if available is not None:
        if available.lower() == 'true':
            queryset = queryset.filter(available=True)
        elif available.lower() == 'false':
            queryset = queryset.filter(available=False)

    if tag_id:
        queryset = queryset.filter(tags__menuItemTagId=tag_id)

    if promotion_only and promotion_only.lower() == 'true':
        queryset = queryset.filter(menupromotion__isnull=False)

    serializer = MenuItemSerializer(queryset.distinct(), many=True, context={'request': request})
    return Response(serializer.data)


def search_menu_items(request):
    """Récupérer les MenuItems selon un mot-clé."""
    keyword = request.GET.get("keyword")
    if keyword:
        items = MenuItem.objects.filter(name__icontains=keyword)  
    else:
        items = MenuItem.objects.all()  

    serializer = MenuItemSerializer(items, many=True, context={'request': request})
    return JsonResponse(serializer.data, safe=False)

class MenuItemListView(APIView):
    def get(self, request):
        items = MenuItem.objects.all()
        serializer = MenuItemSerializer(items, many=True, context={'request': request})
        return Response(serializer.data)