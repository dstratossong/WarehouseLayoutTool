// CONSTANTS
var WIDTH = warehouse.width;
var HEIGHT = warehouse.height;
var TILE_SIZE = warehouse.tileSize;
var WALL_COLOUR = '#3E3E53';
var AISLE_COLOUR = '#BAB986';
var SECTION_COLOUR = '#F8F7CF';
var STATION_COLOUR = '#434854';
var PORT_COLOUR = '#000039';
var BG_COLOUR = '#326598';
var LINE_COLOUR = '#D6BF9D';
var HOVER_COLOUR = '#08B1EB';
var OBJ_HOVER_COLOUR = '#08B1EB';
var SELECT_COLOUR = '#D20F34';
var SELECT_STROKE_COLOUR = '#F2F1F0';
var SELECT_STROKE_WIDTH = 3;

var PIX = 1;

function getColour (attr) {
	var retval;
	switch(attr){
	case "wall":
		retval = WALL_COLOUR;
		break;
	case "port":
		retval = PORT_COLOUR;
		break;
	case "aisle":
		retval = AISLE_COLOUR;
		break;
	case "section":
		retval = SECTION_COLOUR;
		break;
	case "station":
		retval = STATION_COLOUR;
		break;
	default:
		retval = 'white';
		break;
	}
	
	return retval;
}
