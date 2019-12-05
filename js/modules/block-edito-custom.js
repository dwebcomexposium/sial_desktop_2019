(function($) {
    $(function() {
        $('body.page-rubric #zone4 .block.block-page.edito.edito-custom').each(function() {
            if (!$(this).find('> .inside > .at-content').length) {
                var all_elems_except_img = $(this).find('> .inside > *:not(img)');
                var at_content = $('<div class="at-content"><div class="article-intro"></div></div>');
                $(this).find('> .inside').append(at_content);
                all_elems_except_img.each(function() {
                    if ($(this).is('h2') || $(this).is('h3') || $(this).is('h4')) {
                        $(this).addClass('main-title at-main-title');
                        at_content.prepend($(this));
                    } else {
                        at_content.find('.article-intro').append($(this));
                    }
                });
            }
        });
    });
})(jQuery);
//# sourceMappingURL=block-edito-custom.js.map