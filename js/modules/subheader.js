/**
 * Subheader Block
 */
(function($) {
    $(function() {
        /**
     * Background image
     */
        $('.subheader__img').each(function(i, item) {
            var imgSrc = $(item).find('img').attr('src');
            $(item).css('background-image', 'url(' + imgSrc + ')');
        });
    });
})(jQuery);
//# sourceMappingURL=subheader.js.map