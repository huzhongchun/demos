document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    var content = $('#share_title').val();
    var title = $('#share_content').val();
    var img = $('#share_img').val();
    var link = $('#share_url').val();
    window.shareData = {
        "urlshare": link,
        "imgUrl": img,
        // 分享朋友圈链接
        // 发送朋友链接
        // 分享微博链接
        //分享朋友圈
        "tTitle": content,
        "tContent": content,
        //发送朋友
        "fTitle": title,
        "fContent": content,
        //微博内容
        "wContent": content
    };
    // 发送给好友          
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        try{
            Jumei.ja('hongbaoweixin11','pengyou');
        }catch(e){} 
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": window.shareData.imgUrl,
            "img_width": "640",
            "img_height": "640",
            "link": window.urlshare,
            "desc": window.shareData.fContent,
            "title": window.shareData.fTitle
        }, function(res) {
            window.scrollTo(0,1);
            _report('send_msg', res.err_msg);
        });
    });

    // 分享朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv) {
        try{
            Jumei.ja('hongbaoweixin11','pengyouquan');
        }catch(e){} 
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "640",
            "img_height": "640",
            "link": window.urlshare,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, function(res) {
            window.scrollTo(0,1);
            _report('timeline', res.err_msg);
        });
    });

    // 分享微博
    WeixinJSBridge.on('menu:share:weibo', function(argv) {
        try{
            Jumei.ja('hongbaoweixin11','weibo');
        }catch(e){} 
        WeixinJSBridge.invoke('shareWeibo', {
            "content": window.shareData.wContent,
            "url": window.urlshare,
        }, function(res) {
            window.scrollTo(0,1);
            _report('weibo', res.err_msg);
        });
    });
    //显示右侧导航
    WeixinJSBridge.call('showOptionMenu');
}, false);
