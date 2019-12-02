(function($) {
    $(function() {
        $('.partner-gallery.cxp-swiper').each(function() {
            var slider = new Swiper($(this).get(0), {
                slidesPerView: 'auto',
                loop: false,
                effect: 'slide',
                centeredSlides: true,
                spaceBetween: 0,
                grabCursor: true,
                wrapperClass: 'swiper-wrapper',
                slideClass: 'slider-item',
                slideActiveClass: 'slider-item-active',
                allowTouchMove: true,
                initialSlide: Math.round(($(this).find('.slider-item').length - 1) / 2),
                autoplay: {
                    delay: 2500
                }
            });
        });
    });
})(jQuery);
//# sourceMappingURL=partners.js.map