function loadObjects(attr){
		
		for(var i = 0; i<warehouse[attr].length; i++){
			switch(attr){
				case "wall":
					var points = []; 
					for(var k = 0; k<warehouse[attr][i].pts.length; k++){
						points.push(warehouse[attr][i].pts[k]);
						points[k] = points[k]*TILE_SIZE;
					}
					var thisObj = new Kinetic.Line({
						id: warehouse[attr][i].id + ":"
							+points,
						points: points,
						stroke: WALL_COLOUR,
						strokeWidth: 5,
						lineCap: 'square'
					});
					walls.add(thisObj);
					wallLayer.draw();
					break;
				case "port":
					var fx = parseInt(warehouse[attr][i].fromX)*TILE_SIZE;
					var tx = parseInt(warehouse[attr][i].toX)*TILE_SIZE;
					var fy = parseInt(warehouse[attr][i].fromY)*TILE_SIZE;
					var ty = parseInt(warehouse[attr][i].toY)*TILE_SIZE;
					var numTilesH = Math.abs(parseInt(warehouse[attr][i].toX) - parseInt(warehouse[attr][i].fromX));
					var numTilesV = Math.abs(parseInt(warehouse[attr][i].toY)- parseInt(warehouse[attr][i].fromY));
					
					for(var k = 0; k<=numTilesH; ++k){
						for(var j = 0; j<=numTilesV; ++j){
							var tile = new Kinetic.Rect({
								id: warehouse[attr][i].id + ":"
									+ warehouse[attr][i].fromX + ":"
									+ warehouse[attr][i].fromY + ":"
									+ warehouse[attr][i].toX + ":"
									+ warehouse[attr][i].toY,
								x: fx + k*TILE_SIZE,
								y: fy + j*TILE_SIZE,
								width: TILE_SIZE,
								height: TILE_SIZE,
								fill: PORT_COLOUR		
							});
							ports.add(tile);
							objLayer.drawScene();
						}
					}
					break;
				case "aisle":
					var fx = parseInt(warehouse[attr][i].fromX)*TILE_SIZE;
					var tx = parseInt(warehouse[attr][i].toX)*TILE_SIZE;
					var fy = parseInt(warehouse[attr][i].fromY)*TILE_SIZE;
					var ty = parseInt(warehouse[attr][i].toY)*TILE_SIZE;
					var numTilesH = Math.abs(parseInt(warehouse[attr][i].toX) - parseInt(warehouse[attr][i].fromX));
					var numTilesV = Math.abs(parseInt(warehouse[attr][i].toY)- parseInt(warehouse[attr][i].fromY));
					for(var k = 0; k<=numTilesH; ++k){
						for(var j = 0; j<=numTilesV; ++j){
							var tile = new Kinetic.Rect({
								id: warehouse[attr][i].id + ":"
									+ warehouse[attr][i].fromX + ":"
									+ warehouse[attr][i].fromY + ":"
									+ warehouse[attr][i].toX + ":"
									+ warehouse[attr][i].toY,
								x: fx + k*TILE_SIZE,
								y: fy + j*TILE_SIZE,
								width: TILE_SIZE,
								height: TILE_SIZE,
								fill: AISLE_COLOUR		
							});
							aisles.add(tile);
							objLayer.drawScene();
						}
					}
					break;
				case "section":
					var fx = parseInt(warehouse[attr][i].fromX)*TILE_SIZE;
					var tx = parseInt(warehouse[attr][i].toX)*TILE_SIZE;
					var fy = parseInt(warehouse[attr][i].fromY)*TILE_SIZE;
					var ty = parseInt(warehouse[attr][i].toY)*TILE_SIZE;
					var numTilesH = Math.abs(parseInt(warehouse[attr][i].toX) - parseInt(warehouse[attr][i].fromX));
					var numTilesV = Math.abs(parseInt(warehouse[attr][i].toY)- parseInt(warehouse[attr][i].fromY));
					
					for(var k = 0; k<=numTilesH; ++k){
						for(var j = 0; j<=numTilesV; ++j){
							var tile = new Kinetic.Rect({
								id: warehouse[attr][i].aisleId + ":"
									+ warehouse[attr][i].secId + ":"
									+ warehouse[attr][i].fromX + ":"
									+ warehouse[attr][i].fromY + ":"
									+ warehouse[attr][i].toX + ":"
									+ warehouse[attr][i].toY,
								x: fx + k*TILE_SIZE,
								y: fy + j*TILE_SIZE,
								width: TILE_SIZE,
								height: TILE_SIZE,
								fill: SECTION_COLOUR		
							});
							sections.add(tile);
							objLayer.drawScene();
						}
					}
					break;
				case "station":
					var fx = parseInt(warehouse[attr][i].fromX)*TILE_SIZE;
					var fy = parseInt(warehouse[attr][i].fromY)*TILE_SIZE;
					var numTilesH = parseInt(warehouse[attr][i].width);
					var numTilesV = parseInt(warehouse[attr][i].height);
					
					for(var k = 0; k<numTilesH ; ++k){
						for(var j = 0; j<numTilesV; ++j){
							var tile = new Kinetic.Rect({
								id: warehouse[attr][i].id + ":"
									+ warehouse[attr][i].fromX + ":"
									+ warehouse[attr][i].fromY + ":"
									+ warehouse[attr][i].width + ":"
									+ warehouse[attr][i].height,
								x: fx + k*TILE_SIZE,
								y: fy + j*TILE_SIZE,
								width: TILE_SIZE,
								height: TILE_SIZE,
								fill: STATION_COLOUR		
							});
							stations.add(tile);
							objLayer.drawScene();
						}
					}
					break;
			}
		}
	}
