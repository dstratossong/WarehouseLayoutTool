/**
 * 
 */

function updateInfo (obj) {
	var attr = obj.getAttr("typeOfObject");
	switch(attr) {
	case "aisle":
		var listOfSections = getSections(obj.getAttr('aisleId'));
		var outputStr = arrayToString(listOfSections);
		
/*		document.getElementById("aisleLabel").style.visibility = "visible";
		document.getElementById("sectionLabel").style.visibility = "visible";
		document.getElementById("stationLabel").style.visibility = "hidden";
		document.getElementById("portLabel").style.visibility = "hidden";
		
		document.getElementById("aisleSelect").innerHTML = obj.getAttr('aisleId');
		document.getElementById("sectionSelect").innerHTML = outputStr;
		document.getElementById("stationSelect").innerHTML = "";
		document.getElementById("portSelect").innerHTML = "";
*/		
		document.getElementById("infoSpan").innerHTML = "Aisle: " + obj.getAttr('aisleId') + "<br />\n" + 
														"Sections " + outputStr;
		break;
	case "section":
/*		document.getElementById("aisleLabel").style.visibility = "visible";
		document.getElementById("sectionLabel").style.visibility = "visible";
		document.getElementById("stationLabel").style.visibility = "hidden";
		document.getElementById("portLabel").style.visibility = "hidden";
		
		document.getElementById("aisleSelect").innerHTML = obj.getAttr('aisleId');
		document.getElementById("sectionSelect").innerHTML = obj.getAttr('sectionId');
		document.getElementById("stationSelect").innerHTML = "";
		document.getElementById("portSelect").innerHTML = "";
*/		
		document.getElementById("infoSpan").innerHTML = "Aisle: " + obj.getAttr('aisleId') + "<br />\n" + 
														"Section: " + obj.getAttr('sectionId');
		break;
	case "station":
/*		document.getElementById("aisleLabel").style.visibility = "hidden";
		document.getElementById("sectionLabel").style.visibility = "hidden";
		document.getElementById("stationLabel").style.visibility = "visible";
		document.getElementById("portLabel").style.visibility = "hidden";
		
		document.getElementById("aisleSelect").innerHTML = "";
		document.getElementById("sectionSelect").innerHTML = "";
		document.getElementById("stationSelect").innerHTML = obj.getAttr('stationId');
		document.getElementById("portSelect").innerHTML = "";
*/
		document.getElementById("infoSpan").innerHTML = "Station: " + obj.getAttr('stationId');
		break;
	case "port":
/*		document.getElementById("aisleLabel").style.visibility = "hidden";
		document.getElementById("sectionLabel").style.visibility = "hidden";
		document.getElementById("stationLabel").style.visibility = "hidden";
		document.getElementById("portLabel").style.visibility = "visible";
		
		document.getElementById("aisleSelect").innerHTML = "";
		document.getElementById("sectionSelect").innerHTML = "";
		document.getElementById("stationSelect").innerHTML = "";
		document.getElementById("portSelect").innerHTML = obj.getAttr('portId');
*/
		document.getElementById("infoSpan").innerHTML = "Port: " + obj.getAttr('portId');
		break;
	default:
		break;
	}
}

function clearInfo () {
/*	document.getElementById("aisleLabel").style.visibility = "hidden";
	document.getElementById("sectionLabel").style.visibility = "hidden";
	document.getElementById("stationLabel").style.visibility = "hidden";
	document.getElementById("portLabel").style.visibility = "hidden";
	
	document.getElementById("aisleSelect").innerHTML = "";
	document.getElementById("sectionSelect").innerHTML = "";
	document.getElementById("stationSelect").innerHTML = "";
	document.getElementById("portSelect").innerHTML = "";
*/
	document.getElementById("infoSpan").innerHTML = "";
}

function updateSelection () {
	// temp
/*	document.getElementById("selectLabel").style.visibility = "visible";
	document.getElementById("selectSelect").innerHTML = selection.id();
*/	
	document.getElementById("selectSpan").innerHTML = "Selection: " + selection.id() + "\n";
	if (selection.getAttr("typeOfObject") === "section") {
		var status = getShelfToString(selection.getAttr("aisleId"), selection.getAttr("sectionId"));
		if (status !== "") {
/*			document.getElementById("shelfStatus").style.visibility = "visible";
			document.getElementById("shelfInfo").innerHTML = status;
*/
			document.getElementById("statusSpan").innerHTML = "<fieldset>\n" + 
															  "<legend><em>Status</em></legend>\n" +
															  status + "\n" +
															  "</fieldset>";
		}
	}
}


function clearSelection () {
/*	document.getElementById("selectLabel").style.visibility = "hidden";
	document.getElementById("selectSelect").innerHTML = "";
	
	document.getElementById("shelfStatus").style.visibility = "hidden";
	document.getElementById("shelfInfo").innerHTML = "";
*/
	document.getElementById("selectSpan").innerHTML = "Selection: none";
	document.getElementById("statusSpan").innerHTML = "";
}

// gets an array of section objects with aisleId equal to aisleId
function getSections (aisleId) {
	return sections.getChildren(function(obj){
		return obj.getAttr('aisleId') === aisleId;
	}).toArray();
}

function getAisle (aisleId) {
	var retval = aisles.getChildren(function(obj){
		return obj.getAttr('aisleId') === aisleId;
	}).toArray();
	return retval.length == 0 ? null : retval[0];
}

function getSection (aisleId, sectionId) {
	var retval = sections.getChildren(function(obj){
		return obj.getAttr('aisleId') === aisleId
				&& obj.getAttr('sectionId') === sectionId;
	}).toArray();
	return retval.length == 0 ? null : retval[0];
}

function getPort (portId) {
	var retval = ports.getChildren(function(obj){
		return obj.getAttr('portId') === portId;
	}).toArray();
	return retval.length == 0 ? null : retval[0];
}

function getStation (stationId) {
	var retval = stations.getChildren(function(obj){
		return obj.getAttr('stationId') === stationId;
	}).toArray();
	return retval.length == 0 ? null : retval[0];
}

function getShelfToString (aisleId, sectionId) {
	var retval = "";
	for (var i = 0; i < shelves.length; i ++) {
		if (shelves[i].aisleId === aisleId
				&& shelves[i].secId === sectionId) {
			retval += "Shelf " + shelves[i].shelfId + ", " + shelves[i].segNum + " segments <br />\n"; 
			// ADD RETRIEVE BUTTON HERE
		}
	}
	return retval;
}

// only for array of sections
function arrayToString (array) {
	var arrLength = array.length;
	var retval = "available: ";
	for (var i = 0; i < arrLength; i ++) {
		retval += array[i].getAttr('sectionId') + ' ';
	}
	return retval;
}


document.getElementById('zoomIn').addEventListener('click',function(){
	warehouse.tileSize += 4;
	adjustZoom();
},false);

document.getElementById('zoomOut').addEventListener('click',function(){
	warehouse.tileSize -= 4;
	adjustZoom();
},false);

function adjustZoom(){
	// update gridline points
	var gridLines = grid.getChildren();
	for(var i = 0; i<gridLines.length; i++){
		var pts = gridLines[i].getAttr('points');
		for(var j = 0; j<pts.length; j++){
			pts[j] /= TILE_SIZE;
			pts[j] *= warehouse.tileSize;
		}
	}
	// update wall points
	var wallLines = walls.getChildren();
	for(var i = 0; i<wallLines.length; i++){
		var pts = wallLines[i].getAttr('points');
		var thisId = wallLines[i].getAttr('id').split(":");
		var newId = thisId[0] + ":";
		var idPts = thisId[1].split(",");
		for(var j = 0; j<pts.length; j++){
			var newPt = idPts[j]
			newPt /= TILE_SIZE;
			newPt *= warehouse.tileSize;
			newId += (j==0)? newPt : "," + newPt;
		}
		wallLines[i].setAttr('id', newId);
	}
	
	TILE_SIZE = warehouse.tileSize;
	// update action detector
	var foreground = actionDetector.getChildren();
	foreground[0].setAttr('width',WIDTH*TILE_SIZE);
	foreground[0].setAttr('height',HEIGHT*TILE_SIZE);
	
	
	
	
	confirmFunc();
}

















