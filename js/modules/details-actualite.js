(function($) {
    $(function() {
        if ($('body').hasClass('detail-actu')) {
            var intro = $('.article-title + .article-intro > p');
            var articlesNav = $('.article-navigation .an-item');
            var themeTag = $('.article-title .at-theme');
            if (intro.length) {
                $('.article-title .at-content h1').after(intro);
            }
            if (articlesNav.length && themeTag.length) {
                articlesNav.each(function(article) {
                    var articleTitle = $(this).find('.an-item-title');
                    $(articleTitle).before(themeTag.clone());
                });
            }
        }
    });
})(jQuery);
//# sourceMappingURL=details-actualite.js.map