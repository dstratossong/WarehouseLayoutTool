# CONFIGURING DATABASE

## Change "test" to database name
## Change "testadmin" to database username

psql -d test -U testadmin < ./doc/wh_layout_tool.ddl

# VIEW MODE USAGE

## viewMode.do simply retrieves warehouse 1
## viewMode.do takes parameters using GET method (inside url)

## Parameters: (any missing parameter will result in an HTML alert)

### actionName = retrieve                  specifies which warehouse (warehouseId)
####           | locateShelfBarcode        preselects a location in a warehouse
####           | locateSegmentBarcode      ~
####           | locateAisleSection        ~
####           | locateAisle               ~
####           | locateStation             ~
####           | locatePort                ~
####           | default                   retrieve warehouseId=1
####           | <anything else or null>   default

### warehouseId = <number>

### aisle = <number>

### section = <string>

### station = <number>

### port = <number>

### shelfBarcode = <long number>

### segmentBarcode = <long number>

