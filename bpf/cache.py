import frappe


@frappe.whitelist()
def setcache(module,workspace):
	frappe.cache().hset("module", frappe.session.user,module)
	frappe.cache().hset("workspace", frappe.session.user,workspace)
	return("done")


@frappe.whitelist()
def savemodule(name,image):
	doc=frappe.new_doc("Module")
	doc.name1=name
	doc.name=name
	doc.image=image
	wor=frappe.new_doc("Workspace")
	wor.label=name
	wor.name=name
	wor.is_standard="1"
	wor.public="1"
	wor.title=name
	wor.insert()
	doc.dashboard=name
	doc.custom="1"
	doc.owner1=frappe.session.user
	doc.insert()
	frappe.db.commit()
	return ("yes")
