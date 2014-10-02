/*ACTION DETECTOR BEGINS*/
/**
 * Kinetic Layer that detects mouse events and triggers actions
 */
var actionDetector = new Kinetic.Layer();

function resetClickInfo(){
	clickInfo.mousedown.x = 0;
	clickInfo.mousedown.y = 0;
	clickInfo.mouseup.x = 0;
	clickInfo.mouseup.y = 0;
	clickInfo.mousecurr.x = 0;
	clickInfo.mousecurr.y = 0;
	clickInfo.isDown = false;
	clickInfo.isUp = false;
	clickInfo.holding = false;
}

var clickInfo = {
	"enabled":false,
	"mousedown": {"x":"0","y":"0"},
	"isDown": false,
	"mouseup": {"x":"0","y":"0","gX":"0","gY":"0"},
	"isUp": false,
	"mousecurr" : {"x":"0","y":"0"},
	"holding": false,
	"isInsert": false,
	"isDelete": false,
	"isEdit": false,
	"editObject": ""
} 

actionDetector.on('mousedown', function () {
	deselectObject();
	if(clickInfo.enabled == true){
		if(clickInfo.holding  == true){
			var mousePos = stage.getPointerPosition();
			clickInfo.holding = false;
			var mousePos = stage.getPointerPosition();
			var x = mousePos.x - (mousePos.x)%TILE_SIZE;
			var y = mousePos.y - (mousePos.y)%TILE_SIZE;
			clickInfo.mousedown = {"x":x,"y":y};
			clickInfo.isDown = true;
		}else{
			var mousePos = stage.getPointerPosition();
			clickInfo.holding = true;
			var mousePos = stage.getPointerPosition();
			var x = mousePos.x - (mousePos.x)%TILE_SIZE;
			var y = mousePos.y - (mousePos.y)%TILE_SIZE;
			clickInfo.mousedown = {"x":x,"y":y};
			clickInfo.isDown = true;
			if (clickInfo.isInsert == true){
				addNewTile(clickInfo.editObject);
			}
		}
	}
});
actionDetector.on('mousemove', function() {
	if (clickInfo.holding == true) {
		var mousePos = stage.getPointerPosition();
		clickInfo.holding = true;
		var x = mousePos.x - (mousePos.x)%TILE_SIZE;
		var y = mousePos.y - (mousePos.y)%TILE_SIZE;
		clickInfo.mousecurr = {"x":x,"y":y};
		clickInfo.isDown = true;
		if (clickInfo.isInsert == true){
			addNewTile(clickInfo.editObject);
		}
	}
});
actionDetector.on('mouseup', function () {
	if (clickInfo.holding  == true) {
		var mousePos = stage.getPointerPosition();
		clickInfo.holding = false;
		var x = mousePos.x - (mousePos.x)%TILE_SIZE;
		var y = mousePos.y - (mousePos.y)%TILE_SIZE;
		
		var gridX = mousePos.x - x;
		var gridY = mousePos.y - y;
		clickInfo.mouseup.gX = (gridX > TILE_SIZE/2)?1:0;
		clickInfo.mouseup.gY = (gridY > TILE_SIZE/2)?1:0;
		clickInfo.mouseup.x = x;
		clickInfo.mouseup.y = y;
		
		clickInfo.isUp = true;
		if (clickInfo.isInsert == true){
			addNewTile(clickInfo.editObject);
		}
	} else{
		resetClickInfo();
	}
}); 

/*ACTION DETECTOR ENDS*/