(function($) {
    $(function() {
        /* Init mobile arrows */
        $('.list-articles.block.block-page.prix-secteurs').each(function() {
            var block = $(this);
            var slider = block.find('.la-slider');
            var include_in_above_block_btn = block.next('.include_in_above_block');
            if (include_in_above_block_btn.length) {
                block.append(include_in_above_block_btn);
            }
            if (slider.length) {
                $('<div class="prix-secteurs__progressbar custom_generic_progressBar" />').appendTo(block);
                var slider_wrapper = $('<div class="prix-secteurs-slider"></div>');
                slider.wrap(slider_wrapper);
                block.find('.prix-secteurs-slider').before($('<div class="prix-secteurs__arrows-container"><span class="arrow left"></span><span class="arrow right"></span></div>'));
                var SwiperSlider = new Swiper(slider.get(0), {
                    slidesPerView: 'auto',
                    loop: false,
                    effect: 'slide',
                    spaceBetween: 30,
                    grabCursor: true,
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    pagination: {
                        el: block.find('.custom_generic_progressBar').get(0),
                        type: 'progressbar'
                    },
                    wrapperClass: 'slider-content',
                    slideClass: 'la-item',
                    slideActiveClass: 'is-active',
                    allowTouchMove: true,
                    initialSlide: 0,
                    navigation: {
                        nextEl: block.find('.prix-secteurs__arrows-container .arrow.right').get(0),
                        prevEl: block.find('.prix-secteurs__arrows-container .arrow.left').get(0)
                    }
                });
            }
        });
    });
})(jQuery);
//# sourceMappingURL=block-prix-secteurs.js.map