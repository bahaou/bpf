frappe.provide("frappe.ui.toolbar");

frappe.ui.toolbar.Toolbar = class ThemeNavbar extends frappe.ui.toolbar.Toolbar{
    constructor (message) {
        super(message);
        console.log(frappe.boot);
		$('header').replaceWith(frappe.render_template("custom_navbar", {
			avatar: frappe.avatar(frappe.session.user, 'avatar-medium'),
			navbar_settings: frappe.boot.navbar_settings,
			primary_sidebar_logo: frappe.boot.primary_sidebar_logo
		}));
		// $('.dropdown-toggle').dropdown();

		this.setup_awesomebar();
		this.setup_notifications();
		this.setup_sidebar_toggler();
		this.setup_help();
		this.make();
	}

	setup_sidebar_toggler(){
    	let sidebar_toggle_btn = $('header').find('.sidebar-toggle-btn');
		let sidebar = document.querySelector(".special-sidebar");
		let closeBtn = document.querySelector(".sidebar-toggle-btn");

    	sidebar_toggle_btn.on('click',function (){
    		$('body').toggleClass('hidden-sidebar');
		})

		$('.clickable-background').on('click',function (){
    		$('body').toggleClass('hidden-sidebar');
			sidebar.classList.toggle("open");

		})

	


	}

}


frappe.breadcrumbs.update = function(){
	var breadcrumbs = this.all[frappe.breadcrumbs.current_page()];

		this.clear();
		if (!breadcrumbs) return this.toggle(false);

		if (breadcrumbs.type === 'Custom') {
			this.set_custom_breadcrumbs(breadcrumbs);
		} else {
			// workspace
			this.set_workspace_breadcrumb(breadcrumbs);

			// form / print
			let view = frappe.get_route()[0];
			view = view ? view.toLowerCase() : null;
			if (breadcrumbs.doctype && ["print", "form"].includes(view)) {
				this.set_list_breadcrumb(breadcrumbs);
				this.set_form_breadcrumb(breadcrumbs, view);
			} else if (breadcrumbs.doctype && view === 'list') {
				this.set_list_breadcrumb(breadcrumbs);
			} else if (breadcrumbs.doctype && view == 'dashboard-view') {
				this.set_list_breadcrumb(breadcrumbs);
				this.set_dashboard_breadcrumb(breadcrumbs);
			}
		}

		this.toggle(true);

}
frappe.breadcrumbs.clear = function(){
		this.$breadcrumbs = $("#navbar-breadcrumbs").html(`<li style="width: 125px;"><a href="/app">`+__('Home')+`</a></li>`);

	}
