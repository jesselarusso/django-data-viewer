import json

from django.http import JsonResponse

def index(request):
    data = json.load(open('colors.json'))
    return JsonResponse(data)
