/**!
 Affichage / masquage de tags

 @contributors: Damien Senger (Alsacréations)
 @date-created: 2015-10-16
 @last-update: 2015-10-16
 */

;
(function($) {

  $.fn.tagHideOnLoad = function() {
    var $container = $(this),
      $hiddenChildren = $container.children('.js-hide-item');

    $hiddenChildren.hide();
  };

  $.fn.tagToggleOnClick = function() {
    var $button = $(this),
      $container = $button.parents('.js-hide-container'),
      $txtHide = $button.children('.js-hide-trigger-txtHide'),
      $txtShow = $button.children('.js-hide-trigger-txtShow'),
      $toggledChildren = $container.children('.js-hide-item');

    if ($toggledChildren.length) {
      if ($container.hasClass('is-open'))  {
        $toggledChildren.fadeOut(400, function() {
          $txtHide.hide();
          $txtShow.show();

        });
      } else {
        $toggledChildren.fadeIn();
        $txtHide.show();
        $txtShow.hide();
      }
      $container.toggleClass('is-open');
    }

  };

  if ($('.js-hide-container').length) {
    $('.js-hide-container').tagHideOnLoad();
    $('.js-hide-trigger-txtHide').removeClass('visually-hidden').hide();
  }

  if ($('.js-hide-trigger').length) {
    $('.js-hide-trigger').on('click', function(e) {
      $(this).tagToggleOnClick();
      e.preventDefault();
    });
  }

})(jQuery);
