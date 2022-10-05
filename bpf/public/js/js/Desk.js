class ThemeApplication extends frappe.Application{
    constructor(opts){
        super(opts);
        this.sidebar_categories = [
			"Modules",
			"Domains",
			"Places",
			"Administration"
		];
		this.icons =["icons34-1","icons34-2","icons34-3","icons34-4","icons34-5","icons34-6","icons34-7","icons34-8","icons34-9"]
		this.count=0;
        this.workspaces = {};
        this.sidebar = {};
        this.sidebar_items = {};
		this.home_icons = {};
        this.setup_myworkspaces();
        // this.make_primary_sidebar();
		this.make_sec_sidebar();
    }

    setup_myworkspaces() {
		for (let page of frappe.boot.allowed_workspaces) {
			if (!this.workspaces[page.category]) {
				this.workspaces[page.category] = [];
			}
			this.workspaces[page.category].push(page);
		}
	}

    make_primary_sidebar(){
        let list_sidebar = $(".list-unstyled");
		$(".modules-sidebar").toggleClass("hidden",false);
        this.sidebar = list_sidebar;
        this.make_sidebar();
    }

    make_sec_sidebar(){
        this.sec_sidebar = $('.navigation-sidebar');
        let sidebar = this.sec_sidebar;

		$(".navigation-sidebar").toggleClass("hidden",false);
    }

    make_sidebar() {

		this.sidebar_categories.forEach(category => {
			if (this.workspaces[category]) {
				this.build_sidebar_section(category, this.workspaces[category]);
			}
		});
	}

	build_sidebar_section(title, items) {
		let sidebar_section = $(`<div class="standard-sidebar-section"></div>`);

		// // DO NOT REMOVE: Comment to load translation
		// // __("Modules") __("Domains") __("Places") __("Administration")
		// $(`<div class="standard-sidebar-label">${__(title)}</div>`)
		// 	.appendTo(sidebar_section);
		let count = this.count;
		let icons = this.icons
		const get_sidebar_item = function (item) {
			count = count + 1;

			 // return $(`<li><a href="/app/dashboard-view/لوحة%20المؤشرات%20الخاصة%20بإدارة%20الجودة" title=""><i class="ti-home"></i><span>الرئيسية</span></a></li>`);
			//  return $(` <li id="${item.name.split(" ").join("-")}" class=' ${item.selected ? "selected" : ""}' >
			//   <a href="/app/${frappe.router.slug(item.name)}" title="">
			//  			<i class="${icons[(count-1)%9]}"></i>
			// 	  			  	<span>${item.label || item.name}</span>
			// 	  			  	  </a>
			//  </li>
			// `);
			// return $(`
			// 	<li id="${item.name.split(" ").join("-")}" class='primary-sidebar-icon ${item.selected ? "selected" : ""}'>
			// 		<a href="/app/${frappe.router.slug(item.name)}">
			// 			<i><span>${frappe.utils.icon(item.icon || "folder-normal", "md")}</span></i>
			// 			<span class="links_name">${item.label || item.name}</span>
			// 		</a>
			// 		<span class="tooltip">${item.label || item.name}</span>
			// 	</li>
			// `);
		};

		const get_home_item = function (item) {
			return $(`
			<a href="/app/${frappe.router.slug(item.name)}">
			<div class="widget">
				<div class='home-shortcut widget-head'>
					<div class="widget-title ellipsis" >
							<i><span>${frappe.utils.icon(item.icon || "folder-normal", "md")}</span></i>
							<span class="links_name">${item.label || item.name}</span>
						</div>
					</div>	
				</div>
			</a>
			`);
		};
		
		const make_sidebar_category_item = item => {
			if (item.name == this.get_page_to_show()) {
				item.selected = true;
				this.current_page_name = item.name;
			}else{
				item.selected = false;
			}
			

			let $item = get_sidebar_item(item);

			$item.appendTo(sidebar_section);
			this.sidebar_items[item.name] = $item;

			let $homeIcon = get_home_item(item);
			this.home_icons[item.name] = $homeIcon;
			
		};

		frappe.after_ajax(function(){
			const cur_route = frappe.get_route();
			const isHomePage = (cur_route[0] === "Workspaces" && cur_route[1] === "Home");

			// if(isHomePage && frappe.app && frappe.app.home_icons){
			// 	const homeShortcuts = `<div class="home-shortcuts widget-group-body grid-col-3"></div>`
			// 	const home_items = frappe.app.home_icons;
			// 	let $homeshortcuts = $(homeShortcuts).appendTo($('#page-Workspaces .layout-main-section'))
			// 	$homeshortcuts.empty();
				
			// 	Object.entries(home_items).forEach(item => {
			// 		item[1].appendTo($homeshortcuts);
			// 	});
			// }
		})
		items.forEach(item => make_sidebar_category_item(item));
		
		// sidebar_section.appendTo(this.sidebar);
		this.sidebar.append(sidebar_section.html());
        this.generate_item_label_listener();
	}

    generate_item_label_listener(){
        $('.primary-sidebar-icon').hover(
            function(){
                $(this).toggleClass('label-hidden',false);
				let tooltip = $(this).children('.tooltip');
				let new_position = $(this).offset();
				let width = $(window).width();
				if (new_position.left + 100 > width){
					new_position.left -= 100; 
				}else{
					new_position.left += 100; 
				}
								
				new_position.top += 25; 
				tooltip.offset(new_position);

            },
            function(){
                $(this).toggleClass('label-hidden',true);
            }
        )
		$('.primary-sidebar-icon').click(
			function(){
				$('body').removeClass('hidden-sidebar');
				$('.modules-sidebar').removeClass('open');
			}
		)
    }

	

    get_page_to_show() {
		let default_page;

		if (localStorage.current_workspace) {
			default_page = localStorage.current_workspace;
		} else if (this.workspaces) {
			default_page = this.workspaces["Modules"][0].name;
		} else if (frappe.boot.allowed_workspaces) {
			default_page = frappe.boot.allowed_workspaces[0].name;
		} else {
			default_page = "Build";
		}

		let page = frappe.get_route()[1] || default_page;
		return page;
	}
}

class QueryReport extends frappe.views.QueryReport{
	add_card_button_to_toolbar() {
		this.page.add_inner_button(__("Create Card"), () => {
			this.add_card_to_dashboard();
		}).addClass('btn-sm');
	}
}





function get_page_module(){
	const route = frappe.get_route();
	frappe.xcall("ssp_theme.api.get_page_module",{
		route : route
	}).then((result) => {
		if(result){
			const key = Object.keys(result)[0];
			$(".primary-sidebar-icon").removeClass("selected");
			$(`#${key.split(" ").join("-")}`).addClass("selected");
			load_page_shortcuts(key,result[key]);
			if($(".modules-sidebar .selected").length){
				if (!isScrolledIntoView(".modules-sidebar .selected")){
					$('.modules-sidebar').animate({
						scrollTop: $(".modules-sidebar .selected").offset().top
					}, 1000);

				}
			}
		}
	})
}

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function load_page_shortcuts(key,shortcuts){
	$('.navigation-sidebar-items').empty();
	if (shortcuts){
		new frappe.widget.WidgetGroup({
			title: __(key) || __('Your Shortcuts'),
			container: $('.navigation-sidebar-items')[0],
			type: "shortcut",
			columns: 3,
			options: {
				allow_sorting: true,
				allow_create: true,
				allow_delete: true,
				allow_hiding: false,
				allow_edit: true,
			},
			widgets: shortcuts.items
		});
	}
}

frappe.after_ajax(function () {
	frappe.router.on("change", () => {
		get_page_module();
		$('.home-shortcuts').remove();

		const cur_route = frappe.get_route();
		const isHomePage = (cur_route[0] === "Workspaces" && cur_route[1] === "Home");

		if(isHomePage && frappe.app && frappe.app.home_icons){
			const homeShortcuts = `<div class="home-shortcuts widget-group-body grid-col-3"></div>`
			const home_items = frappe.app.home_icons;
			let $homeshortcuts = $(homeShortcuts).appendTo($('#page-Workspaces .layout-main-section'))
			$homeshortcuts.empty();
			
			Object.entries(home_items).forEach(item => {
				item[1].appendTo($homeshortcuts);
			});
		}
	})
});


frappe.Application = ThemeApplication;
