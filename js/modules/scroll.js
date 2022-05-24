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

console.log('scroll loaded')

const backToTop = () => {
  const body = document.body
  const el = document.createElement('div')
  // el.className.add('back-to-top')
  const svg = document.createElement('svg')
  svg.outerHTML = '<svg class="back-to-top" viewBox="0 0 256 256" version="1.1" style="fill: rgba(166, 166, 166, 0.9);"><path d="M88.4020203,153.455844 L128,113.857864 L167.59798,153.455844 L173.254834,147.79899 L128,102.544156 L125.171573,105.372583 L82.745166,147.79899 L88.4020203,153.455844 Z"></path></svg>'
  el.appendChild(svg)
  body.appendChild(el)
}

backToTop()