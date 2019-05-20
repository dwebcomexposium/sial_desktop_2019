/*
 Summary Not Accordeon Version Only corpo
 Permet de mettre en place un menu qui scroll à l'élement et ouvre le premier item,
 Permet aussi de gérer les dépliages/repliages

 classes utilisée:
 .js-sna-menu
 .js-sna-item-container
 .js-sna-item-dist-container
 .js-sna-item-dist-link when link and content aren't
 .js-sna-item
 .js-sna-item-link
 .js-sna-item-link-list

 .js-sna-item-content


 @contributors:  Guillaume Focheux (Alsacréations)
 @date-created: 2015-04-21
 @last-update: 2016-03-07
 */
;
(function($) {

  //ScrollTo

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  $('.js-sna-menu a').off('click.sna').on('click.sna', function(e) {
    e.preventDefault();
    var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - 20;
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 300);

    if ($(href).hasClass('js-sna-item-container')) {
      if ($(href).find('.js-sna-item-link').length > 0) {
        $(href).find('.js-sna-item-link').first().not('.is-active').trigger('click');
      }
    }
  });

  // Click event
  $('.js-sna-item-link').off('click.sna').on('click.sna', function(e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    if ($('.icon-plus', this).length > 0) {
      $('.icon-plus', this).addClass('icon-minus').removeClass('icon-plus');
      $(this).closest('.js-sna-item').children('.js-sna-item-content').addClass('is-open');
    } else if ($('.icon-minus', this).length > 0) {
      $('.icon-minus', this).removeClass('icon-minus').addClass('icon-plus');
      $(this).closest('.js-sna-item').children('.js-sna-item-content').removeClass('is-open');
    }
  });

})(jQuery);
