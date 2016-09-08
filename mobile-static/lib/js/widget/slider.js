(function(window, undefined) {
    //ajax
    /*
     * - ''imgInit'' {Number}: (可选, 默认:2)初始加载几张图片
     * - ''autoPlay'' {Boolean}: ((可选, 默认:true)是否自动播放
     * - ''switchTime'' {Number} :((可选,默认:3000ms)自动播放的切换时间
     * - ''animateTime'' {Number} :((可选,默认:400ms)切换动画时间
     * - ''showDot'' {Boolean}: (可选, 默认:true)是否展示页码
     * - ''slideEnd'' {Function}: (可选)页面切换完成(滑动完成)时执行的函数,参数为滑动后的page页码
     * - ''dotsClass'' {string}:((可选,默认slider-dots)dot外容器的className
     * - ''dotsSelectedId'' {string}:((可选,默认slider-dot-select)选中了的dot的id
     */
    var slider = function(id, opt) {
        var self = this;
        opt = opt || {};
        self.data = {
            dom: document.getElementById(id.replace(/^#/, '')),
            index: opt.index || 0,
            imgInit: opt.imgInit || 2,
            autoPlay: opt.autoPlay || false,
            switchTime: opt.switchTime || 3000,
            animateTime: opt.animateTime || 400,
            dotsClass: opt.dotsClass || 'slider-dots',
            dotsSelectedId: opt.dotsSelectedId || 'slider-dot-select',
            showDot: opt.showDot !== undefined ? opt.showDot : true,
            slideEnd: opt.slideEnd || null,
            slideStart: opt.slideStart || null,
            _needPlay: true,
            _direction: 1,
            _jumpFlagOrigin: false,
        };
        self.init();
        self.initEvent();
        self.start();
    };
    slider.prototype = {
        constructor: slider,
        moveFlag: false,
        init: function() {
            var self = this,
                    o = self.data;
            o.dom.className += ' slider';
            var width = o.dom.offsetWidth,
                    height = o.dom.offsetHeight,
                    items = o.dom.children,
                    wheel = document.createElement('div'),
                    dotContainer = wheel.cloneNode(),
                    dot = document.createElement('b'),
                    lazyImgs = [],
                    i = 0, j, img, len = items.length;

            for (; j = items[0]; i++) {
                j.className += ' slider-item';
                j.style.cssText += 'width:' + width + 'px';
                wheel.appendChild(j);
                wheel.setAttribute('class', 'slide-wrapper clearfloat');
                dotContainer.appendChild(dot.cloneNode());
                img = j.getElementsByTagName('img')[0];
                if (i < o.imgInit) {
                    img && !img.src && img.getAttribute('lazyload') && (img.src = img.getAttribute('lazyload'));
                } else {
                    lazyImgs.push(img);
                }
            }
            wheel.style.width = width * len + 'px';
            // wheel.style.height = height + 'px';
            wheel.style.cssText += 'position:relative;left:-' + o.index * width + 'px;';
            dotContainer.className = o.dotsClass;
            o.showDot || (dotContainer.style.display = 'none');
            o.dom.appendChild(wheel);
            o.dom.appendChild(dotContainer);
            o.wheel = wheel;
            o.items = wheel.children;
            o.length = o.items.length;
            if (o.length == 1) {
                dotContainer.style.display = 'none';
            }
            o.dots = dotContainer.children;
            if(o.dots.length >0){
                o.dots[o.index].className = o.dotsSelectedId;
            }
            o.width = width;
            // o.height = height;
            o.lazyImgs = lazyImgs;
        },
        initEvent: function() {
            var self = this,
                    o = self.data,
                    wheel = o.wheel;
            wheel.addEventListener('touchstart', function(e) {
                o.pageX = e.touches[0].pageX;
                o.pageY = e.touches[0].pageY;
                o.S = false;      //isScrolling
                o.T = false;      //isTested
                o.X = 0;          //horizontal moved
                o.wheel.style.webkitTransitionDuration = '0ms';
            });
            wheel.addEventListener('touchmove', function(e) {
                self._closeCallFlag();
                var X = o.X = e.touches[0].pageX - o.pageX;
                if (!o.T) {
                    var S = Math.abs(X) < Math.abs(e.touches[0].pageY - o.pageY);
                    S || clearTimeout(o.play);
                    o.T = true;
                    o.S = S;
                }
                if (!o.S) {
                    e.stopPropagation();
                    e.preventDefault();
                    self.moveFlag = true;
                    if (self.data.index == 0 || self.data.index == (self.data.length - 1)) {
                        if (Math.abs(X) < 100) {
                            o.wheel.style.left = (X - o.index * o.width) + 'px';
                        }
                    } else {
                        o.wheel.style.left = (X - o.index * o.width) + 'px';
                    }
                }
            });
            var touchEnd = function() {
                o.S || self._slide(o.index + (o.X <= -20 ? Math.ceil(-o.X / o.width) : (o.X > 20) ? -Math.ceil(o.X / o.width) : 0));
            };
            wheel.addEventListener('touchend', touchEnd);
            wheel.addEventListener('touchcancel', touchEnd);
            wheel.addEventListener('webkitTransitionEnd', function() {
                self.moveFlag = false;
                if (o.showDot) {
                    o.dom.querySelector('.' + o.dotsSelectedId).setAttribute('class', '');
                    o.dots[o.index].className = o.dotsSelectedId;
                }
                self._setTimeout();
                self.data.slideEnd && self.data.slideEnd.apply(self);
            });
        },
        // 轮播位置判断
        _slide: function(index, auto, flagAnimate) {
            var self = this,
                    o = self.data,
                    length = o.length;
            if (-1 < index && index < length) {
                self._move(index, flagAnimate);
            } else if (index >= length) {
                self._move(length - (auto ? 2 : 1), flagAnimate);
                o._direction = -1;
            } else {
                self._move(auto ? 1 : 0, flagAnimate);
                o._direction = 1;
            }
            self.data.slideStart && self.data.slideStart.apply(self);
            return self;
        },
        // 轮播方法
        _move: function(index, flagAnimate) {
            var self = this;
            var o = this.data, self = this, thisIndex = o.index;
            if (o.lazyImgs.length) {
                var j = o.items[index].getElementsByTagName('img')[0];
                j && !j.src && (j.src = j.getAttribute('lazyload'));
            }
            o.index = index;

            //                        if(flagAnimate == 2){
            //                            self._openCallFlag();
            //                        }
            if (flagAnimate == 1) {
                o.wheel.style.removeProperty('-webkit-transition');
                o.wheel.style.cssText += 'position:relative;left:-' + index * o.width + 'px;';
                document.getElementById(o.dotsSelectedId).id = '';
                o.dots[2].id = o.dotsSelectedId;
            } else {
                if (index == -1 || index == o.length) {
                    o.wheel.style.cssText += '-webkit-transition:' + o.animateTime + 'ms;position:relative;left:-' + (index * o.width - 100) + 'px';
                } else {
                    o.wheel.style.cssText += '-webkit-transition:' + o.animateTime + 'ms;position:relative;left:-' + index * o.width + 'px';
                    if ((thisIndex == 3) && (flagAnimate == 2)) {
                        //  self._closeCallFlag();
                        o.slideEnd && o.slideEnd.apply(self);
                    }

                }
            }
        },
        _closeCallFlag: function() {
            this.data._jumpFlagOrigin = false;
        },
        _openCallFlag: function() {
            this.data._jumpFlagOrigin = true;
        },
        // 设置自动播放
        _setTimeout: function() {
            var self = this,
                    o = self.data;
            if (!o._needPlay || !o.autoPlay)
                return self;
            clearTimeout(o.play);
            o.play = setTimeout(function() {
                self._slide.call(self, o.index + o._direction, true);
            }, o.switchTime);
            return self;
        },
        // 重设容器及子元素宽度
        _resize: function() {

            var self = this,
                    o = self.data,
                    width = o.dom.offsetWidth,
                    items = o.items, dot = document.createElement('b');
            o.length = $('#slider .slider-item').length;
            var length = o.length;
            if (!width)
                return self;
            o.width = width;
            clearTimeout(o.play);
            var sliderNot = document.querySelector('.slider-dots');
            sliderNot.innerHTML = '';
            for (var i = 0; i < length; i++) {
                items[i].style.cssText += 'width:' + width + 'px;';
                sliderNot.appendChild(dot.cloneNode());
            }
            o.dots = sliderNot.children;
            o.dots[o.index].id = o.dotsSelectedId;
            o.wheel.style.removeProperty('-webkit-transition');
            o.wheel.style.cssText += 'width:' + width * length + 'px;position:relative;left:-' + o.index * width + 'px;';
            o._direction = 1;

            $('.slider-dots').html();
            self._setTimeout();
            return self;
        },
        start: function() {
            var self = this;
            self.data._direction = 1;
            self.data._needPlay = true;
            self._setTimeout();
            return self;
        },
        stop: function() {
            var self = this;
            clearTimeout(self.data.play);
            self.data._needPlay = false;
            return self;
        },
        prev: function() {
            return this._slide(this.data.index - 1, false);
        },
        next: function() {
            return this._slide(this.data.index + 1, false);
        },
        moveTo: function(index) {
            return this._slide(index, false);
        }
    };
    window.Slider = slider;
}(window));

