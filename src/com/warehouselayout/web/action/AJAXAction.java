package com.warehouselayout.web.action;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.warehouselayout.dao.WarehouseLocationDAO;
import com.warehouselayout.web.bean.WarehouseLocationVO;

public class AJAXAction extends Action {

	public ActionForward execute(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest servletRequest,
			HttpServletResponse servletResponse) throws Exception {
		
		WarehouseLocationDAO locationDAO = WarehouseLocationDAO.getInstance();
		
		PrintWriter out = servletResponse.getWriter();
		
		String actionName = servletRequest.getParameter("actionName");
		if (actionName.equals("locateShelfBarcode")) {
			String valid = "true";
			String aisle = "null";
			String section = "null";
			try {
				Long shelfBarcode = Long.parseLong(servletRequest.getParameter("barcode"));
				List<WarehouseLocationVO> listOfLocations = locationDAO.loadWarehouseLocationByShelf(shelfBarcode);
				if (listOfLocations != null){
					aisle = "\"" + listOfLocations.get(0).getAisle() + "\"";
					section = "\"" + listOfLocations.get(0).getSection() + "\"";
				} else {
					valid = "false";
				}
			} catch (NumberFormatException e) {
				valid = "false";
			}
			writeToObject(out, valid, aisle, section);
		}
		if (actionName.equals("locateSegmentBarcode")) { 
			String valid = "true";
			String aisle = "null";
			String section = "null";
			try {
				Long segmentBarcode = Long.parseLong(servletRequest.getParameter("barcode"));
				WarehouseLocationVO location = locationDAO.loadWarehouseLocation(segmentBarcode);
				if (location != null) {
					aisle = "\"" + location.getAisle() + "\"";
					section = "\"" + location.getSection() + "\"";
				} else {
					valid = "false";
				}
			} catch (NumberFormatException e) {
				valid = "false";
			}
			writeToObject(out, valid, aisle, section);
		}
		
		return null;
	}
	
	private void writeToObject (PrintWriter out, String valid, String aisle, String section) {
		out.print("{");
		out.print("\"valid\":" + valid + ",");
		out.print("\"aisleId\":" + aisle + ",");
		out.print("\"sectionId\":" + section);
		out.print("}");
	}
}