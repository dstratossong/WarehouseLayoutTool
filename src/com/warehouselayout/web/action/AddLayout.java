package com.warehouselayout.web.action;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.warehouselayout.dao.WarehouseMappingDAO;
import com.warehouselayout.web.bean.WarehouseMappingVO;

public class AddLayout extends Action {

	public ActionForward execute(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest servletRequest,
			HttpServletResponse servletResponse) throws Exception {
		
		PrintWriter out = servletResponse.getWriter();
		boolean valid = true;
		WarehouseMappingDAO mappingDAO = WarehouseMappingDAO.getInstance();
		try {
			Long warehouseId = Long.parseLong(servletRequest.getParameter("warehouseId"));
			int width = Integer.parseInt(servletRequest.getParameter("width"));
			int height = Integer.parseInt(servletRequest.getParameter("height"));
			String JSONObject = "{\"unit\": \"foot\", \"tileSize\":24, \"width\":" + width + ", \"height\":" + height + ", \"wall\":[], \"aisle\":[], \"section\":[], \"shelf\":[], \"station\":[], \"port\":[]}";
			WarehouseMappingVO mappingVO = new WarehouseMappingVO();
			mappingVO.setWarehouseId(warehouseId);
			mappingVO.setJSONObject(JSONObject);
			if (mappingDAO.addWarehouseMapping(mappingVO)) ;
			else{
				valid = false;
			}
		} catch (NumberFormatException e){
			valid = false;
		}
		
		out.print(valid);
		
		
		return null;
	}
	
}