/*
 @file 左右滑动组件
 * - ''imgInit'' {Number}: (可选, 默认:2)初始加载几张图片
 * - ''autoPlay'' {Boolean}: ((可选, 默认:true)是否自动播放
 * - ''switchTime'' {Number} :((可选,默认:3000ms)自动播放的切换时间
 * - ''animateTime'' {Number} :((可选,默认:400ms)切换动画时间
 * - ''showDot'' {Boolean}: (可选, 默认:true)是否展示页码
 * - ''slideEnd'' {Function}: (可选)页面切换完成(滑动完成)时执行的函数,参数为滑动后的page页码
 * - ''dotsClass'' {string}:((可选,默认slider-dots)dot外容器的className
 * - ''dotsSelectedClass'' {string}:((可选,默认slider-dot-select)选中了的dot的id
 */

Jumei.widget('ui.slider', {
    init: function(options) {//构造函数
        //组件的所有属性
        this.options = {
            id: 'slider-boxs',
            index: 0,
            imgInit: 2,
            autoPlay: false,
            switchTime: 3000,
            animateTime: 400,
            dotsClass: 'slider-dots',
            dotsSelectedClass: 'slider-dot-select',
            showDot: true,
            slideEnd: null,
            slideStart: null,
            direction: 'right',
        }
        //需要集成父类的构造函数需要这样调用
        //初始化入口
        this._super.call(this, options);
    },
    _create: function() {//组件初始化函数
        var self = this, opt = this.options;
        if (!opt.id || !document.getElementById(opt.id.replace(/^#/, ''))) {
            console.log('id或dom为null!');
            return false;
        }
        opt.dom = document.getElementById(opt.id.replace(/^#/, ''));
        self.constructor = 'slider';
        self.moveFlag = false;
        opt.dom.className += ' slider';
        var width = opt.dom.offsetWidth,
                items = opt.dom.children,
                wheel = document.createElement('div'),
                dotContainer = wheel.cloneNode(),
                dot = document.createElement('b'),
                lazyImgs = [],
                i = 0, j, img, len = items.length;
        if (items.length == 0) {
            console.log('该选择器下的子元素为空！');
            return false;
        }
        for (; j = items[0]; i++) {
            j.className += ' slider-item';
            j.style.cssText += 'width:' + width + 'px;float:left';
            wheel.appendChild(j);
            wheel.setAttribute('class', 'slide-wrapper clearfloat');
            dotContainer.appendChild(dot.cloneNode());
            img = j.getElementsByTagName('img')[0];
            if (i < opt.imgInit) {
                img && !img.src && img.getAttribute('lazyload') && (img.src = img.getAttribute('lazyload'));
            } else {
                lazyImgs.push(img);
            }
        }
        wheel.style.width = width * len + 'px';
        // wheel.style.height = height + 'px';
        wheel.style.cssText += 'position:relative;left:-' + opt.index * width + 'px;';
        dotContainer.className = opt.dotsClass;
        opt.showDot || (dotContainer.style.display = 'none');
        opt.dom.appendChild(wheel);
        opt.dom.appendChild(dotContainer);
        opt.wheel = wheel;
        opt.items = wheel.children;
        opt.length = opt.items.length;
        if (opt.length == 1) {
            dotContainer.style.display = 'none';
        }
        opt.dots = dotContainer.children;
        if (opt.dots.length > 0) {
            opt.dots[opt.index].className = opt.dotsSelectedClass;
        }
        opt.width = width;
        // o.height = height;
        opt.lazyImgs = lazyImgs;
        self.initEvent();
        self.start();
    },
    initEvent: function() {
        var self = this, opt = this.options;
        wheel = opt.wheel;
        wheel.addEventListener('touchstart', function(e) {
            opt.pageX = e.touches[0].pageX;
            opt.pageY = e.touches[0].pageY;
            opt.S = false;      //isScrolling
            opt.T = false;      //isTested
            opt.X = 0;          //horizontal moved
            opt.wheel.style.webkitTransitionDuration = '0ms';
        });
        wheel.addEventListener('touchmove', function(e) {
            var X = opt.X = e.touches[0].pageX - opt.pageX;
            if (!opt.T) {
                var S = Math.abs(X) < Math.abs(e.touches[0].pageY - opt.pageY);
                S || clearTimeout(opt.play);
                opt.T = true;
                opt.S = S;
            }
            if (!opt.S) {
                e.stopPropagation();
                e.preventDefault();
                self.moveFlag = true;
                if (self.options.index == 0 || self.options.index == (self.options.length - 1)) {
                    if (Math.abs(X) < 100) {
                        opt.wheel.style.left = (X - opt.index * opt.width) + 'px';
                    }
                } else {
                    opt.wheel.style.left = (X - opt.index * opt.width) + 'px';
                }
            }
        });
        var touchEnd = function() {
            opt.S || self._slide(opt.index + (opt.X <= -20 ? Math.ceil(-opt.X / opt.width) : (opt.X > 20) ? -Math.ceil(opt.X / opt.width) : 0));
        };
        wheel.addEventListener('touchend', touchEnd);
        wheel.addEventListener('touchcancel', touchEnd);
        wheel.addEventListener('webkitTransitionEnd', function() {
            self.moveFlag = false;
            if (opt.showDot) {
                opt.dom.querySelector('.' + opt.dotsSelectedClass).setAttribute('class', '');
                opt.dots[opt.index].className = opt.dotsSelectedClass;
            }
            self._setTimeout();
            self.options.slideEnd && self.options.slideEnd.apply(self);
        });
    },
    // 轮播位置判断
    _slide: function(index, auto, flagAnimate) {
        var self = this, opt = this.options;
        length = opt.length;
        if (-1 < index && index < length) {
            self._move(index, flagAnimate);
        } else if (index >= length) {
            self._move(length - (auto ? 2 : 1), flagAnimate);
            opt.direction = -1;
        } else {
            self._move(auto ? 1 : 0, flagAnimate);
            opt.direction = 1;
        }
        self.options.slideStart && self.options.slideStart.apply(self);
        return self;
    },
    // 轮播方法
    _move: function(index, flagAnimate) {
        var self = this, opt = this.options;
        var thisIndex = opt.index;
        if (opt.lazyImgs.length) {
            var j = opt.items[index].getElementsByTagName('img')[0];
            j && !j.src && (j.src = j.getAttribute('lazyload'));
        }
        opt.index = index;
        if (flagAnimate == 1) {
            opt.wheel.style.removeProperty('-webkit-transition');
            opt.wheel.style.cssText += 'position:relative;left:-' + index * opt.width + 'px;';
            document.getElementById(opt.dotsSelectedClass).id = '';
            opt.dots[2].id = opt.dotsSelectedClass;
        } else {
            if (index == -1 || index == opt.length) {
                opt.wheel.style.cssText += '-webkit-transition:' + opt.animateTime + 'ms;position:relative;left:-' + (index * opt.width - 100) + 'px';
            } else {
                opt.wheel.style.cssText += '-webkit-transition:' + opt.animateTime + 'ms;position:relative;left:-' + index * opt.width + 'px';
                if ((thisIndex == 3) && (flagAnimate == 2)) {
                    opt.slideEnd && opt.slideEnd.apply(self);
                }

            }
        }
    },
    // 设置自动播放
    _setTimeout: function() {
        var self = this, opt = self.options;
        if (!opt.autoPlay)
            return self;
        clearTimeout(opt.play);
        opt.play = setTimeout(function() {
            self._slide.call(self, opt.index + opt.direction, true);
        }, opt.switchTime);
        return self;
    },
    // 重设容器及子元素宽度
    _resize: function() {
        var self = this, opt = this.options,
                width = opt.dom.offsetWidth,
                items = opt.items, dot = document.createElement('b');
        opt.length = $('#slider .slider-item').length;
        var length = opt.length;
        if (!width)
            return self;
        opt.width = width;
        clearTimeout(opt.play);
        var sliderNot = document.querySelector('.slider-dots');
        sliderNot.innerHTML = '';
        for (var i = 0; i < length; i++) {
            items[i].style.cssText += 'width:' + width + 'px;';
            sliderNot.appendChild(dot.cloneNode());
        }
        opt.dots = sliderNot.children;
        opt.dots[opt.index].id = opt.dotsSelectedClass;
        opt.wheel.style.removeProperty('-webkit-transition');
        opt.wheel.style.cssText += 'width:' + width * length + 'px;position:relative;left:-' + opt.index * width + 'px;';
        opt.direction = 1;

        $('.slider-dots').html();
        self._setTimeout();
        return self;
    },
    start: function() {
        var self = this;
        self.options.direction = self.options.direction == 'left' ? -1 : 1;
        self._setTimeout();
        return self;
    },
    stop: function() {
        var self = this;
        clearTimeout(self.options.play);
        return self;
    },
    prev: function() {
        return this._slide(this.options.index - 1, false);
    },
    next: function() {
        return this._slide(this.options.index + 1, false);
    },
    moveTo: function(index) {
        return this._slide(index, false);
    }
});

