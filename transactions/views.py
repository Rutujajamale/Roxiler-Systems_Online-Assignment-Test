from rest_framework import viewsets
from .models import Transaction
from .serializers import TransactionSerializer
from django.db.models import Count

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_statistics(self):
        total_sales = self.queryset.aggregate(total=Count('price'))['total']
        total_sold = self.queryset.filter(price__gt=0).count()
        total_not_sold = self.queryset.filter(price=0).count()

        return {
            'total_sales': total_sales,
            'total_sold': total_sold,
            'total_not_sold': total_not_sold,
        }

    def get_queryset(self):
        queryset = super().get_queryset()
        month = self.request.query_params.get('month')
        if month:
            queryset = queryset.filter(date_of_sale__month=month)
        return queryset
