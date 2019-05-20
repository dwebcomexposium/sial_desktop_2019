/**!
 Hammer jQuery plugin
 https://github.com/hammerjs/jquery.hammer.js/blob/master/jquery.hammer.js
*/
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'hammerjs'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'), require('hammerjs'));
  } else {
    factory(jQuery, Hammer);
  }
}(function($, Hammer) {
  function hammerify(el, options) {
    var $el = $(el);
    if (!$el.data("hammer")) {
      $el.data("hammer", new Hammer($el[0], options));
    }
  }

  $.fn.hammer = function(options) {
    return this.each(function() {
      hammerify(this, options);
    });
  };

  // extend the emit method to also trigger jQuery events
  Hammer.Manager.prototype.emit = (function(originalEmit) {
    return function(type, data) {
      originalEmit.call(this, type, data);
      $(this.element).trigger({
        type: type,
        gesture: data
      });
    };
  })(Hammer.Manager.prototype.emit);
}));


/**!
 Swiper
 Swiper with items

 @contributors: Rodolphe (Alsacréations)
 @date-created: 2015-06-04
 @last-update: 2015-07-06
 */

(function($) {

  $.cxpSwiper = function(el, options) {

    var defaults = {
      activeIndex: 0, // active slide (group) index
      touch: true, // allow touch swiping
      touching: false, // is touch active
      touchDelta: 50, // touch swipe threshold
      animating: false, // is currently animated
      itemsPerSlide: undefined, // number of items per slide
      containerWidth: 0, // width of main container
      contentWidth: 0, // real width of content
      itemsCount: 0, // number of items
      slidesCount: 0, // number of pages
      autoDelay: false, // delay between slides
      paginateByItems: false, // show pagination by number of items (not by slide number)
      paginateByBullets: false, // activate bullets
      speed: 600, // transition speed (ms)
      loop: false, // loop transition
      orientationReset: false, // reset on orientationchange
      lastOrientation: -1, // last orientation value
      useActiveClasses: false, // use classes for active/inactive items (below)
      transitionsSet: false, // transitions are initialized
      classActive: 'slider-item-active', // active HTML class, without dot
      classPrevious: 'slider-item-prev', // active HTML class, without dot
      classNext: 'slider-item-next', // active HTML class, without dot
      itemSelector: '.slider-item',
      wrapperSelector: '.swiper-wrapper',
      nextSelector: '.slider-btn-next',
      prevSelector: '.slider-btn-prev',
      playPauseSelector: '.slider-play-btn',
      pgStart: '.slider-nb-start',
      pgEnd: '.slider-nb-end',
      pgTotal: '.slider-nb-total',
      pgContainer: '.slider-pagin-nb',
      pgBulletElement: '<span class="slider-pagin-item"></span>',
      pgBulletActiveClass: 'is-active'
    };

    var plugin = this;

    plugin.settings = {};

    var $element = $(el),
      element = el;

    // Plugin initialization
    plugin.init = function() {

      plugin.settings = $.extend({}, defaults, options);
      updateSettingsFromHTMLData();
      registerEvents();

      // Values
      plugin.updateInitValues();
      plugin.updatePagination();

      if (plugin.settings.autoDelay > 0) {
        plugin.settings.isAutoplay = true;
        clearInterval(plugin.settings.interval);
        plugin.settings.interval = setInterval(plugin.swipeNext, plugin.settings.autoDelay);
      } else {
        plugin.settings.isAutoplay = false;
        clearInterval(plugin.settings.interval);
        $(plugin.settings.playPauseSelector, $element).hide();
      }

      // Initialize pagination
      if (plugin.settings.paginateByBullets) {
        for (var i = 0; i < plugin.settings.slidesCount; i++) {
          $(plugin.settings.pgContainer, $element).append(plugin.settings.pgBulletElement);
        }
        var $bullets = $(plugin.settings.pgContainer, $element).children();
        $bullets.first().addClass(plugin.settings.pgBulletActiveClass);
        $bullets.on('click', function() {
          plugin.swipePause();
          var decal = -(plugin.settings.activeIndex - $(this).index());
          if (decal !== 0) plugin.swipeTo(decal);
        });
      }

      // Initialize CSS transitions
      // plugin.initTransitions();

      // Initialize touch events
      if (plugin.settings.touch) {
        $element.hammer().off('panright.cxpSwiper').on('panright.cxpSwiper', function(e) {
          if (!plugin.settings.touching && !plugin.settings.animating && e.gesture.deltaX > plugin.settings.touchDelta) {
            plugin.settings.touching = true;
            plugin.swipePrev();
          }
        });
        $element.hammer().off('panleft.cxpSwiper').on('panleft.cxpSwiper', function(e) {
          if (!plugin.settings.touching && !plugin.settings.animating && e.gesture.deltaX < -plugin.settings.touchDelta) {
            plugin.settings.touching = true;
            plugin.swipeNext();
          }
        });
        $element.hammer().off('panend.cxpSwiper').on('panend.cxpSwiper', function(e) {
          plugin.settings.touching = false;
        });

        // Go to first slide by default
        plugin.goTo(0);

      }

      // Orientation change ?
      plugin.settings.lastOrientation = ($(window).width() > $(window).height()) ? 90 : 0;

    };

    // Update dimensions values
    plugin.updateInitValues = function() {
      plugin.settings.itemsCount = $(plugin.settings.itemSelector, $element).length;
      plugin.settings.containerWidth = $(plugin.settings.wrapperSelector, $element).outerWidth();
      plugin.settings.contentWidth = 0;
      $(plugin.settings.itemSelector, $element).each(function() {
        plugin.settings.contentWidth += $(this).outerWidth();
      });
      if (plugin.settings.itemsPerSlide !== undefined) {
        plugin.settings.slidesCount = Math.ceil(plugin.settings.itemsCount / plugin.settings.itemsPerSlide);
      } else {
        plugin.settings.slidesCount = Math.ceil(plugin.settings.contentWidth / plugin.settings.containerWidth);
      }
    };

    // Initialize transitions
    plugin.disableTransitions = function() {
      $(plugin.settings.wrapperSelector, $element).css({
        '-webkit-transition': 'none',
        'transition': 'none'
      });
      plugin.settings.transitionsSet = false;
    };

    // Initialize transitions
    plugin.initTransitions = function() {
      if(plugin.settings.transitionsSet) return;
      $(plugin.settings.wrapperSelector, $element).css({
        '-webkit-transition': 'all ' + (plugin.settings.speed / 1000) + 's',
        'transition': 'all ' + (plugin.settings.speed / 1000) + 's'
      });
      plugin.settings.transitionsSet = true;
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Event Handlers on HTML components inside the plugin
    var registerEvents = function() {

      $(plugin.settings.nextSelector, $element).off('click.cxpSwiper').on('click.cxpSwiper', function(e) {
        e.preventDefault();
        plugin.swipePause();
        plugin.swipeNext();
      });
      $(plugin.settings.prevSelector, $element).off('click.cxpSwiper').on('click.cxpSwiper', function(e) {
        e.preventDefault();
        plugin.swipePause();
        plugin.swipePrev();
      });
      $(plugin.settings.playPauseSelector, $element).off('click.cxpSwiper').on('click.cxpSwiper', function(e) {
        e.preventDefault();
        if (plugin.settings.isAutoplay) {
          plugin.swipePause();
        } else {
          plugin.swipePlay();
        }
      });

    };

    // Calculate offset of slides for swiping
    var getOffset = function(dir) {
      var offsetLeft = false;
      if (plugin.settings.itemsPerSlide === undefined) { // if itemsPerSlide is not defined : width is auto (container)
        offsetLeft = -plugin.settings.containerWidth * plugin.settings.activeIndex;
      } else { // if itemsPerSlide is defined
        var $items = $(plugin.settings.itemSelector, $element);
        var $item = $items.eq(plugin.settings.activeIndex * plugin.settings.itemsPerSlide);
        if ($item !== undefined && $item.length > 0) {
          offsetLeft = -($item.position().left);

          if (plugin.settings.useActiveClasses) {
            $items.removeClass(plugin.settings.classActive);
            $items.removeClass(plugin.settings.classNext);
            $items.removeClass(plugin.settings.classPrevious);
            $item.addClass(plugin.settings.classActive);
            $item.next().addClass(plugin.settings.classNext);
            $item.prev().addClass(plugin.settings.classPrevious);
          }

        }
      }
      if (offsetLeft === -0) offsetLeft = 0;
      return offsetLeft;
    };

    // Toggle pause state
    plugin.swipePause = function() {
      $(plugin.settings.playPauseSelector, $element).find('.icon').removeClass('icon-pause').addClass('icon-play');
      clearInterval(plugin.settings.interval);
      plugin.settings.isAutoplay = false;
    };

    // Toggle auto play state
    plugin.swipePlay = function() {
      $(plugin.settings.playPauseSelector, $element).find('.icon').removeClass('icon-play').addClass('icon-pause');
      clearInterval(plugin.settings.interval);
      plugin.settings.interval = setInterval(plugin.swipeNext, plugin.settings.autoDelay);
      plugin.settings.isAutoplay = true;
    };

    // Destroy
    plugin.destroy = function() {
      // Clear the autoplay interval if exists
      clearInterval(plugin.settings.interval);
      // Unregister events
      $(plugin.settings.prevSelector + ',' + plugin.settings.nextSelector, $element).off('.cxpSwiper');
      // Autodestroy
      $element.removeData('cxpSwiper');
    };

    // Next item
    plugin.swipeNext = function() {
      plugin.swipeTo(1);
    };

    // Previous item
    plugin.swipePrev = function() {
      plugin.swipeTo(-1);
    };

    // Go to item (direct)
    plugin.goTo = function(index) {
      if (index > -1) plugin.settings.activeIndex = index;
      var offsetLeft = getOffset(index);
      $(plugin.settings.wrapperSelector, $element).css({
        '-webkit-transform': 'translate3d(' + offsetLeft + 'px,0,0)',
        'transform': 'translate3d(' + offsetLeft + 'px,0,0)'
      });
      plugin.updatePagination();
    };

    // Swipe to item
    plugin.swipeTo = function(dir) {

      if (plugin.settings.animating) return false;

      plugin.initTransitions();

      // If looping : rewinds to first slide
      if (plugin.settings.loop && plugin.settings.activeIndex + dir >= plugin.settings.slidesCount) {
        plugin.goTo(0);
        return;
        // dir = -plugin.settings.activeIndex; to go back with animation
      }

      // If forward/backgards direction is ok
      if (plugin.settings.activeIndex + dir >= 0 && plugin.settings.activeIndex + dir < plugin.settings.slidesCount) {
        plugin.settings.animating = true;
        clearInterval(plugin.settings.interval);
        if (plugin.settings.isAutoplay) plugin.settings.interval = setInterval(plugin.swipeNext, plugin.settings.autoDelay);
        plugin.settings.activeIndex += dir;
        var offsetLeft = getOffset(dir);
        if (offsetLeft !== false) {
          /*$(plugin.settings.wrapperSelector, $element).animate({
            left: offsetLeft + 'px'
          },plugin.settings.speed,'swing', function() {
            plugin.settings.animating = false;
          });*/
          $(plugin.settings.wrapperSelector, $element).css({
            '-webkit-transform': 'translate3d(' + offsetLeft + 'px,0,0)',
            'transform': 'translate3d(' + offsetLeft + 'px,0,0)'
          });

          setTimeout(function() {
            plugin.settings.animating = false;
          }, plugin.settings.speed);
        } else {
          plugin.settings.animating = false;
          plugin.settings.activeIndex -= dir;
        }
        plugin.updatePagination();
      }

    };

    // Update on resize
    plugin.updateResize = function() {

      if (plugin.settings.orientationReset) {
        var screenOrientation = ($(window).width() > $(window).height()) ? 90 : 0;
        if (screenOrientation !== plugin.settings.lastOrientation) {
          plugin.settings.lastOrientation = screenOrientation;
          plugin.init();
        }
      }
      // Fix on resize
      plugin.goTo(plugin.settings.activeIndex);
    };

    // Update pagination
    plugin.updatePagination = function() {

      //if(plugin.settings.activeIndex===0) return false;
      var $next = $(plugin.settings.nextSelector, $element);
      var $prev = $(plugin.settings.prevSelector, $element);

      if (plugin.settings.paginateByBullets) { // Paginate by bullets

        // Update HTML elements (bullets)
        $(plugin.settings.pgContainer, $element).children().removeClass(plugin.settings.pgBulletActiveClass).eq(plugin.settings.activeIndex).addClass(plugin.settings.pgBulletActiveClass);
        $next.css({
          opacity: (plugin.settings.activeIndex + 1 < plugin.settings.slidesCount ? 1 : 0)
        });
        $prev.css({
          opacity: (plugin.settings.activeIndex > 0 ? 1 : 0)
        });

      }

      if (plugin.settings.paginateByItems && plugin.settings.itemsPerSlide) { // Group pagination (start-end/total)

        var start = plugin.settings.activeIndex * plugin.settings.itemsPerSlide + 1;
        var end = Math.min(plugin.settings.activeIndex * plugin.settings.itemsPerSlide + plugin.settings.itemsPerSlide, plugin.settings.itemsCount);
        $(plugin.settings.pgStart, $element).text(start);
        if (end != start && end > start) $(plugin.settings.pgEnd, $element).text('-' + end);
        else $(plugin.settings.pgEnd, $element).text('');
        $(plugin.settings.pgTotal, $element).text(plugin.settings.itemsCount);
        $next.css({
          opacity: (end < plugin.settings.itemsCount ? 1 : 0)
        });
        $prev.css({
          opacity: (start > 1 ? 1 : 0)
        });

      } else { // Classic pagination (n/total)

        $(plugin.settings.pgStart, $element).text(plugin.settings.activeIndex + 1);
        $(plugin.settings.pgTotal, $element).text(plugin.settings.slidesCount);
        $next.css({
          opacity: (plugin.settings.activeIndex + 1 < plugin.settings.slidesCount ? 1 : 0)
        });
        $prev.css({
          opacity: (plugin.settings.activeIndex > 0 ? 1 : 0)
        });

      }

    };

    plugin.init();
    $(window).on('resize.cxpSwiper', plugin.updateResize);

  };

  $.fn.cxpSwiper = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('cxpSwiper')) {
        var plugin = new $.cxpSwiper(this, options);
        $(this).data('cxpSwiper', plugin);
      }
    });

  };

  $('.cxp-swiper').cxpSwiper();

})(jQuery);
