/**
 * @file 3d轮播组件
 * @import zepto.js jumei.js
 *
 *perspective 3d景深效果
 *opt.rotateY 旋转的角度
 *opt.transitionTime 切换的动画效果时长
 *opt.autoPlayDirection 自动播放的方向
 *opt.autoPlayChangeTime 自动切换的时间间隔
 *opt.getIndexCallback 切换的回调函数（返回当前index）
 */
Jumei.widget('ui.carousel3D', {
    init: function(options) {//构造函数
        //组件的所有属性
        this.options = {
            'id': 'carousel3D-boxs',
            'index': 0,
            'perspective': 600,
            'rotateY': 75,
            'transitionTime': 0.8,
            'isShowDots': true,
            'isPlayAuto': false,
            'autoPlayDirection': 'right',
            'autoPlayChangeTime': 3000,
            'animateEndCallBack': null,
            'prev': '',
            'next': ''
        }
        this._super.call(this, options);
    },
    _create: function() {//组件初始化函数
        var self = this, opt = this.options;
        self.flag = false;
        if (!opt.id || !document.getElementById(opt.id.replace(/^#/, ''))) {
            console.log('id或dom为null!');
            return false;
        }
        opt.dom = document.getElementById(opt.id.replace(/^#/, ''));
        opt.width = opt.dom.clientWidth;
        opt.height = opt.dom.clientHeight;
        opt.translateX = parseInt(opt.dom.clientWidth * (Math.cos(opt.rotateY * Math.PI / 180) + 0.5));
        opt.translateZ = parseInt(opt.dom.clientWidth * (Math.sin(opt.rotateY * Math.PI / 180)));
        opt.Str_change_left_l = '-webkit-transform: translateX(-' + (opt.translateX + 50) + 'px) translateZ(-' + (opt.translateZ + 50) + 'px) rotateY(' + (opt.rotateY) + 'deg);opacity:0;';
        opt.Str_change_left = '-webkit-transform: translateX(-' + opt.translateX + 'px) translateZ(-' + (opt.translateZ) + 'px) rotateY(' + (opt.rotateY) + 'deg);opacity:0.5;';
        opt.Str_change_center = '-webkit-transform: translateX(0px) translateZ(0px) rotateY(0deg);opacity:1;';
        opt.Str_change_right = '-webkit-transform: translateX(' + opt.translateX + 'px) translateZ(-' + (opt.translateZ) + 'px) rotateY(-' + (opt.rotateY) + 'deg);opacity:0.5;';
        opt.Str_change_right_r = '-webkit-transform: translateX(' + (opt.translateX + 50) + 'px) translateZ(-' + (opt.translateZ + 50) + 'px) rotateY(-' + (opt.rotateY) + 'deg);opacity:0;';
        opt.dom.style.cssText += '-webkit-transform-style: preserve-3d;-webkit-perspective: ' + opt.perspective + 'px;position:relative';
        /****if < 5 clone***/
        var carousel_items_parent = opt.dom;
        var start_carousel_items = carousel_items_parent.children;
        opt.dots_len = start_carousel_items.length;
        /****if 1 end*/
        if (opt.dots_len <= 1) {
            return false;
        }
        if (opt.dots_len < 5) {
            for (var i = 0; i < opt.dots_len; i++) {
                var Tem = start_carousel_items[i].cloneNode(true);
                carousel_items_parent.appendChild(Tem);
            }
            opt.isCloneNode = true;
        }
        /****Add dots***/
        if (opt.isShowDots) {
            var str = '';
            var dots_content = document.createElement('div');
            dots_content.className = 'carousel-dots-area';
            carousel_items_parent.parentNode.appendChild(dots_content);
            for (var i = 0; i < opt.dots_len; i++) {
                var b = document.createElement('b');
                dots_content.appendChild(b);
            }
            opt.dots = document.querySelector('.carousel-dots-area').children;
            self.dotsChange(opt.index);
        }
        /**Init start item position*/
        opt.childs = carousel_items_parent.children;
        for (var i = 0; i < opt.childs.length; i++) {
            opt.childs[i].style.cssText += 'width:' + opt.width + 'px ;height: ' + opt.height + 'px ;position: absolute;opacity:0;-webkit-transition: -webkit-transform ' + opt.transitionTime + 's ease 0s,opacity ' + opt.transitionTime + 's ease 0s;';
        }
        //opt.childs[opt.index].style.cssText += 'z-index: 10';
        opt.maxNum = opt.childs.length - 1;
        setTimeout(function() {
            var prev_i = opt.index - 1;
            prev_i = prev_i < 0 ? opt.maxNum : prev_i;
            opt.childs[prev_i].style.cssText += opt.Str_change_left;
            var prev_prev_i = prev_i - 1;
            prev_prev_i = prev_prev_i < 0 ? opt.maxNum : prev_prev_i;
            opt.childs[prev_prev_i].style.cssText += opt.Str_change_left_l;

            opt.childs[opt.index].style.cssText += opt.Str_change_center;

            var next_i = opt.index + 1;
            next_i = next_i > opt.maxNum ? 0 : next_i;
            opt.childs[next_i].style.cssText += opt.Str_change_right;
            var next_next_i = next_i + 1;
            next_next_i = next_next_i > opt.maxNum ? 0 : next_next_i;
            opt.childs[next_next_i].style.cssText += opt.Str_change_right_r;
        }, 200);
        self.initEventListener();
        /*isPlayAuto*/
        if (opt.isPlayAuto) {
            setInterval(function() {
                if (opt.autoPlayDirection == 'left')
                    self.moveLeft(opt.index);
                else
                    self.moveRight(opt.index);
            }, opt.autoPlayChangeTime);
        }
    },
    moveRight: function(index) {
        var self = this, opt = this.options;
        var cur_index = index;
        var prev_index = cur_index - 1;
        prev_index = prev_index < 0 ? opt.maxNum : prev_index;
        var next_index = cur_index + 1;
        next_index = next_index > opt.maxNum ? 0 : next_index;
        var next_next_index = next_index + 1;
        next_next_index = next_next_index > opt.maxNum ? 0 : next_next_index;
        var next_next_next_index = next_next_index + 1;
        next_next_next_index = next_next_next_index > opt.maxNum ? 0 : next_next_next_index;

        var cur_dom = opt.childs[cur_index];
        var prev_dom = opt.childs[prev_index];
        var next_dom = opt.childs[next_index];
        var next_next_dom = opt.childs[next_next_index];
        var next_next_next_dom = opt.childs[next_next_next_index];


        prev_dom.style.cssText += opt.Str_change_left_l;
        cur_dom.style.cssText += opt.Str_change_left;
        next_dom.style.cssText += opt.Str_change_center;
        next_next_dom.style.cssText += opt.Str_change_right;
        next_next_next_dom.style.cssText += opt.Str_change_right_r;
        /*****update o.index*****/
        opt.index = next_index;
        var naturalIndex = self.getNaturalIndex(opt.index);
        if (opt.isShowDots)
            self.dotsChange(naturalIndex);
        self.moveCalllBack.call(self, naturalIndex);
    },
    moveLeft: function(index) {
        var self = this, opt = this.options;
        var cur_index = index;
        var next_index = cur_index + 1;
        next_index = next_index > opt.maxNum ? 0 : next_index;
        var prev_index = cur_index - 1;
        prev_index = prev_index < 0 ? opt.maxNum : prev_index;
        var prev_prev_index = prev_index - 1;
        prev_prev_index = prev_prev_index < 0 ? opt.maxNum : prev_prev_index;
        var prev_prev_prev_index = prev_prev_index - 1;
        prev_prev_prev_index = prev_prev_prev_index < 0 ? opt.maxNum : prev_prev_prev_index;

        var cur_dom = opt.childs[cur_index];
        var next_dom = opt.childs[next_index];
        var prev_dom = opt.childs[prev_index];
        var prev_prev_dom = opt.childs[prev_prev_index];
        var prev_prev_prev_dom = opt.childs[prev_prev_prev_index];

        next_dom.style.cssText += opt.Str_change_right_r;
        cur_dom.style.cssText += opt.Str_change_right;
        prev_dom.style.cssText += opt.Str_change_center;
        prev_prev_dom.style.cssText += opt.Str_change_left;
        prev_prev_prev_dom.style.cssText += opt.Str_change_left_l;
        /*****update o.index*****/
        opt.index = prev_index;
        var naturalIndex = self.getNaturalIndex(opt.index);
        if (opt.isShowDots)
            self.dotsChange(naturalIndex);
        self.moveCalllBack.call(self, naturalIndex);
    },
    initEventListener: function() {
        var self = this, opt = this.options;
        if (opt.next)
            document.getElementById(opt.next).addEventListener('click', function() {
                self.moveRight(opt.index);
            });
        if (opt.prev)
            document.getElementById(opt.prev).addEventListener('click', function() {
                self.moveLeft(opt.index);
            });
        var touchEnd = function() {
            if (opt.X < -5) {
                self.moveRight(opt.index);
            }
            if (opt.X > 5) {
                self.moveLeft(opt.index);
            }
        };
        opt.dom.addEventListener('touchstart', function(e) {
            opt.pageX = e.touches[0].pageX;
            opt.pageY = e.touches[0].pageY;
            opt.X = 0;
        });
        opt.dom.addEventListener('touchmove', function(e) {
            opt.X = e.touches[0].pageX - opt.pageX;
        });
        opt.dom.addEventListener('touchend', touchEnd);
        opt.dom.addEventListener('touchcancel', touchEnd);
        var childs = opt.dom.children;
        for (var i = 0; i < childs.length; i++) {
            childs[i].addEventListener('webkitTransitionEnd', function() {
                self.webkitTransitionEndCallBack.call(self);
            }, false);
        }
    },
    dotsChange: function(index) {
        var self = this, opt = this.options;
        if (document.querySelector('.carousel-dot-selected'))
            document.querySelector('.carousel-dot-selected').setAttribute('class', '');
        opt.dots[index].className = 'carousel-dot-selected';
    },
    getNaturalIndex: function(index) {
        var self = this, opt = this.options;
        if (opt.isCloneNode)
            return index % opt.dots_len;
        else
            return index;
    },
    moveCalllBack: function(index) {
        this.flag = true;
    },
    webkitTransitionEndCallBack: function() {
        var self = this, opt = this.options;
        if (self.flag == true && opt.animateEndCallBack) {
            self.flag = false;
            var index = self.getNaturalIndex(opt.index);
            opt.animateEndCallBack.call(self, index);
        }
    }
});


