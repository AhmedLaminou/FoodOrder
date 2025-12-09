from django.contrib.auth import get_user_model

from apps.reviews.models import Review
from .models import Profile, UserRole, Address, PasswordReset, UserLoginHistory, UserNotification, UserCoupon, UserActivity
from django.utils.crypto import get_random_string
from django.utils.timezone import now


User = get_user_model()

def get_all_users():
    return User.objects.all()


def create_user(username, email, password):
    user = User.objects.create_user(username=username, email=email, password=password)
    return user


def get_user_by_username(username):
    return User.objects.filter(username=username).first()


def update_user_profile(user, bio=None, profile_picture=None, address=None):
    profile, created = Profile.objects.get_or_create(user=user)
    if bio:
        profile.bio = bio
    if profile_picture:
        profile.profile_picture = profile_picture
    if address:
        profile.address = address
    profile.save()
    return profile


def create_user_role(name, description):
    role = UserRole.objects.create(name=name, description=description)
    return role


def create_address(user, street, city, postal_code, country, address_type):
    address = Address.objects.create(
        user=user, street=street, city=city, postal_code=postal_code, country=country, address_type=address_type
    )
    return address


def generate_password_reset_token(user):
    token = get_random_string(64)
    reset_entry = PasswordReset.objects.create(user=user, token=token)
    return reset_entry


def log_user_login(user, ip_address, user_agent):
    login_entry = UserLoginHistory.objects.create(user=user, ip_address=ip_address, user_agent=user_agent)
    return login_entry


def create_notification(user, message, notification_type):
    notification = UserNotification.objects.create(user=user, message=message, notification_type=notification_type)
    return notification


def create_coupon(user, code, discount_percentage, expiration_date):
    coupon = UserCoupon.objects.create(user=user, code=code, discount_percentage=discount_percentage, expiration_date=expiration_date)
    return coupon


def log_user_activity(user, action, ip_address):
    activity = UserActivity.objects.create(user=user, action=action, ip_address=ip_address)
    return activity

def get_all_reviews():
    """
    Cette fonction récupère tous les avis du système.
    
    Retourne :
        - Une QuerySet contenant tous les avis.
    """
    return Review.objects.all()
