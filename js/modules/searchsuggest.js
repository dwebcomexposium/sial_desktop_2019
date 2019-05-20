/**!
 Search Suggest
 Recherche suggestive

 @contributors: Rodolphe (Alsacréations)
 @date-created: 2016-01-20
 */

;
(function($) {

	$.cxpSearchSuggest = function(el, options) {

		var defaults = {
			remoteurl:'',
			minimumInputLength:3, // minimum number of characters for input to be sent
			timeoutSuggest:250, // minimum delay timeout before sending input (between keys) (milliseconds)
			inputField:null // input element
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
			for (var dat in data)
				plugin.settings[dat] = data[dat];
		};

		// Event Handlers on HTML components inside the plugin
		var registerEvents = function() {

			// Autocomplete/autosuggest
			plugin.settings.remoteurl = $element.data('target');
			plugin.settings.inputField = $element.find('.gsf-input');

			// Text input
			plugin.settings.inputField.on('keyup', function(e) {
				clearTimeout(plugin.timeoutSuggestDo);
				var that = $(this); // closure
				plugin.timeoutSuggestDo = setTimeout(function() {
					autoSuggest(that);
				},plugin.settings.timeoutSuggest);
			});

			// Make disappear when click outside
			$('body').on('click', closeSuggest);

			// Close on ESC key
			$('body').on('keyup', function(e) {
				if(e.keyCode==27)	closeSuggest();
			});

			// Submit form with query keyword(s) if suggest clicked
			$element.on('click', '[data-query]', function(e) {
				var query = $(this).data('query');
				if(query!==undefined) {
					plugin.settings.inputField.val(query);
					$element.closest('form').trigger('submit');
				}
				e.preventDefault();
			});

		}; // End of registerEvents

		// Do an autocomplete search
		var autoSuggest = function($elem) {

			var val = $elem.val();

			// Do not send request if chars limit not reached or if previous value
			if(val.length < plugin.settings.minimumInputLength || val==plugin.previousSuggest) return;

			// If remote url is set, do json XHR
			if(plugin.settings.remoteurl) {
				plugin.previousSuggest = val;
				$.getJSON(plugin.settings.remoteurl+val, function(json) {
					if(json) {
						autoSuggestUpdate($elem,json,val);
					}
				});
			}

		};

		var autoSuggestUpdate = function($elem,json,val) {

			// Populate HTML with JSON contents
			var contents = '';
			if(json) {
				$.each(json, function(key,values) {
					if(key && values.length>0) {
						contents += '<div class="tt-dataset"><div class="typeahead-section-name">'+key+'</div><div class="tt-suggestions">';
						$.each(values, function() {
							var re = RegExp(val, 'gi');
							var text = this.title.replace(re,'<strong class="tt-highlight">'+val+'</strong>');
							contents += '<div class="tt-suggestion"><p>';
							if(this.url) contents += '<a href="'+this.url+'">';
							else if(this.query) contents += '<a href="#" data-query="'+this.query+'">';
							if(this.image) contents += '<span class="tt-suggest-img"><img src="'+this.image+'" alt="" width="31" height="31"></span>'; else contents += '<span class="tt-suggest-img"></span>';
							contents += '<span class="tt-suggest-text">'+text+'</span>';
							if(this.url || this.query) contents += '</a>';
							contents += '</p></div>';
						});
						contents += '</div></div>';
					}
				});
			}

			// Insert contents in dropdown if exists, or creates it
			if($elem.next('.tt-dropdown-menu').length<1) {
				var textintro = $elem.data('suggestion-text');
				if(textintro===undefined) textintro = '';
				$elem.after('<div class="tt-dropdown-menu"><div class="tt-text-intro">'+textintro+'</div><div class="tt-dropdown-contents">'+contents+'</div></div>');
			} else {
				$elem.next('.tt-dropdown-menu').find('.tt-dropdown-contents').html(contents);
			}

		};

		// Close the search form
		var closeSuggest = function() {
			plugin.settings.inputField.next('.tt-dropdown-menu').remove();
		};

		plugin.init();

	};

	$.fn.cxpSearchSuggest = function(options) {

		return this.each(function() {
			if (undefined === $(this).data('cxpSearchSuggest')) {
				var plugin = new $.cxpSearchSuggest(this, options);
				$(this).data('cxpSearchSuggest', plugin);
			}
		});

	};

	$('.cxp-searchsuggest').cxpSearchSuggest();

})(jQuery);
