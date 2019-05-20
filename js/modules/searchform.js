/**!
 Search Form
 Search form

 @contributors: Geoffrey Crofte (Alsacréations), Rodolphe (Alsacréations)
 @date-created: 2015-04-01
 @last-update: 2016-01-20
 */

;
(function($) {

	$.cxpSearchform = function(el, options) {

		var defaults = {};

		var plugin = this;

		plugin.settings = {};

		var $element = $(el),
			element = el;

		// Plugin initialization
		plugin.init = function() {
			plugin.settings = $.extend({}, defaults, options);
			updateSettingsFromHTMLData();
			registerEvents();
		};

		// Reads plugin settings from HTML data-* attributes (camelCase)
		var updateSettingsFromHTMLData = function() {
			var data = $element.data();
			for (var dat in data)
				plugin.settings[dat] = data[dat];
		};

		// Event Handlers on HTML components inside the plugin
		var registerEvents = function() {

			var $target = $element.find('.js-toggle-target');

			// Button to display search, only on pages with .site-banner
			if ($element.closest('.site-banner').length <1) return;

			$element.find('.js-toggle-trigger').on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var $target = $(this).closest('.js-gsf');
				$target.toggleClass('is-visible');
				if ($target.hasClass('is-visible')) {
					$target.find('input#search').focus();
				}
				return false;
			});
			$element.on('click', function(e) {
				e.stopPropagation(); // prevent Propagation to body
			});
			$element.on('click', '.js-to-close', function(e) {
				//e.preventDefault();
				closeForm();
			});
			$target.find('input#search').on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
			$target.find('input#search').on('focus', function() {
				$(this).closest('.gsf-input-line').addClass('is-focused');
				return false;
			});
			$target.find('input#search').on('blur', function() {
				$(this).closest('.gsf-input-line').removeClass('is-focused');
				return false;
			});

			// Make disappear when click outside
			$('body').on('click', closeForm);

			// Close on ESC key
			$('body').on('keyup', function(e) {
				if(e.keyCode==27)	closeForm();
			});

			// Sticky things on scroll (gc)
			var gsf_scrolltimer,
				gsf_menuInitPos = $('.site-banner').outerHeight(), //gc
				$headerSearch = $('.body-visual .site-banner .js-gsf'); // gc

			if ($headerSearch.length > 0) {

				var $trigger = $('.js-toggle-trigger', $element);

				var $searchfield = $('[name=search]', $headerSearch);
				$searchfield.on('keyup', function() {
					$trigger.toggleClass('text-only', $(this).val().length > 0);
				});

				window.addEventListener('scroll', function() {

					clearTimeout(gsf_scrolltimer);
					gsf_scrolltimer = setTimeout(function() {

						if ($(window).scrollTop() >= gsf_menuInitPos) {

							$trigger.attr('title', 'Déplier la recherche');
							$trigger.on('click.cxpnosearch', function(e) {
								var $searchfield = $('[name=search]', $element);
								var searchvalue = $searchfield.val();
								if (searchvalue.length > 0) {
									$(this).closest('form').trigger('submit');
								}
								e.preventDefault();
							});

						} else {

							$trigger.off('click.cxpnosearch').attr('title', 'Lancer la recherche');

						}

					}, 30);
				}, true);

			} // end of Sticky things on scroll (gc)

		}; // End of registerEvents

		// Close the search form
		var closeForm = function() {
			var $jsToggleTrigger = $element.find('.js-toggle-trigger');
			if ($jsToggleTrigger.closest('.js-gsf').hasClass('is-visible')) {
				$jsToggleTrigger.closest('.js-gsf').toggleClass('is-visible');
				if ($jsToggleTrigger.hasClass('text-only')) {
					$jsToggleTrigger.toggleClass('text-only');
					$jsToggleTrigger.closest('.js-gsf').find('input#search').val('');
					$jsToggleTrigger.attr('title', 'Déplier la recherche');
				}
			}
		};

		plugin.init();

	};

	$.fn.cxpSearchform = function(options) {

		return this.each(function() {
			if (undefined === $(this).data('cxpSearchform')) {
				var plugin = new $.cxpSearchform(this, options);
				$(this).data('cxpSearchform', plugin);
			}
		});

	};

	$('.cxp-searchform').cxpSearchform();

})(jQuery);
