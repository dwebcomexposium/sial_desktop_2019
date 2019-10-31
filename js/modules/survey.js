/**!
 Survey
 Survey module with AJAX post

 @contributors: Rodolphe (Alsacréations)
 @date-created: 2015-04-28
 @last-update: 2015-04-28
 */

(function($) {

  $.cxpSurvey = function(el, options) {

    var defaults = {
      surveyPostUrl: '' // URL to post results
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

      //btn-disable by default if no checked
      if ($element.find(':checked').length === 0) {
        $element.find('button').addClass('btn-disabled').attr('disabled', true);
      }
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for (var dat in data)
        plugin.settings[dat] = data[dat];
    };

    // Event Handlers on HTML components inside the plugin
    var registerEvents = function() {
      $('.btn-primary', $element).on('click', function(e) {
        e.preventDefault();
        plugin.postData();
      });
      $($element).on('click', function(e) {
        if ($element.find(':checked').length === 0) {
          $element.find('button').addClass('btn-disabled').attr('disabled', true);
        } else {
          $element.find('button').removeClass('btn-disabled').attr('disabled', false);
        }
      });
    };

    // Plugin post data to server with AJAX request
    plugin.postData = function() {
      var $form = $('form', $element);
      var formData = $form.serialize();
      $form.remove();
      $element.addClass('is-loading');
      $.post(plugin.settings.surveyPostUrl, formData, function(html) {
        setTimeout(function() {
          $element.removeClass('is-loading').addClass('with-results');
          $('.sv-results', $element).html(html);
          setTimeout(function() {
            $('.sv-results .toanimate', $element).removeClass('toanimate');
          }, 100);
        }, 750);
      });
    };

    plugin.init();

  };

  $.fn.cxpSurvey = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('cxpSurvey')) {
        var plugin = new $.cxpSurvey(this, options);
        $(this).data('cxpSurvey', plugin);
      }
    });

  };

  $('.cxp-survey').cxpSurvey();

})(jQuery);
