define(['view','text!demo/sharetpl.html'], function(view, tpl){

    return Jumei.create(view,{
        onEvent: function(){
             var self = this;
             this.iscrollFlag = false;
             this.events = {
                'click .li-list': function(){

                },
            }
        },
        onCreate: function(){
            context = this;
            var data = {static:Jumei.static};
            this.elem.html(tpl);
            this.demo();
            $('#back').show();
        },
        //demo的例子
        demo: function(){
                $('#share .change-btn').on('click',function(e){
                    $('#share-text').toggleClass('height0');
                });
                //实例化组件
                var link_url = 'http://www.baidu.com';
                var share_pic = 'http://p0.jmstatic.com/mobile/act/activities/2014_11/11sharepic/share.png';
                var shareObj = Jumei.getInstance('ui.share',{
                    sinaTitle: '#聚美11.11购物狂欢节#  不止5折，大牌减才是真的减，国际知名品牌尽在聚美优品！',
                    weixinChatTitle: '聚美11.11购物狂欢节',
                    weiXinFriendTitle: '聚美11.11购物狂欢节',
                    sinaLinkUrl: link_url,
                    weiXinChatLinkUrl: link_url,
                    weiXinFriendLinkUrl: link_url,
                    sinaPic: share_pic,
                    weiXinChatPic: share_pic,
                    weiXinFriendPic: share_pic,
                    weiXinFriendContent:"不止5折，大牌减才是真的减，国际知名品牌尽在聚美优品！",
                    weiXinChatContent:"不止5折，大牌减才是真的减，国际知名品牌尽在聚美优品！"
                })
                $('#share-btn').on('click', function(){
                    shareObj.show();
                });
        },
        setTitle: function(){
            this.title('分享组件');
        }
    });
});



































