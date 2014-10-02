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
		
		// background
		var layer = new Kinetic.Layer();
		var warehouse = new Kinetic.Line({
			points : [ 50, 550,
			           50, 50,
			           550, 50,
			           550, 550,
			           400, 550,
			           400, 400,
			           350, 400,
			           350, 550],
			fill : '#00D2FF',
			stroke : 'black',
			strokeWidth : 5,
			closed : true
		});
		
		var line;
		
		function writeMessage(message) {
			text.setText(message);
			layer.draw();
		}	
		
		var text = new Kinetic.Text({
			x : 10,
			y : 10,
			fontFamily : 'Calibri',
			fontSize : 24,
			text : '',
			fill : 'black'
		});
		
		var moving;
		warehouse.on('mousedown', function() {						
			if(moving){
				moving = false;
				layer.add(line);
				layer.draw();
			}else {
				var mousePos = stage.getPointerPosition();
				//start point and end point are the same
				writeMessage('clicked');
				moving = true;
				line = new Kinetic.Line({
					id: 'line',
					points: [mousePos.x,mousePos.y,mousePos.x,mousePos.y],
					stroke : '#cccccc',
					strokeWidth: 5,
					lineCap: 'round'
				});
				layer.add(line);
				layer.drawScene();
			}
			
		});

		warehouse.on('mousemove', function(evt) {
			if (moving) {
				var mousePos = stage.getPointerPosition();
				var x = mousePos.x;
				var y = mousePos.y;
				var currPoints = line.getPoints();
				line.setPoints([currPoints[0], currPoints[1],mousePos.x,mousePos.y]);
				moving = true;
				layer.drawScene();
			}
		});

		warehouse.on('mouseup', function(evt) {
			moving = false;
			writeMessage('');
		}); 
		
		
		layer.add(warehouse);
		layer.add(text);
		stage.add(layer);
	</script>
</body>
</html>



