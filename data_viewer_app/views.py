import json
from django.http import JsonResponse


# /
# ?limit=2
# ?limit=2&offset=10
# ?sort=-chrom
# ?sort=+name
# ?query=abcdef&field=name
def index(request):

    # offset = request.GET.get('offset')
    # sort = request.GET.get('sort')
    # query = request.GET.get('query')
    # field = request.GET.get('field')

    data = load_json()
    data = limit(request, data)

    return JsonResponse({ 'colors': data })


def load_json():
    data = json.load(open('colors.json'))
    return data['colorsArray']


def limit(request, data):
    limit = request.GET.get('limit')
    if limit is not None:
        return data[:int(limit)]
    else:
        return data
