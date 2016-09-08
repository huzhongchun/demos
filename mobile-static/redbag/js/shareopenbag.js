document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    window.urlshare = "http://f.m.jumei.com/hongbao/gameweixin?referer=weixin_hongbao";
    var titleArr = ['距离成功的第一步是--眼疾嘴快！5秒见分晓，亲河马你行吗>>','亲小河马就可以白拿话费，红包玩法升级，快来玩>>','5秒告诉你Kiss≠爱，玩亲河马即得红包+话费>>'];
    var index = Math.floor(Math.random() * titleArr.length);
    var title = titleArr[index];
    window.shareData = {               
        "imgUrl": "http://images.jumei.com/mobile/act/image/redbag/weixin_share_icon.png", 
        // 分享朋友圈链接
        // 发送朋友链接
        // 分享微博链接
        //分享朋友圈
        "tTitle": title,              
        "tContent": "「玩亲河马游戏」,100%抢红包、话费，千万红包话费呼唤你！", 
        //发送朋友
        "fTitle": title,             
        "fContent": "「玩亲河马游戏」,100%抢红包、话费，千万红包话费呼唤你！",   
        //微博内容
        "wContent": "「玩亲河马游戏」,100%抢红包、话费，千万红包话费呼唤你！"        
    };          
    // 发送给好友          
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {             
            WeixinJSBridge.invoke('sendAppMessage', {  
                "img_url": window.shareData.imgUrl,
                "img_width": "640",               
                "img_height": "640",                 
                "link": window.urlshare,                 
                "desc": window.shareData.fContent,                
                "title": window.shareData.fTitle            
            }, function (res) {                 
                _report('send_msg', res.err_msg);            
            })         
  });                  

  // 分享朋友圈
  WeixinJSBridge.on('menu:share:timeline', function (argv) {             
      WeixinJSBridge.invoke('shareTimeline', {                 
          "img_url": window.shareData.imgUrl,                 
          "img_width": "640",                 
          "img_height": "640",                  
          "link": window.urlshare,                 
          "desc": window.shareData.tContent,                 
          "title": window.shareData.tTitle             
      }, function (res) {                  
          _report('timeline', res.err_msg);             
      });         
  });

  // 分享微博
  WeixinJSBridge.on('menu:share:weibo', function (argv) {             
            WeixinJSBridge.invoke('shareWeibo', {                  
                "content": window.shareData.wContent,                 
                "url": window.urlshare,             
            }, function (res) {                 
                _report('weibo', res.err_msg);             
            });         
        });          

},false);