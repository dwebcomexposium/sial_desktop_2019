/**
 * Home sector Block
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
        $('.home-sectors').each(function(i, item) {
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
                // Move read more link outside container
                block.find('.linkid794935').appendTo(block);
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
        $('<div class="home-sectors__progressbar custom_generic_progressBar" />').appendTo(block);
        new Swiper(container[0], {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            wrapperClass: 'ql-list',
            slideClass: 'ql-item:not(.linkid794935)',
            centeredSlides: true,
            centerInsufficientSlides: true,
            watchOverflow: true,
            pagination: {
                el: block.find('.home-sectors__progressbar').get(0),
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
        block.find('.home-sectors__progressbar').remove();
    }
})(jQuery);
//# sourceMappingURL=home-sectors.js.map