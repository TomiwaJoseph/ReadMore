from django.contrib import admin
from django.utils import timezone
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, Wishlist, Book, OrderItem, Order


class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': (
            'is_active', 'is_staff', 'is_superuser',
            'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email', 'first_name', 'last_name')


class WishlistAdmin(admin.ModelAdmin):
    list_display = ['user']
    list_filter = ['user']


class BookAdmin(admin.ModelAdmin):
    list_display = ['name', 'isbn', 'has_cover']
    list_filter = ['name']


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['get_owner', 'title',  'author', 'isbn', 'price']
    list_filter = ['order']

    def get_owner(self, obj):
        return obj.order.user

    get_owner.short_description = 'Order Owner'


class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'ref_code']
    list_filter = ['user']


admin.site.register(CustomUser, UserAdmin)
admin.site.register(Wishlist)
admin.site.register(Book, BookAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Order, OrderAdmin)
