$(function() {
    // WeixinApi.enableDebugMode();
// 需要分享的内容，请放到ready里

    WeixinApi.ready(function(Api) {
        var title = $('#share_title').val();
        var content = $('#share_content').val();
        var img = $('#share_img').val();
        var link = $('#share_url').val();
        // 微信分享的数据
        var wxData = {
            "appId": "", // 服务号可以填写appId
            "imgUrl": img,
            "link": link,
            "desc": content,
            "title": title
        };
        // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
        Api.shareToFriend(wxData);
        // 点击分享到朋友圈，会执行下面这个代码
        Api.shareToTimeline({
            "appId": "", // 服务号可以填写appId
            "imgUrl": img,
            "link": link,
            "desc": content,
            "title": content
        });
        // 点击分享到腾讯微博，会执行下面这个代码
        Api.shareToWeibo({
            "appId": "", // 服务号可以填写appId
            "imgUrl": img,
            "link": link,
            "desc": content,
            "title": content
        });
        // iOS上，可以直接调用这个API进行分享，一句话搞定
        //Api.generalShare(wxData);
        // 有可能用户是直接用微信“扫一扫”打开的，这个情况下，optionMenu是off状态
        // 为了方便用户测试，我先来trigger show一下
    });
});
