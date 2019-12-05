/**
 * Meet buyers Block
 * @requires Swiper
 */
(function($) {
    $(function() {
        $('.meet-buyers').each(function(i, item) {
            var block = $(item);
            var container = block.find('.meet-buyers__list__wrapper');
            $('<div class="meet-buyers__progressbar custom_generic_progressBar" />').appendTo(block);
            // attach and config swiper
                        var exhibitorsSlider = new Swiper(container[0], {
                slidesPerView: 'auto',
                wrapperClass: 'meet-buyers__list',
                slideClass: 'meet-buyers__item',
                watchOverflow: true,
                centeredSlides: true,
                pagination: {
                    el: block.find('.meet-buyers__progressbar').get(0),
                    type: 'progressbar'
                },
                breakpoints: {
                    480: {
                        centeredSlides: false,
                        spaceBetween: 0
                    }
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
//# sourceMappingURL=meet-buyers.js.map