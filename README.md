# Data Viewer
---

## Django endpoints handle querying and pagination
- Query: `http://localhost:8000/data/?query=chr11&field=chrom`
- Pagination: `http://localhost:8000/data/?offset=20000&limit=10`

## Things I would add
- Front-end caching layer for redundant requests
- Sorting
- Search

## Things I would do differently
- Instead of having multiple css files for different themes, it might be better to have a theme body class that changes the styles of the children below it.  This way, similar styles stay DRY and you avoid an additional request when switching style groups.
