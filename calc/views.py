from django.shortcuts import render


def home(request):
    return render(request, 'calc/home.html')

def about(request):
    return render(request, 'calc/about.html', {'title': 'About'})

def instructions(request):
    return render(request, 'calc/instructions.html', {'title': 'instructions'})
