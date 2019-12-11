(function($) {
    $(function() {
        $(document).on('click', '.back-to-top', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 1500);
        });
    });
})(jQuery);
//# sourceMappingURL=back-to-top.js.map