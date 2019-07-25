/**
 * 上下滑动
 * @example
 <ul id="slider-ul">
 <li class="clearfloat">
 <li>
 <li class="clearfloat">
 <li>
 </ul>
 $('#slider-ul').upslide({'elem':''});
 */

Jumei.widget('ui.uprotate', {
    init: function(options) {
        this.options = {
            index: 0,
            showDot: true
        };
        //需要集成父类的构造函数需要这样调用
        //初始化入口
        this._super.call(this, options);
    },
    _create: function() {
        var width = $(window).width();
        var height = $(window).height();
        var $this = $(this.element);
        var $children = $this.children();
        $this.width(width);
        $this.height(height);
        $children.height(height);
        $children.each(function(k) {
            $(this).css({'position': 'absolute', 'width': '100%', 'z-index': $children.length - k});
        });
        this.options.windowHeight = height;


        var dotContainer = document.createElement('div');
        dotContainer.className = 'slider-dots';
        var dot = document.createElement('b');
        for (var j = 0; j < $children.length; j++) {
            dotContainer.appendChild(dot.cloneNode());
        }
        var dotWrapper = dotContainer.cloneNode();
        dotWrapper.className = 'slider-dots-wrapper';
        dotWrapper.appendChild(dotContainer);
        $('#slider-ul').after(dotWrapper);
        var o = this.options;
        o.dot = dotContainer;
        o.index = o.index || 0;
        o.dots = dotContainer.children;
        o.dots[o.index].id = 'slider-dot-select';


        this.initEvent();
    },
    initEvent: function() {
        var o = this.options;
        var self = this;
        var wheel = o.wheel = this.element;
        o.height = $(window).height();
        o.length = $(wheel).children().length;
        var childrenArr = o.childrenArr = wheel.querySelectorAll('li');
        childrenArr[o.index].style.display = 'block';
        wheel.addEventListener('touchstart', function(e) {
            o.pageX = e.touches[0].pageX;
            o.pageY = e.touches[0].pageY;
            o.S = false;      //isScrolling
            o.T = false;      //isTested
            o.X = 0;
            o.Y = 0//horizontal moved
        });

        wheel.addEventListener('touchmove', function(e) {
            var X = o.X = e.touches[0].pageX - o.pageX;
            var absX = Math.abs(X);
            if (!o.T) {
                var S = Math.abs(X) < Math.abs(e.touches[0].pageX - o.pageX);
                S || clearTimeout(o.play);
                o.T = true;
                o.S = S;
            }
            if (!o.S) {
                e.stopPropagation();
                e.preventDefault();
                if (Math.abs(X) < 1000) {
                    if (X > 0 && o.index > 0) {
                        if (o.index - 1 >= 0) {
                            childrenArr[o.index - 1].style.display = 'block';
                            childrenArr[o.index - 1].style.webkitTransitionDuration = '0ms';
                            childrenArr[o.index - 1].style.webkitTransform = 'translate3d(-' + (388 - absX / 320 * 388) + 'px,-' + (50 - absX / 320 * 50) + 'px,0px) rotate(' + (15 - absX / 320 * 15) + 'deg)';
                        }
                        if (o.index + 1 <= (o.length - 1)) {
                            childrenArr[o.index + 1].style.display = 'none';
                        }
                        childrenArr[o.index].style.webkitTransitionDuration = '0ms';
                        childrenArr[o.index].style.webkitTransform = 'translate3d(' + (absX / 320 * 388) + 'px,-' + (absX / 320 * 50) + 'px,0px) rotate(-' + (absX / 320 * 15) + 'deg)';
                    } else if (X < 0 && o.index < o.length - 1) {
                        if (o.index - 1 >= 0) {
                            childrenArr[o.index - 1].style.display = 'none';
                        }
                        if (o.index + 1 <= (o.length - 1)) {
                            childrenArr[o.index + 1].style.display = 'block';
                            childrenArr[o.index + 1].style.webkitTransitionDuration = '0ms';
                            childrenArr[o.index + 1].style.webkitTransform = 'translate3d(' + (388 - absX / 320 * 388) + 'px,-' + (50 - absX / 320 * 50) + 'px,0px) rotate(-' + (15 - absX / 320 * 15) + 'deg)';
                        }
                        childrenArr[o.index].style.webkitTransitionDuration = '0ms';
                        childrenArr[o.index].style.webkitTransform = 'translate3d(-' + (absX / 320 * 388) + 'px,-' + (absX / 320 * 50) + 'px,0px) rotate(' + (absX / 320 * 15) + 'deg)';
                    }
                }
            }
        });


        var touchEnd = function() {
            // if(Math.abs(o.X)>20){
            o.S || self.slide(childrenArr[o.index], o.index + (o.X <= -20 ? Math.ceil(-o.X / o.height) : (o.X > 20) ? -Math.ceil(o.X / o.height) : 0));
            //   }
        };
        wheel.addEventListener('touchend', touchEnd);
        wheel.addEventListener('touchcancel', touchEnd);
        for (var i = 0; i < childrenArr.length; i++) {
            childrenArr[i].addEventListener('webkitTransitionEnd', function() {
                childrenArr[o.index].style.display = 'block';
                if (o.showDot) {
                    document.getElementById('slider-dot-select').id = '';
                    o.dots[o.index].id = 'slider-dot-select';
                }
            });
        }
    },
    slide: function(index, auto) {
        var o = this.options;
        var self = this,
                length = o.length;
        if (-1 < index && index < length) {
            self.move(index);
        } else if (index >= length) {
            self.move(length - (auto ? 2 : 1));
            o._direction = -1;
        } else {
            self.move(auto ? 1 : 0);
            o._direction = 1;
        }
    },
    move: function() {
        var o = this.options;
        var elem = o.childrenArr;
        var index = o.index;
        if (o.X < 0 && index != (o.length - 1)) {
            if (o.X < -20) {
                elem[o.index].style.webkitTransitionDuration = '400ms';
                elem[o.index].style.webkitTransform = 'translate3d(-388px,-50px,0px) rotate(15deg)';
                o.index += o.X > 0 ? -1 : 1;
                elem[o.index].style.webkitTransitionDuration = '400ms';
                elem[o.index].style.webkitTransform = 'translate3d(0px,0px,0px) rotate(0deg)';
            } else {
                elem[o.index].style.webkitTransitionDuration = '400ms';
                elem[o.index].style.webkitTransform = 'translate3d(0,0,0px) rotate(0)';
                index += o.X > 0 ? -1 : 1;
                elem[index].style.webkitTransitionDuration = '400ms';
                elem[index].style.webkitTransform = 'translate3d(388px,-50px,0px) rotate(-15deg)';
            }
        } else if (o.X > 0 && index != 0) {
            if (o.X > 20) {
                elem[o.index].style.webkitTransitionDuration = '400ms';
                elem[o.index].style.webkitTransform = 'translate3d(388px,-50px,0px) rotate(-15deg)';
                o.index += o.X > 0 ? -1 : 1;
                elem[o.index].style.webkitTransitionDuration = '400ms';
                elem[o.index].style.webkitTransform = 'translate3d(0px,0px,0px) rotate(0deg)';
            } else {
                elem[o.index].style.webkitTransitionDuration = '400ms';
                elem[o.index].style.webkitTransform = 'translate3d(0,0px,0px) rotate(0deg)';
                index += o.X > 0 ? -1 : 1;
                elem[index].style.webkitTransitionDuration = '400ms';
                elem[index].style.webkitTransform = 'translate3d(-388px,-50px,0px) rotate(15deg)';
            }
        }
    }
});

