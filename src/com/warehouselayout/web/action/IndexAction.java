package com.warehouselayout.web.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.warehouselayout.web.form.IndexForm;

public class IndexAction extends Action {

	public ActionForward execute(ActionMapping actionMapping,
			ActionForm actionForm, HttpServletRequest servletRequest,
			HttpServletResponse servletResponse) throws Exception {
		
		IndexForm form = (IndexForm) actionForm;
		form.load();
		
		return actionMapping.findForward("success");
	}
}