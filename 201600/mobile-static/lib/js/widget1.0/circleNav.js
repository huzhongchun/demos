/**
 * @file 圆形导航导航组件
 * @import zepto.js jumei.js
 */
Jumei.widget('ui.circleNav', {
    init: function(options) {//构造函数
        //组件的所有属性
        this.options = {
            id: 'nav-btn',
            radius: 50,
            animateTime: 0.3,
            baseDeg: 30,
            hrefsText: [['', ''], ['', ''], ['', ''], ['', ''], ['', '']],
            touchSupport: false,
            startDeg: 0,
            offsetX: 0,
            offsetY: 0,
            intervalTime: 100
        }
        //需要集成父类的构造函数需要这样调用
        //初始化入口
        this._super.call(this, options);
    },
    _create: function() {//组件初始化函数
        var self = this, opt = this.options, schemeClassName = '';
        self.animateEnd = false;
        self.toggleFlag = false;
        if (!opt.id || !document.getElementById(opt.id.replace(/^#/, ''))) {
            console.log('id或dom为null!');
            return false;
        }
        var $navBtn = self.element = $('#' + opt.id);
        self.element.css('z-index', 2);
        var $box = $('<ul id="nav-items-box"></ul>');
        self.l = opt.hrefsText.length;
        if (opt.touchSupport)
            schemeClassName = 'url-scheme';
        for (var i = 0; i < self.l; i++) {
            var stringHref = opt.hrefsText[i][0] ? 'href="' + opt.hrefsText[i][0] + '"' : '';
            var stringText = opt.hrefsText[i][1];
            $box.append('<li class="item"><a class="' + schemeClassName + '" ' + stringHref + ' index="hrefid' + i + '">' + stringText + '</a></li>');
        }
        $navBtn.parent().append($box);
        var bottomNavBtn = parseInt($navBtn.css('bottom'));
        var rightNavBtn = parseInt($navBtn.css('right'));
        $box.css({
            'position': 'absolute',
            'bottom': bottomNavBtn,
            'right': rightNavBtn,
        });
        self.items = $('.item');
        var widthNavBtn = $navBtn.width();
        var widthItem = self.items.width();
        var heightNavBtn = $navBtn.height();
        var heightItem = self.items.height();
        var initItemX = widthNavBtn / 2 - widthItem / 2;
        var initItemY = heightNavBtn / 2 - heightItem / 2;
        self.items.each(function(index) {
            $(this).css({'position': 'absolute', 'bottom': initItemY + 'px', 'right': initItemX + 'px',
                'transition': '-webkit-transform ' + opt.animateTime + 's ease-out 0s', '-webkit-transform': 'translate3d(0px, 0px, 0px) rotateZ(720deg)'});
        })
        self.addListener();
    },
    addListener: function() {
        var self = this, opt = this.options;
        self.element.on('click', function() {
            if (!self.animateEnd) {
                if (!self.toggleFlag) {
                    self.items.each(function(index) {
                        var _this = this;
                        /*圆心*/
                        var startDeg = index + opt.startDeg;
                        var X = (opt.offsetX - Math.cos((opt.baseDeg * startDeg) * Math.PI / 180) * opt.radius).toFixed(1);
                        var Y = (Math.sin((opt.baseDeg * startDeg) * Math.PI / 180) * opt.radius + opt.offsetY).toFixed(1);
                        setTimeout(function() {
                            $(_this).css({'-webkit-transform': 'translate3d(' + (-X) + 'px, ' + (-Y) + 'px, 0px) rotateZ(0deg)'});
                            self.animateEnd = true;
                            if (index == self.l - 1)
                                self.animateEnd = false;
                        }, opt.intervalTime * index);
                    })
                    self.toggleFlag = true;
                }
                else {
                    self.items.each(function(index) {
                        var _this = this;
                        setTimeout(function() {
                            $(_this).css({'-webkit-transform': 'translate3d(0px, 0px, 0px) rotateZ(720deg)'});
                            self.animateEnd = true;
                            if (index == 0)
                                self.animateEnd = false;
                        }, opt.intervalTime * (self.l - 1 - index));
                    })
                    self.toggleFlag = false;
                }
            }
        })
    },
});