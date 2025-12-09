from django.contrib import admin
from .models import MenuCategory, MenuItem, MenuPromotion, MenuItemTag, MenuItemTagAssignment

@admin.register(MenuCategory)
class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ("menuCategoryId", "name", "description", "created_at", "updated_at")
    search_fields = ("name",)
    ordering = ("name",)
    list_display_links = ("name",) 
    
@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("menuItemId", "name", "category", "price", "available", "rating", "created_at", "updated_at", "image")
    list_filter = ("available", "category")
    search_fields = ("name", "category__name")
    ordering = ("name",)
    list_display_links = ("name",) 
    
@admin.register(MenuPromotion)
class MenuPromotionAdmin(admin.ModelAdmin):
    list_display = ("menuPromotionId", "name", "discount_percentage", "start_date", "end_date", "menu_item")
    list_filter = ("start_date", "end_date")
    search_fields = ("name", "menu_item__name")
    list_display_links = ("name",) 
    
@admin.register(MenuItemTag)
class MenuItemTagAdmin(admin.ModelAdmin):
    list_display = ("menuItemTagId", "name", "description")
    search_fields = ("name",)
    list_display_links = ("name",) 
    
@admin.register(MenuItemTagAssignment)
class MenuItemTagAssignmentAdmin(admin.ModelAdmin):
    list_display = ("menuItemTagAssignmentId", "menu_item", "tag")
    search_fields = ("menu_item__name", "tag__name")
    list_display_links = ("menuItemTagAssignmentId",) 
