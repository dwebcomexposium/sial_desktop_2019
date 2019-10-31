/**!
 Newsletter
 Newsletter module with AJAX post

 @contributors: Rodolphe (Alsacréations)
 @date-created: 2015-05-21
 @last-update: 2015-05-21
 */

(function($) {

   $.cxpNewsletter = function(el, options) {

      var defaults = {
         newsletterPostUrl: '' // URL to post results
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
      };

      // Reads plugin settings from HTML data-* attributes (camelCase)
      var updateSettingsFromHTMLData = function() {
         var data = $element.data();
         for(var dat in data) plugin.settings[dat] = data[dat];
      };

      // Event Handlers on HTML components inside the plugin
      var registerEvents = function() {
        $('button',$element).on('click', function(e) {
          e.preventDefault();
          plugin.postData();
        });
      };

      // Plugin post data to server with AJAX request
      plugin.postData = function() {
          var $form = $('form',$element);
          $element.addClass('is-loading');
          var formData = $form.serialize();
          $('form',$element).hide();
          $.post(plugin.settings.newsletterPostUrl, formData, function(html) {
            setTimeout(function() {
              $element.addClass('with-results').removeClass('is-loading');
              $('.nf-result',$element).html(html);
              // Back button if any (in case of emergency error)
              $('.nf-result button',$element).on('click', function() {
                 $('.nf-result',$element).empty();
                 $element.removeClass('with-results');
                 $('form',$element).show();
              });
            },750);
          });
      };

      plugin.init();

   };

   $.fn.cxpNewsletter = function(options) {

       return this.each(function() {
           if (undefined === $(this).data('cxpNewsletter')) {
               var plugin = new $.cxpNewsletter(this, options);
               $(this).data('cxpNewsletter', plugin);
           }
       });

   };

   $('.cxp-newsletter').cxpNewsletter();

 })(jQuery);
