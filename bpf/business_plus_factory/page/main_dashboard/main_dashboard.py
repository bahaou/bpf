# -*- coding: utf-8 -*-
# Copyright (c) 2019, Nisma Hamdouna and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
import datetime
import json
from frappe.utils.dashboard import cache_source
from frappe.utils import nowdate, getdate, get_datetime, cint, now_datetime
from frappe.utils.dateutils import\
        get_period, get_period_beginning, get_from_date_from_timespan, get_dates_from_timegrain
from frappe.model.naming import append_number_if_name_exists
from frappe.boot import get_allowed_reports
from frappe.config import get_modules_from_all_apps_for_user
from frappe.model.document import Document
from frappe.modules.export_file import export_to_files


@frappe.whitelist()
def getModule(module):

	theme_settings = frappe.get_doc('Module Settings', module)
	frappe.cache().hset("module", frappe.session.user,module)
	theme_settings = frappe.get_doc('Module Settings', module)
	primary_sidebar_logo = theme_settings.icon

	#bootinfo = frappe.cache().hget("bootinfo", frappe.session.user)
	#bootinfo.primary_sidebar_logo = primary_sidebar_logo
	frappe.cache().hset("logo", frappe.session.user,primary_sidebar_logo)
	if theme_settings.main_page_type =="Page":
		return theme_settings.home_page
	else:
		return "dashboard-view"+"/" + theme_settings.home_page

@frappe.whitelist()
def delModule():
	user = frappe.get_user()
	frappe.cache().hset("module", frappe.session.user,"")
	modules = frappe.get_all("Module Settings" , ['module','icon'],filters={"disabled":0} )
	return modules

	

@frappe.whitelist() 
def has_permission(doctype,doc):
	if doctype == "Report":
		doc = frappe.get_doc("Report", doc)
		if not doc.is_permitted():
			return False
		if not frappe.has_permission(doc.ref_doctype, "report"):
			return False
		if doc.disabled:
			return False
		return True
	else:
		return frappe.has_permission(doctype, doc=doc)
	
