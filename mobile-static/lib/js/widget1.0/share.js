/**
 * @file 弹出框组件
 * @import zepto.js jumei.js
 */
Jumei.widget('ui.share', {
    init: function(options) {
        this.options = {
            sinaBtnBg: 'http://images.jumei.com/mobile/act/image/widget/share/weibo-btn.png',
            weichatBtnBg: 'http://images.jumei.com/mobile/act/image/widget/share/wechat-btn.png',
            weiFriendBtnBg: 'http://images.jumei.com/mobile/act/image/widget/share/weixin_friend.png',
            sinaLinkUrl: location.href,
            weiXinChatLinkUrl: location.href,
            weiXinFriendLinkUrl: location.href,
            sinaPic: 'http://p0.jmstatic.com/templates/jumei/images/logo_new_v1.jpg',
            weiXinChatPic: 'http://p0.jmstatic.com/templates/jumei/images/logo_new_v1.jpg',
            weiXinFriendPic: 'http://p0.jmstatic.com/templates/jumei/images/logo_new_v1.jpg',
            sinaTitle: '精彩购物，尽在聚美优品',
            weixinChatTitle: '精彩购物，尽在聚美优品',
            weiXinFriendTitle: '精彩购物，尽在聚美优品',
            weiXinFriendContent: "中国最大正品化妆品团购网站，千万用户推荐，拆封30天无条件退款！",
            weiXinChatContent: "中国最大正品化妆品团购网站，千万用户推荐，拆封30天无条件退款！"
        };
        this._super.call(this, options);
    },
    _create: function() {
        var self = this, opt = this.options;
        this.tpl = '<div id="share-module-bg"></div><div id="share-module">'
                + '<div id="share-module-wrapper">'
                + '<a id="sina" class="sina" type="sina"><img src="' + opt.sinaBtnBg + '"/></a>'
                + '<a id="wechat" class="wechat" type="wechat"><img src="' + opt.weichatBtnBg + '"/></a>'
                + '<a id="weixin-friend"  class="weixin-friend" type="weixin-friend"><img src="' + opt.weiFriendBtnBg + '"/></a>'
                + '<div style="clear:both;"></div>'
                + '</div>'
                + '<div class="close-share">取   消</div>'
                + '</div>';
        if ($("#share-module").length <= 0) {
            $('#wrapper').append(self.tpl);
        }
        else
            alert('默认的id命名“share-module”已经被使用了，快去调整一下之前的id名！');
        this.bind();
        this.close();
    },
    bind: function() {
        var self = this;
        var $wapperBtn = $("#share-module-wrapper a");
        $wapperBtn.off('click');
        $wapperBtn.on('click', function() {
            _gaq || _gaq.push(['_trackEvent', 'share', 'shareclick']);
            _hmt || _hmt.push(['_trackEvent', 'share', 'shareclick']);
            var type = $(this).attr('type'), data = {};

            /*新浪*/
            data.sinaLinkUrl = self.options.sinaLinkUrl;
            data.sinaTitle = self.options.sinaTitle;
            data.sinaPic = self.options.sinaPic;
            /*微信好友*/
            data.weiXinChatLinkUrl = self.options.weiXinChatLinkUrl;
            data.weixinChatTitle = self.options.weixinChatTitle;
            data.weiXinChatPic = self.options.weiXinChatPic;
            data.weiXinChatContent = self.options.weiXinChatContent;
            /*微信朋友圈*/
            data.weiXinFriendLinkUrl = self.options.weiXinFriendLinkUrl;
            data.weiXinFriendPic = self.options.weiXinFriendPic;
            data.weiXinFriendTitle = self.options.weiXinFriendTitle;
            data.weiXinFriendContent = self.options.weiXinFriendContent;
            var _URL;
            self._openUrl(type, data);
            /*防止多次点击*/
            self.close();
        });

        var $closeShare = $('#share-module .close-share');
        $closeShare.off('click');
        $closeShare.on('click', function() {
            self.close();
        });
        $('#share-module-bg').on('click', function() {
            self.close();
        });
    },
    _openUrl: function(type, options) {
        var _uRL = '';
        var opt = options;
        var sinaShareURL = "http://service.weibo.com/share/share.php?";//新浪URL
        switch (type) {
            case 'sina':
                _URL = sinaShareURL + "title=" + encodeURIComponent(opt.sinaTitle) + "&pic=" + encodeURIComponent(opt.sinaPic) + '&url=' + encodeURIComponent(opt.sinaLinkUrl);//新浪
                break;
            case 'wechat':
                _URL = 'jumeimall://action/share/weixin?&link=' + encodeURIComponent(opt.weiXinChatLinkUrl) + '&img=' + encodeURIComponent(opt.weiXinChatPic) + '&title=' + encodeURIComponent(opt.weixinChatTitle) + '&des=' + encodeURIComponent(opt.weiXinChatContent);//微信
                break;
            case 'weixin-friend':
                _URL = 'jumeimall://action/share/weixin/pengyouquan?&link=' + encodeURIComponent(opt.weiXinFriendLinkUrl) + '&img=' + encodeURIComponent(opt.weiXinFriendPic) + '&title=' + encodeURIComponent(opt.weiXinFriendTitle) + '&des=' + encodeURIComponent(opt.weiXinFriendContent);//盆友圈
            default:
        }
        location.href = _URL;//重新打开一个新的窗体
    },
    close: function() {
        $('#share-module').removeClass('share-show');
        $('#share-module').addClass('share-hide');
        $('#share-module-bg').hide();
    },
    show: function() {
        $('#share-module').addClass('share-show');
        $('#share-module').removeClass('share-hide');
        $('#share-module-bg').show();
    },
    openUrl: function(type, options) {
        var self = this;
        return self._openUrl(type, options);
    }

});
