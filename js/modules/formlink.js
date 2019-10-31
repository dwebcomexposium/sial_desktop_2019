/**!
 Linked form items
 Linked form items module

 @contributors: Rodolphe (Alsacréations)
 @date-created: 2015-04-28
 @last-update: 2015-04-28
 */

(function($) {

   $.cxpFormlink = function(el, options) {

      var defaults = {
        target:null, // target element to toggle
      };

      var plugin = this;

      plugin.settings = {};

      var $element = $(el),
          element = el;

      // Plugin initialization
      plugin.init = function() {
         plugin.settings = $.extend({}, defaults, options);
         updateSettingsFromHTMLData();
         // Hide target element is source element is not checked
         if(plugin.settings.target!==null) {
           if(!$element.is(':checked')) $(plugin.settings.target).hide();
         }
         registerEvents();
      };

      // Reads plugin settings from HTML data-* attributes (camelCase)
      var updateSettingsFromHTMLData = function() {
         var data = $element.data();
         for(var dat in data) plugin.settings[dat] = data[dat];
      };

      // Event Handlers on HTML components inside the plugin
      var registerEvents = function() {
        $element.on('click', function() {
          $(plugin.settings.target).toggle($element.is(':checked'));
        });
      };

      plugin.init();

   };

   $.fn.cxpFormlink = function(options) {

       return this.each(function() {
           if (undefined === $(this).data('cxpFormlink')) {
               var plugin = new $.cxpFormlink(this, options);
               $(this).data('cxpFormlink', plugin);
           }
       });

   };

   $('.cxp-formlink').cxpFormlink();

 })(jQuery);
