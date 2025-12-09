from django.shortcuts import get_object_or_404
from apps.users.models import User
from .models import Review, ReviewImage, Tag, ReviewTag

def create_review(user: User, rating: float, comment: str = None) -> Review:
    """Crée un nouvel avis pour un utilisateur."""
    review = Review.objects.create(user=user, rating=rating, comment=comment)
    return review

def update_review(review_id: int, rating: float = None, comment: str = None) -> Review:
    """Met à jour un avis existant."""
    review = get_object_or_404(Review, reviewId=review_id)
    if rating is not None:
        review.rating = rating
    if comment is not None:
        review.comment = comment
    review.save()
    return review

def delete_review(review_id: int) -> None:
    """Supprime un avis."""
    review = get_object_or_404(Review, reviewId=review_id)
    review.delete()

def get_reviews() -> list:
    """Retourne tous les avis."""
    return list(Review.objects.all())

def get_user_reviews(user: User) -> list:
    """Retourne les avis d’un utilisateur spécifique."""
    return list(user.reviews.all())

def add_review_image(review_id: int, image) -> ReviewImage:
    """Ajoute une image à un avis."""
    review = get_object_or_404(Review, reviewId=review_id)
    return ReviewImage.objects.create(review=review, image=image)

def remove_review_image(image_id: int) -> None:
    """Supprime une image associée à un avis."""
    image = get_object_or_404(ReviewImage, reviewImageId=image_id)
    image.delete()

def create_tag(name: str) -> Tag:
    """Crée un tag unique."""
    tag, _ = Tag.objects.get_or_create(name=name)
    return tag

def add_tag_to_review(review_id: int, tag_name: str) -> ReviewTag:
    """Associe un tag à un avis."""
    review = get_object_or_404(Review, reviewId=review_id)
    tag = create_tag(tag_name)
    return ReviewTag.objects.create(review=review, tag=tag)

def remove_tag_from_review(review_id: int, tag_name: str) -> None:
    """Supprime un tag d’un avis."""
    review = get_object_or_404(Review, reviewId=review_id)
    tag = get_object_or_404(Tag, name=tag_name)
    review_tag = get_object_or_404(ReviewTag, review=review, tag=tag)
    review_tag.delete()
