from django.urls import path
from . import views

urlpatterns = [
    path('api/categories/', views.category_list, name='category_list'),
    path('api/menu-items/', views.all_menu_items, name='all_menu_items'),
    path('api/menu-items/<int:menu_item_id>/', views.menu_item_detail, name='menu_item_detail'),
    path('api/categories/<int:category_id>/menu-items/', views.menu_items_by_category, name='menu_items_by_category'),
    path('api/menu-item/create/', views.create_menu_item_view, name='create_menu_item'),
    path('api/promotion/create/', views.create_promotion_view, name='create_promotion'),
    path('api/menu-item/<int:menu_item_id>/assign-tag/', views.assign_tag_view, name='assign_tag'),
    path('api/promotions/', views.promotions_list, name='promotions_list'),
    path('api/menu-item/<int:menu_item_id>/tags/', views.get_tags_for_menu_item, name='get_tags_for_menu_item'),
    path('menu-items/', views.MenuItemListView.as_view(), name='menu-items'),
    path('api/menu-items/filtered/', views.filtered_menu_items, name='filtered_menu_items'),
    path('api/menu-items/search/', views.search_menu_items, name='search_menu_items'),
]
