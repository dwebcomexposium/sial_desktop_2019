!function(n){n(function(){n("body.page-rubric #zone4 .block.block-page.edito.edito-custom").each(function(){if(!n(this).find("> .inside > .at-content").length){var i=n(this).find("> .inside > *:not(img)"),t=n('<div class="at-content"><div class="article-intro"></div></div>');n(this).find("> .inside").append(t),i.each(function(){n(this).is("h2")||n(this).is("h3")||n(this).is("h4")?(n(this).addClass("main-title at-main-title"),t.prepend(n(this))):t.find(".article-intro").append(n(this))})}})})}(jQuery);