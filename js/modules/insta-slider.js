/**
 * Instagram slider Block
 * @requires Swiper
 * @requires inView
 */
(function($) {
    $(function() {
        var insta_blocks = $('.insta-slider');
        if (insta_blocks.length) {
            var ajaxUrl = '/theme/sial_2019_desktop_git/instagram_posts/get.php';
            var imgFolder = '/theme/sial_2019_desktop_git/instagram_posts/img/';
            if (typeof ouragan_git_folder !== 'undefined') {
                ajaxUrl = ouragan_git_folder + 'instagram_posts/get.php';
                imgFolder = ouragan_git_folder + 'instagram_posts/img/';
            }
            $.ajax({
                type: 'GET',
                url: ajaxUrl,
                crossDomain: false,
                timeout: 8e3,
                dataType: 'json'
            }).done(function(result) {
                if (typeof result === 'object' && result !== null) {
                    if (Object.keys(result).length) {
                        insta_blocks.each(function() {
                            var block = $(this);
                            for (var post in result) {
                                var id = post;
                                var link = result[post].link;
                                var img_url = imgFolder + id + '.jpg';
                                block.find('.insta-slider__list').append('<div class="insta-slider__item"><a href="' + link + '" target="_blank" rel="noopener" class="insta-slider__image__wrapper"><img class="insta-slider__image" src="' + img_url + '" alt="' + id + '"></a></div>');
                            }
                            var container = block.find('.insta-slider__wrapper');
                            var instaSlider = new Swiper(container[0], {
                                loop: true,
                                loopAdditionalSlides: 3,
                                autoplay: true,
                                delay: 400,
                                speed: 400,
                                slidesPerView: 2,
                                wrapperClass: 'insta-slider__list',
                                slideClass: 'insta-slider__item',
                                centerInsufficientSlides: true,
                                breakpoints: {
                                    480: {
                                        slidesPerView: 4
                                    }
                                },
                                on: {
                                    init: function() {
                                        block.addClass('is-ready');
                                    }
                                }
                            });
                        });
                    } else {
                        anErrorHappened();
                    }
                } else {
                    anErrorHappened();
                }
            }).fail(function() {
                anErrorHappened();
            });
        }
        inView('.insta-slider').on('enter', function(el) {
            $(el).addClass('is-in-viewport');
        }).on('exit', function(el) {
            $(el).removeClass('is-in-viewport');
        });
        function anErrorHappened() {
            insta_blocks.hide(0);
        }
    });
})(jQuery);
//# sourceMappingURL=insta-slider.js.map