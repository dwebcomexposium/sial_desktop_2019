/**
 * Article program - social sharing block placement
 */
(function ($) {
  $(function () {
    var calculateSocialSharingPos = function() {
      var socialSharingDiv = $('.social-sharing')[0];
      var divHeight = socialSharingDiv.getBoundingClientRect().height;
      var titleProps = $('.article-program .article-title img').offset().top;
      var topPos = parseInt(titleProps, 10) - parseInt(divHeight, 10);
      socialSharingDiv.style.top = topPos + 'px';
    };

    if ($('body').hasClass('article-program')) {
      calculateSocialSharingPos();
      $(window).resize(function() {
        calculateSocialSharingPos();
      });
    }
  });
})(jQuery);
