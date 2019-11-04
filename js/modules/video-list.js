/**
 * Video list Block
 * @requires Swiper
 */
(function($) {
    $(function() {
        $('.video-list').each(function(i, item) {
            var block = $(item);
            // attach and config swiper
                        var videoSlider = new Swiper('.video-list__list__wrapper', {
                slidesPerView: 'auto',
                wrapperClass: 'video-list__list',
                slideClass: 'video-list__item',
                watchOverflow: true,
                on: {
                    init: function() {
                        block.addClass('is-ready');
                    }
                }
            });
        });
    });
})(jQuery);
//# sourceMappingURL=video-list.js.map