$(function() {
    /*登陆后回调*/
    window.loginCallback = function(){
        location.reload();
    };
    /*广告*/
    var renderAdsFirst = function() {
        var $carouse = $('#carouse-text');
        var left = 0;
        var widthTotal = 0;
        $("#carouse-text span").each(function() {
            widthTotal += this.clientWidth;
        });
        $carouse.width(widthTotal + 10);
        var cha = widthTotal - 280;
        var scroll = function() {
            left -= 1;
            $carouse.css('left', left);
            if (Math.abs(left) == cha) {
                left = 0;
                //endLeft();
            }
        };
        setInterval(function() {
            scroll();
        }, 100);
    };
    
    //弹出框对象
    var dialog = {
        init: function(str) {
            var self = this;
            switch (str) {
                case 'login':
                    self.loginDialog();
                    break;
                case 'share':
                    self.shareDialog();
                    break;
                case 'getbag':
                    self.getbagDialog();
                    break;
            }
        },
        loginDialog: function() {
            var tpl = '<div class="common-dialog">'
                    + '<div class="common-title-bg"></div>'
                    + '<div class="common-close"></div>'
                    + '<div class="common-title">请登录后查看我的红包</div>'
                    + '<div class="common-content clear">'
                    + '<div id="none-account">没有聚美账号</div>'
                    + '<div id="now-login">现在登录</div>'
                    + '</div>'
                    + '</div>';
            $('body').dialog({
                //默认弹出框宽度
                width: 260,
                height: 200,
                //传进来显示的html
                content: tpl,
                //弹出框title
                title: "", //弹出框的title
                //显示一个按钮还是两个
                type: 0,
                init: function() {
                    $('.common-close').off('tap');
                    $('.common-close').on('tap', function() {
                        $('#container-dialog').remove();
                    });
                    $('#none-account').off('tap');
                    $("#none-account").on("tap", function() {
                        _gaq.push(['_trackEvent', '11hongbaoapp', 'login']);
                        location.href = "jumeimall://page/register?callback=window.loginCallback()";
                    });
                    $('#now-login').off('tap');
                    $("#now-login").on("tap", function() {
                        _gaq.push(['_trackEvent', '11hongbaoapp', 'login']);
                        location.href = "jumeimall://page/login?callback=window.loginCallback()";
                    });
                    $('.common-close').hide();
                }
            });
        },
        shareDialog: function() {
            var tpl = '<div class="common-dialog">'
                    + '<div class="common-title-bg"></div>'
                    + '<div class="common-close"></div>'
                    + '<div class="common-title">分享到微信和小伙伴一起抢红包</div>'
                    + '<div class="common-content clearfloat">'
                    + '<div class="share-content clearfloat">'
                    + '<div id="share-friend"><div id="share-friend-icon"></div><div>分享给朋友</div></div>'
                    + '<div id="share-pengyouquan"><div id="share-pengyouquan-icon"></div><div>分享到朋友圈</div></div>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
            $('body').dialog({
                //默认弹出框宽度
                width: 260,
                height: 200,
                //传进来显示的html
                content: tpl,
                //弹出框title
                title: "", //弹出框的title
                //显示一个按钮还是两个
                type: 0,
                init: function() {
                    $('.common-close').off('tap');
                    $('.common-close').on('tap', function() {
                        $('#container-dialog').remove();
                    });
                    share.shareFunc();
                }
            });
        },
        getbagDialog: function(num) {
            var tpl = '<div class="common-dialog">'
                    + '<div class="common-title-bg"></div>'
                    + '<div class="common-close"></div>'
                    + '<div class="common-title">'+num+'元红包已充入您的聚美帐号</div>'
                    + '<div class="common-content clear">'
                    + '<div class="getbag-share">分享再抢100元红包</div>'
                    + '<div class="getbag-tip">微信红包金额随机<br/>微信好友和自己都能抢</div>'
                    + '</div>'
                    + '</div>';
            $('body').dialog({
                //默认弹出框宽度
                width: 260,
                height: 200,
                //传进来显示的html
                content: tpl,
                //弹出框title
                title: "", //弹出框的title
                //显示一个按钮还是两个
                type: 0,
                init: function() {
                    $('.common-close').off('tap');
                    $('.common-close').on('tap', function() {
                        $('#container-dialog').remove();
                    });
                    $('.getbag-share').off('tap');
                    $('.getbag-share').on('tap', function(){
                        $('#container-dialog').remove();
                         dialog.init('share');
                    });
                }
            });
        },
        tipDialog: function(content) {
            var tpl = '<div class="common-dialog">'
                    + '<div class="common-title-bg"></div>'
                    + '<div class="common-close"></div>'
                    + '<div class="common-content clear">'
                    + '<div class="common-tip" style="padding-bottom: 10px;font-size:13px;">'+content+'</div>'
                    + '</div>'
                    + '</div>';
            $('body').dialog({
                //默认弹出框宽度
                width: 260,
                height: 200,
                //传进来显示的html
                content: tpl,
                //弹出框title
                title: "", //弹出框的title
                //显示一个按钮还是两个
                type: 0,
                init: function() {
                    $('.common-close').off('tap');
                    $('.common-close').on('tap', function() {
                        $('#container-dialog').remove();
                    });
                    $('.getbag-share').off('tap');
                    $('.getbag-share').on('tap', function(){
                        $('#container-dialog').remove();
                         dialog.init('share');
                    });
                }
            });
        }
    };

    //分享对象
    var share = {
        shareFunc: function(){
            //分享文案
            var title = [
                '别帮聚美省钱！在聚美买真品防伪商品赚了大红包，快抢',
                '看你深夜为朕点赞，赐聚美真品防伪红包20枚，快抢>',
                '聚美买带防伪码商品送红包！姐抢了十个，快来瓜分…',
                '干爹送我个大红包，我用验钞机验过了，快来抢>>>',
                '聚美双11囤货必备，无满减限制大红包50个，快抢',
                '买过很多带防伪码的商品，只有聚美的送红包，快来抢',
                '深夜点赞，人情肉偿，送你个聚美11.11大红包，快抢'
            ];
            var random = Math.floor(Math.random() * title.length);
            var data = {
                title:'聚美真品防伪派福利送11.11红包',
                content:title[random],
                img:'http://images.jumei.com/mobile/act/activities/2014_11/11zhuhuichang/share_hongbao.jpg',
                url:''
            };
            //分享朋友
            $('#share-friend-icon').off('tap');
            $('#share-friend-icon').on('tap', function(){
                try{
                    Jumei.ja('hongbaoapp11','pengyou');
                }catch(e){} 
                share.getShareLink(function(package){
                    data.url = 'http://f.m.jumei.com/envelope/openbag?package='+package;
                    location.href = 'jumeimall://action/share/weixin?link='+data.url+'&img='+data.img+'&title='+data.title+'&des='+data.content;
                });
            });
            //分享朋友圈
            $('#share-pengyouquan').off('tap');
            $('#share-pengyouquan').on('tap', function(){
                try{
                    Jumei.ja('hongbaoapp11','pengyouquan');
                }catch(e){} 
                share.getShareLink(function(package){
                    data.url = 'http://f.m.jumei.com/envelope/openbag?package='+package;
                    location.href = 'jumeimall://action/share/weixin/pengyouquan?link='+data.url+'&img='+data.img+'&title='+data.content+'&des='+data.content;
                });
            });
        },
        getShareLink: function(callback){
            var self = this;
            $.ajax({
                type: 'post',
                url: '/envelope/generate',
                dataType: 'json',
                success: function(data) {
                    if(data.package){
                        callback.call(self,data.package);
                    }else{
                        alert("网络不给力，过会儿试试～");
                    }
                },
                error: function(e) {
                    $('#wrapper').loadding("close");
                    alert("网络不给力，过会儿试试～");
                }
            });
        }
    };


    animate = {
        init:function(num){
            var $animateNum = $('.animate-num');
            $animateNum.css({'top':50,opacity:1});
            $animateNum.html('+'+num);
            $animateNum.animate({
                top: 10+'px',
                opacity: 0
            }, 2000, 'ease-out');
        }
    }


    var JumeiIndexApp = Jumei.create({
        init: function() {
            try {
                JMWebView.toolbar.status = 'hidden';
            } catch (e) {

            }
            var $noneNum = $('#none-bag-num');
            var num = $noneNum.find('span').html();
            $noneNum.html('<span style="height: 24px;display: inline-block;line-height: 32px;">'+num+'</span>');
            $noneNum.parent().find('.fs13').html('幸运值');
            $('.total-redbag span').html('拼人品领红包');
            $('#product-code .li-title').subStr(46);
            this.isLogin();
            renderAdsFirst();
        },
        isLogin: function() {
            //dialog.tipDialog('小美提示','您提交失败');
            var loginFlag = $('#islogin').val();
            if ($.trim(loginFlag) == '') {
                dialog.init('login');
            } else {
                this.initEvent();
            }
        },
        bindLookRedBag: function(){
            $('.look-redbag').off('tap');
            $('.look-redbag').on('tap', function() {
                try{
                    Jumei.ja('hongbaoapp11','chakanhongbao');
                }catch(e){} 
                if($('#isactive').val() =='1'){
                    location.href = '/hongbao/merge';
                }else{
                    location.href = 'jumeimall://page/red-envelope';
                }
            });
        },
        initEvent: function() {
            
//            $('.look-redbag,.merge-redbag').on('tap', function() {
//                location.href = '/hongbao/merge';
//            });
            var self = this;
            self.bindLookRedBag();
            $('.merge-redbag').on('tap', function(){
                try{
                    Jumei.ja('hongbaoapp11','hebinghongbao');
                }catch(e){} 
                if($('#isactive').val() == '1'){
                    location.href = '/hongbao/merge';
                }else{
                    dialog.tipDialog('多个红包可以合并，请用电脑登录聚美官网，在我的聚美/红包中合并');
                }
            });

            $('.start-buy-btn').on('tap', function() {
                try{
                    Jumei.ja('hongbaoapp11','lijigoumai');
                }catch(e){} 
                location.href = 'jumeimall://page/homepage';
            });
            
            $('#continue-buy').on('tap', function() {
                try{
                    Jumei.ja('hongbaoapp11','jixugoumai');
                }catch(e){} 
                location.href = 'jumeimall://page/homepage';
            });

            $('#share-weixin').on('tap', function() {
                try{
                    Jumei.ja('hongbaoapp11','fenxiang');
                }catch(e){} 
                dialog.init('share');
            });

            //跳转规则
            $('.fangwei-rule,.rule-redbag').on('tap', function() {
                try{
                    Jumei.ja('hongbaoapp11','fangweima');
                }catch(e){} 
                location.href = "http://s.m.jumei.com/pages/1168?app#rule";
            });
            
            $('.code-redbag').on('tap', function() {
                try{
                    Jumei.ja('hongbaoapp11','fangweima');
                }catch(e){} 
                location.href = "http://s.m.jumei.com/pages/1168?app";
            });
            

            //点击更多
            $('#more-btn').on('tap', function() {
                $(this).hide();
                $('#product-code ul').height('auto');
            });


            $('.red-bag').on('tap', function(){
                var scroll = $(window).scrollTop();
                $(window).scrollTo(scroll+100);
            });
            
            //领红包
            $('.get-bag').on('tap', function() {
                var _this = this;
                try{
                    Jumei.ja('hongbaoapp11','lingqu');
                }catch(e){} 
                if($(_this).hasClass('can-get-bag')){
                    var order_id = $(this).attr('orderid');
                    $('#wrapper').loadding();
                    $.ajax({
                        type: 'post',
                        url: '/envelope/getAuthRedEnvelope',
                        dataType: 'json',
                        data: {order_id: order_id},
                        success: function(data) {
                            if(data.status == '0'){
                                $(_this).removeClass('can-get-bag')
                                var $redNumElem = $('#none-bag-num span');
                                var redNum = $redNumElem.html();
                                $redNumElem.html((parseInt(redNum)-1));
                                var $hasNumElem = $('#has-bag-num span');
                                var hasNum = $hasNumElem.html();
                                $hasNumElem.html((parseFloat(hasNum)+parseFloat(data.data.amount)).toFixed(1));
                                $(_this).html('已领取');
                                dialog.getbagDialog(data.data.amount);
                                if($('.look-redbag').length <= 0){
                                    var str = '<div class="look-redbag"><a>查看</a></div>';
                                    $('.right-num').attr('style','');
                                    $('.right-num').parent().append(str);
                                    self.bindLookRedBag();
                                }
                                animate.init(data.data.amount);
                            }else{
                                dialog.tipDialog(data.data.cause);
                            }
                            $('#wrapper').loadding("close");

                        },
                        error: function(e) {
                            $('#wrapper').loadding("close");
                            alert("网络不给力，过会儿试试～");
                        }
                    });
                }
            });
        }
    });
    new JumeiIndexApp();
});