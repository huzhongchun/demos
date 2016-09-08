document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    
var titleArr = ['我亲河马赚了红包，快来抢！别辜负俺的初吻(•ω•)','我情愿抢到手软，也不会对钱心软！抢红包又来了>>>','浪费钱可耻！我抢钱抢到手抖了！还有好多，快抢(•̀ᴗ•́)و','靠人不如靠我！我抢到个含话费的群红包，快来抢o(>< )o','霸道总裁送我个大红包，我不稀罕 (／_^)你们来抢嘛>>>','我现在有鱼塘了，红包留给你们吧！谁抢到归谁(•̀ᴗ•́)و','聚美红包来了！至少10元话费。你不抢就是我傻๏[-ิ_•ิ]๏'];
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
                "link": window.urlshare+'&fr=weixinhema&referer=weixin_hongbao',                 
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
          "link": window.urlshare+'&fr=pengyouquanhema&referer=weixin_hongbao',                 
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
                "url": window.urlshare+'&referer=weixin_hongbao',             
            }, function (res) {                 
                _report('weibo', res.err_msg);             
            });         
        });          

},false);
