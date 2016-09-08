/**
 * Created by huzhongchun on 16/6/20.
 */

require(['book/js/public'],function(public){
    var _public = public;
    _public.setWxShareContent();

    var bookItem = $('.book-list-area .book-item');
    var len = bookItem.length;

    if(len % 2 == 0){
        $(bookItem[len-1]).addClass('last-item');
        $(bookItem[len-2]).addClass('last-item');
    }else{
        $(bookItem[len-1]).addClass('last-item');
    }
});