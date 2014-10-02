package com.warehouselayout.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.warehouselayout.web.bean.WarehouseMappingVO;

public class WarehouseMappingDAO {
	
	private static WarehouseMappingDAO instance = new WarehouseMappingDAO();
	public static WarehouseMappingDAO getInstance() {
		return instance;
	}
	
	public static void main (final String[] args) {
		WarehouseMappingDAO map = getInstance();
		WarehouseMappingVO mapvo = map.loadWarehouseMapping(1L);
		//WarehouseMappingVO mapvo = map.loadWarehouseMapping(1L);
		System.out.println(mapvo.getJSONObject());
		
		
	}
	
	public List<WarehouseMappingVO> loadWarehouseMapping () {
		List<WarehouseMappingVO> listOfMappings = new ArrayList<WarehouseMappingVO>();
		
		DBConnect dbConnect = getDBConnect();
		Connection connection = dbConnect.getConnection();
		
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = null;
		
		try {
			sql = "SELECT * FROM wh_mapping";
			ps = connection.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				WarehouseMappingVO whMapping = new WarehouseMappingVO();
				
				whMapping.setWarehouseId(rs.getLong("wh_id"));
				whMapping.setJSONObject(rs.getString("json_object"));
				
				listOfMappings.add(whMapping);
			}
			releaseDBConnect(dbConnect);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return listOfMappings;
	}
	
	public WarehouseMappingVO loadWarehouseMapping (Long warehouseId) {
		
		WarehouseMappingVO whMapping = new WarehouseMappingVO();
		boolean valid = false;
		
		DBConnect dbConnect = getDBConnect();	
		Connection connection = dbConnect.getConnection();
		
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = null;
		
		try {
			sql = "SELECT * FROM wh_mapping WHERE wh_id=?";
			ps = connection.prepareStatement(sql);
			ps.setInt(1, warehouseId.intValue());
			rs = ps.executeQuery();
			while (rs.next()) {
				valid = true;
				whMapping.setWarehouseId(rs.getLong("wh_id"));
				whMapping.setJSONObject(rs.getString("json_object"));
			}
			releaseDBConnect(dbConnect);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		if (!valid) return null;
		return whMapping;
	}
	
	public void updateWarehouseMapping (Long warehouseId, String JSONObject) {
		
		DBConnect dbConnect = getDBConnect();
		Connection connection = dbConnect.getConnection();
		
		PreparedStatement ps = null;
		String sql = null;
		
		try {
			sql = "UPDATE wh_mapping SET json_object=? WHERE wh_id=?";
			ps = connection.prepareStatement(sql);
			ps.setString(1, JSONObject);
			ps.setInt(2, warehouseId.intValue());
			ps.executeUpdate();
			releaseDBConnect(dbConnect);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public boolean addWarehouseMapping (WarehouseMappingVO mappingVO) {
		
		if (loadWarehouseMapping(mappingVO.getWarehouseId()) != null) {
			return false;
		}
		
		DBConnect dbConnect = getDBConnect();
		Connection connection = dbConnect.getConnection();
		
		PreparedStatement ps = null;
		String sql = null;
		
		try {
			sql = "INSERT INTO wh_mapping (wh_id, json_object) VALUES (?, ?)";
			ps = connection.prepareStatement(sql);
			ps.setInt(1, mappingVO.getWarehouseId().intValue());
			ps.setString(2, mappingVO.getJSONObject());
			ps.executeUpdate();
			releaseDBConnect(dbConnect);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	private DBConnect getDBConnect () {
		return new DBConnect();
	}
	private void releaseDBConnect (DBConnect dbConnect) throws SQLException {
		dbConnect.releaseConnections();
	}
}