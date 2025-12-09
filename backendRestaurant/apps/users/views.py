from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator 
from .services import *
import json
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .serializers import UserSerializer, ProfileSerializer , ContactMessageSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication  
import traceback

from rest_framework.authentication import TokenAuthentication


@csrf_exempt
def get_user_addresses(request):
    users = get_user_model().objects.all()
    addresses_list = []

    for user in users:
        user_addresses = user.address_set.all()

        for address in user_addresses:
            addresses_list.append({
                "addressId": address.addressId,
                "username": user.username,
                "street": address.street,
                "city": address.city,
                "postal_code": address.postal_code,
                "country": address.country,
                "address_type": address.address_type
            })

    return JsonResponse({"addresses": addresses_list})

@api_view(["GET"])
def user_list(request):
    """
    Récupère la liste de tous les utilisateurs connnectés de la base de données.
    - Méthode : GET
    - Sortie : JSON contenant les données des utilisateurs, sérialisées via UserSerializer.
    """
    users = get_all_users()
    print(" This is a SQL request executed : " + str(users.query))
    print(" The numbers of users fetched  is : ", users.count())
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@csrf_exempt
def login_user(request):
    """
    Permet de connecter un utilisateur à l'application.
    
    - Méthode : POST
    - Entrée : JSON contenant les champs suivants :
        - username : Nom d'utilisateur
        - password : Mot de passe
    - Sortie : JSON contenant un message de succès ou d'erreur selon les identifiants fournis.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            
            if not username or not password:
                return JsonResponse({"error": "Username and password are required"}, status=400)
            
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                # Generate JWT tokens
                from rest_framework_simplejwt.tokens import RefreshToken
                refresh = RefreshToken.for_user(user)
                
                response_data = {
                    "message": "Login successful",
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "username": user.username,
                    "user_id": user.userId,
                    "is_admin": user.is_admin
                }
                
                return JsonResponse(response_data)
            else:
                return JsonResponse({"error": "Invalid username or password"}, status=401)
                
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            print(f"Login error: {str(e)}")
            traceback.print_exc() 
            return JsonResponse({"error": "An error occurred during login"}, status=500)
            
    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def register_user(request):
    """
    Permet d'inscrire un nouvel utilisateur dans la base de données.
    
    - Méthode : POST
    - Entrée : JSON contenant les champs suivants :
        - username : Nom d'utilisateur
        - email : Adresse email
        - password : Mot de passe
    - Sortie : JSON contenant un message de confirmation et l'ID de l'utilisateur créé.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("Registration attempt for user:", data.get("username"))
            user = create_user(data["username"], data["email"], data["password"])
            print("User created successfully:", user)
            return JsonResponse({
                "message": "User created successfully",
                "user_id": user.id if hasattr(user, 'id') else user.pk
            })
        except json.JSONDecodeError:
            print("Invalid JSON data received")
            return JsonResponse({"message": "Invalid JSON data"}, status=400)
        except KeyError as e:
            print(f"Missing required field: {str(e)}")
            return JsonResponse({"message": f"Missing required field: {str(e)}"}, status=400)
        except Exception as e:
            print(f"Registration error: {str(e)}")
            return JsonResponse({"message": str(e)}, status=400)


@csrf_exempt
def update_profile(request):
    """
    Permet de modifier les informations du profil d'un utilisateur.
    
    - Méthode : POST
    - Entrée : JSON contenant les champs suivants :
        - username : Nom d'utilisateur
        - bio (optionnel) : Biographie de l'utilisateur
        - profile_picture (optionnel) : URL de la photo de profil
        - address (optionnel) : Adresse de l'utilisateur
    - Sortie : JSON contenant un message de confirmation et l'ID du profil mis à jour.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        user = get_user_by_username(data["username"])
        if not user:
            return JsonResponse({"error": "User not found"}, status=404)
        profile = update_user_profile(user, data.get("bio"), data.get("profile_picture"), data.get("address"))
        return JsonResponse({"message": "Profile updated successfully", "profile_id": profile.profileId})


@csrf_exempt
def request_password_reset(request):
    """
    Permet de générer un token de réinitialisation de mot de passe pour un utilisateur.
    
    - Méthode : POST
    - Entrée : JSON contenant le champ suivant :
        - username : Nom d'utilisateur
    - Sortie : JSON contenant un message de confirmation et le token généré pour la réinitialisation du mot de passe.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        user = get_user_by_username(data["username"])
        if not user:
            return JsonResponse({"error": "User not found"}, status=404)
        reset_entry = generate_password_reset_token(user)
        return JsonResponse({"message": "Password reset token generated", "token": reset_entry.token})


@csrf_exempt
def create_user_role_view(request):
    """
    Permet de créer un nouveau rôle d'utilisateur dans le système.
    
    - Méthode : POST
    - Entrée : JSON contenant les champs suivants :
        - name : Nom du rôle
        - description : Description du rôle
    - Sortie : JSON contenant un message de confirmation et l'ID du rôle créé.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        role = create_user_role(data["name"], data["description"])
        return JsonResponse({"message": "Role created successfully", "role_id": role.roleId})


@csrf_exempt
def create_notification_view(request):
    """
    Permet de créer une notification pour un utilisateur.
    
    - Méthode : POST
    - Entrée : JSON contenant les champs suivants :
        - username : Nom d'utilisateur du destinataire
        - message : Message de la notification
        - notification_type : Type de la notification (ex : 'info', 'warning')
    - Sortie : JSON contenant un message de confirmation et l'ID de la notification créée.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        user = get_user_by_username(data["username"])
        if not user:
            return JsonResponse({"error": "User not found"}, status=404)
        notification = create_notification(user, data["message"], data["notification_type"])
        return JsonResponse({"message": "Notification created", "notification_id": notification.notificationId})


@csrf_exempt
def get_reviews_view(request):
    """
    Récupère tous les avis du système.
    
    - Méthode : GET
    - Sortie : JSON contenant une liste des avis avec les informations suivantes :
        - review_id : ID de l'avis
        - user : Nom d'utilisateur qui a laissé l'avis
        - rating : Note attribuée dans l'avis
        - comment : Commentaire associé à l'avis
    """
    if request.method == "GET":
        reviews = get_all_reviews()
        review_data = [{"review_id": review.id, "user": review.user.username, "rating": review.rating, "comment": review.comment} for review in reviews]
        return JsonResponse({"reviews": review_data})

#/*---------------- Profile -------------------------------------*/

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    try:
        user = request.user
        return Response({
            'user': {
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            },
            'bio': getattr(user, 'bio', ''),
            'address': getattr(user, 'address', ''),
            'profile_picture': None  # Add profile picture URL if you have one
        })
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    profile = get_object_or_404(Profile, user=request.user)
    data = request.data
    profile.bio = data.get('bio', profile.bio)
    profile.profile_picture = data.get('profile_picture', profile.profile_picture)
    profile.save()
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllProfiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@csrf_exempt

def coupons_list(request):
    """Récupérer toutes les promotions de l'utilisateur connecté."""
    user = request.user
    coupons = UserCoupon.objects.filter(user=user)

    paginator = Paginator(coupons, 10) 
    page_number = request.GET.get('page')  
    page_obj = paginator.get_page(page_number)

    data = [
        {
            "couponId": coupon.couponId,
            "code": coupon.code,
            "discount_percentage": coupon.discount_percentage,
            "expiration_date": coupon.expiration_date,
            "is_used": coupon.is_used,
        }
        for coupon in page_obj
    ]

    return JsonResponse({
        'coupons': data,
        'total_pages': paginator.num_pages,
        'current_page': page_obj.number,
    })

@login_required
def add_coupon(request):
    if request.method == 'POST':
        code = request.POST.get('code')
        discount_percentage = request.POST.get('discount_percentage')
        expiration_date = request.POST.get('expiration_date')

        if code and discount_percentage and expiration_date:
            user_coupon = UserCoupon(
                user=request.user,
                code=code,
                discount_percentage=discount_percentage,
                expiration_date=expiration_date
            )
            user_coupon.save()

            return JsonResponse({'message': 'Coupon added successfully!'}, status=201)
        else:
            return JsonResponse({'error': 'Missing fields!'}, status=400)
        

@login_required
def delete_coupon(request, coupon_id):
    coupon = get_object_or_404(UserCoupon, couponId=coupon_id, user=request.user)
    coupon.delete()
    return JsonResponse({'message': 'Coupon deleted successfully!'}, status=200)

@login_required
def update_coupon(request, coupon_id):
    coupon = get_object_or_404(UserCoupon, couponId=coupon_id, user=request.user)

    if request.method == 'POST':
        new_code = request.POST.get('code', coupon.code)
        new_discount = request.POST.get('discount_percentage', coupon.discount_percentage)
        new_expiration = request.POST.get('expiration_date', coupon.expiration_date)

        coupon.code = new_code
        coupon.discount_percentage = new_discount
        coupon.expiration_date = new_expiration
        coupon.save()

        return JsonResponse({'message': 'Coupon updated successfully!'}, status=200)
    
@login_required
def mark_coupon_as_used(request, coupon_id):
    coupon = get_object_or_404(UserCoupon, couponId=coupon_id, user=request.user)

    if coupon.is_used:
        return JsonResponse({'message': 'This coupon has already been used!'}, status=400)

    coupon.is_used = True
    coupon.save()

    return JsonResponse({'message': 'Coupon marked as used!'}, status=200)

@csrf_exempt
@login_required
def coupon_details(request, coupon_id):
    coupon = get_object_or_404(UserCoupon, couponId=coupon_id, user=request.user)

    data = {
        'couponId': coupon.couponId,
        'code': coupon.code,
        'discount_percentage': coupon.discount_percentage,
        'expiration_date': coupon.expiration_date,
        'is_used': coupon.is_used,
    }

    return JsonResponse(data, status=200)

# /*------------------------ Notifications ---------------------*/
def send_notification_to_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        message = request.POST.get('message')
        notification_type = request.POST.get('notification_type', 'general')
        
        # Création de la notification
        notification = UserNotification.objects.create(
            user=user,
            message=message,
            notification_type=notification_type
        )
        
        return JsonResponse({"status": "success", "message": "Notification sent to user"})
    except User.DoesNotExist:
        return JsonResponse({"status": "error", "message": "User not found"})

def send_notification_to_all_users(request):
    message = request.POST.get('message')
    notification_type = request.POST.get('notification_type', 'general')

    users = User.objects.all()
    for user in users:
        UserNotification.objects.create(
            user=user,
            message=message,
            notification_type=notification_type
        )

    return JsonResponse({"status": "success", "message": "Notification sent to all users"})
@csrf_exempt

def get_user_notifications(request):
    try:
        user = request.user 
        notifications = UserNotification.objects.filter(user=user).order_by('-created_at')
        
        notifications_data = [
            {
                "notificationId": notification.notificationId,
                "message": notification.message,
                "is_read": notification.is_read,
                "created_at": notification.created_at,
                "notification_type": notification.notification_type,
            }
            for notification in notifications
        ]
        
        return JsonResponse({"status": "success", "notifications": notifications_data} , safe=False)
    
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)})


@csrf_exempt
def get_users_notifications(request):
    try:
       
        if not request.user.is_superuser:
            return JsonResponse({"status": "error", "message": "Unauthorized access."})
        
        notifications = UserNotification.objects.all().order_by('-created_at')
        
        notifications_data = [
            {
                "notificationId": notification.notificationId,
                "user": notification.user.username,
                "message": notification.message,
                "is_read": notification.is_read,
                "created_at": notification.created_at,
                "notification_type": notification.notification_type,
            }
            for notification in notifications
        ]
        
        return JsonResponse({"status": "success", "notifications": notifications_data} , safe=False)
    
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)})

class ContactMessageCreateView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "message": "Message envoyé avec succès."}, status=status.HTTP_201_CREATED)
        return Response({"status": "error", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
