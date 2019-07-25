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
                    + '<div class="tip-more">活动太火爆，服务器忙不过来啦<br>一会再来试试</div>'
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