(function($) {
    $(function() {
        function cardTemplate(parent, title, content) {
            var titleTag = $(title).prop('outerHTML') || '';
            var contentTag = $(content).prop('outerHTML') || '';
            var html = '<figcaption>' + titleTag + contentTag + '</figcaption>';
            $(parent).addClass('card');
            $(parent).append(html);
            return parent;
        }
        function setDivCard() {
            if ($('body').hasClass('node1316958')) {
                var articleContentDiv = $('.article-content');
                var firstH3 = articleContentDiv.find('h3:first-of-type')[0];
                var secondH3 = articleContentDiv.find('h3:last-of-type')[0];
                var openingTimeList = articleContentDiv.find('ul')[0];
                var location = articleContentDiv.find('p:nth-of-type(4)')[0];
                var adress = articleContentDiv.find('p:nth-of-type(5)')[0];
                var firstCard = articleContentDiv.find('figure:first-of-type')[0];
                var secondCard = articleContentDiv.find('figure:last-of-type')[0];
                var secondCardContent = '<div>' + $(location).prop('outerHTML') + $(adress).prop('outerHTML') + '</div>';
                var cards = [ cardTemplate(firstCard, firstH3, openingTimeList), cardTemplate(secondCard, secondH3, secondCardContent) ];
                var elementsToHide = [ firstH3, secondH3, openingTimeList, location, adress ];
                $('<div class="card-wrapper"></div>').insertAfter('.article-content p.txtcenter');
                cards.forEach(function(card) {
                    $(card).appendTo('.card-wrapper');
                });
                elementsToHide.forEach(function(element) {
                    $(element).hide();
                });
            }
        }
        setDivCard();
    });
})(jQuery);
//# sourceMappingURL=block-dates-times-places.js.map