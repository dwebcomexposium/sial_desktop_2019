/**
 * Event details page
 * @requires jQuery
 */
(function($) {
    $(function() {
        $('.page-events.page-details').each(function(i, page) {
            $page = $(page);
            // move tags type after page title
                        var header = $page.find('.catal-ex-item-buttons').eq(0).parent();
            var tagsContainer = $('<div />').addClass('evd-infos-type-container js-element');
            var tags = $page.find('.evd-infos-type').addClass('js-moved');
            header.append(tagsContainer);
            tagsContainer.append(tags);
        });
    });
})(jQuery);
//# sourceMappingURL=details-evenement.js.map