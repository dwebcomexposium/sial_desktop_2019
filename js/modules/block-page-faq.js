(function($) {
    $(function() {
        /* Removes empty html tags from Wysiwyg to prevent margin issues */
        $('body.faq .block-page.faq .fc-item-content > *').each(function() {
            if ($(this).text().trim().length === 0) {
                $(this).remove();
            }
        });
    });
})(jQuery);
//# sourceMappingURL=block-page-faq.js.map