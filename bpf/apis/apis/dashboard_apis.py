# -*- coding: utf-8 -*-
# Copyright (c) 2019, Frappe Technologies and contributors
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



def procedure_repository_by_classification():

	data = []
	cprca = frappe.db.sql("""select count(*) as cprca from `tabProcedure Repository`  where classification = 'Administrative (A)' """,as_dict=1)[0].cprca
	cprce = frappe.db.sql("""select count(*) as cprce from `tabProcedure Repository`  where classification = 'Essential (E)' """,as_dict=1)[0].cprce
	cprcs = frappe.db.sql("""select count(*) as cprcs from `tabProcedure Repository`  where classification = 'Supportive (S)' """,as_dict=1)[0].cprcs

	data.append({"name":_("Administrative"),"y":cprca,"color":"#318ad8","sliced":True,"selected":True})
	data.append({"name":_("Essential"),"y":cprce,"color":"#f683ae","sliced":False,"selected":False})
	data.append({"name":_("Supportive"),"y":cprcs,"color":"#bfddf7","sliced":False,"selected":False})

	return data


def procedure_repository_by_procedure_type():

	data = []
	c_pr_pt_a = frappe.db.sql("""select count(*) as c_pr_pt_a from `tabProcedure Repository`  where procedure_type = 'Auto' """,as_dict=1)[0].c_pr_pt_a
	c_pr_pt_m = frappe.db.sql("""select count(*) as c_pr_pt_m from `tabProcedure Repository`  where procedure_type = 'Manual' """,as_dict=1)[0].c_pr_pt_m
	c_pr_pt_ma = frappe.db.sql("""select count(*) as c_pr_pt_ma from `tabProcedure Repository`  where procedure_type = 'Auto & Manual' """,as_dict=1)[0].c_pr_pt_ma

	data.append({"name":_("Auto"),"y":c_pr_pt_a,"color":"#318ad8","sliced":True,"selected":True})
	data.append({"name":_("Manual"),"y":c_pr_pt_m,"color":"#f683ae","sliced":False,"selected":False})
	data.append({"name":_("Auto & Manual"),"y":c_pr_pt_ma,"color":"#bfddf7","sliced":False,"selected":False})

	return data


def mission_by_status():

	data = []
	c_m_s_o = frappe.db.sql("""select count(*) as c_m_s_o from `tabMission`  where status = 'Open' """,as_dict=1)[0].c_m_s_o
	c_m_s_ip = frappe.db.sql("""select count(*) as c_m_s_ip from `tabMission`  where status = 'In Progress' """,as_dict=1)[0].c_m_s_ip
	c_m_s_c = frappe.db.sql("""select count(*) as c_m_s_c from `tabMission`  where status = 'Completed' """,as_dict=1)[0].c_m_s_c

	data.append({"name":_("Open"),"y":c_m_s_o,"color":"#318ad8","sliced":True,"selected":True})
	data.append({"name":_("In Progress"),"y":c_m_s_ip,"color":"#f683ae","sliced":False,"selected":False})
	data.append({"name":_("Completed"),"y":c_m_s_c,"color":"#bfddf7","sliced":False,"selected":False})

	return data

def calc_mission_percentage_by_status():

	data = []
	completed = frappe.db.sql(""" select 100 * (select count(*) from `tabMission` where status ='Completed')/(select count(*) from `tabMission`) as completed""",as_dict=1)[0].completed
	not_completed = frappe.db.sql(""" select 100 * (select count(*) from `tabMission` where status !='Completed')/(select count(*) from `tabMission`) as not_completed""",as_dict=1)[0].not_completed
	if completed != None:
		data.append({"name":_("Completed Missions"),"y":completed,"color":"#e16a96"})
	else:
		data.append({"name":"Completed Missions","y":0.0,"color":"#e16a96"})
	if not_completed != None:
		data.append({"name":_("In Progress Mission"),"y":not_completed,"color":"#dfdfdf"})
	else:
		data.append({"name":"In Progress Mission","y":100.0,"color":"#dfdfdf"})

	return data

def count_development_job_request_by_agency():

	data = []
	data = frappe.db.sql("""select agency, count(agency) from `tabDevelopment Job Request` group by agency""",as_list=1)
	return data

def count_development_job_request_by_creation_date():
	get_dashed_points=lambda a: 0 if a <= 3 else a - 3 # this will return the dashed point for line charts
	data = []
	final_data={"normal_point":[],"dashed_point":[]}
	data = frappe.db.sql("""select count(agency) from `tabDevelopment Job Request` group by YEAR(creation) order by YEAR(creation) ASC""",as_list=1)
	for i in range(0,len(data)):
		final_data["normal_point"].append(data[i][0])
		final_data["dashed_point"].append(get_dashed_points(data[i][0]))
	return final_data
def get_min_date_in_development_job():

	data = []
	data = frappe.db.sql("""select MIN(YEAR(creation)) from `tabDevelopment Job Request`""",as_list=1)
	return data[0]

@frappe.whitelist(allow_guest=True)
def get_chart_data(chart_id):

	if int(chart_id) == 1:
		return procedure_repository_by_classification()
	elif int(chart_id) == 2:
		return mission_by_status()
		#return procedure_repository_by_procedure_type()
	elif int(chart_id) == 3:
		return count_development_job_request_by_agency()
		#return mission_by_status()
	elif int(chart_id) == 4:
		return calc_mission_percentage_by_status()
	elif int(chart_id) == 5:
		return procedure_repository_by_procedure_type()
		#return count_development_job_request_by_agency()
	elif int(chart_id) == 6:
		return count_development_job_request_by_creation_date()
	elif int(chart_id) == 7:
		return get_min_date_in_development_job()

