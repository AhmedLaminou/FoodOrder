from django.contrib import admin
from .models import Review, ReviewImage, Tag, ReviewTag


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('reviewId', 'user', 'menu_item' ,'menu_item_category' ,   'rating', 'created_at', 'updated_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('user__username', 'comment')
    ordering = ('-created_at',)
    list_display_links=("reviewId" , "menu_item_category" , "created_at")


@admin.register(ReviewImage)
class ReviewImageAdmin(admin.ModelAdmin):
    list_display = ('reviewImageId', 'review', 'uploaded_at')
    search_fields = ('review__user__username',)
    ordering = ('-uploaded_at',)
    list_display_links=("reviewImageId" , "review" , "uploaded_at")


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('tagId', 'name')
    search_fields = ('name',)
    ordering = ('name',)
    list_display_links=("tagId" , "name")


@admin.register(ReviewTag)
class ReviewTagAdmin(admin.ModelAdmin):
    list_display = ('reviewTagId', 'review', 'tag')
    search_fields = ('review__user__username', 'tag__name')
    ordering = ('-review__created_at',)
    list_display_links=("reviewTagId" , "review" , "tag")
    

