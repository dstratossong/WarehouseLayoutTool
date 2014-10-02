package com.warehouselayout.web.bean;

import java.io.Serializable;

public class WarehouseLocationVO implements Serializable {
	private static final long serialVersionUID = -2901984145685021786L;
	
	private Integer warehouseId;
	private String aisle;
	private String section;
	private String shelf;
	private Integer totalSegment;
	private Long shelfBarcode;
	private String segment;
	private Long segmentBarcode;
	
	public Integer getWarehouseId() {
		return warehouseId;
	}
	public String getAisle() {
		return aisle;
	}
	public String getSection() {
		return section;
	}
	public String getShelf() {
		return shelf;
	}
	public Integer getTotalSegment() {
		return totalSegment;
	}
	public Long getShelfBarcode() {
		return shelfBarcode;
	}
	public String getSegment() {
		return segment;
	}
	public Long getSegmentBarcode() {
		return segmentBarcode;
	}
	
	public void setWarehouseId(Integer warehouseId) {
		this.warehouseId = warehouseId;
	}
	public void setAisle(String aisle) {
		this.aisle = aisle;
	}
	public void setSection(String section) {
		this.section = section;
	}
	public void setShelf(String shelf) {
		this.shelf = shelf;
	}
	public void setTotalSegment(Integer totalSegment) {
		this.totalSegment = totalSegment;
	}
	public void setShelfBarcode(Long shelfBarcode) {
		this.shelfBarcode = shelfBarcode;
	}
	public void setSegment(String segment) {
		this.segment = segment;
	}
	public void setSegmentBarcode(Long segmentBarcode) {
		this.segmentBarcode = segmentBarcode;
	}

}
