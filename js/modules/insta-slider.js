/**
 * Instagram slider Block
 * @requires Swiper
 * @requires inView
 */
(function($) {
    $(function() {
        // TODO: get pictures with Instagram API (ajax)
        $('.insta-slider').each(function(i, item) {
            var block = $(item);
            var container = block.find('.insta-slider__wrapper');
            // init carrousel slider
                        var instaSlider = new Swiper(container[0], {
                loop: true,
                loopAdditionalSlides: 3,
                autoplay: true,
                delay: 400,
                speed: 400,
                slidesPerView: 2,
                wrapperClass: 'insta-slider__list',
                slideClass: 'insta-slider__item',
                centerInsufficientSlides: true,
                breakpoints: {
                    480: {
                        slidesPerView: 4
                    }
                },
                on: {
                    init: function() {
                        block.addClass('is-ready');
                    }
                }
            });
            inView('.insta-slider').on('enter', function(el) {
                $(el).addClass('is-in-viewport');
            }).on('exit', function(el) {
                $(el).removeClass('is-in-viewport');
            });
        });
    });
})(jQuery);
//# sourceMappingURL=insta-slider.js.map