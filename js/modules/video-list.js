/**
 * Video list Block
 * @requires Swiper
 */
(function($) {
    $(function() {
        // attach and config swiper
        var exhibitorsSlider = new Swiper('.video-list__list__wrapper', {
            slidesPerView: 'auto',
            wrapperClass: 'video-list__list',
            slideClass: 'video-list__item',
            watchOverflow: true
        });
    });
})(jQuery);
//# sourceMappingURL=video-list.js.map