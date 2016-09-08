$(function() {
    window.urlshare = 'http://f.m.jumei.com/envelope/openbag?package='+$('#package').val();
    var dialog = {
        init: function(str) {
            var self = this;
            switch (str) {
                case 'login':
                    self.loginDialog();
                    break;
                case 'tip':
                    self.tipDialog();
                    break;
            }
        },
        loginDialog: function() {
            var tpl = '<div class="common-dialog">'
                    + '<div class="common-content clear">'
                    + '<div class="tip-desc">登录聚美后开抢红包<br/>10元？100元？<br/>来试试手气吧！</div>'
                    + '<div id="no-login-btn">'
                    + '<div id="none-account">没有聚美账号？</div>'
                    + '<div id="now-login">直接登录</div>'
                    + '</div>'
                    + '<div class="bottom-tip">11月4日~11月9日注册立领160元现金券</div>'
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
                        $('#container-dialog').remove();
                        location.href = "jumeimall://page/register";
                    });
                    $('#now-login').off('tap');
                    $("#now-login").on("tap", function() {
                        _gaq.push(['_trackEvent', '11hongbaoapp', 'login']);
                        $('#container-dialog').remove();
                        location.href = "jumeimall://page/login";
                    });
                }
            });
        },
        tipDialog: function() {
            var tpl = '<div class="common-dialog">'
                    + '<div class="common-content clear">'
                    + '<div class="tip-desc">聚美结算时，勾选红包支付。<br/>多个红包可以合并使用 ，<br/>在手机聚美打开活动页面合并。</div>'
                    + '<div id="no-login-btn">'
                    + '<div id="iknow">我知道了</div>'
                    + '<div id="anzhuang">安装手机聚美</div>'
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
                    $('#iknow').off('tap');
                    $('#iknow').on('tap', function() {
                        $('#container-dialog').remove();
                    });
                    $('#anzhuang').off('tap');
                    $('#anzhuang').on('tap', function() {
                        $('#container-dialog').remove();
                        try{
                            Jumei.ja('hongbaoweixin11','openbagdownload');
                        }catch(e){} 
                        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.jm.android.jumei&g_f=991650';
                    });
                }
            });
        }
    }


    var JumeiOpenBag = Jumei.create({
        init: function() {
            // dialog.init('login');
            this.initEvent();
            //$('.fix-bottom').hide();
            $('#wrapper-content').height($(window).height()+1);
            setTimeout(function(){
                $('.fix-bottom').show();
                window.scrollTo(0,1);
            },200);
        },
        initEvent: function() {
            var package = $('#package').val();
            $('#openbag-btn,.xiaomei-wrapper').on('tap', function() {
                try{
                    Jumei.ja('hongbaoweixin11','chaihongbao');
                }catch(e){} 
                location.href = "/envelope/open?package=" + package;
            });
            //跳转规则
            $('.rule-redbag').on('tap', function() {
                try{
                    Jumei.ja('hongbaoweixin11','fangweima');
                }catch(e){} 
                location.href = "http://s.m.jumei.com/pages/1168?package="+$('#package').val()+"#rule";
            });
            $('.code-redbag').on('tap', function(){
                try{
                    Jumei.ja('hongbaoweixin11','fangweima');
                }catch(e){} 
                location.href = "http://s.m.jumei.com/pages/1168?package="+$('#package').val();
            });
            //合并红包
            $('.merge-redbag').on('tap', function() {
                dialog.init('tip');
            });
        }
    });
    new JumeiOpenBag();
//    $('#wrapper').hide();
//    //解决微信分享出去后，取消后fix不起作用的bug。
//    setTimeout(function(){
//        $('#wrapper-content').height($(window).height());
//        $('#wrapper-content').show();
//        $('#wrapper').show();
//    },300);
});