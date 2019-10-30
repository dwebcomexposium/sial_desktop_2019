/**
 * Instagram slider Block
 * @requires Swiper
 * @requires inView
 */
(function($) {
    $(function() {
        // TODO: get pictures with Instagram API (ajax)
        var instaSlider = new Swiper('.insta-slider__wrapper', {
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
            }
        });
        inView('.insta-slider').on('enter', function(el) {
            $(el).addClass('is-in-viewport');
        }).on('exit', function(el) {
            $(el).removeClass('is-in-viewport');
        });
    });
})(jQuery);
//# sourceMappingURL=insta-slider.js.map