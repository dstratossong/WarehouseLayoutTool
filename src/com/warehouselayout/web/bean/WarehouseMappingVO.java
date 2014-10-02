package com.warehouselayout.web.bean;

import java.io.Serializable;

public class WarehouseMappingVO implements Serializable {
	private static final long serialVersionUID = 4801148171398652792L;
	
	private Long warehouseId;
	private String JSONObject;
	
	public Long getWarehouseId() {
		return warehouseId;
	}
	public String getJSONObject() {
		return JSONObject;
	}
	
	public void setWarehouseId(Long warehouseId) {
		this.warehouseId = warehouseId;
	}
	public void setJSONObject(String jSONObject) {
		JSONObject = jSONObject;
	}

}
