from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import Profile, UserRole, Address, PasswordReset, UserLoginHistory, UserNotification, UserCoupon, UserActivity , User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserAdmin(BaseUserAdmin):  
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_active', 'is_admin', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    list_filter = ('is_active', 'is_admin', 'date_joined')
    ordering = ('-date_joined',)
    list_display_links = ("username", "email", "is_active")

    filter_horizontal = ()


try:
    admin.site.unregister(get_user_model())
except admin.sites.NotRegistered:
    pass  

admin.site.register(User, UserAdmin)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'profile_picture', 'get_addresses')
    search_fields = ('user__username',)
    list_filter = ('user',)
    ordering = ('-user',)
    list_display_links=("user" , "profile_picture")

    filter_horizontal = ('addresses',)

    def get_addresses(self, obj):
        return ", ".join([str(address) for address in obj.addresses.all()])
    
    get_addresses.short_description = "Addresses" 

admin.site.register(Profile, ProfileAdmin)
    


class UserRoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)
    ordering = ('name',)
    list_display_links=("name" , "description")
    
admin.site.register(UserRole, UserRoleAdmin)

class AddressAdmin(admin.ModelAdmin):
    list_display = ('street', 'city', 'postal_code', 'country', 'address_type')
    search_fields = ('street', 'city', 'postal_code', 'country')
    list_filter = ('address_type',)
    ordering = ('-city',)
    list_display_links=("street" , "city" , "postal_code" , "country")

admin.site.register(Address, AddressAdmin)

class PasswordResetAdmin(admin.ModelAdmin):
    list_display = ('user', 'token', 'requested_at', 'is_used')
    search_fields = ('user__username', 'token')
    list_filter = ('is_used', 'requested_at')
    ordering = ('-requested_at',)
    list_display_links=("user" , "token")
    
admin.site.register(PasswordReset, PasswordResetAdmin)

class UserLoginHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'login_time', 'ip_address', 'user_agent')
    search_fields = ('user__username', 'ip_address')
    list_filter = ('login_time',)
    ordering = ('-login_time',)
    list_display_links=("user" , "login_time")
    
admin.site.register(UserLoginHistory, UserLoginHistoryAdmin)

class UserNotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'is_read', 'created_at', 'notification_type')
    search_fields = ('user__username', 'message')
    list_filter = ('is_read', 'notification_type', 'created_at')
    ordering = ('-created_at',)
    list_display_links=("user" , "message")
    
admin.site.register(UserNotification, UserNotificationAdmin)

class UserCouponAdmin(admin.ModelAdmin):
    list_display = ('user', 'code', 'discount_percentage', 'expiration_date', 'is_used')
    search_fields = ('user__username', 'code')
    list_filter = ('is_used', 'expiration_date')
    ordering = ('-expiration_date',)
    list_display_links=("user" , "discount_percentage" , "expiration_date")
    
    
admin.site.register(UserCoupon, UserCouponAdmin)

class UserActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'timestamp', 'ip_address')
    search_fields = ('user__username', 'action')
    list_filter = ('timestamp',)
    list_display_links=("user" , "action")
    
admin.site.register(UserActivity, UserActivityAdmin)
