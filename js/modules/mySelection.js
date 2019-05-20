/**!
	mySelection

	Zero raccoon was used for testing this plugin

	@contributors: Guillaume Focheux (Alsacréations), Kaliop
	@date-created: 2015-10-09
	@last-update: 2016-03-14

	Dependency: jquery + Noty
 */

;(function ($, window, document, undefined) {

	// Create the defaults once
	var pluginName = 'mySelection',
		defaults = {
			//Options Plugin Here
		};

	// The actual plugin constructor
	function mySelection(_caller, options) {
		this._caller = _caller;
		this.$caller = $(_caller);
		//options override
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		// initialization
		this.init();
	}

	//Prototype of the object
	mySelection.prototype = {
		init: function() {
			var _self = this;
			_self.msBinding();
			return this;
		},
		msBinding: function() {
			var _self = this,
			$_self = $(_self);
			this.$caller.off('click').on('click', function(e){
				var $_this = $(this);
				switch ($_this.attr('data-action')) {
					case "add":
						_self.msAdd().msUpdate().msRebind();
						break;
					case "remove":
						_self.msRemove().msUpdate();
						break;
					default:
					//nothing to do
				}
			});

		},
		msRebind: function(){
			$('.js-mySelection').mySelection();
		},
		// action Add
		msAdd: function() {
			var _self = this,
				$_self = $(_self);
			this.$caller.closest('.catal-ex-item-buttons').addClass('is-selected');
			this.$caller.attr('data-action','remove');

			var myselection_line = '<li class="mysel-item">'+
				'<a href="'+this.$caller.data('itemlink')+'" class="mysel-item-link">'+
						'<span class="mysel-item-txt">'+this.$caller.data('itemtitle')+'</span>'+
				'</a>'+
				'<a href="#" class="mysel-item-remove js-mySelection" data-action="remove" data-itemid="'+this.$caller.data('itemid')+'" data-itemtype="'+this.$caller.data('itemtype')+'" data-target="'+this.$caller.data('target')+'" data-removenotiftxt="'+this.$caller.data('removenotiftxt')+'" title="Remove '+this.$caller.data('itemtitle')+' from My selection"><i class="icon icon-star-delete" aria-hidden="true"></i></a>'+
						'</li>';
			$(_self.$caller.data('target')).find('.mysel-'+this.$caller.data('itemtype')+' .mysel-list').prepend(myselection_line);
			_self.msNotif(this.$caller.data('addnotiftxt'));
			return this;
		},
		// action Remove
		msRemove: function() {
			var _self = this,
			$_self = $(_self),
			$allButton = $('[data-itemid="'+ this.$caller.data('itemid')+'"]');

			$allButton.each(function(e){
				$_this = $(this);
				$parent = $_this.parents('.myselection-list');
				if ($parent.length) {
					var $group = $_this.parents('.catal-ed-group, .msl-pane'), // #11151 adding .msl-pane
						$item = $_this.parents('.catal-ex-item, .msl-brand, .msl-event'), // #11151 adding .msl-brand and .msl-event so it can be removed in "selection list" (.msl-exhibitor and .msl-product already have .catal-ex-item)
						$number = $group.find('.qty-round-nb'),
						$bigTitle = $('.mysel-cata-title-container'),
						paneIndex = $_this.parents('.msl-pane').index() - 1, // -1 because ul.msl-tabs-list is also a sibling - #11150
						$tab = $('.msl-tabs-list').find('.msl-tabs-item').eq(paneIndex).find('.qty-round-nb'); // #11150
						titleId = $group.find('.catal-ed-activity-main-title').prop('id'),
						$sidebarLink = $('.catal-nav-affix-list').find('[href=#'+titleId+']')	;
					$item.remove();
					if ($group.length && $number.length) {
						var numberOld = $number.html(),
								numberNow = numberOld - 1;
						$number.html(numberNow);
					}
					// Update bigTitle number (ex: heading H1 in catalogue selection list and mobile catalogue myselection list)
					$bigTitle.find('.qty-round-nb').html( parseInt( $bigTitle.find('.qty-round-nb').html() ) - 1 );
					// #11150 Update value in corresponding tab in mobile catalogue myselection list
					$tab.html( parseInt( $tab.html() ) - 1 );
					//Update sidebar part number
					$sidebarLink.find('.qty-round-nb').html( parseInt( $sidebarLink.find('.qty-round-nb').html() ) - 1 );

				} else {
					if( $(this).hasClass('mysel-item-remove')){
 						$(this).closest('.mysel-item').remove();
					} else {
						$(this).closest('.catal-ex-item-buttons').removeClass('is-selected');
						$(this).attr('data-action','add');
					}
				}
			});
			_self.msNotif(this.$caller.data('removenotiftxt'));
			return this;
		},// toggle
		// launch a notif
		msNotif: function(message) {

			var notif = noty({
				layout: 'topRight',
				theme: 'relax',
				type: '',
				text: message, // can be html or string
				dismissQueue: true, // If you want to use queue feature set this true
				template: '<div class="catal-ex-notif-container noty_message"><span class="catal-ex-notif-txt noty_text"></span><button class="catal-ex-notif-close-btn"><i class="icon icon-cross noty_close" aria-hidden="true"></i></button></div>',
				animation: {
						open: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceInLeft'
						close: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceOutLeft'
						easing: 'swing',
						speed: 500 // opening & closing animation speed
				},
				timeout: 1500, // delay for closing event. Set false for sticky notifications
				maxVisible: 7, // you can set max visible notification for dismissQueue true option,
				closeWith: ['click'] // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
			});

		},
		msUpdate: function(e) {
			var _self         = this,
				$_self        = $( _self ),
				container     = $( _self.$caller.data('target') ),
				totalElement  = _self.msTitleUpdate(container),
				totalExposant = _self.msPartTitleUpdate( $('.mysel-exposant', container) ),
				totalBrand    = _self.msPartTitleUpdate( $('.mysel-brand', container) ),
				totalProduct  = _self.msPartTitleUpdate( $('.mysel-product', container) );
				totalEvent    = _self.msPartTitleUpdate( $('.mysel-event', container) );

			_self.msCalcVisibility(totalElement, totalExposant, totalBrand, totalProduct, totalEvent);
			return this;
		},
		msTitleUpdate: function($elem) {
			var nbItems = $elem.find('.mysel-item').length,
				$containerModalTitle = $('.mysel-modal-title');
			$elem.find('.mysel-title .qty-round-nb').html( nbItems );

			// If there's a modal (mobile)
			if( $containerModalTitle.length !== 0 ) {
				$containerModalTitle.find('.qty-round-nb').html( nbItems );
			}

			return nbItems;
		},
		msPartTitleUpdate: function($elem) {
			$elem.find('.qty-round-nb').html($elem.find('.mysel-item').length);
			if( $elem.find('.mysel-item').length === 0 ){
				$elem.hide();
			} else {
				$elem.show();
			}
			return $elem.find('.mysel-item').length;
		},
		msCalcVisibility: function(totalElement, totalExposant, totalBrand, totalProduct, totalEvent) {
			// console.log('Calculation in progress...');
			var _self     = this,
				$_self    = $(_self),
				container = $(_self.$caller.data('target')),
				$exposantContainer = $('.mysel-exposant', container),
				$brandContainer    = $('.mysel-brand', container),
				$productContainer  = $('.mysel-product', container),
				$eventContainer    = $('.mysel-event', container), // #11181 - Taking events also in account
				nbExposantVisible  = 0,
				nbBrandVisible     = 0,
				nbProductVisible   = 0,
				nbEventVisible     = 0;

			// No more than 6 items (exhibitor, brand and product) will be displayed.
			// Display of events is coded afterward, their rules of display are: display 2 of them max
			// Example: from 1+2+8 items, only 1+2+3 will be displayed
			if( totalExposant > 1 && totalBrand > 1 && totalProduct > 1 ) {
				nbExposantVisible		= 2;
				nbBrandVisible			= 2;
				nbProductVisible		= 2;
			} else {
				if( totalExposant < 3 &&  totalBrand < 3  &&  totalProduct < 3 ) {
					nbExposantVisible	=  totalExposant;
					nbBrandVisible		=  totalBrand;
					nbProductVisible	= totalProduct;
				} else {
					var bonus = 0,
					iterate = 0;
					// define the bonus
					if( totalExposant < 2 ) {
						nbExposantVisible = totalExposant;
						bonus += 2 - totalExposant;
					} else {
						nbExposantVisible = 2;
					}
					if( totalBrand < 2 ) {
						nbBrandVisible = totalBrand;
						bonus += 2 - totalBrand;
					} else {
						nbBrandVisible = 2;
					}
					if( totalProduct < 2 ) {
						nbProductVisible = totalProduct;
						bonus += 2 - totalProduct;
					} else {
						nbProductVisible = 2;
					}
					while( bonus > 0 && iterate !== 6) {
						if( totalExposant > 2 && nbExposantVisible != totalExposant && bonus > 0) {

							nbExposantVisible++ ;
							bonus = bonus-1;
						}
						if( totalBrand > 2 && nbBrandVisible != totalBrand && bonus > 0) {
							//console.log('brand +1' );
							nbBrandVisible++ ;
							bonus = bonus-1;
						}
						if( totalProduct > 2 && nbProductVisible != totalProduct && bonus > 0) {
							//console.log('product +1' );
							nbProductVisible++ ;
							bonus = bonus-1;
						}
						iterate++;
						if( iterate === 6 ) {
							break;
						}
					}
				}
				// Number of events displayed: see rules above (I don't trust totalElement being the sum of the 3 types Ex+P+B)
				var total3Types = totalExposant + totalProduct + totalBrand;
				if ( total3Types >= 5) {
					// No more than 2 events displayed
					nbEventVisible = Math.max(2, totalEvent);
				} else {
					// A total of up to 6 items (Events included)
					// 4 (3 types) => up to 2 events
					// 3 (3 types) => up to 3 events
					// 2 (3 types) => up to 4 events
					// 1 (3 types) => up to 5 events
					// 0 (3 types) => up to 6 events
					nbEventVisible = Math.max(6 - total3Types, totalEvent);
				}
			}

			$('.mysel-item',$exposantContainer).removeClass('js-visible').removeClass('js-no-border');
			$('.mysel-item:nth-child(-n+'+nbExposantVisible+')',$exposantContainer).addClass('js-visible').last().addClass('js-no-border');
			$('.mysel-item',$brandContainer).removeClass('js-visible').removeClass('js-no-border');
			$('.mysel-item:nth-child(-n+'+nbBrandVisible+')',$brandContainer).addClass('js-visible').last().addClass('js-no-border');
			$('.mysel-item',$productContainer).removeClass('js-visible').removeClass('js-no-border');
			$('.mysel-item:nth-child(-n+'+nbProductVisible+')',$productContainer).addClass('js-visible').last().addClass('js-no-border');
			// Events: hiding them, then showing desired number
			$('.mysel-item',$eventContainer).removeClass('js-visible').removeClass('js-no-border');
			$('.mysel-item:nth-child(-n+'+nbEventVisible+')',$eventContainer).addClass('js-visible').last().addClass('js-no-border');
		},
	};

	// Instanciate the plugin and put it in a variable
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, pluginName)) {
				$.data(this, pluginName, new mySelection(this, options));
			}
		});
	};
	if( $('.js-mySelection').length > 0){
		$('.js-mySelection').mySelection();
	}

	// #11784: [Catalogue] Ajout à la sélection KO après une recherche affinée
	// Added by demand of Kaliop
	// We want the function public
	if (typeof(window.comexposium) != 'undefined') {
		window.comexposium.active = {
			mySelection: mySelection
		};
	}

})(jQuery, window, document);
