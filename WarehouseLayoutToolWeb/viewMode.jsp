<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" language="java" session="true" %>

<%@ taglib prefix="bean" uri="/WEB-INF/struts-bean.tld" %>
<%@ taglib prefix="html" uri="/WEB-INF/struts-html.tld" %>
<%@ taglib prefix="logic" uri="/WEB-INF/struts-logic.tld" %>

<jsp:useBean id="viewForm" scope="request" class="com.warehouselayout.web.form.WarehouseLayoutForm" />

<html>
<head><title>Warehouse Layout Tool: View Mode</title></head>
<body style="overflow:auto;background-color:#326598;">
	<div id="container" style="position:absolute;"></div>
	<div id="info" style="position:fixed; width:300px; right:5px; top:5%; background-color:#F2E8C9; border: 2px solid; padding: 7px">
		<fieldset style="height:300px">
			<legend><em>Details</em></legend>

<!-- 			<span id="selectLabel" style="visibility:hidden">Selection: </span>
			<span id="selectSelect"></span><br />
			<span id="aisleLabel" style="visibility:hidden">Aisle: </span>
			<span id="aisleSelect"></span><br />
			<span id="sectionLabel" style="visibility:hidden">Section: </span>
			<span id="sectionSelect"></span><br />
			<div id="shelfStatus" style="visibility:hidden"><fieldset>
				<legend><em>Status</em></legend>
				<span id="shelfInfo"></span>
			</fieldset></div>
			<span id="stationLabel" style="visibility:hidden">Station: </span>
			<span id="stationSelect"></span><br />
			<span id="portLabel" style="visibility:hidden">Port: </span>
			<span id="portSelect"></span><br />
 -->
			<span id="selectSpan"></span><br />
			<span id="infoSpan"></span><br />
			<span id="statusSpan"></span><br />
		</fieldset>
		
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
		
		<form action="editMode.do" method="GET" style="margin:0">
			<input type="hidden" name="actionName" value="retrieve" />
			<input type="hidden" name="warehouseId" value="<%=viewForm.getWarehouseId() %>" />
			<input type="submit" value="Edit Mode" />
		</form>

	</div>
	
	<script>
		var warehouse = <%= viewForm.getJSONObject() %>;
	</script>
	
	<script src="scripts/jquery-1.11.1.min.js"></script>
	<script src="scripts/kinetic-v5.0.2.min.js"></script>
 	<!-- <script src="scripts/warehouseObject.js"></script> -->

	<script src="scripts/constants.js"></script>
	<script src="scripts/informationDiv.js"></script>
	<script src="scripts/loadObjectsViewMode.js"></script>
	<script src="scripts/addMouseOverEvent.js"></script>
	<script src="scripts/interaction.js"></script>
	<script>
	var request;
	var stage = new Kinetic.Stage({
		container : 'container',
		width : WIDTH*TILE_SIZE,
		height : HEIGHT*TILE_SIZE,
	});
	var bgLayer = new Kinetic.Layer();
	
	var selectLock = false;
	var objectCount = 0;
	var selection = null;
	
	var pageWidth = WIDTH*TILE_SIZE + 330;
	document.getElementById("container").style.width = pageWidth + 'px';
	
/**
 * KINETIC LAYER: overlay
 * 		overlying grid
 * 		object hoverSquare follows mouse
 * 
 */
	
	var overlay = new Kinetic.Layer();
	
	var foreground = new Kinetic.Rect ({
		x: 0,
		y: 0,
		width: WIDTH*TILE_SIZE,
		height: HEIGHT*TILE_SIZE,
		fill: 'transparent'
	});
	overlay.add(foreground);
	
	var hoverSquare = new Kinetic.Rect ({
		x: 0,
		y: 0,
		width: TILE_SIZE/PIX,
		height: TILE_SIZE/PIX,
		fill: HOVER_COLOUR,
		stroke: 'white',
		strokeWidth: 1
	});
	overlay.add(hoverSquare);
	hoverSquare.hide();
	
	overlay.on('mousemove', function () {
		updateHover();
		hoverSquare.show();
		overlay.drawScene();
	});
	overlay.on('mouseout', function () {
		hoverSquare.hide();
		overlay.drawScene();
	});
	overlay.on('mouseover', function (){
		updateHover();
		hoverSquare.show();
		overlay.drawScene();
	});
	overlay.on('mousedown', function(){
		deselectObject();
	});
 	
 	function updateHover () {
 		var mousePos = stage.getPointerPosition();
 		var x = mousePos.x - (mousePos.x)%(TILE_SIZE/PIX);
 		var y = mousePos.y - (mousePos.y)%(TILE_SIZE/PIX);
		hoverSquare.setAbsolutePosition({x:x, y:y});
	}
	
	// end of overlay

	// background color effect
 	var background = new Kinetic.Rect({
		width : WIDTH*TILE_SIZE,
		height : HEIGHT*TILE_SIZE,
		fill: BG_COLOUR
	});
	bgLayer.add(background);
	stage.add(bgLayer);
	
	// layers that display objects
	var grid = new Kinetic.Layer(); // the top layer: grid
	var wallLayer = new Kinetic.Layer(); // layer of walls, non-interactive
	var objLayer = new Kinetic.Layer(); // layer of interactive objects
	
	// groups to better organize
	var walls = new Kinetic.Group();
	var aisles = new Kinetic.Group();
	var sections = new Kinetic.Group();
	var ports = new Kinetic.Group();
	var stations = new Kinetic.Group();
	var shelves = null;
	var labels = new Kinetic.Group();

	
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
	
	// loading
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
	
	// adding
	wallLayer.add(walls);
	
	objLayer.add(aisles);
	objLayer.add(sections);
	objLayer.add(ports);
	objLayer.add(stations);
	objLayer.add(labels);

	clearColour();
	clearSelection();
	
	
	stage.add(overlay);
	stage.add(objLayer);
	stage.add(grid);
	stage.add(wallLayer);
	
	
	
	// Pre-Selection (by struts + url)
	var preSelectedValid = <%= viewForm.getValid() %>;
	var preSelectedAttr = '<%= viewForm.getSelectedAttr() %>';
	var preSelectedAisle = '<%= viewForm.getSelectedAisle() %>';
	var preSelectedSection = '<%= viewForm.getSelectedSection() %>';
	var preSelectedPort = '<%= viewForm.getSelectedPort() %>';
	var preSelectedStation = '<%= viewForm.getSelectedStation() %>';
	
	if (preSelectedAttr == null) ;
	else if (preSelectedValid == false) {
		alert("Invalid Parameter Detected");
	} else {
		getLocation(preSelectedAttr, preSelectedAisle, preSelectedSection, preSelectedPort, preSelectedStation);
	}
	
	</script>
	

</body>
</html>



