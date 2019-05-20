
/**!
 History
 Stores id of items seen in pages to get a past history

 @contributors: Rodolphe (Alsacréations)
 @date-created: 2015-11-25
 @last-update: 2016-05-06
 */

(function($) {

  // Test if support
  if(!window.localStorage || !JSON.parse) return false;

  $.cxpHistory = function(el, options) {

    var defaults = {
      storageKey:'history',
      maxItems:10,
      historyItem:'.js-history-item',
      historyContainer:'.js-history-container',
      url:'dev/ajax/history.php', // default URL
      clearButton:'.js-history-clear'
    };

    var plugin = this;

    plugin.settings = {};

    var $element = $(el),
      element = el;

    // Plugin initialization
    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      updateSettingsFromHTMLData();
      plugin.storeCurrentIntoHistory();
      plugin.loadHistoryIntoContent();
      registerEvents();
    };

    // Reads plugin settings from HTML data-* attributes (camelCase)
    var updateSettingsFromHTMLData = function() {
      var data = $element.data();
      for(var dat in data) plugin.settings[dat] = data[dat];
    };

    // Event Handlers on HTML components inside the plugin
    var registerEvents = function() {
      plugin.$container = $(plugin.settings.historyContainer);
      plugin.$container.find(plugin.settings.clearButton).on('click',plugin.clearHistory);
    };

    // Store current id & type into history
    plugin.storeCurrentIntoHistory = function() {
      var now = new Date().getTime(); // Timestamp
      $element.find(plugin.settings.historyItem).each(function() {
        var json = null;
        var itemExists = false;
        var data = $(this).data();
        var historyData = window.localStorage.getItem(plugin.settings.storageKey);
        if(historyData!==null) { // Is there already some data ?
          json = JSON.parse(historyData);
          if(Array.isArray(json[data.historyType])) {
            // Delete last item(s) if > maxItems
            while(json[data.historyType].length>=plugin.settings.maxItems) {
              json[data.historyType].pop();
            }
          } else {
            // json = {};
            json[data.historyType] = [];
          }
          // Insert ID at the beginning of the array if needed
          for(i=0;i<json[data.historyType].length;i++) {
            if(json[data.historyType][i].id==data.historyId) itemExists = true;
          }
          if(!itemExists) { // If not exists
            json[data.historyType].unshift({id:data.historyId,ts:now});
          }
        } else { // New object
          json = {};
          json[data.historyType] = [{id:data.historyId,ts:now}];
        }
        if(json) window.localStorage.setItem(plugin.settings.storageKey,JSON.stringify(json));
      });
    };

    // Load contents from server with local history
    plugin.loadHistoryIntoContent = function() {
      plugin.$container = $(plugin.settings.historyContainer);
      if(plugin.$container) {
        // Get history from localStorage
        var historyData = window.localStorage.getItem(plugin.settings.storageKey);
        // Get URL to load from html attributes (if not, fallback to plugin settings)
        var url = plugin.$container.data('url');
        if(url===undefined) url = plugin.settings.url;
        // Construct object to send to server (POST)
        var objAjax = {history:JSON.parse(historyData)};
        // AJAX Load HTML response into container
        if(historyData!==null) plugin.$container.find('.js-content').load(url,objAjax, function() {
          // Update counter
          var cnt = $(this).find('.hist-item').length;
          plugin.$container.find('.qty-round-nb').text(cnt);
          plugin.$container.find(plugin.settings.clearButton).on('click',plugin.clearHistory);
        });
      }
    };

    // Clear all data of the history and empty the content box
    plugin.clearHistory = function(e) {
      window.localStorage.removeItem(plugin.settings.storageKey);
      plugin.$container.find('.js-content, .hist-close-btn').empty();
      plugin.$container.find('.qty-round-nb').text(0);
      plugin.$container.find('.modal').remove();
      e.preventDefault();
    };

    plugin.init();

  };

  $.fn.cxpHistory = function(options) {

    return this.each(function() {
      if (undefined === $(this).data('cxpHistory')) {
        var plugin = new $.cxpHistory(this, options);
        $(this).data('cxpHistory', plugin);
      }
    });

  };

  $('.cxp-history').cxpHistory();

})(jQuery);
