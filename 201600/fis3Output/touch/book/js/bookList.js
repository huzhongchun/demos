require(["book/js/public"],function(t){var e=t,o=t.loading;o.init(),e.setWxShareContent({link:"http://h5.molandapp.com/mobile/thefair/library_books"}),e.initCommentStars(),$(".book-short-desc").each(function(){var t=$(this).html();$(this).html(t)}),$(".get-comment-poster").click(function(t){var e=$(this).attr("data-comment_id");t.preventDefault(),t.stopPropagation(),o.show(),$.ajax({url:"/book/comment/get_comment_poster_img",type:"get",data:{comment_id:e},dataType:"json",success:function(t){0==t.code?window.location.href="/book/comment/comment_poster?poster="+encodeURIComponent(t.result.url):alert(t.message.text),o.hide()},error:function(t){var e=JSON.parse(t.responseText);alert(e.message.text),o.hide()}})}),$(".edit-comment-btn").click(function(t){t.preventDefault(),t.stopPropagation(),window.location.href=$(this).attr("href")})});