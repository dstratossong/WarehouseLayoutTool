var warehouse = {

	unit:			"foot",
	tileSize:		20,
	width:			100,	
	height:			100,
	
	wall:			[{id:1, pts:[10,10, 10,30, 15,30, 15,25, 20,25, 20,30, 30,30, 30,10, 10,10]}],

	aisle: 			[{id:1, fromX:23, fromY:21, toX:28, toY:21},
					 {id:2, fromX:23, fromY:24, toX:28, toY:24},
					 {id:3, fromX:23, fromY:27, toX:28, toY:27}],

	section:		[{aisleId:1, secId:"A", fromX:23, fromY:21, toX:23, toY:21},
					 {aisleId:1, secId:"B", fromX:26, fromY:21, toX:28, toY:21},
					 {aisleId:2, secId:"A", fromX:23, fromY:24, toX:25, toY:24},
					 {aisleId:2, secId:"B", fromX:26, fromY:24, toX:28, toY:24},
					 {aisleId:3, secId:"A", fromX:23, fromY:27, toX:25, toY:27},
					 {aisleId:3, secId:"B", fromX:26, fromY:27, toX:28, toY:27},],

	shelf: 			[{aisleId:1, secId:"A", shelfId:"i", segNum:6},
	          		 {aisleId:1, secId:"A", shelfId:"ii", segNum:8},
					 {aisleId:1, secId:"B", shelfId:"i", segNum:5},
					 {aisleId:1, secId:"B", shelfId:"ii", segNum:7},
					 {aisleId:2, secId:"A", shelfId:"i", segNum:6},
	          		 {aisleId:2, secId:"A", shelfId:"ii", segNum:4},
	          		 {aisleId:2, secId:"A", shelfId:"iii", segNum:2},
					 {aisleId:2, secId:"B", shelfId:"i", segNum:72},
					 {aisleId:3, secId:"A", shelfId:"i", segNum:6},
	          		 {aisleId:3, secId:"A", shelfId:"ii", segNum:4},
					 {aisleId:3, secId:"B", shelfId:"i", segNum:6},
					 {aisleId:3, secId:"B", shelfId:"ii", segNum:4}],

	station:		[{id:1, fromX:12, fromY:12, width:5, height:3}],

	port:			[{id:1, fromX:9, fromY:11, toX:9, toY:13}]

};
