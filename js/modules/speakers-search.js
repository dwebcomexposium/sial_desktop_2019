/**
 * Speakers Search Block
 */
(function($) {
    $(function() {
        if ($('body').find('.js__speakers-search')) {
            var items = $('.cl-item');
            $('#submit-search').click(function() {
                var searchVal = $('#speakersSearch').val();
                if (searchVal != '') {
                    $(items).addClass('is__hidden');
                    $(items).filter(function(index) {
                        var title = $(items[index]).find('div.cl-item-title').text().trim();
                        var hasValue = title.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0 || title.toLowerCase() == searchVal.toLowerCase();
                        return hasValue;
                    }).removeClass('is__hidden');
                } else {
                    $(items).removeClass('is__hidden');
                }
            });
        }
    });
})(jQuery);
//# sourceMappingURL=speakers-search.js.map