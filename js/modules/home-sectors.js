/**
 * Home sector Block
 * @requires Swiper
 */
(function($) {
    $(function() {
        $('.home-sectors').each(function(i, item) {
            var block = $(item);
            var container = block.find('.quicklinks');
            // Move read more link outside container
                        block.find('.linkid794935').appendTo(block);
            // Add carrousel progressbar
                        var progressBar = $('<div class="home-sectors__progressbar" />').appendTo(block);
            // init carrousel slider
                        var homeSectors = new Swiper(container[0], {
                loop: true,
                slidesPerView: 'auto',
                spaceBetween: 20,
                wrapperClass: 'ql-list',
                slideClass: 'ql-item:not(.linkid794935)',
                centeredSlides: true,
                centerInsufficientSlides: true,
                watchOverflow: true,
                pagination: {
                    el: '.home-sectors__progressbar',
                    type: 'progressbar'
                },
                on: {
                    init: function() {
                        block.addClass('is-ready');
                    }
                }
            });
            if ($(window).width() >= 768) {
                homeSectors.destroy();
            } else {
                homeSectors.update();
            }
        });
    });
})(jQuery);
//# sourceMappingURL=home-sectors.js.map