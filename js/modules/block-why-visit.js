(function($) {
    $(function() {
        $('.block-custom.why-visit').each(function() {
            var prev_element = $(this).prev();
            if (prev_element.hasClass('article-title')) {
                prev_element.find('> .inside > .at-content').append($(this));
            }
        });
    });
})(jQuery);
//# sourceMappingURL=block-why-visit.js.map