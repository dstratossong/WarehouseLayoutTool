var secsToDelete = [];

function removeTile(toDelete, objType){
	if(toDelete == null){
		writeMessage('clicked not object');
	}else{
		if(objType == "wall"){
			var mousePos = stage.getPointerPosition();
			var mouseX = mousePos.x - (mousePos.x)%TILE_SIZE;
			mouseX /= TILE_SIZE;
			var mouseY = mousePos.y - (mousePos.y)%TILE_SIZE;
			mouseY /= TILE_SIZE;
			var children = walls.getChildren();
			var toDelete = null;
			
			for(var i=0; i< children.length; i++){// go through all the walls
				var childrenPoints = children[i].getPoints();
				var points = [];
				// save all the points into separate array
				for(var j = 0; j <childrenPoints.length; j++){
					points.push(childrenPoints[j]);
					points[j] = points[j]/TILE_SIZE;
				}
				// parse through the points to see if clicked anywhere on the wall
				for(var j = 0; j<points.length; j+=2){
					var fx = points[j];
					var fy = points[j+1];
					var tx = points[j+2];
					var ty = points[j+3];
					if(fx > tx){
						var temp = fx;
						fx = tx;
						tx = temp;
					}
					if(fy > ty){
						var temp = fy;
						fy = ty;
						ty = temp;
					}
					var numTilesH = Math.abs(tx - fx);
					var numTilesV = Math.abs(ty - fy);
					for(var a = 0; a<=numTilesH; a++){
						for(var b = 0; b<=numTilesV; b++){
							if ((fx+a) == mouseX && (fy+b) == mouseY){
								toDelete=children[i];
							}
						}
					}
				}
			}
			
			if(toDelete != null){
				toDelete.remove();
				objLayer.drawScene();
				wallLayer.drawScene();

				actionDetector.moveToTop();
				objLayer.moveToTop();
				grid.moveToTop();
				wallLayer.moveToTop();
				wallPointsLayer.moveToTop();
			}
		}else if(objType == "aisle"){
			var aisleId = toDelete.getAttr('aisleId');
			toDelete.remove();
			objLayer.drawScene();
			var secChildren = sections.getChildren();
			var secDelete = [];
			for(var i=0; i< secChildren.length; i++){
				if(aisleId == secChildren[i].getAttr('aisleId')){
					secsToDelete.push(secChildren[i].getId());
					secDelete.push(secChildren[i]);
				}				
			}
			for(var i=0; i<secDelete.length; i++){
				secDelete[i].remove();
			}
			objLayer.drawScene();

			actionDetector.moveToTop();
			objLayer.moveToTop();
			grid.moveToTop();
			wallLayer.moveToTop();
			wallPointsLayer.moveToTop();
			aisles.moveToTop();
		}else if(objType == "section"){
			secsToDelete.push(toDelete.getId());

			toDelete.remove();
			objLayer.drawScene();
			
			actionDetector.moveToTop();
			objLayer.moveToTop();
			grid.moveToTop();
			wallLayer.moveToTop();
			wallPointsLayer.moveToTop();			
		}else {
			toDelete.remove();
			objLayer.drawScene();
			
			actionDetector.moveToTop();
			objLayer.moveToTop();
			grid.moveToTop();
			wallLayer.moveToTop();
			wallPointsLayer.moveToTop();
		}
	} // END OF IF (toDelete == null)
}



