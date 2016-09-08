$(function() {
    var dialog = {
        init: function(str) {
            var self = this;
            switch (str) {
                case 'login':
                    self.loginDialog();
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
                        location.href = "jumeimall://page/register";
                    });
                    $('#now-login').off('tap');
                    $("#now-login").on("tap", function() {
                        
                        _gaq.push(['_trackEvent', '11hongbaoapp', 'login']);
                        location.href = "jumeimall://page/login";
                    });
                    $('.close').hide();
                }
            });
        }
    }
    dialog.init('login');
});