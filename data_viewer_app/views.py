import json
from django.http import JsonResponse
from django.shortcuts import render


# Actions ---------------------------------------------------------------------

# GET '/refgene'
# Expect HTML response
def index(request):
    data = load_json()
    count = len(data)
    data = filter_query(request, data)
    data = filter_offset(request, data)
    data = filter_limit(request, data)
    data = filter_sort(request, data)
    data = { 'results': data, 'count': count }

    if request.is_ajax():
        return JsonResponse(data)
    else:
        return render(request, 'data_viewer_app/refgene.html', data)

# GET '/refgene?query=abcdef&field=name'
# Expect JSON response
def filter_query(request, data):
    query = request.GET.get('query')
    field = request.GET.get('field')
    if query is not None or field is not None:
        return filter((lambda item: item[field] == query), data)
    else:
        return data

# GET '/refgene?offset=10'
# Expect JSON response
def filter_offset(request, data):
    param = request.GET.get('offset')
    if param is not None:
        return data[int(param):len(data)]
    else:
        return data

# GET '/refgene?limit=2'
# Expect JSON response
def filter_limit(request, data):
    param = request.GET.get('limit')
    if param is not None:
        return data[:int(param)]
    else:
        return data

# GET '/refgene?sort=-chrom'
# GET '/refgene?sort=+name'
# Expect JSON response
def filter_sort(request, data):
    param = request.GET.get('sort')
    if param is not None:
        direction = param[0]
        field = param[1:len(param)]

        # return sorted array
    else:
        return data


# Helpers ---------------------------------------------------------------------

def load_json():
    data = json.load(open('refGene.json'))
    return data['refGene']
