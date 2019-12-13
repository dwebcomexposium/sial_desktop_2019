/**
 * Subheader Block
 */
(function($) {
    $(function() {
        $('.subheader').each(function(i, item) {
            var block = $(item);
            block.addClass('is-ready');
            /**
       * Background image
       */            block.find('.subheader__img').each(function(i, item) {
                var imgSrc = $(item).find('img').attr('src');
                $(item).css('background-image', 'url(' + imgSrc + ')');
            });
        });
    });
})(jQuery);
//# sourceMappingURL=subheader.js.map