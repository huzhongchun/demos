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

Jumei.widget('ui.upslide', {
    init: function(options) {
        this.options = {
            pic: '',
            title: '聚美',
            link_url: 'http://d.jumei.com',
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
        this.initEvent();
    },
    initEvent: function() {
        var o = this.options;
        var self = this;
        var wheel = o.wheel = this.element;
        o.index = 0;
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
            var Y = o.Y = e.touches[0].pageY - o.pageY;
            if (!o.T) {
                var S = Math.abs(Y) < Math.abs(e.touches[0].pageY - o.pageY);
                S || clearTimeout(o.play);
                o.T = true;
                o.S = S;
            }
            if (!o.S) {
                e.stopPropagation();
                e.preventDefault();
                if (Math.abs(Y) < 1000) {
                    if (Y > 0 && o.index > 0) {
                        if (o.index - 1 >= 0) {
                            childrenArr[o.index - 1].style.display = 'block';
                            childrenArr[o.index - 1].style.webkitTransitionDuration = '0ms';
                            childrenArr[o.index - 1].style.webkitTransform = 'translate3d(0,' + (-o.windowHeight + Y) + 'px,0)';
                        }
                        if (o.index + 1 <= (o.length - 1)) {
                            childrenArr[o.index + 1].style.display = 'none';
                        }
                        childrenArr[o.index].style.webkitTransitionDuration = '0ms';
                        childrenArr[o.index].style.webkitTransform = 'scale(' + (1 - Math.abs(Y) / o.windowHeight * 0.5) + ')';
                        childrenArr[o.index].style.opacity = (1 - Math.abs(Y) / o.windowHeight * 1);
                    } else if (Y < 0 && o.index < o.length - 1) {
                        if (o.index - 1 >= 0) {
                            childrenArr[o.index - 1].style.display = 'none';
                        }
                        if (o.index + 1 <= (o.length - 1)) {
                            childrenArr[o.index + 1].style.display = 'block';
                            childrenArr[o.index + 1].style.webkitTransitionDuration = '0ms';
                            childrenArr[o.index + 1].style.webkitTransform = 'scale(' + (0.5 + Math.abs(Y) / o.windowHeight * 0.5) + ')';
                            childrenArr[o.index + 1].style.opacity = (Math.abs(Y) / o.windowHeight * 1);
                        }
                        childrenArr[o.index].style.webkitTransitionDuration = '0ms';
                        childrenArr[o.index].style.webkitTransform = 'translate3d(0,' + Y + 'px,0)';
                    }
                }
            }
        });


        var touchEnd = function() {
            if (Math.abs(o.Y) > 20) {
                o.S || self.slide(childrenArr[o.index], o.index + (o.Y <= -20 ? Math.ceil(-o.Y / o.height) : (o.Y > 20) ? -Math.ceil(o.Y / o.height) : 0));
            }
        };
        wheel.addEventListener('touchend', touchEnd);
        wheel.addEventListener('touchcancel', touchEnd);
        for (var i = 0; i < childrenArr.length; i++) {
            childrenArr[i].addEventListener('webkitTransitionEnd', function() {
                childrenArr[o.index].style.display = 'block';
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
        if (o.Y < 0 && index != (o.length - 1)) {
            elem[o.index].style.webkitTransitionDuration = '400ms';
            elem[o.index].style.webkitTransform = 'translate3d(0,-' + o.windowHeight + 'px,0)';
            elem[o.index].style.opacity = 0;
            o.index += o.Y > 0 ? -1 : 1;
            elem[o.index].style.webkitTransitionDuration = '400ms';
            elem[o.index].style.webkitTransform = 'translate3d(0,0px,0) scale(1)';
            elem[o.index].style.opacity = 1;
        } else if (o.Y > 0 && index != 0) {
            elem[o.index].style.webkitTransitionDuration = '400ms';
            elem[o.index].style.opacity = 0;
            o.index += o.Y > 0 ? -1 : 1;
            elem[o.index].style.webkitTransitionDuration = '400ms';
            elem[o.index].style.webkitTransform = 'translate3d(0,0px,0) scale(1)';
            elem[o.index].style.opacity = 1;
        }
    }
});

