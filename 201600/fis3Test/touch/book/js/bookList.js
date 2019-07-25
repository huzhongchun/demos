/**
 * Created by huzhongchun on 16/6/20.
 */

require(['book/js/public'],function(public){
    var _public = public;
    var _loading = public.loading;
    _loading.init();

    /**
     * 设置微信分享
     */
    _public.setWxShareContent({
        link: 'http://h5.molandapp.com/mobile/thefair/library_books'
    });

    /**
     * 初始化评分的星星
     */
    _public.initCommentStars();
    

    $('.book-short-desc').each(function () {
        var content = $(this).html();//.replace(/[\n]/g, '<br>');
        $(this).html(content);
    });


    $('.get-comment-poster').click(function (e) {
        var commentId = $(this).attr('data-comment_id');
        e.preventDefault();
        e.stopPropagation();
        _loading.show();
        $.ajax({
            url: '/book/comment/get_comment_poster_img',
            type: 'get',
            data: { comment_id: commentId},
            dataType: 'json',
            success: function(data){
                if(data.code == 0){
                    window.location.href = '/book/comment/comment_poster?poster='+encodeURIComponent(data.result.url);
                }else{
                    alert(data.message.text);
                }
                _loading.hide();
            },
            error: function (e) {
                var errorObj = JSON.parse(e.responseText);
                alert(errorObj.message.text);
                _loading.hide();
            }

        });
    });



    $('.edit-comment-btn').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = $(this).attr('href');
    });
});