/**
 * Home Search Block
 * @requires inView
 */
(function($) {
    $(function() {
        $('.home-search').each(function(i, item) {
            var block = $(item);
            block.addClass('is-ready');
            inView('.home-search .ql-item').on('enter', function(el) {
                el.classList.add('is-in-viewport');
            }).on('exit', function(el) {
                el.classList.remove('is-in-viewport');
            });
        });
    });
})(jQuery);
//# sourceMappingURL=home-search.js.map