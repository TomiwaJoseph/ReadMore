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
    class Meta:
        model = Order
        fields = ["ref_code", "products"]


# class OrderDetailsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Order
#         fields = ["ref_code", "start_date", "billing_address",
#                   "alternative_billing_address",  "phone_number",
#                   "delivery_type", "payment_method",
#                   "being_processed", "delivered", ]
