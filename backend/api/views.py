from django.contrib.auth import authenticate, get_user_model
from django.conf import settings
import math
import stripe
from users.models import Book, Wishlist
from .serializers import RegisterSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

stripe.api_key = settings.STRIPE_SECRET_KEY
User = get_user_model()


@api_view(['POST'])
def add_to_wishlist(request):
    book_id = request.data.get('bookId')
    token = request.data.get('token')

    try:
        user = Token.objects.get(key=token).user
    except Token.DoesNotExist:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    book = Book.objects.filter(book_identifier=book_id).first()
    if not book:
        book = Book.objects.create(
            book_identifier=book_id
        )

    check_wishlist_exist = Wishlist.objects.filter(user=user).first()
    if check_wishlist_exist:
        check_product_exist = book in [
            i.book_identifier for i in check_wishlist_exist.folder.all()]
        if not check_product_exist:
            check_wishlist_exist.folder.add(book)
    else:
        create_new = Wishlist.objects.create(user=user)
        create_new
        create_new.folder.add(book)

    return Response({"status": "Success"})


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'user': serializer.data,
        })


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user:
            token = Token.objects.get_or_create(user=user)
            return Response({
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                'token': user.auth_token.key
            })
        return Response({"error": 'Wrong Credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_dashboard_info(request):
    the_token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    try:
        token = Token.objects.get(key=the_token)
        if token.user != request.user:
            raise Token.DoesNotExist
    except Token.DoesNotExist:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    return Response('Shine...')


@api_view(['GET'])
def logout(request):
    the_token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    try:
        token = Token.objects.get(key=the_token)
    except Token.DoesNotExist:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user = User.objects.get(auth_token=token)
    if not user.email == 'demouser@gmail.com':
        user.auth_token.delete()
    data = {'success': 'Successfully logged out.'}
    return Response(data=data, status=status.HTTP_200_OK)


@api_view(['GET'])
def login_demo_user(request):
    try:
        user = User.objects.get(email='demouser@gmail.com')

    except User.DoesNotExist:
        user = User(
            first_name="Demo",
            last_name="User",
            email="demouser@gmail.com",
        )
        user.set_password("password123")
        user.save()

    token = Token.objects.get_or_create(user=user)
    return Response({
        'user_info': {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
        },
        'token': user.auth_token.key
    })


@api_view(['GET'])
def fetch_user(request):
    the_token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    try:
        token = Token.objects.get(key=the_token)
    except Token.DoesNotExist:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    response = {
        "first_name": token.user.first_name,
        "last_name": token.user.last_name,
        "email": token.user.email,
        'ok': True,
    }

    return Response(response)


@api_view(['GET'])
def check_authentication(request):
    the_token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    try:
        Token.objects.get(key=the_token)
    except Token.DoesNotExist:
        return Response({'authenticated': False})

    return Response({'authenticated': True})


@api_view(['POST'])
def save_stripe_info(request):
    data = request.data
    payment_method_id = data['payment_method_id']
    email = data['email']
    amount = math.ceil(data['amount'])
    user_info = data['userInfo']
    stay_duration = int(data['stayDuration'])
    room_apartment_slug = data['roomApartmentSlug']
    token = data['token']

    # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data

    if len(customer_data) == 0:
        # creating customer
        customer = stripe.Customer.create(
            email=email,
            payment_method=payment_method_id,
            invoice_settings={
                'default_payment_method': payment_method_id
            }
        )
    else:
        customer = customer_data[0]

    try:
        # creating paymentIntent
        payment_intent = stripe.PaymentIntent.create(
            customer=customer,
            payment_method=payment_method_id,
            currency='usd',
            amount=amount*100,
            confirm=True
        )

        # Only confirm an order after you have status: succeeded
        # should be succeeded
        if payment_intent['status'] == 'succeeded':
            print('successful payment...')

            return Response(status=status.HTTP_200_OK, data={
                'message': 'Success',
            })
        else:
            raise stripe.error.CardError

    except stripe.error.CardError as e:
        body = e.json_body
        err = body.get('error', {})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': err.get('message')
        })
    except stripe.error.RateLimitError as e:
        # Too many requests made to the API too quickly
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': "The API was not able to respond, try again."
        })
    except stripe.error.InvalidRequestError as e:
        # invalid parameters were supplied to Stripe's API
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': "Invalid parameters, unable to process payment."
        })
    except stripe.error.AuthenticationError as e:
        # Authentication with Stripe's API failed
        # (maybe you changed API keys recently)
        pass
    except stripe.error.APIConnectionError as e:
        # Network communication with Stripe failed
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': 'Network communication failed, try again.'
        })
    except stripe.error.StripeError as e:
        # Display a very generic error to the user, and maybe
        # send yourself an email
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': 'Internal Error, contact support.'
        })
    # Something else happened, completely unrelated to Stripe
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={
            'error': 'Unable to process payment, try again.'
        })
