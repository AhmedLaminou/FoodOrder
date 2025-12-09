from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json
from .services import *

# 1./* --------------------------------- Gestion des avis (Review) -----------------------------------*

@login_required
@csrf_exempt
def create_review_view(request):
    """
    Crée un nouvel avis pour un utilisateur connecté.
    - Méthode : POST
    - Entrées :
        - rating : note de l'avis
        - comment : commentaire (optionnel)
    - Sortie : JSON confirmant la création avec l'ID de l'avis
    """
    if request.method == "POST":
        data = json.loads(request.body)
        rating = data.get('rating')
        comment = data.get('comment', "")
        review = create_review(request.user, rating, comment)
        return JsonResponse({'status': 'success', 'review_id': review.reviewId})

@login_required
@csrf_exempt
def update_review_view(request, review_id):
    """
    Met à jour un avis existant.
    - Méthode : PUT
    - Entrées :
        - rating : nouvelle note
        - comment : nouveau commentaire
    - Sortie : JSON confirmant la mise à jour avec l'ID de l'avis
    """
    if request.method == "PUT":
        data = json.loads(request.body)
        rating = data.get('rating')
        comment = data.get('comment')
        review = update_review(review_id, rating, comment)
        return JsonResponse({'status': 'updated', 'review_id': review.reviewId})

@login_required
@csrf_exempt
def delete_review_view(request, review_id):
    """
    Supprime un avis existant.
    - Méthode : DELETE
    - Entrées :
        - review_id : identifiant de l'avis à supprimer
    - Sortie : JSON confirmant la suppression
    """
    if request.method == "DELETE":
        delete_review(review_id)
        return JsonResponse({'status': 'deleted'})



@csrf_exempt
def get_reviews_view(request):
    """
    Récupère tous les avis du système.
    - Méthode : GET
    - Sortie : JSON contenant une liste des avis avec :
        - review_id
        - user (nom d'utilisateur)
        - rating
        - comment
    """
    reviews = get_reviews()
    reviews_data = [{'review_id': r.reviewId, 'user': r.user.username, 'rating': float(r.rating), 'comment': r.comment} for r in reviews]
    return JsonResponse({'reviews': reviews_data})

@login_required
def get_user_reviews_view(request):
    """
    Récupère les avis de l'utilisateur connecté.
    - Méthode : GET
    - Sortie : JSON contenant une liste des avis avec :
        - review_id
        - rating
        - comment
    """
    reviews = get_user_reviews(request.user)
    reviews_data = [{'review_id': r.reviewId, 'rating': float(r.rating), 'comment': r.comment} for r in reviews]
    return JsonResponse({'reviews': reviews_data})

# 2. /* ---------------------------------- Gestion des images (ReviewImage) -----------------------*

@login_required
@csrf_exempt
def add_review_image_view(request, review_id):
    """
    Ajoute une image à un avis spécifique.
    - Méthode : POST
    - Entrées :
        - image : fichier image
    - Sortie : JSON confirmant l'ajout de l'image avec son ID
    """
    if request.method == "POST":
        image = request.FILES.get('image')
        review_image = add_review_image(review_id, image)
        return JsonResponse({'status': 'success', 'image_id': review_image.reviewImageId})

@login_required
@csrf_exempt
def remove_review_image_view(request, image_id):
    """
    Supprime une image associée à un avis.
    - Méthode : DELETE
    - Entrées :
        - image_id : identifiant de l'image à supprimer
    - Sortie : JSON confirmant la suppression
    """
    if request.method == "DELETE":
        remove_review_image(image_id)
        return JsonResponse({'status': 'deleted'})

# 3. /* -------------------------------- Gestion des tags (Tag & ReviewTag) -------------------------------*

@login_required
@csrf_exempt
def add_tag_to_review_view(request, review_id):
    """
    Ajoute un tag (mot-clé) à un avis spécifique.
    - Méthode : POST
    - Entrées :
        - tag_name : nom du tag
    - Sortie : JSON confirmant l'ajout du tag avec son ID
    """
    if request.method == "POST":
        data = json.loads(request.body)
        tag_name = data.get('tag_name')
        review_tag = add_tag_to_review(review_id, tag_name)
        return JsonResponse({'status': 'tag added', 'tag_id': review_tag.reviewTagId})

@login_required
@csrf_exempt
def remove_tag_from_review_view(request, review_id):
    """
    Supprime un tag d'un avis.
    - Méthode : DELETE
    - Entrées :
        - tag_name : nom du tag à supprimer
    - Sortie : JSON confirmant la suppression du tag
    """
    if request.method == "DELETE":
        data = json.loads(request.body)
        tag_name = data.get('tag_name')
        remove_tag_from_review(review_id, tag_name)
        return JsonResponse({'status': 'tag removed'})
