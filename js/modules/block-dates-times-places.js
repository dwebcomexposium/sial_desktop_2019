(function ($) {
  $(function () {
    function cardTemplate(title, content, img) {
      var titleTag = $(title).prop('outerHTML') || '';
      var contentTag = $(content).prop('outerHTML') || '';
      var imgTag = $(img).prop('outerHTML') || '';
      var html = '<figure class="card">' + imgTag + '<figcaption>' + titleTag + contentTag + '</figcaption></figure>';
      return html;
    }

    function setDivCard() {
      if ($('body').hasClass('node1316958') ) {
        var articleContentDiv = $('.article-content');
        var firstH3 = articleContentDiv.find('h3:first-of-type')[0];
        var secondH3 = articleContentDiv.find('h3:last-of-type')[0];
        var openingTimeList = articleContentDiv.find('ul')[0];
        var location = articleContentDiv.find('p:nth-of-type(4)')[0];
        var adress = articleContentDiv.find('p:nth-of-type(5)')[0];

        var secondCardContent ='<div>' + $(location).prop('outerHTML') + $(adress).prop('outerHTML') + '</div>';

        var cards = [cardTemplate(firstH3, openingTimeList), cardTemplate(secondH3, secondCardContent)];
        var elementsToHide = [firstH3, secondH3, openingTimeList, location, adress];

        $('<div class="card-wrapper"></div>').insertAfter('.article-content p.txtcenter');

        cards.forEach(function(card) {
          $('.card-wrapper').append(card);
        });

        elementsToHide.forEach(function(element) {
          $(element).hide();
        });
      }
    }
    setDivCard();
  });
})(jQuery);
