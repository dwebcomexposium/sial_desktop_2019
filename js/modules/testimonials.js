/**
 * TESTIMONIALS
 * @requires jQuery
 * @requires Swiper
 */
(function($) {
    $(function() {
        $('.block-custom.testimonials').each(function() {
            var block = $(this);
            var slider = block.find('.testimonials__quote__wrapper');
            var initialSlide = 2;
            if (!block.find('.testimonials__author').eq(initialSlide).length) {
                initialSlide = 0;
            }
            block.find('.testimonials__author').append('<span class="testimonials__author__indicator"></span>');
            block.find('.testimonials__author').eq(initialSlide).addClass('is-active');
            block.find('.testimonials__author__wrapper').after($('<div class="testimonials__arrows-container"><span class="arrow left"></span><span class="arrow right"></span></div>'));
            var quoteSlider = new Swiper(slider.get(0), {
                slidesPerView: 1,
                effect: 'slide',
                spaceBetween: 30,
                wrapperClass: 'testimonials__quote__list',
                slideClass: 'testimonials__quote',
                slideActiveClass: 'is-active',
                allowTouchMove: true,
                initialSlide: initialSlide,
                navigation: {
                    nextEl: block.find('.testimonials__arrows-container .arrow.right').get(0),
                    prevEl: block.find('.testimonials__arrows-container .arrow.left').get(0)
                },
                breakpoints: {
                    1024: {
                        spaceBetween: 0
                    }
                }
            });
            quoteSlider.on('slideChange', function() {
                $(slider.get(0).swiper.$el).closest('.testimonials').find('.testimonials__author__wrapper .testimonials__author').removeClass('is-active').eq(slider.get(0).swiper.activeIndex).addClass('is-active');
            });
            block.find('.testimonials__author').on('click', function(e) {
                e.preventDefault();
                slider.get(0).swiper.slideTo($(this).index());
            });
        });
    });
})(jQuery);
//# sourceMappingURL=testimonials.js.map