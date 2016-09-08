/**
 * @file toast提示组件
 * @import zepto.js jumei.js
 */
Jumei.widget('ui.toast', {
    init: function(options) {//构造函数
        //组件的所有属性
        this.options = {
            animateTime: 1,
            animateCurves: 'ease',
            stopTime: 2,
            moveLength: -10,
            animateEndCallback: function() {
            }
        }
        //需要集成父类的构造函数需要这样调用
        //初始化入口
        this._super.call(this, options);
    },
    _create: function() {//组件初始化函数
        var self = this, opt = this.options;
        self.transformEndFlag = true;
        self.order = 0;
        if ($('#toast-boxs').length > 0) {
            console.log('id名‘toast-boxs’命名冲突！');
            return false;
        }
        var content = '<span id="toast-boxs" style="' +
                'transition: -webkit-transform ' + opt.animateTime + 's ' + opt.animateCurves + ' 0s ,' +
                ' opacity ' + opt.animateTime + 's ' + opt.animateCurves + ' 0s;' +
                '-webkit-transition: -webkit-transform ' + opt.animateTime + 's ' + opt.animateCurves + ' 0s ,' +
                ' opacity ' + opt.animateTime + 's ' + opt.animateCurves + ' 0s;' +
                'opacity:0;visibility: hidden;position:fixed"></span>';
        $('#wrapper').append(content);
        self.dom = $('#toast-boxs');
        self.dom.on('webkitTransitionEnd', function(e) {
            if (e.propertyName == 'opacity') {        //只需要判断一组动画中的一个效果，如：opacity
                self.order++;
                if (self.order == 2) {             //保证2次动画都结束了
                    self.transformEndFlag = true;
                    self.dom.css({
                        'visibility': 'hidden'     //必须隐藏，否则可能会遮挡下面的元素操作
                    });
                    self.order = 0;
                    self.animateEndCallback();
                }
            }
        })
    },
    show: function(mes, bottom, right) {
        var self = this, opt = this.options;
        if (self.transformEndFlag) {
            self.dom.html(mes);
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();
            var boxsHeight = self.dom.height();
            var boxsWidth = self.dom.width();
            self.centerTop = (windowHeight - boxsHeight) / 2;
            self.centerLeft = (windowWidth - boxsWidth) / 2;
            var locationBottom = typeof bottom != 'undefined' ? bottom : opt.bottom;
            var locationRight = typeof right != 'undefined' ? right : opt.right;
            self.dom.css({
                'bottom': (typeof locationBottom != 'undefined' ? locationBottom : self.centerTop) + 'px',
                'right': (typeof locationRight != 'undefined' ? locationRight : self.centerLeft) + 'px'
            })
            self.dom.css({
                'opacity': 1,
                'z-index': 111111,
                'visibility': 'visible',
                '-webkit-transform': 'translate(0,' + opt.moveLength + 'px)',
                'transform': 'translate(0,' + opt.moveLength + 'px)'
            });
            setTimeout(function() {
                self.dom.css({
                    'opacity': 0,
                    'z-index': 0,
                    '-webkit-transform': 'translate(0,0)',
                    'transform': 'translate(0,0)'
                });
            }, opt.stopTime * 1000)
        }
        self.transformEndFlag = false;
    },
    animateEndCallback: function() {
        var self = this, opt = this.options;
        opt.animateEndCallback(self);
    }
});