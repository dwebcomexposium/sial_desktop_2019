/* Inspired from https://codepen.io/jnowland/pen/AifjK */
(function($) {
    $(function() {
        nthLine();
        $(window).on('resizeend load', nthLine);
    });
    function nthLine() {
        $('.nth-line').each(function() {
            var content = $(this).text();
            var words = content.split(" ");
            var cache = words[0];
            var lines = [];
            $(this).parent().append($(this).clone().attr('id', 'nthline-sample').empty().append(words[0]));
            var size = $('#nthline-sample').height();
            var newSize = size;
            for (var i = 1; i < words.length; i++) {
                var sampleText = $('#nthline-sample').html();
                cache = cache + ' ' + words[i];
                $('#nthline-sample').html(sampleText + ' ' + words[i]);
                newSize = $('#nthline-sample').height();
                if (size !== newSize) {
                    cache = cache.substring(0, cache.length - (words[i].length + 1));
                    lines.push(cache);
                    cache = words[i];
                    size = $('#nthline-sample').height();
                }
            }
            lines.push(cache);
            cache = '';
            for (var j = 0; j < lines.length; j++) {
                cache = cache + ' <span class="line line-' + [ j ] + '">' + lines[j] + '</span>';
            }
            $('#nthline-sample').remove();
            cache = cache.substring(1);
            $(this).html(cache);
        });
    }
})(jQuery);
//# sourceMappingURL=nth-line.js.map