from django.urls import path
from .views import get_user_addresses, register_user, login_user, update_profile, request_password_reset, create_user_role_view, create_notification_view , user_list , coupons_list , add_coupon , delete_coupon ,update_coupon , mark_coupon_as_used , coupon_details , get_user_notifications , get_users_notifications , getUserProfile , ContactMessageCreateView

urlpatterns = [
    path('api/user-addresses/', get_user_addresses, name='user-addresses'),
    path("api/users-list/" , user_list , name="users-list") , 
    path("api/register/", register_user, name="register"),
    path("api/login/", login_user, name="login"),
    path("api/update-profile/", update_profile, name="update_profile"),
    path("api/request-password-reset/", request_password_reset, name="request_password_reset"),
    path("api/create-role/", create_user_role_view, name="create_role"),
    path("api/create-notification/", create_notification_view, name="create_notification"),
    path("api/user-coupons/" , coupons_list , name="user-promotions") , 
    path("api/add-coupon/" , add_coupon , name="add-coupon") ,
    path("api/delete-coupon/" , delete_coupon , name="delete-coupon") ,
    path("api/update-coupon/" , update_coupon , name="update-coupon") ,
    path("api/mark-coupon-as-used/" , mark_coupon_as_used , name="mark-coupon-as-used") , 
    path("api/coupon-details/" , coupon_details , name="coupon-details") , 
    path("api/user-notifications/" , get_user_notifications , name="user-notifications") , 
    path("api/users-notifications/" , get_users_notifications , name="users-notifications") ,
    path("api/user-profile/" , getUserProfile , name="user-profile") ,
    path('api/contact/', ContactMessageCreateView.as_view(), name='contact-message-create'),
]
