/**
 * Home sector Block
 */
(function($) {
    $(function() {
        new Swiper('.home-sectors .quicklinks', {
            loop: true,
            loopAdditionalSlides: 3,
            autoplay: true,
            delay: 400,
            speed: 400,
            slidesPerView: 1,
            wrapperClass: 'ql-list',
            slideClass: 'ql-item',
            centerInsufficientSlides: true,
            breakpoints: {
                480: {
                    slidesPerView: 4
                }
            }
        });
    });
})(jQuery);
//# sourceMappingURL=home-sector.js.map