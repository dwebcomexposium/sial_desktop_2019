/**
 * Article wrapper Block
 * @requires Swiper
 */
(function($) {
    $(function() {
        if (!$('body').hasClass('article')) {
            $('.article-wrapper').each(function(i, item) {
                var block = $(item);
                block.addClass('is-ready');
                var atContent = block.find('.article-content');
                var atContainer = block.find('.article-title .at-content').eq(0);
                // Move Article content inside a parent container
                                atContainer.append(atContent);
            });
        }
    });
})(jQuery);
//# sourceMappingURL=article-wrapper.js.map