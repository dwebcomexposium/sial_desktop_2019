(function($) {
    $(function() {
        /* Init mobile arrows */
        $('.list-articles.block.block-page.prix-inno').each(function() {
            var block = $(this);
            var slider = block.find('.list-grids-with-pagin');
            if (slider.length) {
                $('<div class="prix-inno__progressbar custom_generic_progressBar" />').appendTo(block);
                block.append($('<div class="prix-inno__arrows-container"><span class="arrow left"></span><span class="arrow right"></span></div>'));
            }
        });
        refreshBlockSlider();
        $(window).on('resizeend', refreshBlockSlider);
    });
    /* Init on Mobile, destroy on desktop */    function refreshBlockSlider() {
        var isMobile = function() {
            if ($('body').hasClass('body-mobile') || window.matchMedia('(max-width:1023px)').matches) {
                return true;
            } else {
                return false;
            }
        };
        $('.list-articles.block.block-page.prix-inno').each(function() {
            var block = $(this);
            var slider = block.find('.list-grids-with-pagin');
            if (slider.length) {
                var isInit = slider.hasClass('swiper-container-initialized');
                if (isMobile()) {
                    if (!isInit) {
                        var SwiperSlider = new Swiper(slider.get(0), {
                            slidesPerView: 'auto',
                            loop: false,
                            effect: 'slide',
                            spaceBetween: 30,
                            pagination: {
                                el: block.find('.custom_generic_progressBar').get(0),
                                type: 'progressbar'
                            },
                            wrapperClass: 'grid-la-list',
                            slideClass: 'gla-item',
                            slideActiveClass: 'is-active',
                            allowTouchMove: true,
                            initialSlide: 0,
                            centeredSlides: true,
                            watchSlidesProgress: true,
                            watchSlidesVisibility: true,
                            navigation: {
                                nextEl: block.find('.prix-inno__arrows-container .arrow.right').get(0),
                                prevEl: block.find('.prix-inno__arrows-container .arrow.left').get(0)
                            },
                            breakpoints: {
                                480: {
                                    centeredSlides: false
                                }
                            }
                        });
                    }
                } else {
                    if (isInit) {
                        slider.get(0).swiper.destroy();
                    }
                }
            }
        });
    }
})(jQuery);
//# sourceMappingURL=block-prix-inno.js.map