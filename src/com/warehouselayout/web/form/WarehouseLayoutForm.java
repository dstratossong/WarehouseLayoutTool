package com.warehouselayout.web.form;

import org.apache.struts.action.ActionForm;

import com.warehouselayout.web.bean.WarehouseLocationVO;
import com.warehouselayout.web.bean.WarehouseMappingVO;

public class WarehouseLayoutForm extends ActionForm {
	private static final long serialVersionUID = 8796356709423156942L;
	
//	private String actionName = null;
	private Long warehouseId = 1L;
	private String JSONObject = null;
	private String selectedAttr = null;
	private String selectedAisle = null;
	private String selectedSection = null;
	private String selectedPort = null;
	private String selectedStation = null;
	private Boolean valid = false;
	
	
	public void reset () {
		warehouseId = 1L;
		JSONObject = null;
		selectedAttr = null;
		selectedAisle = null;
		selectedSection = null;
		selectedPort = null;
		selectedStation = null;
	}
	
	public Long getWarehouseId() {
		return warehouseId;
	}
	public String getJSONObject() {
		return JSONObject;
	}
	public String getSelectedAttr() {
		return selectedAttr;
	}
	public String getSelectedAisle() {
		return selectedAisle;
	}
	public String getSelectedSection() {
		return selectedSection;
	}
	public String getSelectedPort () {
		return selectedPort;
	}
	public String getSelectedStation () {
		return selectedStation;
	}
	public Boolean getValid() {
		return valid;
	}

	public void setWarehouseId(Long warehouseId) {
		this.warehouseId = warehouseId;
	}
	public void setJSONObject(String jSONObject) {
		JSONObject = jSONObject;
	}
	public void setSelectedAttr(String selectedAttr) {
		this.selectedAttr = selectedAttr;
	}
	public void setSelectedAisle(String selectedAisle) {
		this.selectedAisle = selectedAisle;
	}
	public void setSelectedSection(String selectedSection) {
		this.selectedSection = selectedSection;
	}
	public void setSelectedPort (String selectedPort) {
		this.selectedPort = selectedPort;
	}
	public void setSelectedStation (String selectedStation) {
		this.selectedStation = selectedStation;
	}
	public void setValid(Boolean valid) {
		this.valid = valid;
	}
	
	public void populateJSON (WarehouseMappingVO mapping) {
		this.JSONObject = mapping.getJSONObject();
		this.warehouseId = mapping.getWarehouseId();
	}
	
	public void populateSelection (WarehouseLocationVO location) {
		selectedAttr = "section";
		selectedAisle = location.getAisle();
		selectedSection = location.getSection();
	}
	
	public void populateSelection (String aisle) {
		selectedAttr = "aisle";
		selectedAisle = aisle;
	}
	
	public void populateSelection (String aisle, String section) {
		selectedAttr = "section";
		selectedAisle = aisle;
		selectedSection = section;
	}
	
	public void populateStation (String station) {
		selectedAttr = "station";
		selectedStation = station;
	}
	
	public void populatePort (String port) {
		selectedAttr = "port";
		selectedPort = port;
	}
}
