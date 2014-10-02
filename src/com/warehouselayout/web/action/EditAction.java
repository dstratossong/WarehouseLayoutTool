package com.warehouselayout.web.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.warehouselayout.dao.WarehouseLocationDAO;
import com.warehouselayout.dao.WarehouseMappingDAO;
import com.warehouselayout.web.form.WarehouseLayoutForm;

public class EditAction extends Action {

	public ActionForward execute(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest servletRequest,
			HttpServletResponse servletResponse) throws Exception {
		
		WarehouseLocationDAO locationDAO = WarehouseLocationDAO.getInstance();
		WarehouseMappingDAO mappingDAO = WarehouseMappingDAO.getInstance();

		WarehouseLayoutForm form = (WarehouseLayoutForm) actionForm;
		
		String actionName = servletRequest.getParameter("actionName");
		
		if (actionName == null) {
			return actionMapping.findForward("failure");
		}
		
		if (actionName.equals("save")) {
			mappingDAO.updateWarehouseMapping(form.getWarehouseId(), form.getJSONObject());
			locationDAO.loadWHLocationFromWHMapping(form.getWarehouseId());
			actionName = "retrieve";
		}
		if (actionName.equals("retrieve")) {
			Long warehouseId = Long.parseLong(servletRequest.getParameter("warehouseId"));
			form.populateJSON(mappingDAO.loadWarehouseMapping(warehouseId));
			return actionMapping.findForward("success");
		}

		return actionMapping.findForward("failure");
	}
	
}