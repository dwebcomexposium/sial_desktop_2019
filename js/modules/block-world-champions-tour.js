(function($) {
    $(function() {
        /* Init mobile arrows */
        $('.list-articles.block.block-page.world-champions-tour').each(function() {
            var block = $(this);
            var slider = block.find('.la-slider');
            var include_in_above_block_btn = block.next('.include_in_above_block');
            if (include_in_above_block_btn.length) {
                block.append(include_in_above_block_btn);
            }
            if (slider.length) {
                $('<div class="world-champions-tour__progressbar custom_generic_progressBar" />').appendTo(block);
                var slider_wrapper = $('<div class="world-champions-tour-slider"></div>');
                slider.wrap(slider_wrapper);
                block.find('.world-champions-tour-slider').before($('<div class="world-champions-tour__arrows-container"><span class="arrow left"></span><span class="arrow right"></span></div>'));
                var SwiperSlider = new Swiper(slider.get(0), {
                    slidesPerView: 'auto',
                    loop: false,
                    effect: 'slide',
                    grabCursor: true,
                    spaceBetween: 30,
                    wrapperClass: 'slider-content',
                    slideClass: 'la-item',
                    pagination: {
                        el: block.find('.custom_generic_progressBar').get(0),
                        type: 'progressbar'
                    },
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    slideActiveClass: 'is-active',
                    allowTouchMove: true,
                    initialSlide: 0,
                    navigation: {
                        nextEl: block.find('.world-champions-tour__arrows-container .arrow.right').get(0),
                        prevEl: block.find('.world-champions-tour__arrows-container .arrow.left').get(0)
                    }
                });
            }
        });
    });
})(jQuery);
//# sourceMappingURL=block-world-champions-tour.js.map