from django.urls import path
from .views import (
    create_review_view, update_review_view, delete_review_view, get_reviews_view, get_user_reviews_view,
    add_review_image_view, remove_review_image_view,
    add_tag_to_review_view, remove_tag_from_review_view
)

urlpatterns = [
    
    path('api/reviews/', get_reviews_view, name='get_reviews'),  
    path('api/user/', get_user_reviews_view, name='get_user_reviews'), 
    path('api/create/', create_review_view, name='create_review'), 
    path('api/update/<int:review_id>/', update_review_view, name='update_review'), 
    path('api/reviews/delete/<int:review_id>/', delete_review_view, name='delete_review'),

    path('api/<int:review_id>/images/add/', add_review_image_view, name='add_review_image'), 
    path('reviews/images/delete/<int:image_id>/', remove_review_image_view, name='remove_review_image'),

    path('api/<int:review_id>/tags/add/', add_tag_to_review_view, name='add_tag_to_review'),
    path('api/<int:review_id>/tags/remove/', remove_tag_from_review_view, name='remove_tag_from_review'),
]
