(function($) {
    $(function() {
        if ($('body').hasClass('detail-actu')) {
            var intro = $('.article-title + .article-intro > p');
            if (intro.length) {
                $('.article-title .at-content h1').after(intro);
            }
        }
    });
})(jQuery);
//# sourceMappingURL=details-actualite.js.map