/**
 * Exhibitors slider Block
 * @requires Swiper
 */
(function($) {
    $(function() {
        // create navigation buttons
        var sliderButtonContainer = $('<div class="exhibitors-slider__btn__container" />');
        var sliderButtonPrev = $('<button type="button" class="exhibitors-slider__btn exhibitors-slider__btn--prev" />');
        var sliderButtonNext = $('<button type="button" class="exhibitors-slider__btn exhibitors-slider__btn--next" />');
        sliderButtonContainer.append([ sliderButtonPrev, sliderButtonNext ]);
        $('.exhibitors-slider__header').append(sliderButtonContainer);
        // add carrousel progressbar
                var progressBar = $('<div class="exhibitors-slider__progressbar" />').appendTo('.exhibitors-slider');
        // attach and config swiper
                var exhibitorsSlider = new Swiper('.exhibitors-slider', {
            slidesPerView: 'auto',
            loop: false,
            isAutoplay: false,
            useActiveClasses: false,
            wrapperClass: 'catal-ex',
            slideClass: 'catal-ex-item',
            navigation: {
                prevEl: '.exhibitors-slider__btn--prev',
                nextEl: '.exhibitors-slider__btn--next',
                disabledClass: 'visually-hidden'
            },
            pagination: {
                el: '.exhibitors-slider__progressbar',
                type: 'progressbar'
            }
        });
    });
})(jQuery);
//# sourceMappingURL=exhibitors-slider.js.map