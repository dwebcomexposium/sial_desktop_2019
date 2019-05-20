/**!
 Gallery Slider
 Description du module

 @contributors: Guillaume Focheux (Alsacréations)
 @date-created: 2015-04-28
 @last-update: 2015-04-29
 */

;(function ($) {

	setTimeout(function () {
		var $galInfinite = $("#gallery-infinite");


		$galInfinite.infinitescroll({
			navSelector: '#galinfnav', // selector for the paged navigation
			nextSelector: '#galinfnav a', // selector for the NEXT link (to page 2)
			itemSelector: '.gal-item', // selector for all items you'll retrieve
			animate: true,
			debug: false,
			loading: {
				speed: 0,
				selector: '.loading',
			    msgText:"<div class=\"loading-inner\"><span class=\"shape\"></span><span class=\"shape\"></span><span class=\"shape\"></span></div>"+
				"<p class=\"loading-txt\">Chargement en cours, merci de patienter</p>"
			}
		},
		// trigger Masonry as a callback
		function (newElements) {
			// hide new items while they are loading
			var $newElems = $(newElements).css({opacity: 0});
			// ensure that images load before adding to masonry layout
			$newElems.imagesLoaded(function () {
				// show elems now they're ready
				$newElems.animate({opacity: 1});
				$galInfinite.masonry('appended', $newElems, true);
			});
		}
		);
	}, 500);


})(jQuery);
