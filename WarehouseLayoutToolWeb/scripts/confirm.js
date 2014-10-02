/**
 * updates the warehouse object based on what's on the screen
 */

document.getElementById('confirm').addEventListener('click', confirmFunc, false);

function confirmFunc () {
	if(secsToDelete.length > 0){
		var toDeleteLength = secsToDelete.length;
		for(var i = 0; i < toDeleteLength; i++){
			var thisId = secsToDelete[i].split(":");
			var aisleId = thisId[0];
			var sectionId = thisId[1];
			
			var shelvesToDelete = [];
			for(var j = 0; j <  warehouse.shelf.length ;j++){
				if(aisleId == warehouse.shelf[j].aisleId && sectionId == warehouse.shelf[j].secId){
					shelvesToDelete.push(j);
				}
			}
			for(var k = 0; k <  shelvesToDelete.length ;k++){
				var index = shelvesToDelete[k];
				warehouse.shelf.splice(index, 1);
			}
		}
		
		secsToDelete = [];
	}
	labels.removeChildren();
	labels.remove();
	for(var attribute in warehouse){
		switch (attribute){
		 	case "wall":
		 		wallPointsLayer.removeChildren();
				wallPointsLayer.drawScene();
				wallPoints = null;
		 		var newWall = [];
	 		 	var prevWall = null;
				var children = walls.getChildren();
				for( var i=0; i< children.length; i++){
					var thisId  = children[i].getId().split(':');
					var pointsArray = thisId[1].split(',');
					for(var k = 0; k<pointsArray.length; k++){
						pointsArray[k] = pointsArray[k]/TILE_SIZE;
					}
					if (prevWall == null || thisId[0] != prevWall.id)	{
						var thisWall = {
								id:parseInt(thisId[0]),
								pts:pointsArray
						}							
						newWall.push(thisWall);
						prevWall = thisWall;
					}  
				}
				warehouse.wall = newWall;
				// print walls info
				/*var message = "wall ";
				for(var i = 0; i<warehouse.wall.length ; i++){
					message += warehouse["wall"][i].id + " " 
							+ warehouse["wall"][i].pts + "\n"
				}
				writeMessage(message);*/
				walls.removeChildren();
				walls.remove();
				loadObjects("wall");
				break; 
			case "aisle":	
	 		 	var newAisle = [];
	 		 	var prevAisle = null;
				var children = aisles.getChildren();
				for( var i=0; i< children.length; i++){
					var thisId  = children[i].getId().split(':');
					if (prevAisle == null || thisId[0] != prevAisle.id)	{
						var thisAisle = {
								id:thisId[0],
								fromX:parseInt(thisId[1]),
								fromY:parseInt(thisId[2]),
								toX:parseInt(thisId[3]),
								toY:parseInt(thisId[4])
						}							
						newAisle.push(thisAisle);
						prevAisle = thisAisle;
					}  
				}
				warehouse.aisle = newAisle;
				//print aisles info
				/*var message = "aisle ";
				for(var i = 0; i<warehouse.aisle.length ; i++){
					message += warehouse["aisle"][i].id + " " 
							+ warehouse["aisle"][i].fromX + " " 
							+ warehouse["aisle"][i].fromY + " "
							+ warehouse["aisle"][i].toX + " "
							+ warehouse["aisle"][i].toY + "\n";
				}
				writeMessage(message);*/
				aisles.removeChildren();
				aisles.remove();
				loadObjects("aisle");
				break;
			case "section":
				var shelfNum = document.getElementById('shelfNum').value;
				var segments = [];
				if((clickInfo.isInsert == true) && (clickInfo.editObject == "section")){
					if(shelfNum == null || shelfNum ==  ""){
						updateCurrentAction("<font color=\"red\"><em>You must choose the number of shelves for this section.</em></font>");
						return;
					}
					var form = document.forms['shelfSections'];
					for(var i = 1; i <= shelfNum; i++){
						var segNum = document.getElementById("segNum:shelf" + i);
						if(segNum == null || segNum ==  ""){
							updateCurrentAction("<font color=\"red\"><em>You must choose the number of segments for each shelf.</em></font>");
							return;
						} else {
							segments.push(segNum.value);
						}
					}
				}
				var newSection = [];
	 		 	var prevSection = null;
	 		 	
				var children = sections.getChildren();
				for(var i=0; i< children.length; i++){
					var thisId  = children[i].getId().split(':');
					
					var secId = thisId[1];
					if (prevSection == null || !(thisId[0] == prevSection.aisleId && thisId[1] == prevSection.secId)){ // if this section hasn't been added yet.
						var thisSection = {
								aisleId:thisId[0],
								secId:thisId[1],
								fromX:parseInt(thisId[2]),
								fromY:parseInt(thisId[3]),
								toX:parseInt(thisId[4]),
								toY:parseInt(thisId[5])
						}							
						newSection.push(thisSection);
						prevSection = thisSection;
					

					
						var sectionNotFound = true;
						var aisleIdOfNewSection = thisId[0];
						var secIdOfNewSection = thisId[1];
						for(var j = 0; j < warehouse.shelf.length; j++) {
							if(warehouse.shelf[j].aisleId == aisleIdOfNewSection && warehouse.shelf[j].secId == secIdOfNewSection){
								sectionNotFound = false;
								break;
							}
						}
						
						
						if (sectionNotFound == true){ // found the new section, so create the shelf array for warehouse						
							for(var j = 0; j < segments.length; j++) {
								var shelfId = toLowerCaseRoman(j +1);
								thisShelf = {
									aisleId:thisId[0],
									secId:thisId[1],
									shelfId:shelfId,
									segNum:parseInt(segments[j])
								}
								warehouse.shelf.push(thisShelf);
							}
							// print shelves info
							/*var message = "shelf";
							for(var msgCount = 0; msgCount<warehouse.shelf.length ; msgCount++){
								message += "     " 
										+ warehouse["shelf"][msgCount].aisleId + " "
										+ warehouse["shelf"][msgCount].secId + " " 
										+ warehouse["shelf"][msgCount].shelfId + " " 
										+ warehouse["shelf"][msgCount].segNum
							}
							updateCurrentAction(message);*/
						}
					}
				}
				warehouse.section = newSection;
				// print sections info
				/*var message = "section ";
				for(var i = 0; i<warehouse.section.length ; i++){
					message += warehouse["section"][i].aisleId + " "
							+ warehouse["section"][i].secId + " " 
							+ warehouse["section"][i].fromX + " " 
							+ warehouse["section"][i].fromY + " "
							+ warehouse["section"][i].toX + " "
							+ warehouse["section"][i].toY + "\n";
				}
				writeMessage(message);*/
				sections.removeChildren();
				sections.remove();
				loadObjects("section");
				break;
			case "station":
				var newStation = [];
	 		 	var prevStation = null;
				var children = stations.getChildren();
				for( var i=0; i< children.length; i++){
					var thisId  = children[i].getId().split(':');
					if (prevStation == null || thisId[0] != prevStation.id)	{
						var thisStation = {
								id:thisId[0],
								fromX:parseInt(thisId[1]),
								fromY:parseInt(thisId[2]),
								width:parseInt(thisId[3]),
								height:parseInt(thisId[4]),
						}							
						newStation.push(thisStation);
						prevStation = thisStation;
					}  
				}
				warehouse.station = newStation;
				// print stations info
				/*var message = "station ";
				for(var i = 0; i<warehouse.station.length ; i++){
					message += warehouse["station"][i].id + " " 
							+ warehouse["station"][i].fromX + " " 
							+ warehouse["station"][i].fromY + " "
							+ warehouse["station"][i].width + " "
							+ warehouse["station"][i].height + "\n";
				}
				writeMessage(message);*/
				stations.removeChildren();
				stations.remove();
				loadObjects("station");
				break;
			case "port":
				var newPort = [];
	 		 	var prevPort = null;
				var children = ports.getChildren();
				for( var i=0; i< children.length; i++){
					var thisId  = children[i].getId().split(':');
					if (prevPort == null || thisId[0] != prevPort.id)	{
						var thisPort = {
								id:thisId[0],
								fromX:parseInt(thisId[1]),
								fromY:parseInt(thisId[2]),
								toX:parseInt(thisId[3]),
								toY:parseInt(thisId[4])	 				
						}							
						newPort.push(thisPort);
						prevPort = thisPort;
					}  
				}
				warehouse.port = newPort;
				// print ports info
				/*var message = "port ";
				for(var i = 0; i<warehouse.port.length ; i++){
					message += warehouse["port"][i].id + " " 
							+ warehouse["port"][i].fromX + " " 
							+ warehouse["port"][i].fromY + " "
							+ warehouse["port"][i].toX + " "
							+ warehouse["port"][i].toY + "\n";
				}
				writeMessage(message);*/
				ports.removeChildren();
				ports.remove();
				loadObjects("port");
				break; 
		}
	}
	
	objLayer.add(aisles);
	objLayer.add(sections);
	objLayer.add(ports);
	objLayer.add(stations);
	objLayer.add(labels);
	wallLayer.add(walls);
	
	stage.setAttr('width',WIDTH*TILE_SIZE);
	stage.setAttr('height',HEIGHT*TILE_SIZE);
	stage.draw();
	clearColour();
}


