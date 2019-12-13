(function($) {
    $(function() {
        if ($('body').hasClass('node1318742') || $('body').hasClass('speakers-sial')) {
            var searchField = $('.js__speakers-search');
            if (searchField.length) {
                $('.cl-content').before(searchField);
            }
        }
    });
})(jQuery);
//# sourceMappingURL=list-speakers.js.map