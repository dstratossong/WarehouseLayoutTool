<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" language="java" session="true" %>

<%@ taglib prefix="bean" uri="/WEB-INF/struts-bean.tld" %>
<%@ taglib prefix="html" uri="/WEB-INF/struts-html.tld" %>
<%@ taglib prefix="logic" uri="/WEB-INF/struts-logic.tld" %>

<jsp:useBean id="indexForm" scope="request" class="com.warehouselayout.web.form.IndexForm" />

<html>
<head><title>Warehouse Layout Tool</title></head>
<body>
	<script src="scripts/createLayout.js"></script>
	<script src="scripts/jquery-1.11.1.min.js"></script>
	<div style="position:fixed; left:20px; right:20px; top:10px; bottom:10px; background-color:#F2E8C9; border: 10px solid; padding: 50px">
		<fieldset style="top:5%;">
			<legend><em>Choose an Existing Warehouse:</em></legend>
			<form name="main" action="viewMode.do" method="GET">
				<input type="hidden" name="actionName" value="retrieve" />
				<input type="hidden" name="warehouseId" value="" />
					<logic:notEmpty name="indexForm" property="whList">
						<div>
							<span style="float:left; width:40%"><em>Warehouse Name</em></span>
							<span style="float:left; width:20%"><em>Warehouse ID</em></span>
							<span style="float:left; width:30%"><em>Warehouse Layout</em></span>
						</div>
						<br />
						<div>
							<logic:iterate name="indexForm" property="whList" id="wh">
								<span style="float:left; width:40%"><bean:write name="wh" property="name" /></span>
								<span style="float:left; width:20%"><bean:write name="wh" format="#" property="id" /></span>
								<logic:equal name="wh" property="isLayout" value="true">
									<span style="float:left; width:30%">
										<input type="submit" name="layoutRetrieve" value="Warehouse Layout" 
												onclick="javascript:chooseLayout('<bean:write name="wh" format="#" property="id" />')"/>
									</span>
								</logic:equal>
								<logic:equal name="wh" property="isLayout" value="false">
									<span style="float:left; width:30%">
										<input type="button" name="layoutRetrieve" value="Create New Layout" 
												onclick="javascript:showNewLayoutForm('<bean:write name="wh" format="#" property="id" />')"/>
									</span>
								</logic:equal>
								<br />
							</logic:iterate>
						</div>
					</logic:notEmpty>
			</form>
		</fieldset>
		<br />
		<br />
		<fieldset id="newLayoutForm" style="visibility:hidden;">
		<legend><em>Create a New Warehouse:</em></legend>
			<form name="newLayoutForm" action="javascript:createLayoutAction()" method="POST">
				<input type="hidden" name="warehouseId" value="" />
				Width (Number of Horizontal Tiles): <input type="number" name="width" min="1" style="width:50px" /><br />
				Height (Number of Vertical Tiles): <input type="number" name="height" min="1" style="width:50px" /><br />
				Units (Tile Side Length = 1 unit): <input type="text" name="units" /><br />
				<input type="submit" name="submit" value="Submit"/>
			</form>
		</fieldset>
	</div>
</body>
</html>
