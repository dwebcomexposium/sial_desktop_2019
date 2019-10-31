/**
 * Meet buyers Block
 * @requires Swiper
 */
(function($) {
    $(function() {
        // attach and config swiper
        var exhibitorsSlider = new Swiper('.meet-buyers__list__wrapper', {
            slidesPerView: 'auto',
            wrapperClass: 'meet-buyers__list',
            slideClass: 'meet-buyers__item',
            watchOverflow: true,
            centeredSlides: true,
            breakpoints: {
                480: {
                    centeredSlides: false,
                    spaceBetween: 0
                }
            }
        });
    });
})(jQuery);
//# sourceMappingURL=meet-buyers.js.map