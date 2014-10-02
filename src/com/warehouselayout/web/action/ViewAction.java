package com.warehouselayout.web.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.warehouselayout.dao.WarehouseLocationDAO;
import com.warehouselayout.dao.WarehouseMappingDAO;
import com.warehouselayout.web.bean.WarehouseLocationVO;
import com.warehouselayout.web.bean.WarehouseMappingVO;
import com.warehouselayout.web.form.WarehouseLayoutForm;

public class ViewAction extends Action {

	public ActionForward execute(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest servletRequest,
			HttpServletResponse servletResponse) throws Exception {
		
		WarehouseMappingDAO mappingDAO = WarehouseMappingDAO.getInstance();
		WarehouseLocationDAO locationDAO = WarehouseLocationDAO.getInstance();

		WarehouseLayoutForm form = (WarehouseLayoutForm) actionForm;
		
		String actionName = servletRequest.getParameter("actionName");
		
		if (actionName == null) {
			return actionMapping.findForward("failure");
		}
		if (actionName.equals("retrieve")) {
			form.setValid(true);
		}
		if (actionName.equals("locateShelfBarcode")) {
			form.setValid(true);
			try {
				Long shelfBarcode = Long.parseLong(servletRequest.getParameter("shelfBarcode"));
				List<WarehouseLocationVO> listOfLocations = locationDAO.loadWarehouseLocationByShelf(shelfBarcode);
				if (listOfLocations != null){
					form.populateSelection(listOfLocations.get(0));
				} else {
					form.setValid(false);
				}
				actionName = "retrieve";
			} catch (NumberFormatException e) {
				form.setValid(false);
				actionName = "retrieve";
			}
		}
		if (actionName.equals("locateSegmentBarcode")) {
			form.setValid(true);
			try {
				Long segmentBarcode = Long.parseLong(servletRequest.getParameter("segmentBarcode"));
				WarehouseLocationVO location = locationDAO.loadWarehouseLocation(segmentBarcode);
				if (location != null) {
					form.populateSelection(location);
				} else {
					form.setValid(false);
				}
				actionName = "retrieve";
			} catch (NumberFormatException e) {
				form.setValid(false);
				actionName = "retrieve";
			}
		}
		if (actionName.equals("locateAisleSection")) {
			form.setValid(true);
			try {
				String aisle = servletRequest.getParameter("aisle");
				Integer section = Integer.parseInt(servletRequest.getParameter("section"));
				form.populateSelection(aisle, section.toString());
				actionName = "retrieve";
			} catch (NumberFormatException e) {
				form.setValid(false);
				actionName = "retrieve";
			}
		}
		if (actionName.equals("locateAisle")) {
			form.setValid(true);
			String aisle = servletRequest.getParameter("aisle");
			form.populateSelection(aisle);
			actionName = "retrieve";
		}
		if (actionName.equals("locateStation")) {
			form.setValid(true);
			String station = servletRequest.getParameter("station");
			form.populateStation(station);
			actionName = "retrieve";
		}
		if (actionName.equals("locatePort")) {
			form.setValid(true);
			String port = servletRequest.getParameter("port");
			form.populatePort(port);
			actionName = "retrieve";

		}
		if (actionName.equals("retrieve")) {
			try {
				Long warehouseId = Long.parseLong(servletRequest.getParameter("warehouseId"));
				WarehouseMappingVO mappingVO = mappingDAO.loadWarehouseMapping(warehouseId);
				if (mappingVO == null) {
					return actionMapping.findForward("failure");
				} else {
					form.populateJSON(mappingVO);
				}
				return actionMapping.findForward("success");
			} catch (NumberFormatException e) {
				form.setValid(false);
				return actionMapping.findForward("failure");
			}
		}

		
//		form.reset();
//		form.populateJSON(mappingDAO.loadWarehouseMapping(form.getWarehouseId()));
//		return actionMapping.findForward("success");
		return actionMapping.findForward("failure");
	}
	
}