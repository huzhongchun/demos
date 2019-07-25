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
                    + '<div class="end-person"></div>'
                    + '<div class="tip-desc">活动已结束</div>'
                    + '<div class="tip-more">更多精彩活动尽在聚美客户端</div>'
                    + '<div id="no-login-btn">'
                    + '<div id="now-login">下载聚美客户端</div>'
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
//                    $('#none-account').off('tap');
//                    $("#none-account").on("tap", function() {
//                        _gaq.push(['_trackEvent', '11hongbaoapp', 'login']);
//                        $('#container-dialog').remove();
//                        location.href = "jumeimall://page/register";
//                    });
                        $('#now-login').off('tap');
                        $("#now-login").on("tap", function() {
                            try{
                                Jumei.ja('hongbaoweixin11','activeenddownload');
                            }catch(e){} 
                            $('#container-dialog').remove();
                            location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jm.android.jumei&g_f=991650";
                        });
                    $('.close').hide();
                }
            });
        }
    }



    var JumeiSendBag = Jumei.create({
        init: function() {
            try {
                JMWebView.toolbar.status = 'hidden';
            } catch (e) {

            }
            dialog.init('login');
            this.initEvent();
        },
        initEvent: function() {
            var package = $('#package').val();
            $('#openbag-btn').on('tap', function() {
                location.href = "/hongbao/my?package=" + package;
            });
        }
    });
    new JumeiSendBag();
});