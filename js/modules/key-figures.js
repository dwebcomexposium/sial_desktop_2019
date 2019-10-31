/**
 * Key figures Block
 * @requires inView
 */
(function($) {
    $(function() {
        $('.key-figures').addClass('is-ready');
        inView('.key-figures').on('enter', function(el) {
            el.classList.add('is-in-viewport');
        }).on('exit', function(el) {
            el.classList.remove('is-in-viewport');
        });
    });
})(jQuery);
//# sourceMappingURL=key-figures.js.map