/**
 * Article program - social sharing block placement
 */
(function ($) {
  $(function () {
    var calculateSocialSharingPos = function() {
      $('.social-sharing .sr-title').text('Partager cet évènement');
      if (isDesktopMedium) {
        var isDesktopMedium = window.matchMedia("(min-width: 1280px)")
        var socialSharingDiv = $('.social-sharing')[0];
        var divHeight = socialSharingDiv.getBoundingClientRect().height;
        var titleProps = $('.article-program .article-title img').offset().top;
        var topPos = parseInt(titleProps, 10) - parseInt(divHeight, 10) - 40;
        socialSharingDiv.style.top = topPos + 'px';
      }
    };

    if ($('body').hasClass('article-program') || $('body').hasClass('article-node1310667')) {
      var subtitleClone = $('.article-intro > p').clone();
      $('.article-title .at-content').append(subtitleClone);

      calculateSocialSharingPos();
      $(window).resize(function() {
        calculateSocialSharingPos();
      });
    }
  });
})(jQuery);
