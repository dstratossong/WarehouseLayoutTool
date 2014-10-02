<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
<meta content="utf-8" http-equiv="encoding">

<html>
<body>
	<div id="container"></div>
	<canvas id="myCanvas" width="802" height="802"></canvas> 
	<script src="scripts/fabric/fabric.min.js"></script>
	<script>
 		var warehouse = {
			"unit" : "foot",
			"tileSize" :"20",
			"width" : "20",	
			"height" : "20",
			
			"wall" : [{"id":"1","fromX":"10","fromY":"10","toX":"10","toY":"30"},
	 				  {"id":"2","fromX":"10","fromY":"30","toX":"15","toY":"30"},
	 				  {"id":"3","fromX":"15","fromY":"30","toX":"15","toY":"25"},
	 				  {"id":"4","fromX":"15","fromY":"25","toX":"20","toY":"25"},
	 				  {"id":"5","fromX":"20","fromY":"25","toX":"20","toY":"30"},
	 				  {"id":"6","fromX":"20","fromY":"30","toX":"30","toY":"30"},
	 				  {"id":"7","fromX":"30","fromY":"30","toX":"30","toY":"10"},
	 				  {"id":"8","fromX":"30","fromY":"10","toX":"10","toY":"10"}],
	 				  
			"port" : [{"id":"1","fromX":"10","fromY":"10","toX":"10","toY":"30"}],
			"aisle"  : [{"id":"1","fromX":"20","fromY":"15","toX":"26","toY":"15"}],
			"section" : [{"id":"1A","fromX":"20","fromY":"15","toX":"23","toY":"15"},
			             {"id":"1B","fromX":"23","fromY":"15","toX":"26","toY":"15"}],
			"station"  : [{"id":"1"},{"fromX":"40"},{"fromY":"40"},{"area":"25"}]
		}	
 		var HEIGHT = parseInt(warehouse.height);
 		var WIDTH = parseInt(warehouse.width);
 		var TILE_SIZE = parseInt(warehouse.tileSize);
 		
 		
		// create a wrapper around native canvas element (with id="c")
		var canvas = new fabric.Canvas('myCanvas');
		canvas.lockMovementX = true;
		canvas.lockMovementX = true;
		canvas.lockMovementY = true;
		canvas.lockScalingX = true;
		canvas.lockScalingY = true;
		canvas.lockRotation = true;
		
		var grid = new fabric.Group();
		grid.lockMovementX = true;
		grid.lockMovementX = true;
		grid.lockMovementY = true;
		grid.lockScalingX = true;
		grid.lockScalingY = true;
		grid.lockRotation = true;
 		for(var j=0; j<HEIGHT; ++j){
 			var row = new fabric.Group();
 			for(var i=0; i<WIDTH; ++i){
 				var rect = new fabric.Rect({
 					//id: 'sq:' + String(i) + ':' + String(j),
 					left: TILE_SIZE*i+10,
 					top: TILE_SIZE*j+10,
 			        width: TILE_SIZE,
 			        height: TILE_SIZE,
 			        fill: 'transparent',
 			        stroke: '#cccccc',
 			        strokeWidth: 1,
 			        lockMovementX: true,
 			        lockMovementY: true,
 			        lockScalingX: true,
 			        lockScalingY: true,
 			       	lockRotation: true
 				});	
 				//var prevFill;
 				canvas.on('mouse:down',function(options) {
 					//prevFill = rect.fill();
 					if(options.rect){
 						rect.set({fill:'#ccffcc'});
 					}
 				});
 				/* rect.off('mouse:move',function() {
 					rect.fill(prevFill);
 				}); */
 				row.add(rect);
 			}
 			grid.add(row);
 		}
		
 		// make things highlight
 		
 		

		canvas.add(grid);
	</script>
</body>
</html>



