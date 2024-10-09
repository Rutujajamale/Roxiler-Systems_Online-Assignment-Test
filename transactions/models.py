from django.db import models

class Transaction(models.Model):
    product_title = models.CharField(max_length=255)
    product_description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date_of_sale = models.DateField()
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.product_title
