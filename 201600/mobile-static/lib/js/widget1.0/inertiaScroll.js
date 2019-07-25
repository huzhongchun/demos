/**
 * @file inertiaScroll组件
 * @import zepto.js jumei.js
 *
 */
Jumei.widget('ui.inertiaScroll', {
    init: function(options) {//构造函数
        var fnNone = function() {
        };
        this.options = {
            id: 'content', //调用的元素
            pullDownCallback: fnNone,
            pullUpCallback: fnNone,
            startPullDownCallback: fnNone,
            startPullDownMaxLength: 40,
        }
        //初始化入口
        this._super.call(this, options);
    },
    _create: function() {//组件初始化函数
        var self = this, opt = this.options;
        self.time = {}, self.pageXY = {}, self.speed = 0, self.direction = null, self.parentHeight = 0;
        if (!opt.id || !document.getElementById(opt.id.replace(/^#/, ''))) {
            console.log('id或dom为null!');
            return false;
        }
        self.dom = document.getElementById(opt.id.replace(/^#/, ''));
        var $parent = $(this.dom).parent();
        $parent.css('overflow', 'hidden');
        self.addListener();
    },
    addListener: function() {
        var self = this, opt = this.options;
        var p = self.pageXY;
        self.touchendFlag = true
        var $content = $(self.dom);
        $content.on('touchstart', function(e) {
            e.preventDefault();
            self.time.startT = (new Date()).getTime();
            p.startX = e.touches[0].pageX;
            p.startY = e.touches[0].pageY;
            var translateArray = self.getTranslateArray();
            p.currentX = parseInt(translateArray[0]);
            p.currentY = parseInt(translateArray[1]);
            self.stopMoveByCss(p.currentY);
        });
        $content.on('touchmove', function(e) {
            e.preventDefault();
            p.endX = e.touches[0].pageX;
            p.endY = e.touches[0].pageY;
            p.moveX = p.endX - p.startX;
            p.movedY = p.endY - p.startY;
            self.direction = p.movedY > 0 ? 'up' : 'down';
            p.targetX = p.currentX + p.movedX;
            p.targetY = p.currentY + p.movedY;
            if (p.currentY <= '0' && p.targetY > 0 && self.touchendFlag) {
                opt.startPullDownCallback();
                self.touchendFlag = false;
            }
            if (p.currentY <= '0' && p.targetY > opt.startPullDownMaxLength) {
                $content.css('-webkit-transform', 'translate3d(0px, 40px, 0px)');
                //opt.startPullDownCallback();
            }
            else {
                var maxMove = self.getMaxMove();
                if (p.targetY < -(maxMove + opt.startPullDownMaxLength))
                    $content.css('-webkit-transform', 'translate3d(0px, ' + (-(opt.startPullDownMaxLength + maxMove)) + 'px, 0px)');
                else
                    $content.css('-webkit-transform', 'translate3d(0px, ' + p.targetY + 'px, 0px)');

            }
        });
        $content.on('touchend', function(e) {
            var inertiaTime;
            self.touchendFlag = true;
            var translateArray = self.getTranslateArray();
            p.touchEndX = parseInt(translateArray[0]);
            p.touchEndY = parseInt(translateArray[1]);
            self.time.endT = (new Date()).getTime();
            self.time.moveingT = self.time.endT - self.time.startT;
            p.moveLen = p.touchEndY - p.currentY;
            self.speed = Math.abs(p.moveLen / self.time.moveingT);
            inertiaTime = self.time.moveingT / 200;
            inertiaMoveY = self.speed * 500;
            if (self.direction == 'down')
                var target = p.touchEndY - inertiaMoveY;
            else
                var target = p.touchEndY + inertiaMoveY;

            var maxMove = self.getMaxMove();
            if (target >= opt.startPullDownMaxLength)
                target = opt.startPullDownMaxLength;
            if (target < -(maxMove + opt.startPullDownMaxLength))
                target = -(maxMove + opt.startPullDownMaxLength);
            self.moveByCss(inertiaTime, target);
            self.monitor();
        });
    },
    getTranslateArray: function() {
        var self = this;
        var $content = $(this.dom);
        var translateCss = $content.css('-webkit-transform');
        var translateArray;
        if (translateCss.indexOf('matrix') > -1 || translateCss == 'none')
            translateArray = ['0', '0', '0'];
        else
            translateArray = $.trim(translateCss).match((/-?\d*?.?\d*px/g));
        return translateArray;
    },
    stopMoveByCss: function(currentY) {
        var self = this;
        var $content = $(this.dom);
        $content.css({'-webkit-transition': '-webkit-transform 0s ease-out 0s', 'transition': '-webkit-transform 0s ease-out 0s'});
        $content.css('-webkit-transform', 'translate3d(0px, ' + currentY + 'px, 0px)');
    },
    moveByCss: function(time, target) {
        var self = this, opt = this.options;
        var $content = $(this.dom);
        $content.css({'-webkit-transition': '-webkit-transform ' + time + 's cubic-bezier(0.333333,0.666667,0.66667,1) 0s', 'transition': '-webkit-transform ' + time + 's cubic-bezier(0.333333,0.666667,0.66667,1) 0s'});
        $content.css('-webkit-transform', 'translate3d(0px, ' + target + 'px, 0px)');
    },
    offset: function(elem) {
        var left = 0,
                top = 0,
                _this = elem;
        while (_this.offsetParent) {
            left += _this.offsetLeft;
            top += _this.offsetTop;
            _this = _this.offsetParent;
        }
        return {
            "left": left,
            "top": top
        }
    },
    getMaxMove: function() {
        var self = this, opt = this.options;
        var height = $('#' + opt.id).height();         /*用this.id及时更新dom的状态*/
        var maxMove = height - $(this.dom).parent().height();
        if (maxMove < 0)
            maxMove = 0;
        return maxMove;
    },
    monitor: function() {
        var self = this, opt = this.options;
        var $content = $(this.dom);
        var maxMove = self.getMaxMove();
        var loop = setInterval(function() {
            var translateArray = self.getTranslateArray();
            var translateY = parseInt(translateArray[1]);
            if (translateY > 0) {
                self.stopMoveByCss(translateY);
                self.moveByCss('0.5', 0);
                var callbackFn = function() {
                    opt.pullDownCallback();
                    $content.off('webkitTransitionEnd');
                }
                $content.on('webkitTransitionEnd', callbackFn);
                clearInterval(loop);
            }
            if (translateY < -(maxMove)) {
                self.stopMoveByCss(translateY);
                self.moveByCss('0.5', -maxMove);
                var callbackFn = function() {
                    opt.pullUpCallback();
                    $content.off('webkitTransitionEnd');
                }
                $content.on('webkitTransitionEnd', callbackFn);
                clearInterval(loop);
            }
        }, 100)
    },
});







