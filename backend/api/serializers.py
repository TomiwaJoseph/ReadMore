from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.models import Book, Order, OrderItem

User = get_user_model()


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name',
                  'email', 'password']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate_email(self, email):
        existing_emails = User.objects.filter(email=email).first()
        if existing_emails:
            raise serializers.ValidationError(
                "User with this email already exist. Wasn't you?")
        return email


class OrderSerializer(serializers.ModelSerializer):
    detail = serializers.SerializerMethodField()

    def get_detail(self, obj):
        order_item_query = OrderItem.objects.filter(
            order=obj
        )
        details = []
        if order_item_query:
            for order_item in order_item_query:
                book_dict = {}
                book_dict['title'] = order_item.title
                book_dict['author'] = order_item.author
                book_dict['isbn'] = order_item.isbn
                book_dict['price'] = order_item.price
                book_dict['has_cover'] = order_item.has_cover
                details.append(book_dict)

        return details

    class Meta:
        model = Order
        fields = ["ref_code", 'detail']
