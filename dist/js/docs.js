function throttle(e,i){var n=null;return function(){var s=this,a=arguments;clearTimeout(n),n=setTimeout(function(){e.apply(s,a)},i)}}$(function(){function e(){$("#iframe").height($(window).height()-45),$(".sidebar").css("height",$(window).height()-45)}e(),$(window).resize(function(){throttle(e(),300)})}),+function(e){e.fn.nav=function(){var i=e(this),n=e("a.sidebar-toggler"),s=n.parent(),a=s.parent();return i.on("click","li > a",function(n){var s=e(this).parents("li.c-nav-li"),a=e(this).parent().parent();a.children("li.open").children("a").children(".arrow").removeClass("open"),a.children("li.open").children(".sub-ul").slideUp(200),a.children("li.open").removeClass("open");var t=e(this).next();if(t.length)t.is(":visible")?(e(".arrow",e(this)).removeClass("open"),e(this).parent().removeClass("open"),t.slideUp(200,function(){})):(e(".arrow",e(this)).addClass("open"),e(this).parent().addClass("open"),t.slideDown(200,function(){}));else{if(i.find("li.active").find("span.selected").remove().end().removeClass("active"),s.addClass("active").children("a").append('<span class="selected"></span>'),e(this).parent("li").addClass("active"),!e(this).data("src"))return;e("#iframe").find("iframe").attr("src",e(this).data("src"))}n.preventDefault()}),n.on("click",function(){a.hasClass("closed")?(n.html('<i class="iconfont">&#xe673;</i>'),i.removeClass("sidebar-closed"),a.removeClass("closed")):(n.html('<i class="iconfont">&#xe674;</i>'),i.addClass("sidebar-closed"),a.addClass("closed"))}),this},e('div[data-nav="collapse"]').nav()}(jQuery);