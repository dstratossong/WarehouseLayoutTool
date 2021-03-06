<html>
<body>
	<div id="container"></div>
	<table>
	<tr>
		<td>	
		<script src="scripts/kinetic-v5.0.2.min.js"></script>
		<script>
			// should load from db and display current map
			var stage = new Kinetic.Stage({
				container : 'container',
				width : 1000,
				height : 1000
			})	
			var GRID_SIZE_X = 50;
			var GRID_SIZE_Y = 50;
			
			var thisSquare;
			var gridRow;
			
			
			for (var j = 0; j < GRID_SIZE_Y; ++j) {
				gridRow = new Kinetic.Layer({
					id : "row:" + String(i) + ":" + String(j)
				});
				for (var i = 0; i < GRID_SIZE_X; ++i) {
					thisSquare = new Kinetic.Rect({
						id : "sq:" + String(i) + ":" + String(j),
						x : 20 * i,
						y : 20 * j,
						width : 20,
						height : 20,
						fill : 'transparent',
						stroke : '#cccccc',
						strokeWidth : 2
					});
					gridRow.add(thisSquare);
					thisSquare.on('mouseover',function() {
						this.fill('#ccffcc');
						gridRow.draw();
					});
					thisSquare.on('mouseout',function() {
						this.fill('transparent');
						gridRow.draw();
					});
				}
				stage.add(gridRow);
			}
			
		</script>
		</td>
		<td>
		<form name="Options" action="options.do" method="get">
			<button type="submit" name="newWarehouse">Create New Warehouse</button>
		</form>
		</td>
	</tr>
	</table>
</body>
</html>



