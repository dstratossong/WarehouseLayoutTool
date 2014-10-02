package com.warehouselayout.web.form;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts.action.ActionForm;

import com.warehouselayout.dao.WarehouseMappingDAO;

public class IndexForm extends ActionForm {
	private static final long serialVersionUID = 4266520947989725259L;
	
	public class WarehouseInfoObject {
		public String name;
		public Long id;
		public boolean isLayout;
		public WarehouseInfoObject (String name, Long id, boolean layout) {
			this.name = name;
			this.id = id; 
			this.isLayout = layout;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public boolean isIsLayout() {
			return isLayout;
		}
		public void setIsLayout(boolean isLayout) {
			this.isLayout = isLayout;
		}
	}
	
	
	public class Warehouse {
		private String name;
		private Long id;
		public Warehouse (String name, Long id) {
			this.name = name;
			this.id = id; 
		}
		
		public String getName () {
			return name;
		}
		public Long getId () {
			return id;
		}
	}
	
	private List<WarehouseInfoObject> whList = null;
	
	public void load () {
		whList = new ArrayList<WarehouseInfoObject>();
		WarehouseMappingDAO mappingDAO = WarehouseMappingDAO.getInstance();
		List<Warehouse> temp = new ArrayList<Warehouse>(); // get from PGWarehouseDAO
		{ // HARDCODE IN PROGRESS
			temp.add(new Warehouse("1", 1L));
			temp.add(new Warehouse("2", 2L));
			temp.add(new Warehouse("3", 3L));
			temp.add(new Warehouse("4", 4L));
			temp.add(new Warehouse("5", 5L));
			temp.add(new Warehouse("6", 6L));
			temp.add(new Warehouse("7", 7L));
		}
		
		for (Warehouse warehouse : temp) {
			boolean isLayout = false;
			if (mappingDAO.loadWarehouseMapping(warehouse.getId()) != null) {
				isLayout = true;
			}
			whList.add(new WarehouseInfoObject(warehouse.getName(), warehouse.getId(), isLayout));
		}
		
	}

	public List<WarehouseInfoObject> getWhList() {
		return whList;
	}

	public void setWhList(List<WarehouseInfoObject> whList) {
		this.whList = whList;
	}
}
