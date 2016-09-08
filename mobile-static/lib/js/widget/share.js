/**
 * @file 弹出框组件
 * @import zepto.js jumei.js
 * @example
 $('#test').click(function() {
 $(this).share();
 });
 */
Jumei.widget('ui.share', {
    init: function() {
        this.options = {
            pic: '',
            title: '聚美',
            link_url: 'http://d.jumei.com',
        };

        this.tpl = '<div id="share-module-bg"></div><div id="share-module">'
                + '<div id="share-module-wrapper">'
                + '<a id="sina" class="sina" type="sina"><img src="' + Jumei.static + '/image/widget/share/weibo-btn.png"/></a>'
                + '<a id="wechat" class="wechat" type="wechat"><img src="' + Jumei.static + '/image/widget/share/wechat-btn.png"/></a>'
                + '<a id="weixin-friend"  class="weixin-friend" type="weixin-friend"><img src="' + Jumei.static + '/image/widget/share/weixin_friend.png?33"/></a>'
                + '<div style="clear:both;"></div>'
                + '</div>'
                + '<div class="close-share">取   消</div>'
                + '</div>';
    },
    _create: function() {
        //创建audio对象
        var self = this;
        if ($("#share-module").length <= 0) {
            $('#wrapper').append(self.tpl);
        }
        this.showTpl();
    },
    showTpl: function() {
//        if ($.os.android) {
//            $('#wechat').hide();
//            $('#qq-weibo').show();
//            $("#sina").show();
//        } else if ($.os.iphone || $.os.ipad || $.os.ipod) {
//            $('#wechat').show();
//            $('#qq-weibo').show();
//            $("#sina").show();
//        } else {
//            $('#wechat').hide();
//            $('#qq-weibo').show();
//            $("#sina").show();
//        }



        this.bind();
        this.show();
    },
    bind: function() {
        var self = this;
        var $wapperBtn = $("#share-module-wrapper a");
        $wapperBtn.off('click');
        $wapperBtn.on('click', function() {
            _gaq || _gaq.push(['_trackEvent', 'share', 'shareclick']);
            _hmt || _hmt.push(['_trackEvent', 'share', 'shareclick']);
            var type = $(this).attr('type');
            var sinaShareURL = "http://service.weibo.com/share/share.php?";//新浪URL
            var qqShareURL = "http://sns.z.qq.com/share?";//qq空间


            var link_url = self.options.link_url; //host_url获取当前的路径
            var sina_title = self.options.sina_title;
            var sina_pic = self.options.sina_pic;



            var weixin_link_url = self.options.weixin_link_url;
            var wechat_title = self.options.wechat_title;
            var wechat_pic = self.options.wechat_pic;
            var wechat_content = self.options.wechat_content;

            var weixin_friend_link_url = self.options.weixin_friend_link_url;
            var weixin_friend_pic = self.options.weixin_friend_pic;
            var weixin_friend_title = self.options.weixin_friend_title;
            var weixin_friend_content = self.options.weixin_friend_content;


            var _URL;
            var getUrl = function() {
                switch (type) {
                    default:
                    case 'sina':
                        _URL = sinaShareURL + "title=" + encodeURIComponent(sina_title) + "&pic=" + encodeURIComponent(sina_pic) + '&url=' + encodeURIComponent(link_url);//新浪
                        break;
                    case 'wechat':
                        _URL = 'jumeimall://action/share/weixin?&link=' + encodeURIComponent(weixin_link_url) + '&img=' + encodeURIComponent(wechat_pic) + '&title=' + encodeURIComponent(wechat_title) + '&des=' + encodeURIComponent(wechat_content);//微信
                        break;
                    case 'weixin-friend':
                        _URL = 'jumeimall://action/share/weixin/pengyouquan?&link=' + encodeURIComponent(weixin_friend_link_url) + '&img=' + encodeURIComponent(weixin_friend_pic) + '&title=' + encodeURIComponent(weixin_friend_title) + '&des=' + encodeURIComponent(weixin_friend_content);//盆友圈
                }
                return _URL;
            }
            if (self.options.callback) {
                self.options.callback(function(indent) {
                    if (indent == '') {
                        alert('亲，您已经分享过了')
                    } else {
                        link_url = 'http://f.m.jumei.com/2048/award/' + indent;
                        _URL = getUrl();
                        location.href = _URL;//重新打开一个新的窗体
                    }
                });
            } else {
                _URL = getUrl();
                location.href = _URL;//重新打开一个新的窗体
                //window.open(_URL);
            }

        });


        var $closeShare = $('#share-module .close-share');
        $closeShare.off('click');
        $closeShare.on('click', function() {
            self.close();
        });


        $('#share-module-bg').on('click', function() {
            self.close();
        });
        $('#share-module-bg').on('tap', function() {
            self.close();
        });
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
    }

});
