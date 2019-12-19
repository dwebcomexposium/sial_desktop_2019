/**
 * Custom table
 */
(function($) {
    $(function() {
        $('table.custom-table tbody tr, table.table1 tbody tr').each(function(i, row) {
            var firstCell = $(row).find('td:first-child').eq(0);
            var otherCell = $(row).find('td').not(':first-child').data('title', firstCell.text()).attr('data-title', firstCell.text()).prop('data-title', firstCell.text());
        });
    });
})(jQuery);
//# sourceMappingURL=custom-table.js.map