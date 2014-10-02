/**
 * adding event listener functions to each object
 * 
 */

function detectMouseover(obj){
	var colour = getColour(obj.getAttr('typeOfObject'));
	obj.on('mouseover',function() {
		if (!selectLock) {
			clearInfo(); // TO REVERT, SIMPLY MOVE THIS LINE TO 'mouseout' EVENT DOWN BELOW, INSIDE if STMT
			this.fill(OBJ_HOVER_COLOUR);
			this.stroke(OBJ_HOVER_COLOUR);
			objLayer.drawScene();
			updateInfo(obj);
		}
	});
	obj.on('mouseup', function(){
		deselectObject();
		selectObject(this);
	});
	obj.on('mouseout',function() {
		if (!selectLock) {
			this.fill(colour);
			this.stroke(colour);
			objLayer.drawScene();
		}
	});
}

function selectObject (obj) {
	if (obj == null) {
		alert("Error: Object Not Found!");
		return;
	}
	clearInfo();
	clearSelection();

	clearColour();
	obj.fill(SELECT_COLOUR);
	obj.stroke(SELECT_STROKE_COLOUR);
	obj.strokeWidth(SELECT_STROKE_WIDTH);
	objLayer.drawScene();

	selection = obj;
	selectLock = true;
	updateInfo(obj);
	updateSelection();
}

function deselectObject () {
	clearColour();
	objLayer.drawScene();

	selection = null;
	selectLock = false;
	clearInfo();
	clearSelection();
}
