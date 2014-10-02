/**
 * adding event listener functions to each object
 * 
 */

function detectMouseover(obj){
	var objType = obj.getAttr('typeOfObject');
	var colour = getColour(objType);
	obj.on('mouseover',function() {
		if (!selectLock) {
			clearInfo(); // TO REVERT, SIMPLY MOVE THIS LINE TO 'mouseout' EVENT DOWN BELOW, INSIDE if STMT
			this.fill(OBJ_HOVER_COLOUR);
			this.stroke(OBJ_HOVER_COLOUR);
			objLayer.drawScene();
			wallLayer.drawScene();
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
			wallLayer.drawScene();
		}
	});
}

function selectObject (obj) {
	if (obj == null){
		alert("object not found");
		return;
	}
	clearColour();
	obj.fill(SELECT_COLOUR);
	obj.stroke(SELECT_STROKE_COLOUR);
	obj.strokeWidth(SELECT_STROKE_WIDTH);
	objLayer.drawScene();
	wallLayer.drawScene();
	
	var objType = obj.getAttr('typeOfObject');
	
	if(objType !== "wall"){
		selection = obj;
		selectLock = true;
		updateInfo(obj);
		updateSelection();
	}
	
	if(clickInfo.isDelete == true && objType == clickInfo.editObject){
		removeTile(obj,objType);
		deselectObject();
	}else if(clickInfo.isEdit == true) {
		createUpdatingForm();
	}
}

function deselectObject () {
	clearColour();
	objLayer.drawScene();
	//obj.strokeWidth(0);
	
	selection = null;
	selectLock = false;
	clearInfo();
	clearSelection();
	resetUpdatingForm('hidden');
}
