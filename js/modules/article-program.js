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
        if ($('body').hasClass('article-program') || $('body').hasClass('article-node1310667')) {
            var subtitleClone = $('.article-intro > p').clone();
            $('.article-title .at-content').append(subtitleClone);
            calculateSocialSharingPos();
            $(window).resize(function() {
                calculateSocialSharingPos();
            });
        }
    });
})(jQuery);
//# sourceMappingURL=article-program.js.map