from django.db import models

class MenuCategory(models.Model):
    menuCategoryId = models.AutoField(primary_key=True)  
    name = models.CharField(max_length=255, unique=True)  
    description = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)  

    def __str__(self):
        return self.name

class MenuItem(models.Model):
    menuItemId = models.AutoField(primary_key=True)  
    name = models.CharField(max_length=255)  
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)  
    category = models.ForeignKey(MenuCategory, on_delete=models.CASCADE, related_name="menu_items")  
    image = models.ImageField(upload_to='menu_items/', blank=True, null=True)  
    available = models.BooleanField(default=True)  
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return self.name
    
class MenuPromotion(models.Model):
    menuPromotionId = models.AutoField(primary_key=True)  
    name = models.CharField(max_length=255) 
    description = models.TextField(blank=True, null=True)  
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2)  
    start_date = models.DateTimeField()  
    end_date = models.DateTimeField() 
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE, related_name="promotions") 

    def __str__(self):
        return f'{self.name} - {self.discount_percentage}% off'
    

class MenuItemTag(models.Model):
    menuItemTagId = models.AutoField(primary_key=True)  
    name = models.CharField(max_length=255, unique=True)  
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    
class MenuItemTagAssignment(models.Model):
    menuItemTagAssignmentId = models.AutoField(primary_key=True)  
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE, related_name="tags")  
    tag = models.ForeignKey(MenuItemTag, on_delete=models.CASCADE, related_name="menu_items")  

    def __str__(self):
        return f'{self.menu_item.name} tagged as {self.tag.name}'
