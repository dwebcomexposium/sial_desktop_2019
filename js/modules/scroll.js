/**!
 * Smoothscrolling to an id
 *
 * @contributors: Damien Senger (Alsacréations)
 * @date-created: 2015-07-20
 * @last-update: 2015-10-15
 * */

;
(function($) {
  $.fn.smoothscrollTo = function(e) {
    // when we click on an element
    var target = $(this).attr('href'),
      heightStart = $('.site-banner').outerHeight();

    if (target != "#" && $(target).length) {
      var position = $(target).offset().top,
        decalage = heightStart * 1.5,
        destination = position - decalage,
        speed = 750; // Animation duration in ms

      // we move to the destination
      $('html, body').animate({
        scrollTop: destination,
      }, speed);
    }

    // we cancel the click on this link
    e.preventDefault();
  };

  $('a[href^="#"]').off('click.scroll').on('click.scroll', function(e) {
    $(this).smoothscrollTo(e);
    $(this).blur();
  });
}(jQuery));
