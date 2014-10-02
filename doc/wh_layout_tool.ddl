DROP TABLE wh_location CASCADE;
DROP TABLE wh_mapping CASCADE;

CREATE TABLE wh_mapping (
    wh_id                       INTEGER NOT NULL PRIMARY KEY references warehouse(warehouse_id),
    json_object                 TEXT NOT NULL
);

CREATE TABLE wh_location (
    wh_id                       INTEGER NOT NULL references wh_mapping(wh_id),
    aisle                       TEXT NOT NULL,
    section                     TEXT NOT NULL,
    shelf                       TEXT NOT NULL,
    total_segment               INTEGER NOT NULL,
    shelf_barcode               NUMERIC NOT NULL,
    segment                     TEXT NOT NULL,
    segment_barcode             NUMERIC PRIMARY KEY,
    dimensions                  TEXT,
    state                       TEXT
);

-- CREATE TYPE 

-- shelf_barcode is (aisle in ASCII code)*10^7 + (section)*10^4 + (shelf in arabic)*10
-- segment_barcode is shelf_barcode*1000 + segment*10
-- aisle is by upper case letters
-- section is by numbers
-- shelf is by lower case roman numerals
-- segments is by numbers
--- all of these are type TEXT (String)


GRANT SELECT, INSERT, UPDATE, DELETE ON wh_location TO testadmin;
GRANT SELECT, INSERT, UPDATE, DELETE ON wh_mapping TO testadmin;



