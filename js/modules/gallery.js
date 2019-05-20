/**!
 Gallery
 Description du module

 @contributors: Guillaume Focheux (Alsacréations)
 @date-created: 2015-04-28
 @last-update: 2015-04-29
 */

;
(function($) {

  $.cxpGallery = function(el, options) {

    var defaults = {};

    var plugin = this;

    plugin.settings = {};

    var $element = $(el),
      element = el;

    // Plugin initialization
    plugin.init = function() {

      plugin.settings = $.extend({}, defaults, options);
      updateSettingsFromHTMLData();

      // Masonry didn't align images verticaly - bug FIX : Added delay of 100 ms
      setTimeout( function() { 

        if ($element.length > 0) {
          if ($element.parents('body-corporate').length > 0) {
            $element.masonry({
              'itemSelector': '.gal-js-item'
            });
          } else { 
            $element.masonry({
              'columnWidth': '.gal-item-simple',
              'itemSelector': '.gal-js-item',
              'percentPosition': true
            });
          }
        }

      }, 100);

    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    plugin.init();

  };

  $.fn.cxpGallery = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('cxpGallery')) {
        var plugin = new $.cxpGallery(this, options);
        $(this).data('cxpGallery', plugin);
      }
    });

  };

  $('.gallery-js-masonry').cxpGallery();

})(jQuery);
