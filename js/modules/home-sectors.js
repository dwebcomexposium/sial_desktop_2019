/**
 * Home sector Block
 * @requires Swiper
 */
(function($) {
    $(function() {
        // Move read more link outside container
        $('.home-sectors .linkid794935').appendTo('.home-sectors');
        // Add carrousel progressbar
                var progressBar = $('<div class="home-sectors__progressbar" />').appendTo('.home-sectors');
        // init carrousel slider
                var homeSectors = new Swiper('.home-sectors .quicklinks', {
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
                    $('.home-sectors').addClass('is-ready');
                }
            }
        });
        if ($(window).width() >= 768) {
            homeSectors.destroy();
        } else {
            homeSectors.update();
        }
    });
})(jQuery);
//# sourceMappingURL=home-sectors.js.map