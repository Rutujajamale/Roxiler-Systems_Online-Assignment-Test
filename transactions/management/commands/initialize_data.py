import requests
from django.core.management.base import BaseCommand
from transactions.models import Transaction

class Command(BaseCommand):
    help = 'Fetch data from API and initialize the database'

    def handle(self, *args, **kwargs):
        url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            for item in data:
                if 'product_title' in item:
                    Transaction.objects.create(
                        product_title=item['product_title'],
                        product_description=item.get('product_description', ''),
                        price=item.get('price', 0),
                        date_of_sale=item.get('date_of_sale', ''),
                        category=item.get('category', ''),
                        sold=item.get('sold', False)
                    )
                else:
                    self.stdout.write(self.style.WARNING(f'Missing product_title in item: {item}'))

            self.stdout.write(self.style.SUCCESS('Database initialized successfully!'))
        else:
            self.stdout.write(self.style.ERROR('Failed to fetch data from API'))
