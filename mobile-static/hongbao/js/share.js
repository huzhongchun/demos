document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    var titleArr = [
        '别帮聚美省钱！在聚美买真品防伪商品赚了大红包，快抢',
        '看你深夜为朕点赞，赐聚美真品防伪红包20枚，快抢>',
        '聚美买带防伪码商品送红包！姐抢了十个，快来瓜分…',
        '干爹送我个大红包，我用验钞机验过了，快来抢>>>',
        '聚美双11囤货必备，无满减限制大红包50个，快抢',
        '买过很多带防伪码的商品，只有聚美的送红包，快来抢',
        '深夜点赞，人情肉偿，送你个聚美11.11大红包，快抢'
    ];
    var index = Math.floor(Math.random() * titleArr.length);
    var content = titleArr[index];
    window.shareData = {
        "imgUrl": "http://images.jumei.com/mobile/act/activities/2014_11/11zhuhuichang/share_hongbao.jpg",
        // 分享朋友圈链接
        // 发送朋友链接
        // 分享微博链接
        //分享朋友圈
        "tTitle": content,
        "tContent": content,
        //发送朋友
        "fTitle": '聚美真品防伪派福利送11.11红包',
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
        })
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

}, false);
