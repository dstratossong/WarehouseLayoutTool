<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" language="java" session="true" %>

<%@ taglib prefix="bean" uri="/WEB-INF/struts-bean.tld" %>
<%@ taglib prefix="html" uri="/WEB-INF/struts-html.tld" %>
<%@ taglib prefix="logic" uri="/WEB-INF/struts-logic.tld" %>

<jsp:useBean id="editForm" scope="request" class="com.warehouselayout.web.form.WarehouseLayoutForm" />

<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
<meta content="utf-8" http-equiv="encoding">

<html>
<head><title>Warehouse Layout Tool: Edit Mode</title></head>
<body style="overflow:auto; background-color:#326598;">
	<div id="container" style="position:absolute;"></div>
	<div id="info" style="position:fixed; width:300px; right:5px; top:5%; background-color:#F2E8C9; border: 2px solid; padding: 7px">
		<fieldset style="height:300px">
			<legend><em>Details</em></legend>
			<span id="zoomSpan">
				<input type="button" id="zoomIn" value="Zoom In" />
				<input type="button" id="zoomOut" value="Zoom Out" />
			</span><br />
			<span id="unitsSpan"></span><br />
			<span id="heightSpan"></span><br />
			<span id="widthSpan"></span><br />
			<span id="areaSpan"></span><br />
			<span id="selectSpan"></span><br />
			<span id="infoSpan"></span><br />
			<span id="statusSpan"></span><br />
		</fieldset>
		
		<br />
		
		<fieldset>
			<legend><em>Locate</em></legend>
			<fieldset><div><form action="javascript:inputShelfBarcode()" name="shelfBarcode" style="margin:0">
				Shelf barcode: <br />
				<input type="text" name="barcode" size="15" /><input type="submit" value="Submit" style="float:right" />
			</form></div></fieldset><br />
			<fieldset><div><form action="javascript:inputSegmentBarcode()" name="segmentBarcode" style="margin:0">
				Segment barcode: <br />
				<input type="text" name="barcode" size="15" /><input type="submit" value="Submit" style="float:right" />
			</form></div></fieldset><br />
			<fieldset><div><form action="javascript:inputAisleSection()" name="aisleSection" style="margin:0">
				Aisle: <input type="text" name="aisle" size="2"/>
				Section: <input type="text" name="section" size="3"/><input type="submit" value="Submit" style="float:right" />
			</form></div></fieldset><br />
			<fieldset><div><form action="javascript:inputPort()" name="port" style="margin:0">
				Port: <input type="text" name="port" size="15"/><input type="submit" value="Submit" style="float:right" />
			</form></div></fieldset><br />
			<fieldset><div><form action="javascript:inputStation()" name="station" style="margin:0">
				Station: <input type="text" name="station" size="13"/><input type="submit" value="Submit" style="float:right" />
			</form></div></fieldset>
		</fieldset>
		<br />
		
		<fieldset style="bottom:10px;">
			<div style="float:right; width:100%">
				<fieldset>
					<legend><em>Current Action: </em></legend>
					<span id="selectedAction"></span><br />
				</fieldset>
			</div>
			<select id="action" style="float:left;width:48%">
				<option id="action" value="view">View</option>
				<option id="action" value="insert">Insert</option>
				<option id="action" value="edit">Edit</option>
				<option id="action" value="delete">Delete</option>
			</select>
			<select id="editChoice" style="float:right;width:48%;visibility:hidden;">
				<option id="editChoice" value="wall">Walls</option>
				<option id="editChoice" value="aisle">Aisles</option>
				<option id="editChoice" value="section">Sections</option>
				<option id="editChoice" value="station">Station</option>
				<option id="editChoice" value="port">Port</option>
			</select>
			
			<br />
			
			<div style="float:left;">
				<input type="button" id="confirm" value="Confirm"/>
			</div>
			<div style="float:right;">
				<input type="button" id="undo" value="Undo"/>
			</div>
		</fieldset>
		
		<div style="float:left;">
			<form action="viewMode.do" method="GET" style="margin:0">
				<input type="hidden" name="actionName" value="retrieve" />
				<input type="hidden" name="warehouseId" value="<%=editForm.getWarehouseId() %>" />
				<input type="submit" value="View Mode" />
			</form>
		</div>
		<div style="float:right;">
			<html:form method="POST" style="margin:0">
				<html:hidden name="editForm" property="JSONObject" />
				<html:hidden property="actionName" value="save" />
				<html:hidden property="warehouseId" value="<%=String.valueOf(editForm.getWarehouseId()) %>"/>
				<input type="button" value="Commit" onclick="javascript:save()" />
			</html:form>
		</div>
		
		<br />
	</div>
	<div id="secProps" draggable=true 
		 style="position:fixed; width:0px; top:5% ; left:1000px ; background-color:#F2E8C9; border: 2px solid; padding: 7px; visibility:hidden;">
		<fieldset>
			<legend><em>Choose Section Properties</em></legend>
			<fieldset style="border:0;visibility:inherit">
				<legend><em>Number of shelves:</em></legend>
				<div>
					<input type="number" step="1" min="1" id="shelfNum" style="width: 50px" />
				</div>
			</fieldset>
			<fieldset id="shelfSectionsFieldSet" style="visibility:inherit; ">
				<legend><em>Number of Segments per Shelf:</em></legend>
				<div>
					<form name="shelfSections" style="margin:0;">
						<!-- dynamic form -->
					</form>
				</div>
			</fieldset>
		</fieldset>
	</div>
	
	<div id="updating" draggable=true 
		 style="position:fixed; width:0px; top:5% ; left:1000px ; background-color:#734432; border: 2px solid; padding: 7px; visibility:hidden;">
		<fieldset id="updatingFieldSet" style="visibility:inherit; ">
			<legend><em><font color="white">Update Object ID:</font></em></legend>
			<div>
				<form action="javascript:myfunc()" name="updatingForm" style="margin:0;">
					<!-- dynamic form -->
					
				</form>
			</div>
		</fieldset>
	</div>
	
	
	<script src="scripts/jquery-1.11.1.min.js"></script>
	<script src="scripts/kinetic-v5.0.2.min.js"></script>
	
	<script>
		var warehouse = <%= editForm.getJSONObject() %>;
	</script>
	
	<script src="scripts/constants.js"></script>
	<script src="scripts/actionDetector.js"></script>
	<script src="scripts/loadObjectsViewMode.js"></script>
	<script src="scripts/tileRemover.js"></script>
	<script src="scripts/tileAdder.js"></script>
	<script src="scripts/confirm.js"></script>
	<script src="scripts/informationDiv.js"></script>
	<script src="scripts/loadObjectsViewMode.js"></script>
	<script src="scripts/addMouseOverEventEditMode.js"></script>
	<script src="scripts/interaction.js"></script>
	<script src="scripts/romanNumeral.js"></script>
	<script defer="defer">
	
	
	// DRAGGABILITY OF DIVs
    document.getElementById('secProps').addEventListener('mousedown', mouseDown, false);
    document.getElementById('updating').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

	function mouseUp(){
		window.removeEventListener('mousemove', divMove, true);
	}

	function mouseDown(e){
		window.addEventListener('mousemove', divMove, true);
	}

	function divMove(e){
		// choosing section menu
		var div = document.getElementById('secProps');
		div.style.position = 'absolute';
		var mousePos = stage.getPointerPosition();
		if (mousePos != null){
			div.style.top = mousePos.y + 'px';
			div.style.left = mousePos.x + 'px';  
		}
		// updating menu
		div = document.getElementById('updating');
		div.style.position = 'absolute';
		mousePos = stage.getPointerPosition();
		if (mousePos != null){
			div.style.top = mousePos.y + 'px';
			div.style.left = mousePos.x + 'px';  
		}
	}
	
	// DISPAYING WAREHOUSE PROPERTIES
	document.getElementById('unitsSpan').innerHTML = "Square Side Length = 1 " + warehouse.unit;
	document.getElementById('heightSpan').innerHTML = "Board Height: " + warehouse.height;
	document.getElementById('widthSpan').innerHTML = "Board Width: " + warehouse.width;
	
 	// ID COUNTERS
	var maxAisleId = '';
	var sectionIds = [];
	var maxPortId = 0;
	var maxStationId = 0;
	var maxWallId = 0;
	updateMaxId();
	
	updateCurrentAction("Editing locked.");
	
	function updateMaxId(attr){
		switch(attr){
			case "wall":
				for(var i = 0; i < warehouse.wall.length; ++i){
					if(warehouse.wall[i].id > maxWallId){
						maxWallId = warehouse.wall[i].id ;
					}
				}
				break;
			case "aisle":
				var newAisleIdAscii;

				if (maxAisleId == ''){
					maxAisleId = 'A';
					for(var i = 0; i < warehouse.aisle.length; i++){
						if(warehouse.aisle[i].id > maxAisleId){
							maxAisleId = warehouse.aisle[i].id;
						}
					}
					newAisleIdAscii = (maxAisleId == 'A')? maxAisleId.charCodeAt(0) : maxAisleId.charCodeAt(0) + 1;
				}else {
					newAisleIdAscii = maxAisleId.charCodeAt(0) + 1;
				}
				
				maxAisleId = String.fromCharCode(newAisleIdAscii);
				break;
			// no case for section; done differently since need to find aisle first.
			case "station":
				for(var i = 0; i < warehouse.station.length; ++i){
					if(warehouse.station[i].id > maxStationId){
						maxStationId = warehouse.station[i].id ;
					}
				}
				break;
			case "port":
				for(var i = 0; i < warehouse.port.length; ++i){
					if(warehouse.port[i].id > maxPortId){
						maxPortId = warehouse.port[i].id ;
					}
				}
				break;
		}
	}

 	
 	var stage = new Kinetic.Stage({
		container : 'container',
		width : WIDTH*TILE_SIZE,
		height : HEIGHT*TILE_SIZE
	});
 	
 	var selectLock = false;
 	
	var pageWidth = WIDTH*TILE_SIZE + 310;
	document.getElementById("container").style.width = pageWidth + 'px';
	
 	var background = new Kinetic.Rect({
 		width : WIDTH*TILE_SIZE,
		height : HEIGHT*TILE_SIZE,
 		fill: BG_COLOUR
 	});
 	
 	// LAYERS
 	var bgLayer = new Kinetic.Layer();
 	bgLayer.add(background);
 	stage.add(bgLayer);
	
 	var grid = new Kinetic.Layer();
 	var wallLayer = new Kinetic.Layer();
 	var objLayer = new Kinetic.Layer();
 	var textLayer = new Kinetic.Layer();
	
	
	// GROUPS
	var walls = new Kinetic.Group();
	wallLayer.add(walls);
	var aisles = new Kinetic.Group();
	objLayer.add(aisles);
	var sections = new Kinetic.Group();
	objLayer.add(sections);
	var stations = new Kinetic.Group();
	objLayer.add(stations);
	var ports = new Kinetic.Group();
	objLayer.add(ports);
	var shelves = null;
	var labels = new Kinetic.Group();
	objLayer.add(labels);
	
	
	// GLOBAL VARS
	var selection = null;
 	
	var foreground = new Kinetic.Rect ({
		x: 0,
		y: 0,
		width: WIDTH*TILE_SIZE,
		height: HEIGHT*TILE_SIZE,
		fill: 'transparent'
	});
	actionDetector.add(foreground);		 
	
	var text = new Kinetic.Text({
		x : 7,
		y : 7,
		fontFamily : 'Calibri',
		fontSize : 20,
		text : '',
		fill : 'black'
	});
	
	var textBg = new Kinetic.Rect({
		x: 7,
        y: 7,
        fill: '#ddd',
        width: 200,
        height: text.height(),
	});
	textLayer.add(textBg);
	textLayer.add(text);
	function writeMessage(message) {
		text.setText(message);
		textLayer.draw();
	}	
 	
	// drawing grid
	for (var i = 0; i <= WIDTH; i++) {
		var vLine = new Kinetic.Line({
			points: [i*TILE_SIZE, 0, 
			         i*TILE_SIZE, HEIGHT*TILE_SIZE],
	        stroke: LINE_COLOUR,
	        strokeWidth: 1,
	        lineCap: 'square',
	        listening: false
		});
		grid.add(vLine);
	}
	for (var j = 0; j <= HEIGHT; j++) {
		var hLine = new Kinetic.Line({
			points: [0, j*TILE_SIZE, 
			         WIDTH*TILE_SIZE, j*TILE_SIZE],
	        stroke: LINE_COLOUR,
	        strokeWidth: 1,
	        lineCap: 'square',
		    listening: false
		});
		grid.add(hLine);
	}
	
	
	// HIGHLIGHTING OBJECTS UPON MOUSEOVER
	var prevFill, prevStroke;
	
	for (var attribute in warehouse) {
		if (attribute === "aisle" 
				|| attribute === "section"
				|| attribute === "wall"
				|| attribute === "port"
				|| attribute === "station") {
			loadObjects(attribute);
		}
		if (attribute === "shelf") {
			loadShelves();
		}
	}
	
	
	stage.add(actionDetector);
	stage.add(objLayer);
	stage.add(grid);
	stage.add(wallLayer);
	stage.add(wallPointsLayer);
	
	
	
	
	function insertAction(objectStr){
		clickInfo.isInsert = true;
		clickInfo.isDelete = false;
		clickInfo.isEdit = false;
		clickInfo.editObject = objectStr;
		if(clickInfo.editObject == "section"){
			var div = document.getElementById('secProps');
			div.style.width = '300px';
			div.style.visibility = 'visible';
			actionDetector.moveToTop();
			sections.moveToTop();
		} else if(clickInfo.editObject == "aisle"){
			actionDetector.moveToTop();
			objLayer.moveToTop();
			grid.moveToTop();
			wallLayer.moveToTop();
			wallPointsLayer.moveToTop();
			aisles.moveToTop();
		} else {
			actionDetector.moveToTop();
			objLayer.moveToTop();
			grid.moveToTop();
			wallLayer.moveToTop();
			wallPointsLayer.moveToTop();
		}
		updateCurrentAction("Insert " + objectStr);
	}
	
	function deleteAction(objectStr){
		clickInfo.isInsert = false;
		clickInfo.isDelete = true;
		clickInfo.isEdit = false;
		clickInfo.editObject = objectStr;
		updateCurrentAction("Delete " + objectStr);
	}
	
	document.getElementById('action').addEventListener('change', function() {
		actionDetector.moveToTop();
		objLayer.moveToTop();
		grid.moveToTop();
		wallLayer.moveToTop();
		wallPointsLayer.moveToTop();
		aisles.moveToTop();
		resetSectionForm("hidden");
		resetUpdatingForm("hidden");
		if(document.getElementById('action').value == "view"){
			resetClickInfo();
			clickInfo.enabled = false;
			clickInfo.isInsert = false;
			clickInfo.isDelete = false;
			clickInfo.isEdit = false;
			updateCurrentAction("Editing locked.");
			document.getElementById('editChoice').setAttribute('style',"float:right;width:48%; visibility:hidden;");
		} else if(document.getElementById('action').value == "insert"){
			resetClickInfo();
			clickInfo.enabled = true;
			document.getElementById('editChoice').setAttribute('style',"float:right;width:48%; visibility:inherit;");
			insertAction(document.getElementById('editChoice').value);
		} else if(document.getElementById('action').value == "edit"){
			resetClickInfo();
			clickInfo.enabled = false;
			clickInfo.isInsert = false;
			clickInfo.isDelete = false;
			clickInfo.isEdit = true;
			document.getElementById('editChoice').setAttribute('style',"float:right;width:48%; visibility:hidden;");
			updateCurrentAction("Select an object to update");
		} else if(document.getElementById('action').value == "delete"){
			resetClickInfo();
			clickInfo.enabled = true;
			document.getElementById('editChoice').setAttribute('style',"float:right;width:48%; visibility:inherit;");
			deleteAction(document.getElementById('editChoice').value);
		}
		refreshView();
    }, false);
	
	document.getElementById('editChoice').addEventListener('change', function() {
		resetSectionForm("hidden");
		resetUpdatingForm("hidden");
		if(document.getElementById('action').value == "view"){
			resetClickInfo();
			clickInfo.enabled = false;
			clickInfo.isInsert = false;
			clickInfo.isDelete = false;
			clickInfo.isEdit = false;
			document.getElementById('editChoice').setAttribute('style',"float:right;width:48%; visibility:hidden;");
			updateCurrentAction("Editing locked.");
		} else if(document.getElementById('action').value == "insert"){
			resetClickInfo();
			clickInfo.enabled = true;
			insertAction(document.getElementById('editChoice').value);
		} else if(document.getElementById('action').value == "edit"){
			resetClickInfo();
			clickInfo.enabled = false;
			clickInfo.isInsert = false;
			clickInfo.isDelete = false;
			clickInfo.isEdit = true;
			document.getElementById('editChoice').setAttribute('style',"float:right;width:48%; visibility:hidden;");
			updateCurrentAction("Select an object to update");
		} else if(document.getElementById('action').value == "delete"){
			resetClickInfo();
			clickInfo.enabled = true;
			deleteAction(document.getElementById('editChoice').value);
		} 
		refreshView();
	}, false);
	
	document.getElementById('shelfNum').addEventListener('change', function() {
		resetSectionForm("visible");
		var shelfNum = document.getElementById('shelfNum').value;
		var form = document.forms['shelfSections'];
		for(var i = 1; i <= shelfNum; i++){
			var segNum = document.createElement("input");
			segNum.setAttribute('type',"number");
			segNum.setAttribute('id',"segNum:shelf" + i);
			segNum.setAttribute('step',"1");
			segNum.setAttribute('min',"1");
			segNum.setAttribute('style',"visibility:inherit; width: 50px");
			if(i > 1 && i%2 != 0){
				form.innerHTML += "<br />";
			} else if(i%2 == 0){
				form.innerHTML += " ";
			}
			form.innerHTML += "shelf #" +i + " ";
			form.appendChild(segNum);
		}
	}, false);
	
	function resetSectionForm(visibility){
		var form = document.forms['shelfSections'];
		while (form.firstChild) {
			form.removeChild(form.firstChild);
		}
		var div = document.getElementById('secProps');
		if (visibility == "hidden"){
			div.style.width = '0px';
			div.style.top = "5%";
			div.style.left = "1000px";
		}else{
			div.style.width = '300px';
		}
		
		div.style.visibility = visibility;
		
	}
	
	function createUpdatingForm(){
		var form = document.forms['updatingForm'];
		resetUpdatingForm("visible");
		var objType = selection.getAttr('typeOfObject');
		var field = null;
		switch(objType){
			case "aisle":
				field = document.createElement("input");
				field.setAttribute('type',"text");
				field.setAttribute('id',"aisleIdField");
				//field.setAttribute('pattern',"[A-Za-z]*");
				field.setAttribute('style',"width: 50px");
				break;
			case "section":
				field = document.createElement("input");
				field.setAttribute('type',"text");
				field.setAttribute('id',"sectionIdField");
				//field.setAttribute('pattern',"[0-9]*");
				field.setAttribute('style',"width: 50px");
				break;
			case "station":
				field = document.createElement("input");
				field.setAttribute('type',"text");
				field.setAttribute('id',"stationIdField");
				//field.setAttribute('pattern',"[0-9]*");
				field.setAttribute('style',"width: 50px");
				break;
			case "port":
				field = document.createElement("input");
				field.setAttribute('type',"text");
				field.setAttribute('id',"portIdField");
				//field.setAttribute('pattern',"[0-9]*");
				field.setAttribute('style',"width: 50px");
				break;
		}
		form.innerHTML = "<font color=\"white\"> New " + objType + " ID: </font>" ;
		form.appendChild(field);
		
		//<input type="button" id="updateId" value="Update ID" />
		var button = document.createElement("input");
		button.setAttribute('type',"submit");
		button.setAttribute('id',"updateId");
		button.setAttribute('value',"Update ID");
/* 		button.addEventListener('submit', , false);
 */		
		form.appendChild(button);
	}
	
	function myfunc () {
		var objType = selection.getAttr('typeOfObject');
		var objId = selection.getAttr('id').split(":");
		switch(objType){
			case "aisle":
				var newAisleId = document.getElementById('aisleIdField').value;
				var newObjId = newAisleId + ":" + objId[1] + ":" + objId[2] + ":" + objId[3] + ":" + objId[4];
				selection.setAttr("id", newObjId);
				selection.setAttr("aisleId", newAisleId);
				updateLabel("aisle " + objId[0],"aisle " + newAisleId);

				// update section
				var secSelection = sections.getChildren(function(obj){
					return obj.getAttr('aisleId') === objId[0];
				}).toArray();
				for (var i = 0; i < secSelection.length; i++){
					var sectionId = secSelection[i].getAttr('id').split(":");
					var newSectionId = newAisleId + ":" + sectionId[1] + ":" + sectionId[2] + ":" + sectionId[3] + ":" + sectionId[4] + ":" + sectionId[5];
					secSelection[i].setAttr("id", newSectionId);
					secSelection[i].setAttr("aisleId", newAisleId);
					updateInfo(secSelection[i]);
				}
				
				updateInfo(selection);
				updateSelection();
				
				break;
			case "section":
				var newSectionId = document.getElementById('sectionIdField').value;
				var newObjId = objId[0] + ":" + newSectionId + ":" + objId[2] + ":" + objId[3] + ":" + objId[4] + ":" + objId[5];
				selection.setAttr("id", newObjId);
				selection.setAttr("sectionId", newSectionId);
				updateLabel(objId[1],newSectionId);
				updateInfo(selection);
				updateSelection();
				break;
			case "station":
				var newStationId = document.getElementById('stationIdField').value;
				var newObjId = newStationId + ":" + objId[1] + ":" + objId[2] + ":" + objId[3] + ":" + objId[4];
				selection.setAttr("id", newObjId);
				selection.setAttr("stationId", newStationId);
				updateLabel("station " + objId[0],"station " + newStationId);
				updateInfo(selection);
				updateSelection();
				break;
			case "port":
				var newPortId = document.getElementById('portIdField').value;
				var newObjId = newPortId + ":" + objId[1] + ":" + objId[2] + ":" + objId[3] + ":" + objId[4];
				selection.setAttr("id", newObjId);
				selection.setAttr("portId", newPortId);
				updateLabel("port " + objId[0],"port " + newPortId);
				updateInfo(selection);
				updateSelection();
				break;
		}
	}
	
	function resetUpdatingForm(visibility){
		var form = document.forms['updatingForm'];
		while (form.firstChild) {
			form.removeChild(form.firstChild);
		}
		var div = document.getElementById('updating');
		if (visibility == "hidden"){
			div.style.width = '0px';
			div.style.top = "5%";
			div.style.left = "5px";
		}else{
			div.style.width = '300px';
		}
		
		div.style.visibility = visibility;
	}
	
	function updateLabel(oldLabel, newLabel){
		var toChange = labels.getChildren(function(obj){
			return obj.getAttr('text') === oldLabel;
		}).toArray();
		toChange[0].setAttr("text", newLabel);
		objLayer.draw();
	}
	
	function refreshView(){
		labels.removeChildren();
		labels.remove();
		
		wallPointsLayer.removeChildren();
		wallPointsLayer.drawScene();
		wallPoints = null;
		
		walls.removeChildren();
		walls.remove();
		loadObjects("wall");
		
		aisles.removeChildren();
		aisles.remove();
		loadObjects("aisle");
		
		sections.removeChildren();
		sections.remove();
		loadObjects("section");
		
		stations.removeChildren();
		stations.remove();
		loadObjects("station");
		
		ports.removeChildren();
		ports.remove();
		loadObjects("port");
		
		objLayer.add(aisles);
		objLayer.add(sections);
		objLayer.add(ports);
		objLayer.add(stations);
		objLayer.add(labels);
		objLayer.draw();
		wallLayer.add(walls);
		wallLayer.draw();
		clearColour();
		
		secsToDelete = [];
	}
	
	document.getElementById('undo').addEventListener('click', function() {
		refreshView();
	}, false);
	
	function save () {
		document.forms['editForm'].JSONObject.value = JSON.stringify(warehouse);
		document.editForm.submit();
	}
	
	function updateCurrentAction(message){
		document.getElementById("selectedAction").innerHTML = message; 
	}
	
	
	</script>
</body>
</html>



