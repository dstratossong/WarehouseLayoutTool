
function inputShelfBarcode () {
	var barcode = document.forms["shelfBarcode"]["barcode"].value;
	if (isNaN(parseInt(barcode))) {
		alert("Invalid Input Detected!");
		return;
	}
	$.post("/WarehouseLayoutTool/dataRetrieve.do",
			{
				actionName: "locateShelfBarcode",
				barcode: barcode
			},
			barcodeResponseParser);
}

function inputSegmentBarcode () {
	var barcode = document.forms["segmentBarcode"]["barcode"].value;
	if (isNaN(parseInt(barcode))) {
		alert("Invalid Input Detected!");
		return;
	}
	$.post("/WarehouseLayoutTool/dataRetrieve.do",
			{
				actionName: "locateSegmentBarcode",
				barcode: barcode
			},
			barcodeResponseParser);
}

function inputAisleSection () {
	var inputAisle = document.forms["aisleSection"]["aisle"].value;
	var aisleInt = inputAisle.toUpperCase();
	var inputSection = document.forms["aisleSection"]["section"].value;
	var sectionStr = inputSection;
	if (inputAisle == null || inputAisle == "") {
		alert("Empty Input Detected");
	} else if (inputSection == null || inputSection == "") {
		getLocation("aisle", aisleInt);
	} else {
		getLocation("section", aisleInt, sectionStr);
	}
}

function inputStation () {
	var inputStation = document.forms["station"]["station"].value;
	if (inputStation == null || inputStation == "") {
		alert("Empty Input Detected");
	} else {
		getLocation("station", null, null, null, inputStation);
	}
}

function inputPort () {
	var inputPort = document.forms["port"]["port"].value;
	if (inputPort == null || inputPort == "") {
		alert("Empty Input Detected");
	} else {
		getLocation("port", null, null, inputPort, null);
	}
}

function getLocation (attr, aisleId, sectionId, portId, stationId) {
	switch (attr) {
	case "aisle":
		selectObject(getAisle(aisleId));
		break;
	case "section":
		if (isNaN(parseInt(sectionId))) {
			alert("Invalid Input Detected!");
			return;
		}
		selectObject(getSection(aisleId, sectionId));
		break;
	case "port":
		selectObject(getPort(portId));
		break;
	case "station":
		selectObject(getStation(stationId));
		break;
	default:
		break;
	}
}

function barcodeResponseParser (data, status) {
	var obj = JSON.parse(data);
	if (status !== 'success') {
		alert("Connection Refused");
	} else if (!obj.valid) {
		alert("Invalid Input Detected!");
	} else {
		getLocation ("section", obj.aisleId, obj.sectionId);
	}
}

