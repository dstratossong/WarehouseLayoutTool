<html>
<body>
	<div id="container"></div>
	<script src="scripts/kinetic-v5.0.2.min.js"></script>
	<script>
		var stage = new Kinetic.Stage({
			container : 'container',
			width : 1000,
			height : 1000
		})	
		var gridSizeX = 50;
		var gridSizeY = 50;
		
	
		var gridLayer = new Kinetic.Layer();
		var entireGrid = new Kinetic.Group();
		var gridPoint;
		var thisSquare;
		for(var j=0; j<gridSizeY; ++j){
			for(var i=0; i<gridSizeX; ++i){
				thisSquare = new Kinetic.Rect({
					id: String(i) + ":" + String(j),
					x: 20*i,
					y: 20*j,
			        width: 20,
			        height: 20,
			        fill: 'transparent',
			        stroke: '#cccccc',
			        strokeWidth: 2
				});
				entireGrid.add(thisSquare);
				thisSquare.on('mouseover',function() {
					this.fill('#ccffcc');
					gridLayer.draw();
				});
				thisSquare.on('mouseout',function() {
					this.fill('transparent');
					gridLayer.draw();
				});
			}
		} 
		
		
		gridLayer.add(entireGrid);
		

		stage.add(gridLayer);
	</script>
</body>
</html>



