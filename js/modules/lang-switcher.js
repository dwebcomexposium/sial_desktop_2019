/**!
	Lang Switcher
	Language selector usually included inside the site header

	@contributors: Geoffrey Crofte (Alsacréations), Philippe Vayssière (Alsacréations)
	@date-created: 2015-04-01
	@last-update: 2015-12-09
 */
 
;(function($) {

	$('.js-lang-switcher').each(function(){

		var $_this = $(this);

		// button creation
		$_this.find('ul').before('<button class="ls-trigger js-toggle-trigger" type="button" title="'+$_this.data('title')+'">'+$_this.find('.is-active').text()+'</button>');

		// accessibility (tab nav)
		$_this.find('a:last').on('blur', function(){
			$_this.find('.js-toggle-trigger').trigger('click');
		});

		// Allows lang switcher to be displayed above "Back to top" if opened
		// It happens in mobile where lang-switcher is in footer
		// When lang switcher is closed, we still want it to be displayed under "Back to top"
		$_this.find('.js-toggle-trigger').on('click.ls', function() {
			var $lsToggle = $(this);
			// Adding higer z-index to footer > .inside than to its sibling .is-stuck.sf-ttt
			// It seems .is-open isn't there yet when the test is made so z-index is set in the 'else' statement
			var z = $('.is-stuck.sf-ttt').css('zIndex');
			if ($_this.hasClass('is-open')) {
				$('.site-footer .inside').css({'zIndex': 'auto'});
			} else {
				$('.site-footer .inside').css({'zIndex': z + 1});
			}
			return false;
		});

	})
	.toggleSlide();

})(jQuery);