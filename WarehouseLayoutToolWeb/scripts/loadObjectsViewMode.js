function clearColour () {
	var objects, objLength;
	objects = aisles.getChildren().toArray();
	objLength = objects.length;
	for (var i = 0; i < objLength; i++) {
		var colour = getColour('aisle');
		objects[i].fill(colour);
		objects[i].stroke(colour);
		objects[i].strokeWidth(0);
	}
	objects = sections.getChildren().toArray();
	objLength = objects.length;
	for (var i = 0; i < objLength; i++) {
		var colour = getColour('section');
		objects[i].fill(colour);
		objects[i].stroke(colour);
		objects[i].strokeWidth(0);
	}
	objects = ports.getChildren().toArray();
	objLength = objects.length;
	for (var i = 0; i < objLength; i++) {
		var colour = getColour('port');
		objects[i].fill(colour);
		objects[i].stroke(colour);
		objects[i].strokeWidth(0);
	}
	objects = stations.getChildren().toArray();
	objLength = objects.length;
	for (var i = 0; i < objLength; i++) {
		var colour = getColour('station');
		objects[i].fill(colour);
		objects[i].stroke(colour);
		objects[i].strokeWidth(0);
	}
}

function generateId(attr,arrayPosition){
	var id;
	switch(attr){
	case "wall":
		var points = []; 
		for(var i = 0; i<warehouse.wall[arrayPosition].pts.length; i++){
			points.push(warehouse.wall[arrayPosition].pts[i]);
			points[i] = points[i]*TILE_SIZE;
		}
		id = warehouse.wall[arrayPosition].id + ":" + points;
		break;
	case "port":
		id = warehouse.port[arrayPosition].id + ":" 
											  + warehouse.port[arrayPosition].fromX + ":"
											  + warehouse.port[arrayPosition].fromY + ":"
											  + warehouse.port[arrayPosition].toX + ":"
											  + warehouse.port[arrayPosition].toY;
		break;
	case "aisle":
		id = warehouse.aisle[arrayPosition].id + ":"
											   + warehouse.aisle[arrayPosition].fromX + ":"
											   + warehouse.aisle[arrayPosition].fromY + ":"
											   + warehouse.aisle[arrayPosition].toX + ":"
											   + warehouse.aisle[arrayPosition].toY;
		break;
	case "section":
		id = warehouse.section[arrayPosition].aisleId + ":"
													  + warehouse.section[arrayPosition].secId + ":"
													  + warehouse.section[arrayPosition].fromX + ":"
													  + warehouse.section[arrayPosition].fromY + ":"
													  + warehouse.section[arrayPosition].toX + ":"
													  + warehouse.section[arrayPosition].toY;
		break;
	case "station":
		id = warehouse.station[arrayPosition].id + ":"
												 + warehouse.station[arrayPosition].fromX + ":"
												 + warehouse.station[arrayPosition].fromY + ":"
												 + warehouse.station[arrayPosition].width + ":"
												 + warehouse.station[arrayPosition].height;
		break;
	}
	return id;
}
	

function loadObjects(attr){
	var colour = getColour(attr);
	for(var i = 0; i<warehouse[attr].length; i++){
		if(attr == "station"){
			var fx = warehouse[attr][i].fromX*TILE_SIZE;
			var fy = warehouse[attr][i].fromY*TILE_SIZE;
			var w = warehouse[attr][i].width*TILE_SIZE;
			var h = warehouse[attr][i].height*TILE_SIZE;
			
			var stationId = warehouse[attr][i].id;
			var id = generateId(attr, i);
			var thisObj = new Kinetic.Rect({
				id: id,
				"aisleId": "",
				"sectionId": "",
				"stationId": stationId,
				"portId": "",
				"typeOfObject": attr,
				x: fx,
				y: fy,
				width: w,
				height: h,
				fill: colour
			});
			detectMouseover(thisObj);
			addToGroup(thisObj);
			addLabel(thisObj);
		}else if(attr == "wall"){
			var points = [];
			for(var k = 0; k<warehouse[attr][i].pts.length; k++){
				points.push(warehouse[attr][i].pts[k]);
				points[k] = points[k]*TILE_SIZE;
			}
			var id = generateId(attr, i);
			var thisObj = new Kinetic.Line({
				id: id,
				"typeOfObject": attr,
				points: points,
				stroke: colour,
				strokeWidth: 5,
				lineCap: 'square',
				fill: colour
			});

			if(typeof clickInfo !== 'undefined' && clickInfo.isDelete == true){
				detectMouseover(thisObj);
			}

			addToGroup(thisObj);
		} else {
			var widthMultiplier, aisleId, secId, portId;
			
			if(attr=="section")	{ widthMultiplier = 0.15; }
			else				{ widthMultiplier = 0; }
			
			switch (attr) {
			case "section":
				aisleId = warehouse[attr][i].aisleId;
				sectionId = warehouse[attr][i].secId;
				portId = "";
				break;
			case "aisle":
				aisleId = warehouse[attr][i].id;
				sectionId = "";
				portId = "";
				break;
			case "port":
				aisleId = "";
				sectionId = "";
				portId = warehouse[attr][i].id;
				break;
			default:
				aisleId = "";
				sectionId = "";
				portId = "";
				break;
			}

			var offset = 		widthMultiplier * TILE_SIZE;
			var rectX = 		(warehouse[attr][i].fromX) * TILE_SIZE + offset;
			var rectY = 		(warehouse[attr][i].fromY) * TILE_SIZE + offset;
			var rectWidth = 	(warehouse[attr][i].toX - warehouse[attr][i].fromX + 1) * TILE_SIZE - 2 * offset;
			var rectHeight = 	(warehouse[attr][i].toY - warehouse[attr][i].fromY + 1) * TILE_SIZE - 2 * offset;
			var tx = rectX + rectWidth;
			var ty = rectY + rectHeight;

			var id = generateId(attr, i);
			var thisObj = new Kinetic.Rect({
				id: id,
				"aisleId": 		aisleId,
				"sectionId": 	sectionId,
				"stationId": 	"",
				"portId": 		portId,
				"typeOfObject": attr,
				x:				rectX,
				y: 				rectY,
				width: 			rectWidth,
				height: 		rectHeight,
				fill: colour
			});
			detectMouseover(thisObj);
			addToGroup(thisObj);
			addLabel(thisObj);
		}
	}
}

function loadShelves () {
	shelves = warehouse.shelf;
}

function addToGroup (obj) {
	var attr = obj.getAttr('typeOfObject');
	switch (attr) {
	case "wall":
		walls.add(obj);
		break;
	case "section":
		sections.add(obj);
		break;
	case "aisle":
		aisles.add(obj);
		break;
	case "station":
		stations.add(obj);
		break;
	case "port":
		ports.add(obj);
		break;
	default:
		break;
	}
	//objLayer.drawScene();
	//wallLayer.drawScene();
}

function addLabel (obj) {
	var attr = obj.getAttr('typeOfObject');
	var x, y, colour;
	var rotation = 0;
	if (attr !== 'aisle') {
		x = obj.getAttr('x');
		y = obj.getAttr('y');
		if (attr === 'section') colour = 'black';
		else {
			colour = 'white';
			x += 3;
			y += 3;
		}
	} else {
		if (obj.getAttr('width') > obj.getAttr('height')) {
			x = obj.getAttr('x') - 2.5*TILE_SIZE + 3;
			y = obj.getAttr('y') + 3;
		} else if (obj.getAttr('width') >= 3*TILE_SIZE) {
			x = obj.getAttr('x') + 3;
			y = obj.getAttr('y') - TILE_SIZE + 3;
		} else {
			x = obj.getAttr('x') + 3;
			y = obj.getAttr('y') - 0.5*TILE_SIZE + 3;
			rotation = 270;
		}
		colour = 'white';
	}
	var text;
	switch (attr) {
	case 'section':
		text = obj.getAttr('sectionId');
		break;
	case 'aisle':
		text = attr + ' ' + obj.getAttr('aisleId');
		break;
	case 'port':
		text = attr + ' ' + obj.getAttr('portId');
		break;
	case 'station':
		text = attr + ' ' + obj.getAttr('stationId');
		break;
	default:
		text = "";
		break;
	}
	
	var label = new Kinetic.Text({
		x: x,
		y: y,
		text: text,
		fontSize: TILE_SIZE / 2,
		fontStyle: 'bold',
		fontFamily: 'Monospace',
		fill: colour,
		listening: false,
		rotation: rotation
	});
	labels.add(label);
}

function writeMessage(message) {
	text.setText(message);
	layer.drawScene();
}
