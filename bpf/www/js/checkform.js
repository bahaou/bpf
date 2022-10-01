// <![CDATA[
function checkformload() { 
	$(".form-control").focus(function () {
		$(this).parent().removeClass('has-error');
	});
	$("input[type=checkbox]").focus(function () {
		$(this).closest('.required-check').removeClass('has-error');
	});
	/*	onblur	*/
	function btnCheckform() {
		$('.form-horizontal').each(function () {
			var formId = $(this).attr('id');
			$('#'+formId+' .btn:not(.cancel) , #'+formId+' .btn:not(.cancel)').click(function () {
				if (typeof formId !== typeof undefined && formId !== false) {
					var error = [];
					var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

					$('[id$="' + formId + '"] input.required:not(:disabled), [id$="' + formId + '"] textarea.required').each(function () {
						var placeholder = $(this).attr('placeholder');
						if ($(this).val() == '') {
							error.push(placeholder + ' required');
							$(this).parent().addClass('has-error');
						} else {
							if ($(this).hasClass('email')) {
								if (!reg.test($(this).val())) {
									error.push(placeholder + ' invalid');
									$(this).parent().addClass('has-error');
								}else{
									$(this).parent().addClass('has-success');
								}
							}else{
								$(this).parent().addClass('has-success');
							}
						}
					});
					if($('[id$="' + formId + '"] .required-check').length) {
						$('[id$="' + formId + '"] .required-check').each(function () {
							var reqCheck = jQuery(this);
							if (reqCheck.find('input[type=checkbox]:checked').length > 0) {
								reqCheck.removeClass('has-error');
							}else{
								reqCheck.addClass('has-error');
								error.push('Checkbox required');
							}
						});
					}
					if($('[id$="' + formId + '"] .required-radio').length) {
						$('[id$="' + formId + '"] .required-radio').each(function () {
							var reqCheck = jQuery(this);
							if (reqCheck.find('input[type=checkbox]:checked').length > 0) {
								reqCheck.removeClass('has-error');
							}else{
								reqCheck.addClass('has-error');
								error.push('Checkbox required');
							}
						});
					}
					$('[id$="' + formId + '"] select.form-control.required').each(function () {
						var placeholder = $(this).parent().prev('label').text();
						if ($(this).val() == '0') {
							error.push(placeholder + ' required');
							$(this).parent().addClass('has-error');
						} else {
							$(this).parent().addClass('has-success');
							$(this).parent().removeClass('has-error');
						}
					});

					if (error.length > 0) {
						if (typeof console == 'object') //console.log(error);
						return false;
					}

					if (error.length == 0) {
						return false;
					}
					return false;
				}
			});
		});
	}

	$(document).ready(function () {
        btnCheckform();

		/******************************************************************************************************************
									Fields Regex
		 ******************************************************************************************************************/
		if ($('.CivilRegistry').length > 0) {
			$('.CivilRegistry').attr('maxlength', '11').attr('minlength', '10');
			$('.CivilRegistry').bind("keypress", function (event) {
				if (event.charCode != 0 && event.charCode != 32) {
					var regex = new RegExp("^[0-9\+]+$");
					var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
					if (!regex.test(key)) {
						event.preventDefault();
						return false;
					}
				}
			});
		}

		//OnlyNbr
		if ($('.OnlyNbr').length > 0) {
			$('.OnlyNbr').focus(function () {$(this).tooltip({ 'trigger': 'focus', 'placement': 'top'}).tooltip('show');});
			$('.OnlyNbr').bind("keypress", function (event) {
				if (event.charCode != 0 && event.charCode != 32) {
					var regex = new RegExp("^[0-9\+]+$");
					var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
					if (!regex.test(key)) {
						event.preventDefault();
						return false;
					}
				}
			});
		}
		
		//OnlyLatin
		if ($('.OnlyLatin').length > 0) {
			$(".OnlyLatin").focus(function () {$(this).tooltip({ 'trigger': 'focus', 'placement': 'top' }).tooltip('show');});
			$(".OnlyLatin").on("keypress", function(event) {
				var OnlyLatin = /[A-Za-z \-]/g;
				var key = String.fromCharCode(event.which);
				if (event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || OnlyLatin.test(key)) {
					return true;
				}
				return false;
			});
		}

		//OnlyArabic
		if ($('.OnlyArabic').length > 0) {
			$('.OnlyArabic').focus(function () {$(this).tooltip({ 'trigger': 'focus', 'placement': 'top' }).tooltip('show');});
			$('.OnlyArabic').bind("keypress", function (event) {
				if (event.charCode != 0 && event.charCode != 32) {
					var regex = new RegExp("^[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]+$");
					var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
					if (!regex.test(key)) {
						event.preventDefault();
						return false;
					}
				}
			});
		}

		if ($('.zipCode').length > 0) {
			$('.zipCode').attr('maxlength', '5');
			$('.zipCode').bind("keypress", function (event) {
				if (event.charCode != 0 && event.charCode != 32) {
					var regex = new RegExp("^[0-9\+]+$");
					var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
					if (!regex.test(key)) {
						event.preventDefault();
						return false;
					}
				}
			});
		}
		if ($('.phone, .mobile').length > 0) {
			$('.phone, .mobile').attr('maxlength', '10');
			$('.phone, .mobile').bind("keypress", function (event) {
				if (event.charCode != 0 && event.charCode != 32) {
					var regex = new RegExp("^[0-9\+]+$");
					var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
					if (!regex.test(key)) {
						event.preventDefault();
						return false;
					}
				}
			});
		}
		
		/******************************************************************************************************************
									textarea autoresize
		 ******************************************************************************************************************/
		if(jQuery('textarea[data-autoresize]').length > 0) {
			jQuery.each(jQuery('textarea[data-autoresize]'), function() {
				var offset = this.offsetHeight - this.clientHeight;
				var resizeTextarea = function(el) {
					jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
				};
				jQuery(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
			});
		}
		
		/******************************************************************************************************************
									textarea autoresize
		 ******************************************************************************************************************/
		if(jQuery('select.form-control').length > 0) {
			jQuery("select.form-control").length > 0 && jQuery("select.form-control").each(function() {
				var placeholder = $(this).data('placeholder');
                jQuery(this).select2({
					placeholder: placeholder
				});
            })
		}
		
	});
}

checkformload();
//Sys.WebForms.PageRequestManager.getInstance().add_endRequest(checkformload);
// ]]>