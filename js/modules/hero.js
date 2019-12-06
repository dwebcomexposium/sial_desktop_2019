/**
 * Hero Block
 * @requires countdown
 * @requires Rellax
 * @requires Swiper
 */
(function($) {
    $(function() {
        $('.hero').each(function(i, item) {
            var block = $(item);
            block.addClass('is-ready');
            /**
       * Slider
       */            var slider = new Swiper(block.find('.hero__img__container').get(0), {
                slidesPerView: 1,
                loop: true,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                centeredSlides: false,
                spaceBetween: 0,
                grabCursor: false,
                wrapperClass: 'hero__slider__wrapper',
                slideClass: 'hero__slider__img',
                slideActiveClass: 'slider-item-active',
                allowTouchMove: false,
                initialSlide: 0,
                on: {
                    init: function() {
                        updateTxtColor(this, block);
                    },
                    slideChangeTransitionStart: function() {
                        updateTxtColor(this, block);
                    }
                }
            });
            /**
       * ProgressBar
       */            initProgressBar(block);
            /**
       * Countdown
       */            block.find('.hero__counter').each(function(i, item) {
                var container = $(item);
                if (container.find('.hero__counter__item').length) {
                    var endDate = new Date($(this).attr('data-end-date'));
                    var counter = {
                        months: container.find('.hero__counter__number.months'),
                        days: container.find('.hero__counter__number.days'),
                        hours: container.find('.hero__counter__number.hours'),
                        minutes: container.find('.hero__counter__number.minutes')
                    };
                    var heroTimer = countdown(function(timespan) {
                        counter.months.text(timespan.months);
                        counter.days.text(timespan.days);
                        counter.hours.text(timespan.hours);
                        counter.minutes.text(timespan.minutes);
                        // at end clear the timer
                                                if (Math.sign(timespan.value) >= 1) {
                            window.clearInterval(heroTimer);
                        }
                    }, endDate, countdown.MONTHS | countdown.DAYS | countdown.HOURS | countdown.MINUTES);
                }
            });
            /**
       * Parallax
       */            var parallaxOptions = {
                speed: -2,
                center: false,
                round: false
            };
            var parallaxTitle = new Rellax('.hero.is-ready .hero__title', parallaxOptions);
            var parallaxCounter = new Rellax('.hero.is-ready .hero__counter', parallaxOptions);
        });
        function initProgressBar(block) {
            var progressBar = block.find('.hero__counter__progressbar__inner');
            progressBar.css('width', 0);
            progressBar.animate({
                width: '100%'
            }, 1e4, function() {
                var slider = block.find('.hero__img__container').get(0).swiper;
                slider.slideNext();
                initProgressBar(block);
            });
        }
        function updateTxtColor(instance, block) {
            var new_slide = $(instance.slides[instance.activeIndex]);
            if (new_slide.hasClass('txt_white') || new_slide.hasClass('txt_dark')) {
                if (new_slide.hasClass('txt_white')) {
                    block.addClass('txt_white').removeClass('txt_dark');
                } else if (new_slide.hasClass('txt_dark')) {
                    block.addClass('txt_dark').removeClass('txt_white');
                } else {
                    block.removeClass('txt_white txt_dark');
                }
            }
        }
    });
})(jQuery);
//# sourceMappingURL=hero.js.map