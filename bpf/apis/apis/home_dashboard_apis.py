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
import random

def generate_random_color():

	r = lambda: random.randint(0,255)
	hash_color = '#%02X%02X%02X' % (r(),r(),r())
	return str(hash_color)

def set_required_option_for_charts(my_dict=[]):
	idx = 0
	if len(my_dict) > 0:
		for i in my_dict:
			random_color = generate_random_color()
			i["color"] = random_color
			if idx == 0:
				i["sliced"] = True
				i["selected"] = True
			else:
				i["sliced"] = False
				i["selected"] = False
			idx = idx + 1
def prepare_bar_chat_data(my_dict=[]):
	final_array=[]
	if len(my_dict) > 0:
		for i in my_dict:
			final_array.append([i["name"],i["y"]])
	return final_array
def generate_data_column(my_dict=[]):
	final_array=[]
	data_arr=[]
	categ_arr=[]
	for i in my_dict:
		data_arr.append(i["data"])
		categ_arr.append(i["categories"])
	final_array.append({"data":data_arr,"categories":categ_arr})
	return final_array
def get_projects_by_type():
	response=[]
	get_del_by_status = frappe.db.sql("""select count(pt.name) as data,pt.name as categories from `tabProject` as p, `tabProject Type` as pt where p.project_type = pt.name group by pt.name """,as_dict=1)
	response = generate_data_column(get_del_by_status)
	return response

def get_projects_by_priority():
	response=[]
	get_del_by_status = frappe.db.sql("""select count(*) as data,priority as categories from `tabProject` group by priority """,as_dict=1)
	response = generate_data_column(get_del_by_status)
	return response

def get_project_by_is_active():
	bar_chart_depar_data = []
	num_emp_by_departemen=frappe.db.sql("""select count(*) as y,is_active as name from `tabProject` group by is_active """,as_dict=1)
	#set_required_option_for_charts(num_emp_by_departemen)
	bar_chart_depar_data = prepare_bar_chat_data(num_emp_by_departemen)
	return bar_chart_depar_data

def get_project_by_status():
	bar_chart_depar_data = []
	num_emp_by_departemen=frappe.db.sql("""select count(*) as y,status as name from `tabProject` group by status """,as_dict=1)
	#set_required_option_for_charts(num_emp_by_departemen)
	bar_chart_depar_data = prepare_bar_chat_data(num_emp_by_departemen)
	return bar_chart_depar_data

#Delivery Trends
@frappe.whitelist(allow_guest=True)
def get_delivery_trends_data_by_status():
	response=[]
	get_del_by_status = frappe.db.sql("""select SUM(grand_total) as data,status as categories from `tabDelivery Note` where YEAR(posting_date) = '2022' and status not in ('Cancelled','Draft') group by status""",as_dict=1)
	response = generate_data_column(get_del_by_status)
	return response
#HR2
#de
#HR
# Employee
def num_emp_by_status():

	emp_by_status = frappe.db.sql("""select count(*) as y,status as name from `tabEmployee`  where status != 'none' group by status""",as_dict=1)
#	if len(emp_by_status) == 1:
#		emp_by_status.append({"name":"not Active","y":2})
	set_required_option_for_charts(emp_by_status)
	return emp_by_status
def num_emp_by_type():

	num_emp_by_type=frappe.db.sql("""select count(*) as y,employment_type as name from `tabEmployee` where employment_type != 'none' group by employment_type""",as_dict=1)
	set_required_option_for_charts(num_emp_by_type)
	return num_emp_by_type
@frappe.whitelist(allow_guest=True)
def num_emp_by_departement():
	bar_chart_depar_data = []
	num_emp_by_departemen=frappe.db.sql("""select count(*) as y,department as name from `tabEmployee` where department != 'none' group by department""",as_dict=1)
#	set_required_option_for_charts(num_emp_by_departemen)
	bar_chart_depar_data = prepare_bar_chat_data(num_emp_by_departemen)
	return bar_chart_depar_data
@frappe.whitelist(allow_guest=True)
def num_emp_by_designation():

	num_emp_by_designatio=frappe.db.sql("""select count(*) as y,designation as name from `tabEmployee` where designation != 'none' group by designation""",as_dict=1)
	set_required_option_for_charts(num_emp_by_designatio)
	return num_emp_by_designatio
# Salary slip&Attendance

def num_attendance_by_status():
	bar_chart_att_data = []
	num_attendance_by_statu=frappe.db.sql("""select count(*) as y,status as name from `tabAttendance` where status != 'none' group by status""",as_dict=1)
	#set_required_option_for_charts(num_attendance_by_statu)
	bar_chart_att_data = prepare_bar_chat_data(num_attendance_by_statu)
	return bar_chart_att_data
def num_salary_slip_status():

	num_salary_slip_statu=frappe.db.sql("""select count(*) as y,status as name from `tabSalary Slip` where status != 'none' group by status""",as_dict=1)
	set_required_option_for_charts(num_salary_slip_statu)
	return num_salary_slip_statu
#Selling
#Customer

def num_customer_by_type():

	num_customer_by_typ=frappe.db.sql("""select count(*) as y,customer_type as name from `tabCustomer` where customer_type != 'none' group by customer_type""",as_dict=1)
	set_required_option_for_charts(num_customer_by_typ)
	return num_customer_by_typ
def num_customer_by_territory():
	bar_chart_territory_data = []
	num_customer_by_territor=frappe.db.sql("""select count(*) as y,territory as name from `tabCustomer` where territory != 'none' group by territory""",as_dict=1)
	#set_required_option_for_charts(num_customer_by_territor)
	bar_chart_territory_data = prepare_bar_chat_data(num_customer_by_territor)
	return bar_chart_territory_data
def num_quotation_by_status():

	num_quotation_by_statu=frappe.db.sql("""select count(*) as y,status as name from `tabQuotation` where status != 'none' group by status""",as_dict=1)
	set_required_option_for_charts(num_quotation_by_statu)
	return num_quotation_by_statu

def num_sales_order_by_status():

	num_sales_order_by_statu=frappe.db.sql("""select count(*) as y,status as name from `tabSales Order` where status != 'none' group by status""",as_dict=1)
	set_required_option_for_charts(num_sales_order_by_statu)
	return num_sales_order_by_statu

def num_sales_invoice_by_status():

	num_sales_invoice_by_statu=frappe.db.sql("""select count(*) as y,status as name from `tabSales Invoice` where status != 'none' group by status""",as_dict=1)
	set_required_option_for_charts(num_sales_invoice_by_statu)
	return num_sales_invoice_by_statu
#Supplier

def num_supplier_by_group():
	bar_chart_group_data = []
	num_supplier_by_grou=frappe.db.sql("""select count(*) as y,supplier_group as name from `tabSupplier` where supplier_group != 'none' group by supplier_group""",as_dict=1)
	#set_required_option_for_charts(num_supplier_by_grou)
	bar_chart_group_data = prepare_bar_chat_data(num_supplier_by_grou)
	return bar_chart_group_data
def num_supplier_by_type():

	num_supplier_by_typ=frappe.db.sql("""select count(*) as y,supplier_type as name from `tabSupplier` where supplier_type != 'none' group by supplier_type""",as_dict=1)
	set_required_option_for_charts(num_supplier_by_typ)
	return num_supplier_by_typ
def num_purchase_order_by_status():

	num_purchase_order_by_statu=frappe.db.sql("""select count(*) as y,status as name from `tabPurchase Order` where status != 'none' group by status""",as_dict=1)
	set_required_option_for_charts(num_purchase_order_by_statu)
	return num_purchase_order_by_statu
def num_purchase_invoice_by_status():

	num_purchase_invoice_by_statu=frappe.db.sql("""select count(*) as y,status as name from `tabPurchase Invoice` where status != 'none' group by status""",as_dict=1)
	set_required_option_for_charts(num_purchase_invoice_by_statu)
	return num_purchase_invoice_by_statu

@frappe.whitelist(allow_guest=True)
def get_chart_data(chart_id):

	if int(chart_id) == 1:
		return num_emp_by_status()
	elif int(chart_id) == 2:
		return num_emp_by_type()
	elif int(chart_id) == 3:
		return num_emp_by_departement()
	elif int(chart_id) == 4:
		return num_emp_by_designation()
	elif int(chart_id) == 5:
		return num_attendance_by_status()
	elif int(chart_id) == 6:
		return num_salary_slip_status()
	elif int(chart_id) == 7:
		return num_customer_by_type()
	elif int(chart_id) == 8:
		return num_customer_by_territory()
	elif int(chart_id) == 9:
		return num_quotation_by_status()
	elif int(chart_id) == 10:
		return num_sales_order_by_status()
	elif int(chart_id) == 11:
		return num_sales_invoice_by_status()
	elif int(chart_id) == 12:
		return num_supplier_by_group()
	elif int(chart_id) == 13:
		return num_supplier_by_type()
	elif int(chart_id) == 14:
		return num_purchase_order_by_status()
	elif int(chart_id) == 15:
		return num_purchase_invoice_by_status()
	elif int(chart_id) == 16:
		return get_delivery_trends_data_by_status()

	elif int(chart_id) == 17:
		return get_projects_by_type()
	elif int(chart_id) == 18:
		return get_projects_by_priority()
	elif int(chart_id) == 19:
		return get_project_by_is_active()
	elif int(chart_id) == 20:
		return get_project_by_status()
