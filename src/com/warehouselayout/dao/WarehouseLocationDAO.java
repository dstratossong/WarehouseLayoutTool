package com.warehouselayout.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.warehouselayout.util.RomanNumeral;
import com.warehouselayout.web.bean.WarehouseLocationVO;
import com.warehouselayout.web.bean.WarehouseMappingVO;

public class WarehouseLocationDAO {
	
	private static WarehouseLocationDAO instance = new WarehouseLocationDAO();
	public static WarehouseLocationDAO getInstance() {
		return instance;
	}
	
	public static void main (String args[]) {
		WarehouseLocationDAO locDAO = WarehouseLocationDAO.getInstance();
		locDAO.loadWHLocationFromWHMapping();
//		locDAO.loadWHLocationFromWHMapping(1L);
//		
//		WarehouseLocationVO locVO = locDAO.loadWarehouseLocation(100650010010L);
//		System.out.println(locVO.getWarehouseId());
//		System.out.println(locVO.getAisle());
//		System.out.println(locVO.getSection());
//		System.out.println(locVO.getShelf());
//		System.out.println(locVO.getShelfBarcode());
//		System.out.println(locVO.getTotalSegment());
//		System.out.println(locVO.getSegment());
//		System.out.println(locVO.getSegmentBarcode());
//		
//		List<WarehouseLocationVO> locVOs = locDAO.loadWarehouseLocationByShelf(100660020L);
//		for (WarehouseLocationVO locVO : locVOs) {
//			System.out.println(locVO.getWarehouseId());
//			System.out.println(locVO.getAisle());
//			System.out.println(locVO.getSection());
//			System.out.println(locVO.getShelf());
//			System.out.println(locVO.getShelfBarcode());
//			System.out.println(locVO.getTotalSegment());
//			System.out.println(locVO.getSegment());
//			System.out.println(locVO.getSegmentBarcode());
//			System.out.println("END OF AN OBJ");
//		}
//		
//		List<WarehouseLocationVO> locVOs = locDAO.loadWarehouseLocation();
//		for (WarehouseLocationVO locVO : locVOs) {
//			System.out.println(locVO.getWarehouseId());
//			System.out.println(locVO.getAisle());
//			System.out.println(locVO.getSection());
//			System.out.println(locVO.getShelf());
//			System.out.println(locVO.getShelfBarcode());
//			System.out.println(locVO.getTotalSegment());
//			System.out.println(locVO.getSegment());
//			System.out.println(locVO.getSegmentBarcode());
//			System.out.println("END OF AN OBJ");
//		}
//		
//		return;
	}
	
	
	/**WarehouseLocationDAO.loadWarehouseLocation
	 * 
	 * Gets all data from database table wh_location
	 * and fills up bean WarehouseLocationVO, then
	 * throw them all into an ArrayList
	 * 
	 * Static SQL statement, injection not possible
	 * 
	 * @return list of WarehouseLocationVO from database table wh_location
	 */
	public List<WarehouseLocationVO> loadWarehouseLocation () {
		List<WarehouseLocationVO> listOfLocations = new ArrayList<WarehouseLocationVO>();
		boolean valid = false;
		
		DBConnect dbConnect = getDBConnect();
		Connection connection = dbConnect.getConnection();
		
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM wh_location";
		
		try {
			ps = connection.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				WarehouseLocationVO whLocation = new WarehouseLocationVO();
				
				valid = true;
				whLocation.setWarehouseId	(rs.getInt		("wh_id"));
				whLocation.setAisle			(rs.getString	("aisle"));
				whLocation.setSection		(rs.getString	("section"));
				whLocation.setShelf			(rs.getString	("shelf"));
				whLocation.setTotalSegment	(rs.getInt		("total_segment"));
				whLocation.setShelfBarcode	(rs.getLong		("shelf_barcode"));
				whLocation.setSegment		(rs.getString	("segment"));
				whLocation.setSegmentBarcode(rs.getLong		("segment_barcode"));
				
				listOfLocations.add(whLocation);
			}
			releaseDBConnect(dbConnect);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		if (!valid) return null;
		return listOfLocations;
	}
	
	
	
	/**WarehouseLocationDAO.loadWarehouseLocation
	 * 
	 * Gets data from database table wh_location
	 * where shelf_barcode == shelfBarcode
	 * and fills up bean WarehouseLocationVO, then
	 * throw them all into an ArrayList
	 * 
	 * Injection prevented
	 * 
	 * @param shelfBarcode - Long, a specific (general) location requested
	 * @return list of WarehouseLocationVO from database table wh_location
	 */
	public List<WarehouseLocationVO> loadWarehouseLocationByShelf (Long shelfBarcode) {
		List<WarehouseLocationVO> listOfLocations = new ArrayList<WarehouseLocationVO>();
		boolean valid = false;
		
		DBConnect dbConnect = getDBConnect();
		Connection connection = dbConnect.getConnection();
		
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = null;
		
		try {
			sql = "SELECT * FROM wh_location WHERE shelf_barcode=?";
			ps = connection.prepareStatement(sql);
			ps.setLong(1, shelfBarcode);
			rs = ps.executeQuery();
			while (rs.next()) {
				WarehouseLocationVO whLocation = new WarehouseLocationVO();
				
				valid = true;
				whLocation.setWarehouseId	(rs.getInt		("wh_id"));
				whLocation.setAisle			(rs.getString	("aisle"));
				whLocation.setSection		(rs.getString	("section"));
				whLocation.setShelf			(rs.getString	("shelf"));
				whLocation.setTotalSegment	(rs.getInt		("total_segment"));
				whLocation.setShelfBarcode	(rs.getLong		("shelf_barcode"));
				whLocation.setSegment		(rs.getString	("segment"));
				whLocation.setSegmentBarcode(rs.getLong		("segment_barcode"));
				
				listOfLocations.add(whLocation);
			}
			releaseDBConnect(dbConnect);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (!valid) return null;
		return listOfLocations;
	}
	
	
	/**WarehouseLocationDAO.loadWarehouseLocation
	 * 
	 * Gets the specific entry in the database table wh_location 
	 * with segment_barcode == segmentBarcode, and throw that into 
	 * a bean WarehouseLocationVO
	 * 
	 * Injection prevented
	 * 
	 * @param segmentBarcode - Long, a specific location requested
	 * @return a requested WarehouseLocationVO object with specified segmentBarcode 
	 */
	public WarehouseLocationVO loadWarehouseLocation (Long segmentBarcode) {
		
		WarehouseLocationVO whLocation = new WarehouseLocationVO();
		boolean valid = false;
		
		DBConnect dbConnect = getDBConnect();
		Connection connection = dbConnect.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql = null;

		try {
			sql = "SELECT * FROM wh_location WHERE segment_barcode=?";
			ps = connection.prepareStatement(sql);
			ps.setLong(1, segmentBarcode);
			rs = ps.executeQuery();
			while (rs.next()) {
				valid = true;
				whLocation.setWarehouseId	(rs.getInt		("wh_id"));
				whLocation.setAisle			(rs.getString	("aisle"));
				whLocation.setSection		(rs.getString	("section"));
				whLocation.setShelf			(rs.getString	("shelf"));
				whLocation.setTotalSegment	(rs.getInt		("total_segment"));
				whLocation.setShelfBarcode	(rs.getLong		("shelf_barcode"));
				whLocation.setSegment		(rs.getString	("segment"));
				whLocation.setSegmentBarcode(rs.getLong		("segment_barcode"));
			}
			releaseDBConnect(dbConnect);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (!valid) return null;
		return whLocation;
	}
	
	
	/**WarehouseLocationDAO.loadWHLocationFromWHMapping
	 * 
	 * Updates database table "wh_location" based on 
	 *         database table "wh_mapping"
	 *         
	 * Injection prevented
	 * 
	 * Mutates database table "wh_location"
	 */
	public void loadWHLocationFromWHMapping () {
		WarehouseMappingDAO mappingDAO = WarehouseMappingDAO.getInstance();
		List<WarehouseMappingVO> listOfMappings = mappingDAO.loadWarehouseMapping();
		
		DBConnect dbConnect = getDBConnect();
		Connection connection = dbConnect.getConnection();
		PreparedStatement ps = null;
		String sql = null;
		
		try {
			sql = "DELETE FROM wh_location";
			ps = connection.prepareStatement(sql);
			ps.executeUpdate();
			
			for (WarehouseMappingVO mapping : listOfMappings) {
				final JSONObject jsonObject = new JSONObject(mapping.getJSONObject());
				final JSONArray shelves = jsonObject.getJSONArray("shelf");
				int n = shelves.length();
				for (int i = 0; i < n ; i ++) {
					final JSONObject shelf = shelves.getJSONObject(i);
					int segNum = shelf.getInt("segNum");
					for (int j = 1; j <= segNum; j ++) {
						Long shelfBarcode = getShelfBarcode(shelf.getString("aisleId"),
															shelf.getString("secId"),
															shelf.getString("shelfId"));
						Long segmentBarcode = getSegmentBarcode(shelf.getString("aisleId"),
																shelf.getString("secId"),
																shelf.getString("shelfId"),
																String.valueOf(j));
						
						sql = "INSERT INTO wh_location (wh_id, aisle, section, shelf, total_segment, shelf_barcode, segment, segment_barcode) " +
								"VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
						ps = connection.prepareStatement(sql);
						ps.setInt(1, 	mapping.getWarehouseId().intValue());
						ps.setString(2, shelf.getString("aisleId"));
						ps.setString(3, shelf.getString("secId"));
						ps.setString(4, shelf.getString("shelfId"));
						ps.setInt(5, 	shelf.getInt("segNum"));
						ps.setLong(6, 	shelfBarcode);
						ps.setString(7, String.valueOf(j));
						ps.setLong(8,  	segmentBarcode);
						ps.executeUpdate();
					}
				}
				
			}
			
			releaseDBConnect(dbConnect);
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**WarehouseLocationDAO.loadWHLocationFromWHMapping
	 * 
	 * Updates database table "wh_location" based on 
	 *         database table "wh_mapping"
	 * 
	 * Mutates database table "wh_location" WHERE wh_id=warehouseId
	 * @param warehouseId - Long, a specific warehouse requested
	 */
	public void loadWHLocationFromWHMapping (Long warehouseId) {
		WarehouseMappingDAO mappingDAO = WarehouseMappingDAO.getInstance();
		WarehouseMappingVO mapping = mappingDAO.loadWarehouseMapping(warehouseId);
		
		DBConnect dbConnect = getDBConnect();
		Connection connection = dbConnect.getConnection();
		PreparedStatement ps = null;
		String sql = null;
		
		try {
			sql = "DELETE FROM wh_location WHERE wh_id=?";
			ps = connection.prepareStatement(sql);
			ps.setInt(1, warehouseId.intValue());
			
			final JSONObject jsonObject = new JSONObject(mapping.getJSONObject());
			final JSONArray shelves = jsonObject.getJSONArray("shelf");
			int n = shelves.length();
			for (int i = 0; i < n ; i ++) {
				final JSONObject shelf = shelves.getJSONObject(i);
				int segNum = shelf.getInt("segNum");
				for (int j = 1; j <= segNum; j ++) {
					Long shelfBarcode = getShelfBarcode(shelf.getString("aisleId"),
														shelf.getString("secId"),
														shelf.getString("shelfId"));
					Long segmentBarcode = getSegmentBarcode(shelf.getString("aisleId"),
															shelf.getString("secId"),
															shelf.getString("shelfId"),
															String.valueOf(j));
					
					sql = "INSERT INTO wh_location (wh_id, aisle, section, shelf, total_segment, shelf_barcode, segment, segment_barcode) " +
							"VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
					ps = connection.prepareStatement(sql);
					ps.setInt(1, 	mapping.getWarehouseId().intValue());
					ps.setString(2, shelf.getString("aisleId"));
					ps.setString(3, shelf.getString("secId"));
					ps.setString(4, shelf.getString("shelfId"));
					ps.setInt(5, 	shelf.getInt("segNum"));
					ps.setLong(6, 	shelfBarcode);
					ps.setString(7, String.valueOf(j));
					ps.setLong(8,  	segmentBarcode);
					ps.executeUpdate();
				}
			}
			
			releaseDBConnect(dbConnect);
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private Long getShelfBarcode (String aisleId, String sectionId, String shelfId) {
		try {
			int asciiA = (int) aisleId.charAt(0);
			int intS = Integer.parseInt(sectionId);
			int arabicS = RomanNumeral.toArabic(shelfId);
			long shelfB = asciiA * 10000000 + intS * 10000 + arabicS * 10;
			
			return Long.valueOf(shelfB);
		} catch (NumberFormatException e) {
			return null;
		}
	}
	
	private Long getSegmentBarcode (String aisleId, String sectionId, String shelfId, String segmentId) {
		try {
			int asciiA = (int) aisleId.charAt(0);
			int intS = Integer.parseInt(sectionId);
			int arabicS = RomanNumeral.toArabic(shelfId);
			long shelfB = asciiA * 10000000 + intS * 10000 + arabicS * 10;
			long segmentB = shelfB * 1000 + Integer.parseInt(segmentId) * 10;
			return Long.valueOf(segmentB);
		} catch (NumberFormatException e) {
			return null;
		}
	}
	
	private DBConnect getDBConnect () {
		return new DBConnect();
	}
	
	private void releaseDBConnect (DBConnect dbConnect) throws SQLException {
		dbConnect.releaseConnections();
	}
	
}
