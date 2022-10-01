// <![CDATA[
(function($) {

    "use strict";
    
    //$WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

	var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
	var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
	var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
	var is_safari = navigator.userAgent.indexOf("Safari") > -1;
	var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
	if ((is_chrome)&&(is_safari)) { is_safari = false; }
	if ((is_chrome)&&(is_opera)) { is_chrome = false; }
	
	var windowW = window.innerWidth;
	var windowH = window.innerHeight;
	
	/* Login Resize Height
     * ------------------------------------------------------ */
    var loginResizeH = function() {
		var loginHolderH = $('#loginHolder .form').outerHeight(true), newHeight;
		// loginHolderH
		if(window.innerHeight > loginHolderH){
			newHeight = window.innerHeight;
		}else{
			newHeight = $('#loginHolder .form').outerHeight(true);
		}
		jQuery('#loginHolder').css({'height': newHeight});
    };
	$(window).on('resize', function(e) {
	  clearTimeout(loginResizeH);
	  setTimeout(function() { // resizing has "stopped"
		loginResizeH();
	  }, 300);
	});

	/* Login Toggle box if forgot password
     * ------------------------------------------------------ */
    var loginToggle = function() {
		jQuery('.toggleBtn').click(function(){
			$(this).closest('.toggleBox').slideToggle(function(){
				$(this).find('.required').val('').parent().removeClass('has-success has-error');
			});
			$(this).closest('.toggleBox').siblings('.toggleBox').slideToggle();
		});
    };

	/* Main menu Toggle Show
     * ------------------------------------------------------ */
    var mainMenuToggle = function() {
		jQuery('.toggleMenu').click(function(){
			if($(this).hasClass('open')){
				$('#mainMenu, #logo').attr('class', 'col-xs-12 col-sm-1');
				$('#navlinks').attr('class', 'col-xs-12 col-sm-11');
			}else{
				$('#mainMenu, #logo').attr('class', 'col-xs-12 col-sm-4 col-md-3');
				$('#navlinks').attr('class', 'col-xs-12 col-sm-8 col-md-9');
			}
			$(this).toggleClass('open');
			$('body').toggleClass('hide-menu')
		});
		$(document).on('click', function (e) {
			if (!$("#mainMenu").is(event.target) && !$("#mainMenu").has(event.target).length &&
				!$("#logo").is(event.target) && !$("#logo").has(event.target).length &&
				!$(".toggleMenu").is(event.target) && !$(".toggleMenu").has(event.target).length) {
				if($('.toggleMenu').hasClass('open')){
					jQuery('.toggleMenu').trigger('click');
				}
			}
		});
    };
	
	/* Submenu height
     * ------------------------------------------------------ */
    var submenuFullH = function() {
		var navbarH = $('.navbar').outerHeight(true);
		var subMenuH = $('#mainMenu').outerHeight(true) + navbarH;
		jQuery('#mainMenu .dropdown-menu').css({
			'height': subMenuH + 'px',
			'margin-top': '-' + navbarH + 'px'
		});
    };
	$(window).on('resize', function(e) {
	  clearTimeout(submenuFullH);
	  setTimeout(function() { // resizing has "stopped"
		submenuFullH();
	  }, 300);
	});
	
	/* toggleSearch selected
     * ------------------------------------------------------ */
    var toggleSearch = function() {
		if (jQuery('.toggleSearch').length > 0) {
			jQuery('.toggleSearch').click(function(){
				$('#navlinks').toggleClass('openSearch');
			});
		}
    };
	
	/* funScrollbox selected
     * ------------------------------------------------------ */
    var funScrollbox = function() {
		if (jQuery('.scrollbox').length > 0) {
			jQuery('.scrollbox').perfectScrollbar();
		}
    };
	
	$(window).on('resize', function(e) {
		$('.dropdown').each(function() {
			$(this).removeClass('open');
		});
	});
	jQuery(window).load(function() {});
	jQuery(window).scroll(function (event) {});
	jQuery(document).ready(function () {});
	
   /* Initialize
    * ------------------------------------------------------ */
    (function clInit() {
		setTimeout(function() {
			loginResizeH();
			loginToggle();
			mainMenuToggle();
			submenuFullH();
			toggleSearch();
			funScrollbox();
		}, 500);
    })();
})(jQuery);
// ]]>