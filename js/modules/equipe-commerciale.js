/**
 * Equipe commerciale
 * @requires jQuery
 */
(function($) {
    $(function() {
        var dataJobTitle = 'data-job-title';
        function isUnique(array) {
            return $.grep(array, function(el, index) {
                return index === $.inArray(el, array);
            });
        }
        function getJobTitles(parent, childClasse, jobTitleClasse) {
            var tmpArray = [];
            var childs = parent.find(childClasse);
            childs.each(function(index) {
                tmpArray.push($(this).find(jobTitleClasse).text());
            });
            return isUnique(tmpArray);
        }
        function filterDivs(parent, childSelector, keySelector, value) {
            return parent.find(keySelector).filter(function() {
                return $(this).text() == value;
            }).closest(childSelector);
        }
        function sortDivs(parent, childSelector, keySelector, orderArray) {
            $.each(orderArray, function(_, value) {
                filterDivs(parent, childSelector, keySelector, value).attr(dataJobTitle, value).appendTo(parent);
            });
        }
        function hideDuplicate(parent, childSelector, keySelector, array) {
            $.each(array, function(_, value) {
                filterDivs(parent, childSelector, keySelector, value).remove();
            });
        }
        function applyCss(parent, array) {
            $.each(array, function(_, jobTitle) {
                var childs = parent.find('.cl-item[' + dataJobTitle + '="' + jobTitle + '"]');
                cssLoop(childs);
            });
        }
        function cssLoop(divs) {
            var len = divs.length > 4 ? 4 : divs.length;
            for (var i = 0; i < len; i += 1) {
                if (i === 0) {
                    $(divs[i]).addClass('has__firstJobTitle');
                } else {
                    $(divs[i]).addClass('has__borderTop');
                }
            }
            $(divs[divs.length - 1]).after('<div class="break">');
        }
        if ($('body').hasClass('node1309141')) {
            var teamContent = $('.cl-content').first();
            var topContent = $('.cl-content').last();
            var jobTitlesArray = getJobTitles(teamContent, '.cl-item', '.cl-item-subtitle');
            var topTitlesArray = getJobTitles(topContent, '.cl-item', '.cl-item-subtitle');
            topTitlesArray.forEach(function(title) {
                var titleIsInArray = $.inArray(title, jobTitlesArray);
                if (titleIsInArray !== -1) {
                    jobTitlesArray.splice(titleIsInArray, 1);
                }
            });
            sortDivs(teamContent, '.cl-item', '.cl-item-subtitle', jobTitlesArray);
            hideDuplicate(teamContent, '.cl-item', '.cl-item-subtitle', topTitlesArray);
            applyCss(teamContent, jobTitlesArray);
        }
    });
})(jQuery);
//# sourceMappingURL=equipe-commerciale.js.map