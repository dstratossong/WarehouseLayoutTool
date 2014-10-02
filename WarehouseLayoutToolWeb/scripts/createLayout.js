/**
 * 
 */

function chooseLayout (id) {
	document.forms["main"]["warehouseId"].value = id;
	
}

function createLayoutAction () {
	var warehouseId = document.forms["newLayoutForm"]["warehouseId"].value;
	var width = document.forms["newLayoutForm"]["width"].value;
	var height = document.forms["newLayoutForm"]["height"].value;
	var units = document.forms["newLayoutForm"]["units"].value;
	$.post("/WarehouseLayoutTool/addLayout.do",
			{
				warehouseId: warehouseId,
				width: width,
				height: height,
				units: units
			},
			function (data, status) {
				if (status !== 'success') {
					alert("Connection Refused");
				} else if (data === 'false') {
					alert("Invalid Input");
				} else {
					document.forms["main"]["warehouseId"].value = warehouseId;
					document.forms["main"].submit();
				}
			});
	resetNewLayoutForm();
}

function showNewLayoutForm (id) {
	document.getElementById("newLayoutForm").style.visibility = "visible";
	document.forms["newLayoutForm"]["warehouseId"].value = id;
}

function resetNewLayoutForm () {
	document.getElementById("newLayoutForm").style.visibility = "hidden";
	document.forms["newLayoutForm"]["warehouseId"].value = "";
	document.forms["newLayoutForm"]["width"].value = "";
	document.forms["newLayoutForm"]["height"].value = "";
	document.forms["newLayoutForm"]["units"].value = "";
}