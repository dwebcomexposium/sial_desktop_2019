/**
 * Video list Block
 * @requires Swiper
 */
(function($) {
    $(function() {
        $('.video-list').each(function(i, item) {
            var block = $(item);
            var container = block.find('.video-list__list__wrapper');
            $('<div class="video-list__progressbar custom_generic_progressBar" />').appendTo(block);
            // attach and config swiper
                        var videoSlider = new Swiper(container[0], {
                slidesPerView: 'auto',
                wrapperClass: 'video-list__list',
                slideClass: 'video-list__item',
                watchOverflow: true,
                pagination: {
                    el: block.find('.video-list__progressbar').get(0),
                    type: 'progressbar'
                },
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