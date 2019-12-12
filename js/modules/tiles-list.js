/**
 * Tiles list Block
 * @requires Swiper
 * @requires jQuery.resizeEnd
 */
(function($) {
    $(function() {
        init();
        $(window).on('resizeend load', function() {
            init();
        });
    });
    function init() {
        $('.block-custom.tiles-list').each(function(i, item) {
            var block = $(item);
            var container = block.find('.quicklinks');
            if (block.hasClass('block-initialised')) {
                if (isMobile()) {
                    if (!container.hasClass('swiper-container-initialized')) {
                        initSlider(block);
                    }
                } else {
                    if (container.hasClass('swiper-container-initialized')) {
                        destroySlider(block);
                    }
                }
            } else {
                if (isMobile()) {
                    initSlider(block);
                }
            }
            block.addClass('block-initialised');
        });
    }
    function isMobile() {
        if ($('body').hasClass('body-mobile') || window.matchMedia('(max-width:768px)').matches) {
            return true;
        } else {
            return false;
        }
    }
    function initSlider(block) {
        var container = block.find('.quicklinks');
        $('<div class="tiles-list__progressbar custom_generic_progressBar" />').appendTo(block);
        new Swiper(container[0], {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            wrapperClass: 'ql-list',
            slideClass: 'tiles-list__item',
            centeredSlides: true,
            centerInsufficientSlides: true,
            watchOverflow: true,
            pagination: {
                el: block.find('.tiles-list__progressbar').get(0),
                type: 'progressbar'
            },
            on: {
                init: function() {
                    block.addClass('is-ready');
                }
            }
        });
    }
    function destroySlider(block) {
        var container = block.find('.quicklinks');
        container.get(0).swiper.destroy();
        block.find('.tiles-list__progressbar').remove();
    }
})(jQuery);
//# sourceMappingURL=tiles-list.js.map