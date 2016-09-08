/**
 * @file 弹出框组件
 * @import zepto.js base.js
 * @example
 $('#test').click(function() {
 $(this).dialog();
 });
 */
Jumei.widget('ui.dialog', {
    init: function(options) {
        this.options = {
            element: 'element',
            //默认弹出框宽度
            width: 260,
            height: 200,
            //传进来显示的html
            content: '聚美提示您！',
            //弹出框title
            title: '提示', //弹出框的title
            type: 'default',
            //显示一个按钮还是两个
            btn: 2,
            //按钮文字
            ok: '确定',
            cancel: '取消',
            //初始化函数
            init: function() {
            },
            //成功回调函数
            okCallback: null,
            //取消回调函数
            cancelCallback: function() {
            }
        };
        this.tpl = '<div class="ui-dialog">' +
                '<div class="ui-dialog-title"><div><%=title%></div><div class="ui-dialog-close"></div></div>' +
                '<div class="ui-dialog-content"><%=content%></div>' +
                '<% if(btn == 2){  %>' +
                '<div class="ui-dialog-btn"><div class="ui-dialog-cancel"><%=cancel%></div><div class="ui-dialog-ok"><%=ok%></div></div>' +
                '<% }else if(btn == 1){ %>' +
                '<div class="ui-dialog-btn"><div class="ui-dialog-ok" style="border-left: none;width: 100%;" ><%=ok%></div></div>' +
                '<% } %>' +
                '</div>';
        this.bg = '<div class="ui-bg"></div>';
        this._super.call(this, options);
    },
    _create: function() {
        this._appendHtml();
        this._initFunc();
        this._bindEvent();
        this._resize();
    },
    _appendHtml: function() {
        var self = this,
                $uiBg = $('.ui-bg'),
                $body = $('body'),
                htmls = Jumei.parseTpl(this.tpl, this.options);
        this.dialog = $(htmls);
        //初始化dom
        $('#wrapper').append(self.dialog);
        if ($uiBg.length <= 0)
            $body.append(self.bg);
    },
    _initFunc: function() {
        //初始化方法
        this.options.init();
    },
    show: function() {
        var bodyHeight = $('body').height();
        var windowHeight = $(window).height() * Jumei.scale;
        var height = bodyHeight > windowHeight ? bodyHeight : windowHeight;
        $('.ui-bg').css({'position': 'absolute', 'height': height + 'px'});
        this._culculate();
        this._setFlag();
        this._animateShow();
    },
    //显示模式
    _animateShow: function() {
        var $bg = $('.ui-bg'),
                type = this.options.type;
        $bg.show();
        $bg.animate({
            opacity: 0.5,
        }, 500, 'ease-out');
        switch (type) {
            case 'slidedown':
                this.dialog.show();
                this.dialog.css({'transform': 'translate3d(0,-300px,0)','-webkit-transform': 'translate3d(0,-300px,0)'});
                this.dialog.animate({
                    'transform': 'translate3d(0,0,0)',
                    '-webkit-transform': 'translate3d(0,0,0)',
                    'opacity': 1,
                }, 300, 'ease');
                break;
            case 'rotate':
                this.dialog.show();
                this.dialog.wrap('<div class="ui-dialog-wrap"></div>');
                this.dialog.css({'transform': 'rotateY(-390deg)','-webkit-transform': 'rotateY(-390deg)'});
                this.dialog.animate({
                    'transform': 'rotateY(0deg)',
                    '-webkit-transform': 'rotateY(0deg)',
                }, 500, 'ease');
                break;
            case 'scale':
                this.dialog.show();
                this.dialog.css({'transform': 'scale(0)','-webkit-transform':'scale(0)'});
                this.dialog.animate({
                    'transform': 'scale(1)',
                    '-webkit-transform': 'scale(1)',
                }, 200, 'ease', function() {

                });
                break;
            case 'fadein':
                this.dialog.show();
                this.dialog.css('opacity', 0);
                this.dialog.animate({
                    opacity: 1,
                }, 400, 'ease', function() {

                });
                break;
            default:
                this.dialog.show();
                $bg.show();
                $bg.animate({
                    opacity: 0.5,
                }, 500, 'ease');
                break;
        }

    },
    _bindEvent: function() {
        //事件绑定，可以封装到一个方法里
        var self = this,
                $cancel = $('.ui-dialog-btn .ui-dialog-cancel,.ui-dialog .ui-dialog-close'),
                $ok = $('.ui-dialog .ui-dialog-ok');
        if ($cancel) {
            $cancel.click(function() {
                self.hide();
                self.options.cancelCallback();
                return false;
            });
        }
        if ($ok) {
            $ok.click(function() {
                var call = true;
                if (typeof (self.options.okCallback) === "function") {
                    call = self.options.okCallback();
                }
                if (call !== false) {
                    self.hide();
                }
                return true;
            });
        }
        $(document).on('touchmove', '.ui-dialog,.ui-bg', function(e) {
            e.preventDefault();
        });
    },
    _resize: function() {
//        var self = this;
//        $(window).resize(function() {
//            self._culculate();
//            self._setFlag();
//            self._animateShow();
//        });
    },
    _culculate: function() {
        var self = this;
        self.windowHeight = $(window).height();
        self.windowWidth = 320;
        self.dialog.show();
        self.height = self.dialog.height();
        self.dialog.hide();
    },
    //设置弹出框居中 
    _setFlag: function() {
        var scrollTop = 0,
                boxTop = 0,
                boxLeft = 0;
        this.dialog.width(this.options.width);
        scrollTop = $(window).scrollTop();
        boxLeft = (this.windowWidth - this.options.width) / 2;
        boxTop = (this.windowHeight - this.height) / 2 + scrollTop;
        this.dialog.css({'left': boxLeft + 'px', 'top': boxTop + 'px'});
    },
    //弹出框关闭 
    hide: function() {
        $('.ui-bg').hide();
        this.dialog.hide();
    }
});

