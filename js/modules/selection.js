/**!
 Selection
 Add to selection module

 @contributors: Rodolphe (Alsacréations)
 @date-created: 2015-05-13
 @last-update: 2015-05-13
 */

(function($) {

  $.cxpAddToSelection = function(el, options) {

    var defaults = {
      action: '', // action of the button/link, "add" or "remove"
      modaltarget: false // modal element to display messages
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
      // Quick add for modal confirm
      $element.data('modaltarget', '#addtoselection-modal');
      var data = $element.data();
      for (var dat in data)
        plugin.settings[dat] = data[dat];
    };

    // Event Handlers on HTML components inside the plugin
    var registerEvents = function() {
      $element.addClass('modalopen');
      $element.on('click', function(e) {
        e.preventDefault();
        if (plugin.settings.action == 'add')
          plugin.addToSelection();
        else if (plugin.settings.action == 'remove')
          plugin.removeFromSelection();
      });
    };

    // Add item to selection
    plugin.addToSelection = function() {
      // @PROD : add here code to add item to selection (for ex : AJAX request)
      // @PROD : item ID is stored in plugin.settings.itemid

      // Display confirmation message
      $('.modal-text', $(plugin.settings.modaltarget)).text(plugin.settings.addmodaltxt);

      // Switch to remove button
      $element.data('action', 'remove');
      plugin.settings.action = 'remove';
      $('.icon', $element).removeClass('icon-plusdisk').addClass('icon-minus');
      $('span', $element).text(plugin.settings.removetxt);
    };

    // Remove from selection
    plugin.removeFromSelection = function() {
      // @PROD : add here code to remove item from selection (for ex : AJAX request)
      // @PROD : item ID is stored in plugin.settings.itemid

      // Display confirmation message
      $('.modal-text', $(plugin.settings.modaltarget)).text(plugin.settings.removemodaltxt);

      // Switch to add button
      $element.data('action', 'add');
      $('.icon', $element).removeClass('icon-minus').addClass('icon-plusdisk');
      plugin.settings.action = 'add';
      $('span', $element).text(plugin.settings.addtxt);
    };

    plugin.init();

  };

  $.fn.cxpAddToSelection = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('cxpAddToSelection')) {
        var plugin = new $.cxpAddToSelection(this, options);
        $(this).data('cxpAddToSelection', plugin);
      }
    });

  };

  $('.cxp-addtoselection').cxpAddToSelection();

})(jQuery);
