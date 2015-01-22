import json
from django.http import JsonResponse


# /
# ?limit=2
# ?limit=2&offset=10
# ?sort=-chrom
# ?sort=+name
# ?query=abcdef&field=name
def index(request):
    data = load_json()
    data = offset(request, data)
    data = limit(request, data)
    data = sort(request, data)

    # query = request.GET.get('query')
    # field = request.GET.get('field')

    return JsonResponse({ 'colors': data })


def load_json():
    data = json.load(open('colors.json'))
    return data['colorsArray']


def offset(request, data):
    param = request.GET.get('offset')
    if param is not None:
        return data[int(param):len(data)]
    else:
        return data


def limit(request, data):
    param = request.GET.get('limit')
    if param is not None:
        return data[:int(param)]
    else:
        return data

def sort(request, data):
    param = request.GET.get('sort')
    if param is not None:
        direction = param[0]
        field = param[1:len(param)]

        # return sorted array
    else:
        return data
