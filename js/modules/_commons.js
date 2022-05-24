/**!
 COMMONS
 All commons function merged to generics jQuery plugins

 @contributors: Geoffrey Crofte (Alsacréations), PHV (Alsacréations), Damien Senger (Alsacréations)
 @date-created: 2015-03-26
 @last-update: 2015-10-19
 */

;
(function($) {

  //
  // Plugin Name
  // @Description: Do something to create good interaction
  //

  /*
  $.fn.plugin_name = function(options) {

    var settings = $.extend({
      param_name: "param_value",
      param_name2: "param_value2"
    }, options);

    return this.each(function() {

    });

  };
  */


  //
  // Toggle Slide
  // @Description: Toggle slide the targetted element
  // @Parameters: speed (int, ms)
  //

  $.fn.toggleSlide = function(options) {

    var settings = $.extend({
      speed: 200
    }, options);

    return this.each(function() {
      var $_this = $(this),
        $trigger = $(this).find('.js-toggle-trigger'),
        $target = $(this).find('.js-toggle-target');

      $trigger.on('click.ts', function() {

        if ($_this.hasClass('is-open')) {
          $target.stop().slideUp(settings.speed);
          $_this.removeClass('is-open');

        } else {
          $target.stop().slideDown(settings.speed);
          $_this.addClass('is-open');

        }

        return false;
      });
      $target.on('click.ts', function(e) {
        e.stopPropagation();
      });
      $('body').on('click', function(e) {
        if ($_this.hasClass('is-open')) {
          $trigger.trigger('click.ts');
        }
      });
    });

  };


  //
  // Toggle Slide w/o closing out of the box
  // @Description: Toggle slide the targetted element
  // @Parameters: speed (int, ms)
  //

  $.fn.toggleBox = function(options) {

    var settings = $.extend({
      speed: 200
    }, options);

    return this.each(function() {
      var $_this = $(this),
        $trigger = $(this).find('.js-toggle-trigger'),
        $target = $(this).find('.js-toggle-target');

      $trigger.on('click.ts', function() {

        if ($_this.hasClass('is-open')) {
          $target.stop().slideUp(settings.speed);
          $_this.removeClass('is-open');

        } else {
          $target.stop().slideDown(settings.speed);
          $_this.addClass('is-open');

        }

        return false;
      });
      $target.on('click.ts', function(e) {
        e.stopPropagation();
      });
    });

  };


  //
  // Toggle Fade
  // @Description: Toggle fade the targetted element
  // @Parameters: speed (int, ms)
  //

  $.fn.toggleFade = function(options) {

    var settings = $.extend({
      speed: 200
    }, options);

    return this.each(function() {
      var $_this = $(this),
        $trigger = $(this).find('.js-toggle-trigger'),
        $target = $(this).find('.js-toggle-target');

      $trigger.on('click.ts', function() {

        if ($_this.hasClass('is-visible')) {
          $target.stop().fadeIn(settings.speed);
          $_this.removeClass('is-visible');

        } else {
          $target.stop().fadeOut(settings.speed);
          $_this.addClass('is-visible');
        }

        return false;
      });
      $target.on('click.ts', function(e) {
        e.stopPropagation();
      });
    });

  };

  if ($('.js-toggle-slide').length > 0) {
    $('.js-toggle-slide').toggleSlide();
  }
  if ($('.js-toggle-box').length > 0) {
    $('.js-toggle-box').toggleBox();
  }
  if ($('.js-toggle-fade').length > 0) {
    $('.js-toggle-fade').toggleFade();
  }


  /**
   * Script permettant le changement de la largeur des selectboxes dans la
   * recherche avancée de la liste d'exposants ou de produits
   *
   * @author	Damien Senger <damien@alsacreations.fr>
   * @param 	smallWord			Value de l'élément le plus petit
   * */
  var $selectbox = $('.exhibitor-search-form .esf-form-zone select');

  $.fn.selectboxResize = function(smallWord) {
    var value = $(this).val();

    if (value == smallWord) {
      $(this).addClass('is-small');
    } else {
      $(this).removeClass('is-small');
    }
  };

  if ($selectbox.length) {
    $(document).ready(function() {
      $selectbox.selectboxResize('all');
    });

    $(this).on('change', function() {
      $selectbox.selectboxResize('all');
    });
  }


  /**
   * Script permettant la gestion de l'affichage du catalogue exposant et produits
   * sur IE 10
   *
   * @author	Damien Senger <damien@alsacreations.fr>
   * */

  $.fn.ie10Detectizr = function() {
    var isIE10 = document.all && window.atob;

    if (isIE10) {
      $(this).addClass('ie10');
    }
  };
  $('html').ie10Detectizr();

}(jQuery));

const backToTop = () => {
  const body = document.body
  const el = document.createElement('div')
  body.appendChild(el)
  el.outerHTML = '<a href="#top" class="back-to-top-button"><svg viewBox="0 0 256 256" version="1.1" style="fill: rgba(166, 166, 166, 0.9);"><path d="M88.4020203,153.455844 L128,113.857864 L167.59798,153.455844 L173.254834,147.79899 L128,102.544156 L125.171573,105.372583 L82.745166,147.79899 L88.4020203,153.455844 Z"></path></svg></a>'
  
  const element = document.querySelector('.back-to-top-button')

  document.addEventListener('scroll', () => {
    console.log(window.scrollY)
    if(window.scrollY > 400) {
      element.classList.add('visible')
    } else {
      element.classList.remove('visible')
    }
  })
}

backToTop()