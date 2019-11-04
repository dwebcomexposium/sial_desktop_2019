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
       * Background image
       */            block.find('.hero__img').each(function(i, item) {
                var imgSrc = $(item).find('img').attr('src');
                $(item).css('background-image', 'url(' + imgSrc + ')');
            });
            /**
       * Countdown
       */            block.find('.hero__counter').each(function(i, item) {
                var container = $(item);
                var nowDate = new Date();
                var endDate = new Date('2020-10-18T09:00:00');
                var counter = {
                    months: container.find('.hero__counter__number.months'),
                    days: container.find('.hero__counter__number.days'),
                    hours: container.find('.hero__counter__number.hours'),
                    minutes: container.find('.hero__counter__number.minutes'),
                    percent: container.find('.hero__counter__progressbar__inner')
                };
                var heroTimer = countdown(function(timespan) {
                    counter.months.text(timespan.months);
                    counter.days.text(timespan.days);
                    counter.hours.text(timespan.hours);
                    counter.minutes.text(timespan.minutes);
                    counter.percent.width(timespan.months * 100 / 60 + '%');
                    // at end clear the timer
                                        if (Math.sign(timespan.value) >= 1) {
                        window.clearInterval(heroTimer);
                    }
                }, endDate, countdown.MONTHS | countdown.DAYS | countdown.HOURS | countdown.MINUTES);
            });
            /**
       * Parallax
       */            var parallaxOptions = {
                speed: -2,
                center: false,
                round: false
            };
            var parallaxTitle = new Rellax('.is-ready .hero__title', parallaxOptions);
            var parallaxCounter = new Rellax('.is-ready .hero__counter', parallaxOptions);
        });
    });
})(jQuery);
//# sourceMappingURL=hero.js.map