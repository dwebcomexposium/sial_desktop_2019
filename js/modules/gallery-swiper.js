/**!
 Gallery Slider
 Description du module

 @contributors: Guillaume Focheux (Alsacréations)
 @date-created: 2015-04-28
 @last-update: 2015-04-29
 */

;
(function($) {

    $.cxpGallerySwiper = function(el, options) {

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
        };

        // Reads plugin settings from HTML data-* attributes (camelCase)
        var updateSettingsFromHTMLData = function() {
            var data = $element.data();
            for (var dat in data) plugin.settings[dat] = data[dat];
        };

        // Event Handlers on HTML components inside the plugin
        var registerEvents = function() {
            $element.on('click', '.gal-js-item-link', plugin.updateGallerySlider);
        };

        // Update the gallery slider
        plugin.updateGallerySlider = function(e) {

            var indexSelected = $(this).closest('.gal-js-item').index();
            var $swiper = $($element.data('swiper'));
            var cxpSwiper = $swiper.data('cxpSwiper');

            // Clear swiper content
            if (cxpSwiper) cxpSwiper.destroy();
            $('.swiper-wrapper', $swiper).empty();

            $element.children('.gal-js-item').each(function() {
                $('.swiper-wrapper', $swiper).append(plugin.generateSlide($(this)));
            });

            // Reinit swiper
            $swiper.cxpSwiper();

            setTimeout(function() { // Hack for null position
                if (indexSelected > 0) {
                  $swiper.data('cxpSwiper').disableTransitions();
                  $swiper.data('cxpSwiper').goTo(indexSelected);
                }
            }, 25);


            if ($swiper.data('resize') == 1) {
                $('.swiper-wrapper', $swiper).find('.gal-item-img').each(function(e){
                    $(this).hide();
                    $(this).load(plugin.resizeImg);
                    $(this).fadeIn(500);
                    });
            }
            e.preventDefault();
        };

        // resize all Image
        plugin.resizeImg = function() {
            var $img = $(this),
                $modal = $(this).closest('.gal-modal'),
                modalHeight = $modal.height() - parseInt($img.css('marginTop')),
                modalWidth = $modal.width(),
                imgHeight = $img[0].naturalHeight,
                imgWidth = $img[0].naturalWidth,
                contentHeight = $(this).closest('.gal-item').find('.gal-item-content').innerHeight(),
                $content = $(this).closest('.gal-item').find('.gal-item-content').first(),
                contentTop = $content.position().top,
                imgMaxHeight = modalHeight;
            if ($(this).closest('.gal-item').find('.gal-item-content').css('position') != 'absolute') {
                var contentAdditionHeight = 0;
                $(this).closest('.gal-item').find('.gal-item-content').find('> *').each(function() {
                    contentAdditionHeight += $(this).outerHeight();
                });
                contentHeight = contentHeight + contentAdditionHeight;
                imgMaxHeight = modalHeight - contentHeight;
            }

            var newHeight = 0,
                newWitdh = 0,
                ratio = 1;

            if (imgMaxHeight < imgHeight) {
                newHeight = imgMaxHeight;
                ratio = imgMaxHeight / imgHeight;
                newWidth = imgWidth * ratio;
                // Adjust for width too large
                if (newWidth > modalWidth) {
                    newHeight = (modalWidth / newWidth) * newHeight;
                    newWidth = modalWidth;
                }

            } else if (imgWidth >= modalWidth) {
                newHeight = (modalWidth / imgWidth) * imgHeight;
                newWidth = modalWidth;
                // Adjust for width too large
                if (newHeight > imgMaxHeight) {
                    newWidth = (imgMaxHeight / imgHeight) * newWidth;
                    newHeightWidth = modalHeight;
                }
            } else {
                newWidth = imgWidth;
                newHeight = imgHeight;
            }

            if( newHeight > newWidth ){
                $img.closest('.gal-item').addClass('portrait-mode');
            } else {
                $img.closest('.gal-item').addClass('landscape-mode');
            }

            $img.height(newHeight);
            $img.width(newWidth);
            $img.margin = 'auto';
        };

        plugin.generateSlide = function($elem) {
            var tplGallerySlider = '<div class="gal-item gal-js-item slider-item"> ' +
                '   <div class="gal-item-illust"><img class="gal-item-img" src="{{img-src}}" width="{{img-width}}" height="{{img-height}}" alt="{{img-alt}}"></div>' +
                '   <div class="gal-item-content">' +
                '	<p class="gal-item-copy">&copy;{{img-copy}}</p>' +
                '	<h2 class="gal-item-title"><a href="#">{{img-title}}</a></h2>' +
                '	<p class="gal-item-desc">{{img-desc}}</p>' +
                '   </div>' +
                '</div>';

            tplGallerySlider = tplGallerySlider.replace('{{img-src}}', $elem.data('imgSrc'));
            tplGallerySlider = tplGallerySlider.replace('{{img-alt}}', $elem.data('imgAlt'));
            tplGallerySlider = tplGallerySlider.replace('{{img-width}}', $elem.data('imgWidth'));
            tplGallerySlider = tplGallerySlider.replace('{{img-height}}', $elem.data('imgHeight'));
            tplGallerySlider = tplGallerySlider.replace('{{img-title}}', $elem.data('imgTitle'));
            tplGallerySlider = tplGallerySlider.replace('{{img-desc}}', $elem.data('imgDesc'));
            tplGallerySlider = tplGallerySlider.replace('{{img-copy}}', $elem.data('imgCopy'));
            return tplGallerySlider;
        };

        plugin.init();

    };

    $.fn.cxpGallerySwiper = function(options) {

        return this.each(function() {
            if (undefined === $(this).data('cxpGallerySwiper')) {
                var plugin = new $.cxpGallerySwiper(this, options);
                $(this).data('cxpGallerySwiper', plugin);
            }
        });

    };

    $('.gallery-js').cxpGallerySwiper();

})(jQuery);
