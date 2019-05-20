/*!
 * Comexposium Extended Search Form Module
 * Formerly known as Exhibitor instead of Extended but works as well for Exhibitors and Products.
 * Class used for both is .exhibitor-search-form though
 *
 * Redesign by Alsacréations (alsacreations.fr)
 * Code design contributors: Geoffrey Crofte (Alsacréations) + patch RR
 * Vendors it depends on: jQuery UI 1.11.4 (custom build)
 *
 * File Last Update: 2015-11-18
 */

;jQuery(document).ready(function($){

	// ESF JavaScript only if we find the module

	if ( $('.exhibitor-search-form').length === 1 ) {


		// `esf` = debug function for console.log (ex: esf.log(string))
		// `esf_text` is translation ready texts

		var $dataSrc = $('.esf-all-filters');
		var esf={log:function(e){"undefined"!=typeof console&&console.log(e)}},
			esf_text = {
				remove_filter : $dataSrc.data('esfRemoveFilter'),
				unselect : $dataSrc.data('esfUnselect'),
				select : $dataSrc.data('esfSelect'),
				add : $dataSrc.data('esfAdd'),
				remove : $dataSrc.data('esfRemove'),
				space : '&nbsp;' // empty in english
			};

		$('html').addClass('js');

		/*
		 * AJAX actions
		 */

		function esf_AJAX_do_something_selection(the_id, $the_button) {

			var $the_icon = $the_button.find('i'),
				the_class = $the_button.attr('class');

			$the_icon.attr('class', 'icon-loading');

			if ( the_class === 'esf-action-add-to-selection' ) {

				// ** simulate request delay for adding exhibitor to favs **
				// have to replace setInterval by AJAX request and
				// "simulate positive" by the onsuccess respond

				// do what you want with the exhibitor id
				esf.log('Adding: ' + the_id);

				// @TOPROD : Launch real AJAX request here
				setTimeout(function(){

					// do what you want with the exhibitor id
					esf.log('Added: '+the_id);

					// simulate positive
					$the_icon.attr('class','icon-remove-selection');
					$the_button.toggleClass('esf-action-add-to-selection esf-action-remove-from-selection').find('.esf-action-text').text(esf_text.remove);

				}, 300);
				// /@TOPROD

			}
			else {

				// ** simulate request delay for removing exhibitor to favs **
				// have to replace setInterval by AJAX request and
				// "simulate positive" by the onsuccess respond

				// do what you want with the exhibitor id
				esf.log('Removing: '+the_id);

				// @TOPROD : Launch real AJAX request here
				setTimeout(function(){

					// do what you want with the exhibitor id
					esf.log('Removed: '+the_id);

					// simulate positive
					$the_icon.attr('class','icon-add-selection');
					$the_button.toggleClass('esf-action-add-to-selection esf-action-remove-from-selection').find('.esf-action-text').text(esf_text.add);

				}, 300);
				// /@TOPROD

			}

		}


		// ALSA 05/01/2016 This fake function is emptied because it conflicts with real script from Kaliop (but it still exists here and is called elsewhere in this file)
		function esf_AJAX_update_list() {

			// request begins
			//$('.exhibitor-search-form').append('<div class="esf-loader-layer"><div class="esf-loader" title="0"><div class="loading"><div class="loading-inner"><span class="shape"></span><span class="shape"></span><span class="shape"></span></div></div></div></div>');
			//$('.esf-loader-layer').hide().fadeIn(200);

			// @TOPROD : Launch real AJAX request here
			//setTimeout(function(){
				// in request success
			//	$('.esf-loader-layer').fadeOut(200, function(){
			//		$(this).remove();
			//	});
			//}, 300);
			// /@TOPROD

		}
		// AJAX END

		/*
		 * Variables init
		 */

		var $panel_header	= $('.esf-as-header'),
			$panel			= $('.esf-as-tree'),
			$panel_filters	= $('.esf-as-filters'),
			$panel_content	= $('.esf-as-panel-content'),
			$list_filters	= $('.esf-as-list-filters'),
			$tree_first_lvl = $(".esf-tree"),
			max_lvl			= 1,
			slide_panels	= '';

		/*
		 * Markup redesign
		 */
		$panel_content.find('.esf-tree li ul').closest('li').addClass('esf-has-sub-items');
		$list_filters.find('li:first').addClass('current');

		// js placeholders for multilingual solution
		$('.esf-as-heading').find('.esf-js-placeholder').each(function(){
			$(this).after('<button type="button" class="esf-remove-filters hidden" aria-hidden="true">'+$(this).attr('title')+'<i class="icon-catal icon-catal-cross" aria-hidden="true"></i></button>').remove();
		});

		// adds tree lvl class
		$tree_first_lvl.each(function(){
			$(this).find("ul").each(function() {
				var lvl = $(this).parentsUntil(".esf-tree").filter("ul").length + 2;
				$(this).addClass("tree-lvl-" + lvl);
				max_lvl = max_lvl < lvl ? lvl : max_lvl;
			});
			$(this).closest('.esf-as-tree').addClass('max-depth-'+ (max_lvl-2));
		});

		// builds slide panel for each sub lvl
		/*
		for (i=3; i<=max_lvl; i++) {
			slide_panels += '<div class="slide-panel slide-panel-'+ (i-2) +'"></div>';
		}
		$tree_first_lvl.after(slide_panels);
		*/

		// hide all panels, keep first only
		$('.esf-as-filter-panel:not(:first)').hide();

		// marks tree with only one basic lvl
		$tree_first_lvl.addClass('esf-only-one-lvl').find('.esf-has-sub-items:first').closest('.esf-only-one-lvl').removeClass('esf-only-one-lvl');

		/*
		 * some useful functions
		 */

		// reset checked checkboxes
		function esf_reset_panel(element_id) {
			var $the_tree = $('#tree_'+element_id);

			$the_tree.find('input:checkbox').prop('checked', false);
			$the_tree.find('.esf-item-checked').removeClass('esf-item-checked');
		}


		// count the selected checkboxes and display the number
		// actualizes the global filters count
		function esf_count_selected(element) {

			// element is the clicked checkbox
			var parent_tab		= element.closest('.esf-as-filter-panel'),
				element_id		= parent_tab.attr('id'),
				nb_of_items_sel = parent_tab.find('input:checkbox:checked').length,
				$filter_tag		= $('.esf-' + element_id + '-filter'),
				panel_name		= $('.esf-as-list-filters').find('a[href="#'+element_id+'"]').find('.esf-as-filter-name').text();

			if (nb_of_items_sel !== 0 ) {

				$list_filters.find('[href="#'+element_id+'"]').find('.esf-as-count').addClass('counted').find('.esf-as-count-nb').text(nb_of_items_sel);

				esf_show_filter_ui(element_id);

				// tag filter creation
				if ( $filter_tag.length === 0 ) {
					var filter_markup ='<span class="esf-' + element_id + '-filter"><span class="esf-tag-filter-label">' + panel_name + esf_text.space + ':&nbsp;</span><span class="esf-tag-filter-nb">' + nb_of_items_sel + '</span><button type="button" class="esf-tag-filter-remove" title="' + esf_text.remove_filter +'"><i class="icon-catal icon-catal-cross" aria-hidden="true"></i></button></span>';
					$('.esf-as-af-filters').append(filter_markup);
				}
				// tag filter update number
				else {
					$filter_tag.find('.esf-tag-filter-nb').text(nb_of_items_sel);
				}
			}

			else {

				$list_filters.find('[href="#' + element_id + '"]').find('.esf-as-count').removeClass('counted').find('.esf-as-count-nb').text('');
				esf_hide_filter_ui(element_id);
				$filter_tag.remove();

			}

			refresh_filters_activated();
		}

		function refresh_filters_activated() {
			if ( $('.esf-as-af-filters').find('span').length !== 0 ) {
				$('.esf-as-activated-filters').removeClass('hidden').attr('aria-hidden', 'false');
				return true;
			}
			else {
				$('.esf-as-activated-filters').addClass('hidden').attr('aria-hidden', 'true');
				return false;
			}
		}

		function refresh_global_filter_counts() {
		}

		// show filter UI elements
		function esf_show_filter_ui(element_id) {
			$('#'+element_id+'_tree').find('.esf-remove-filters').removeClass('hidden').attr('aria-hidden', 'false');
		}

		// remove filter UI elements ("Active filters" in general and "Empty all filters" in panel)
		function esf_hide_filter_ui(element_id) {
			$('#'+element_id+'_tree').find('.esf-remove-filters').addClass('hidden').attr('aria-hidden', 'true');
			$('.esf-all-filters').find('.esf-'+element_id+'-filter').remove();
		}


		/*
		 * Some useful actions
		 */

		// on advanced search activation
		$panel_header.addClass('is-closed').attr('tabindex', '0');;
		$panel_filters.hide();
		$panel_header.on('click', function(){
			$(this).toggleClass('is-closed');
			$panel_filters.slideToggle(300);
		});
		$panel_header.on('keypress', function(e) {
			if(e.keyCode === 13 || e.keyCode === 0) {
				$(this).trigger('click');
			}
			return false;
		});


		// on filter panel type click
		$('.esf-as-list-filters').find('a').on('click', function(){
			if ( $(this).closest('li').filter('.current').length === 0 ) {
				var the_id = $(this).attr('href');

				$(this).closest('ul').find('li').removeClass('current');
				$(this).closest('li').addClass('current');
				$('.esf-as-filter-panel').hide();
				$(the_id).show();
			}
			return false;
		});


		// on checkbox check
		$panel_content.find(':checkbox').on('change', function() {
			if ( $(this).is(':checked') ) {
				$(this).closest('li').addClass('esf-item-checked').find('ul li').addClass('esf-item-checked').find('input:checkbox').prop('checked', true);
				esf_count_selected($(this));
			}
			else {
				$(this).closest('li').removeClass('esf-item-checked').find('ul li').removeClass('esf-item-checked').find('input:checkbox').prop('checked', false);
				esf_count_selected($(this));
			}
			// AJAX update list
			esf_AJAX_update_list();
		});

		// on checkbox check all in the current lvl
		$panel_content.on('change', '.esf-checkbox-select-all', function() {
			if ( $(this).is(':checked') ) {
				$(this).closest('li').nextAll('li').addClass('esf-item-checked').find('input:checkbox').prop('checked', true);
				$(this).closest('li').nextAll('li').find('li').addClass('esf-item-checked');
			}
			else {
				$(this).closest('li').nextAll('li').removeClass('esf-item-checked').find('input:checkbox').prop('checked', false);
				$(this).closest('li').nextAll('li').find('li').removeClass('esf-item-checked');
			}
			esf_count_selected($(this));
			// AJAX update list
			esf_AJAX_update_list();
		});

		// on next lvl click
		$panel_content.on('click', '.esf-has-sub-items > .esf-choice-container .esf-next-lvl', function() {

			var $next_lvl		= $(this).closest('.esf-choice-container').next('ul');
				class_el 		= $next_lvl.attr('class'),
				lvl_el   		= class_el.split('-')[2],
				$lvl_parent	= $(this).closest('.esf-as-tree'),
				label_text		= $(this).prev('label').text(),
				uniqid			= $(this).prev('label').attr('for'),
				select_all_txt	= esf_text.select,
				checked_state	= '';

			$(this).closest('.esf-has-sub-items').addClass('go-to-next-lvl');
			$lvl_parent.addClass('to-lvl-' + lvl_el);

			var nb_item	= $next_lvl.find('li').length,
				nb_check	= $next_lvl.find('li').find('input:checked').length;

			if (nb_item === nb_check ) {
				//select_all_txt = esf_text.unselect;
				checked_state = ' checked="checked"';
			}

			if ( $next_lvl.find('li:first').filter('.esf-sublvl-heading').length === 0 ) {
				$next_lvl.find('li:first').before('<li class="esf-sublvl-heading"><button type="button" class="esf-back-to-prev-lvl"><i class="icon-catal icon-catal-arrow-left" aria-hidden="true"></i>' + label_text + '</button> <label for="'+uniqid+'_select_all"><span class="esf_select_all_label">'+select_all_txt+'</span> <input type="checkbox" id="'+uniqid+'_select_all" class="esf-checkbox-select-all"'+checked_state+' /></label></li>');
			}

		});

		// on prev lvl click
		$panel_content.on('click', '.esf-back-to-prev-lvl', function(){
			var $_this				= $(this),
				current_lvl_class	= $_this.closest('[class^="tree-lvl-"]').attr('class'),
				current_lvl		= current_lvl_class.split('-')[2];

			$_this.closest('.esf-as-tree').removeClass('to-lvl-'+current_lvl);
			var timer = setInterval(function(){
				$_this.closest('.go-to-next-lvl').removeClass('go-to-next-lvl');
				clearInterval(timer);
				timer = null;
			}, 300);

			return false;
		});

		// on remove filter click
		$panel.on('click', '.esf-remove-filters', function(){
			var id = $(this).closest('.esf-as-tree').attr('id'),
				name = id.split('_tree');
			esf_reset_panel(name[0]);
			esf_count_selected($(this));
			// AJAX update list
			esf_AJAX_update_list();
		});

		// on remove tag filter click
		$('.esf-as-af-filters').on('click', '.esf-tag-filter-remove', function(){
			var id = $(this).closest('span').attr('class'),
				name = id.split('-');
			$('#'+name[1]+'_tree').find('.esf-remove-filters').trigger('click');
		});

		//simulate alpha filter click
		$('.esf-results-alpha-list').find('a').on('click', function(){
			// AJAX update list
			esf_AJAX_update_list();
			return false;
		});


		/*
		 * === IE8 fixes
		 */
		// http://browserhacks.com/#hack-a43251169f364d54a7a8d9fe0686267d

		var isIE = '\v'=='v'; // IE <= 8
		if ( isIE ) {
			$('html').addClass('esf-lte-ie8');
			$panel_header.on('click.ie8', function(){
				$('.esf-as-filter-panel').eq(0).show();
			});
		}

	} // end of 'only if module here'

});
