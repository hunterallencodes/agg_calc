from django.shortcuts import render


def home(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html', {'title': 'About'})

def instructions(request):
    return render(request, 'instructions.html', {'title': 'instructions'})
