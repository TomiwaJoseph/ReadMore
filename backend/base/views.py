from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def get_single_book(request, book_name, book_isbn):
    return render(request, 'index.html')
