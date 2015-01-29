# Data Viewer
---

## Setup
- Pull down the repository
- Make sure you have python and django installed
- Start the server `python manage.py runserver`

## Checklist
- (x) Write script to convert data from a mysql db to a json file
- (x) Build a list view in django for the data
- (x) Build an endpoints for the data that allows for pagination
- (x) Build an endpoints for the data that allows for querying
- (x) Implement pagination on the front end
- ( ) Search box
- ( ) Multiple css files
- ( ) Sorting

## Django endpoints handle querying and pagination
- Pagination: `/refgene/data/?offset=20000&limit=15`
- Query: `/refgene/?query=chr11&field=chrom`

## Things I would add
- Front-end caching layer for redundant requests
- Separate js connection class with possible pub/sub notification to update pagination and table redraw

## Things I would do differently
- Instead of having multiple css files for different themes, it might be better to have a theme body class that changes the styles of the children below it.  This way, similar styles stay DRY and you avoid an additional request when switching style groups.
- Right now, `refGene.json` is being parsed per request.  To improve performance, I would parse it once when the app initializes.
