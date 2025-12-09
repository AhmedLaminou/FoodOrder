from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import ContactMessage

from.models import Profile

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "date_joined", "is_active"]

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    addresses = serializers.SerializerMethodField()
    profile_picture = serializers.SerializerMethodField() 
    
    class Meta:
        model = Profile
        fields = ["user", "bio", "profile_picture", "addresses"]
        
    def get_addresses(self, obj):
        return [
            {
                "street": address.street,
                "city": address.city,
                "postal_code": address.postal_code,
                "country": address.country,
                "address_type": address.address_type,
            }
            for address in obj.addresses.all()
        ]
    
    def get_profile_picture(self, obj):
        request = self.context.get("request")
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url) if request else obj.profile_picture.url
        return None

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'



