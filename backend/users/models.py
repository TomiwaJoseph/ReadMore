from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractUser
)
from django.conf import settings


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')
        return self._create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """User model"""
    username = None
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True
    )
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_name(self):
        return super().get_full_name()

    def __str__(self):
        return self.first_name + " " + self.last_name


class Book(models.Model):
    name = models.CharField(max_length=100)
    isbn = models.CharField(max_length=13)
    has_cover = models.BooleanField(default=True)

    def __str__(self):
        return "{} - {}".format(self.name, self.isbn)


class Wishlist(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                                related_name="wishlist_owner", null=True)
    folder = models.ManyToManyField(Book, blank=True)

    def __str__(self):
        return "{}'s wishlist".format(self.user)


class OrderItem(models.Model):
    order = models.ForeignKey("Order", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    isbn = models.CharField(max_length=13)
    price = models.IntegerField()

    def __str__(self):
        return f"{self.name} for {self.price}"

    # def get_total_item_price(self):
    #     return self.quantity * self.product.price

    # def get_stripe_price(self):
    #     return self.product.price * 100


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    ref_code = models.CharField(max_length=25)
    products = models.ManyToManyField(
        OrderItem, blank=True, related_name='order_products')
