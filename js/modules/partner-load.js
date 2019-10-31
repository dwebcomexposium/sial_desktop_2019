/**!
 partner_load

 	Little plugin for get in AJAX partner list and add it in the view
	We can show or hide the new elements

 @contributors: Guillaume Focheux (Alsacréations)
 @date-created: 2015-04-24
 @last-update: 2015-04-24
 */

;
(function ($) {

	function partner_load(e) {

		// Vars
		var $this = $(this);// trigger button
		var $partner_container = $(this).closest('.js-partner-ajax-load');
		var $receiver_container = $partner_container.find('.js-pal');
		var url = $partner_container.data('url');

		if (!$(this).hasClass('js-already-load')) {
			// Ajax load
			if ($receiver_container !== false) {
				$receiver_container.load(url);
				$(this).addClass('js-already-load');
			}
		}
		// CSS classes
		$receiver_container.toggleClass('is-visible');

		$textNotHide = $(this).find('span').not('.js-hidden');
		$textHide = $(this).find('span.js-hidden');
		$textNotHide.addClass('js-hidden');
		$textHide.removeClass('js-hidden');
		e.preventDefault();
	}

	// Pagination plugin
	$.fn.partnerLoad = function () {
		$(this).each(function () {
			$(this).on('click', '.js-pal-trigger', partner_load);
		});
	};

	$('.js-partner-ajax-load').partnerLoad();

})(jQuery);
