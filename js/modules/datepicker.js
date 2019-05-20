/**!
 Datepicker
 Datepicker module with Pikaday

 @contributors: Rodolphe (Alsacréations)
 @date-created: 2015-06-12
 */

(function($) {

  $.cxpDatepicker = function(el, options) {

    var defaults = {};

    var plugin = this;

    plugin.settings = {};

    var $element = $(el),
      element = el;

    // Plugin initialization
    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      updateSettingsFromHTMLData();
      registerEvents();
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data) plugin.settings[dat] = data[dat];
    };

    // Event Handlers on HTML components inside the plugin
    var registerEvents = function() {
      $element.on('click', false); // preventDefault in <input type="date">
      plugin.settings.picker = new Pikaday({
        field: element,
        format: 'DD/MM/YYYY',
      });
      $element.next('.btn-datepiker').on('click', function() {
        plugin.settings.picker.show();
      });
    };

    plugin.init();

  };

  $.fn.cxpDatepicker = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('cxpDatepicker')) {
        var plugin = new $.cxpDatepicker(this, options);
        $(this).data('cxpDatepicker', plugin);
      }
    });

  };

  $('.cxp-datepicker').cxpDatepicker();

})(jQuery);
