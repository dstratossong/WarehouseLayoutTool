/**
 * Insert function
 */

function findNewSecId(aisleId){
	var maxSecId = '';
	for (var i = 0; i<warehouse.section.length; i++){
		if(warehouse.section[i].aisleId == aisleId && (maxSecId == '' || warehouse.section[i].secId.charCodeAt(0) > maxSecId.charCodeAt(0))){
			maxSecId = warehouse.section[i].secId;
		}
	}
	if (maxSecId == ''){
		maxSecId = '1';
	}else {
		var numerical = parseInt(maxSecId);
		numerical++;
		maxSecId = numerical.toString()
	}
	return maxSecId;
}

var wallPoints = null;
var wallPointsLayer = new Kinetic.Layer();

function addNewTile(tileType){
	if(clickInfo.isDown == true && clickInfo.isUp == true){
		var fx = parseInt(clickInfo.mousedown.x)/TILE_SIZE;
		var fy = parseInt(clickInfo.mousedown.y)/TILE_SIZE;
		var tx = parseInt(clickInfo.mouseup.x)/TILE_SIZE;
		var ty = parseInt(clickInfo.mouseup.y)/TILE_SIZE;
		if (tileType != "wall"){
			if(fx > tx && fy > ty){
				var temp = fx;
				fx = tx;
				tx = temp;
				temp = fy;
				fy = ty;
				ty = temp;
			}else if(fx > tx){
				var temp = fx;
				fx = tx;
				tx = temp;
			}else if(fy > ty){
				var temp = fy;
				fy = ty;
				ty = temp;
			}
		}
		
		var numTilesH = Math.abs(tx - fx);
		var numTilesV = Math.abs(ty - fy);
		
		switch (tileType){
			case "wall":
				// draw this by points
				var kx = tx + clickInfo.mouseup.gX;
				var ky = ty + clickInfo.mouseup.gY;
				if (wallPoints == null){// save first point
					wallPoints = [];
					wallPoints.push(kx*TILE_SIZE);
					wallPoints.push(ky*TILE_SIZE);
					var point = new Kinetic.Circle({
						x: kx*TILE_SIZE,
						y: ky*TILE_SIZE,
						radius: 10,
						fill: '#FAF9EB',
					});
					wallPointsLayer.add(point);
					point.draw();
					point.on('mouseup', function(){
						updateMaxId('wall');
						maxWallId++;
						wallPoints.push(kx*TILE_SIZE);
						wallPoints.push(ky*TILE_SIZE);
						var line = new Kinetic.Line({
							id: maxWallId + ":"
										  + wallPoints,
							points: wallPoints,
							stroke: WALL_COLOUR,
							strokeWidth: 5,
							lineCap: 'square'
						});
						walls.add(line);
						walls.drawScene();
						wallPoints = null;
						wallPointsLayer.removeChildren();
						wallPointsLayer.drawScene();
					});
				}else{
					wallPoints.push(kx*TILE_SIZE);
					wallPoints.push(ky*TILE_SIZE);
					var point = new Kinetic.Circle({
						x: kx*TILE_SIZE,
						y: ky*TILE_SIZE,
						radius: 7,
						fill: '#2493A8',
					});
					wallPointsLayer.add(point);
					point.draw();
				}
				resetClickInfo();
				break;
			case "aisle":	
				clickInfo.isDown = false;
				clickInfo.isUp = false;
				updateMaxId('aisle');
				for(var i = 0; i<=numTilesH; ++i){
					for(var j = 0; j<=numTilesV; ++j){
						var tile = new Kinetic.Rect({
							id: maxAisleId + ":" + fx
										   + ":" + fy
										   + ":" + tx
										   + ":" + ty,
							x: (fx+i)*TILE_SIZE,
							y: (fy+j)*TILE_SIZE,
							width: TILE_SIZE,
							height: TILE_SIZE,
							fill: AISLE_COLOUR		
						});
						aisles.add(tile);	
					}
				}
				aisles.drawScene();
				resetClickInfo();
				break;
			case "section":
				clickInfo.isDown = false;
				clickInfo.isUp = false;
	
				var aisleBelongsTo = {
					"aisleId":"null",
					"aisleMaxSecId":"null"
				};
				
				var isCreated = false;
				
				var clickedX = parseInt(clickInfo.mousedown.x);
				var clickedY = parseInt(clickInfo.mousedown.y);
				for (var k = 0; k<warehouse["aisle"].length ; k++){
					var aislefx = parseInt(warehouse["aisle"][k].fromX);
					var aisletx = parseInt(warehouse["aisle"][k].toX);
					var aislefy = parseInt(warehouse["aisle"][k].fromY);
					var aislety = parseInt(warehouse["aisle"][k].toY);
					var numTilesHaisle = Math.abs(aisletx - aislefx);
					var numTilesVaisle = Math.abs(aislety - aislefy);
					
					var secStartX;
					var secStartY;
					var secEndX;
					var secEndY;
					
					// figure out where start and end (so that id can be determined)
					for(var i = 0; i<=numTilesHaisle; ++i){
						for(var j = 0; j<=numTilesVaisle; ++j){
							for(var a = 0; a<=numTilesH; ++a){
								for(var b = 0; b<=numTilesV; ++b){
									if((fx+a) == (aislefx+i) && (fy+b) == (aislefy+j)){
										isCreated = true;
										aisleBelongsTo.aisleId = warehouse["aisle"][k].id;
										aisleBelongsTo.aisleMaxSecId = findNewSecId(aisleBelongsTo.aisleId);
										if(secStartX == null && secStartY == null){
											secStartX = fx+a;
											secStartY = fy+b;
										}
										secEndX = fx+a;
										secEndY = fy+b;
									}
								}
							}
						}
					}
					// actually create all of the tiles
					for(var i = 0; i<=numTilesHaisle; ++i){
						for(var j = 0; j<=numTilesVaisle; ++j){
							for(var a = 0; a<=numTilesH; ++a){
								for(var b = 0; b<=numTilesV; ++b){
									if((fx+a) == (aislefx+i) && (fy+b) == (aislefy+j)){
										var tile = new Kinetic.Rect({
											id: aisleBelongsTo.aisleId
													+ ":" + aisleBelongsTo.aisleMaxSecId 
													+ ":" + secStartX
													+ ":" + secStartY
													+ ":" + secEndX
													+ ":" + secEndY,
											x: (fx+a)*TILE_SIZE,
											y: (fy+b)*TILE_SIZE,
											width: TILE_SIZE,
											height: TILE_SIZE,
											fill: SECTION_COLOUR		
										});
										sections.add(tile);
									}
								}
							}
						}
					}
					sections.drawScene();
					if (isCreated == true){
						break;
					}
				}
				
				
				if (aisleBelongsTo.aisleId == null){
					updateCurrentAction(clickedX + ":" + clickedY + " vs aisle:" +  fx + ":" + fy);
				}
				resetClickInfo();
				break;
				
			case "station":
				updateMaxId('station');
				maxStationId++;
				for(var i = 0; i<=numTilesH; ++i){
					for(var j = 0; j<=numTilesV; ++j){
						var tile = new Kinetic.Rect({
							id: maxStationId + ":" + fx
								+ ":" + fy
								+ ":" + (numTilesH+1)	//width
								+ ":" + (numTilesV+1),	//height
							x: (fx+i)*TILE_SIZE,
							y: (fy+j)*TILE_SIZE,
							width: TILE_SIZE,
							height: TILE_SIZE,
							fill: STATION_COLOUR		
						});
						stations.add(tile);
					}
				}
				stations.drawScene();
				resetClickInfo();
				break;
			case "port":
				updateMaxId('port');
				maxPortId++;
				for(var i = 0; i<=numTilesH; ++i){
					for(var j = 0; j<=numTilesV; ++j){
						var tile = new Kinetic.Rect({
							id: maxPortId + ":" + fx
										  + ":" + fy
										  + ":" + tx
										  + ":" + ty,
							x: (fx+i)*TILE_SIZE,
							y: (fy+j)*TILE_SIZE,
							width: TILE_SIZE,
							height: TILE_SIZE,
							fill: PORT_COLOUR		
						});
						ports.add(tile);
						ports.drawScene();
					}
				}
				resetClickInfo();
				break;
		} // END OF SWITCH(tileType)
	} // END OF IF (clickInfo.isDown == true && clickInfo.isUp == true)
}


