/**
 * Article program - social sharing block placement
 */
(function ($) {
  $(function () {
    var calculateSocialSharingPos = function() {
      var socialSharingDiv = $('.social-sharing')[0];
      var divHeight = socialSharingDiv.getBoundingClientRect().height;
      var titleProps = $('.article-program .article-title')[0].getBoundingClientRect();
      var topPos = parseInt(titleProps.top, 10) + (parseInt(titleProps.height) / 5) - parseInt(divHeight, 10);
      socialSharingDiv.style.top = topPos + 'px';
    };

    if ($('body').hasClass('article-program')) {
      calculateSocialSharingPos();
      window.resize(function() {
        calculateSocialSharingPos();
      });
    }
  });
})(jQuery);
