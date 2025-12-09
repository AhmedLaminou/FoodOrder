from django.db import models
from apps.users.models import User
from apps.menu.models import MenuCategory, MenuItem


class Review(models.Model):
    reviewId = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    rating = models.DecimalField(max_digits=2, decimal_places=1, choices=[(x/2, x/2) for x in range(1, 11)])  
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE, related_name="reviews" ,default=1)
    menu_item_category = models.ForeignKey(MenuCategory , on_delete=models.CASCADE , related_name="reviews" , default=1)

    class Meta:
        unique_together = ('user',)

    def __str__(self):
        return f'Review #{self.reviewId} by {self.user.username}'


class ReviewImage(models.Model):
    reviewImageId = models.AutoField(primary_key=True)
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='review_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Image for review #{self.review.reviewId}'


class Tag(models.Model):
    tagId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class ReviewTag(models.Model):
    reviewTagId = models.AutoField(primary_key=True)
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name="tags")
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name="reviews")

    def __str__(self):
        return f'Tag "{self.tag.name}" for review #{self.review.reviewId}'
