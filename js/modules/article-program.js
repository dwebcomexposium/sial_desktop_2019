/**
 * Article program - social sharing block placement
 */
(function($) {
    $(function() {
        var calculateSocialSharingPos = function() {
            var socialSharingDiv = $('.social-sharing')[0];
            $('.social-sharing .sr-title').text('Partager cet évènement');
            var divHeight = socialSharingDiv.getBoundingClientRect().height;
            var titleProps = $('.article-program .article-title img').offset().top;
            var topPos = parseInt(titleProps, 10) - parseInt(divHeight, 10) - 40;
            socialSharingDiv.style.top = topPos + 'px';
        };
        if ($('body').hasClass('article-program')) {
            var articlesNav = $('.article-navigation .an-item');
            var themeTag = $('.article-title .at-theme');
            var subtitleClone = $('.article-intro > p').clone();
            $('.article-title .at-content').append(subtitleClone);
            calculateSocialSharingPos();
            $(window).resize(function() {
                calculateSocialSharingPos();
            });
            if (articlesNav.length && themeTag.length) {
                articlesNav.each(function(article) {
                    var articleTitle = $(this).find('.an-item-title');
                    $(articleTitle).before(themeTag.clone());
                });
            }
        }
    });
})(jQuery);
//# sourceMappingURL=article-program.js.map