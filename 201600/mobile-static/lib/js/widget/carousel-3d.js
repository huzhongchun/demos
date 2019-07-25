/*
*
*perspective 3d景深效果
*opt.rotateY 旋转的角度
*opt.transitionTime 切换的动画效果时长
*opt.autoPlayDirection 自动播放的方向
*opt.autoPlayChangeTime 自动切换的时间间隔
<<<<<<< local
*opt.animateEndCallBack 切换动画结束后的回调函数
*
*for example ：
*
*-----css-----
*#carousel-box {
*    margin: 10px auto 0;
*    overflow: hidden;
*}
*#carousel-3d {
*    width: 250px;
*    height: 160px;
*    margin: 0 auto;
* }
*#carousel-3d a{
*   display: block;
* }
*.carousel-item {
*    display: block;
*    width: 250px;
*    height: 160px;
* }
*#carousel-dots-area{
*    width: 250px;
*    height: 20px;
*    margin: 10px auto 0;
*    text-align: center;
* }
*#carousel-dots-area b{
*    display: inline-block;
*    width: 10px;
*    height: 10px;
*    border-radius: 10px;
*    margin-right:5px;
*    background: #fff;
*    border: 1px solid #56ace7;
* }
*b#carousel-selected{
*    background: #56ace7;
* }
*----HTML----
*<div id="carousel-box">
*    <div id="carousel-3d">
*         <a href=""><img class="carousel-item" src="http://p0.jmstatic.com/mobile/card_material/item_5198_500_380-phone640.jpg?t=1413943949"></a>
*         <a href=""><img class="carousel-item" src="http://p0.jmstatic.com/mobile/card_material/item_5199_500_380-phone640.jpg?t=1413943967"></a>
*    </div>
*</div>
*
*-----javascript-----
* var d = new carousel('carousel-3d',{'isShowDots':true,'isPlayAuto':false,'autoPlayChangeTime':2000,'animateEndCallBack':alertF});
=======
*opt.getIndexCallback 切换的回调函数（返回当前index）
>>>>>>> other
*/
(function(window,undefined){
                var carousel = function(id,opt){
                    var self = this;
                    opt = opt || {};
                    self.data = {
                        'id': id,
                        'dom': document.getElementById(id) ,
                        'index': opt.index || 0,
                        'perspective': opt.perspective || 600,
                        'rotateY': opt.rotateY || 75,
                        'transitionTime': opt.transitionTime || 0.8,
                        'isShowDots': typeof opt.isShowDots == 'undefined'? true : opt.isShowDots,
                        'isPlayAuto': opt.isPlayAuto || false,
                        'autoPlayDirection': opt.autoPlayDirection || 'right',
                        'autoPlayChangeTime': opt.autoPlayChangeTime || 3000,
                        'animateEndCallBack': opt.animateEndCallBack || null,
                        'prev': opt.prev,
                        'next': opt.next
                    }
                    self.Init();
                }
                carousel.prototype = {
                    flag: false,
                    Init:function(){
                        var self = this;
                        o = self.data;
                        o.translateX = parseInt(o.dom.clientWidth * (Math.cos(o.rotateY*Math.PI/180) + 0.5));
                        o.translateZ = parseInt(o.dom.clientWidth * (Math.sin(o.rotateY*Math.PI/180)));
                        o.Str_change_left_l = '-webkit-transform: translateX(-'+(o.translateX+50)+'px) translateZ(-'+(o.translateZ+50)+'px) rotateY('+(o.rotateY)+'deg);opacity:0;';
                        o.Str_change_left = '-webkit-transform: translateX(-'+o.translateX+'px) translateZ(-'+(o.translateZ)+'px) rotateY('+(o.rotateY)+'deg);opacity:0.5;';
                        o.Str_change_center = '-webkit-transform: translateX(0px) translateZ(0px) rotateY(0deg);opacity:1;';
                        o.Str_change_right = '-webkit-transform: translateX('+o.translateX+'px) translateZ(-'+(o.translateZ)+'px) rotateY(-'+(o.rotateY)+'deg);opacity:0.5;';
                        o.Str_change_right_r = '-webkit-transform: translateX('+(o.translateX+50)+'px) translateZ(-'+(o.translateZ+50)+'px) rotateY(-'+(o.rotateY)+'deg);opacity:0;';
                        o.dom.style.cssText += '-webkit-transform-style: preserve-3d;-webkit-perspective: '+o.perspective+'px;position:relative';
                        /****if < 5 clone***/
                        var carousel_items_parent = o.dom;
                        var start_carousel_items = carousel_items_parent.children;
                        o.dots_len = start_carousel_items.length;
                        /****if 1 end*/
                        if(o.dots_len <= 1){
                            return false;
                        }
                        if(o.dots_len < 5){
                            for(var i=0 ;i < o.dots_len ;i++){
                                var Tem = start_carousel_items[i].cloneNode(true);
                                carousel_items_parent.appendChild(Tem);
                            }
                            o.isCloneNode = true ;
                        }
                        /****Add dots***/
                        if(o.isShowDots){
                            var str = '';
                            var dots_content = document.createElement('div');
                            dots_content.id = 'carousel-dots-area';
                            carousel_items_parent.parentNode.appendChild(dots_content);
                            for(var i = 0;i < o.dots_len;i++){
                                var b = document.createElement('b');
                                dots_content.appendChild(b);
                            }
                            o.dots = document.getElementById('carousel-dots-area').children;
                            self.dotsChange(o.index);
                        }
                        /**Init start item position*/
                        o.childs = carousel_items_parent.children;
                        for(var i = 0 ;i < o.childs.length ;i++){
                            o.childs[i].style.cssText += 'position: absolute;opacity:0;-webkit-transition: -webkit-transform '+o.transitionTime+'s ease 0s,opacity '+o.transitionTime+'s ease 0s;';
                        }
                        o.maxNum = o.childs.length - 1;
                        var prev_i = o.index - 1;
                            prev_i = prev_i < 0 ? o.maxNum :prev_i;
                            o.childs[prev_i].style.cssText += o.Str_change_left;
                       var prev_prev_i = prev_i - 1;
                            prev_prev_i = prev_prev_i < 0 ? o.maxNum :prev_prev_i;
                            o.childs[prev_prev_i].style.cssText += o.Str_change_left_l;

                            o.childs[o.index].style.cssText += o.Str_change_center;

                        var next_i = o.index + 1;
                            next_i = next_i > o.maxNum? 0 : next_i;
                            o.childs[next_i].style.cssText += o.Str_change_right;
                        var next_next_i = next_i + 1;
                            next_next_i = next_next_i > o.maxNum? 0 : next_next_i;
                            o.childs[next_next_i].style.cssText += o.Str_change_right_r;
                        self.initEventListener();
                        /*isPlayAuto*/
                        if(o.isPlayAuto){
                            setInterval(function(){
                                if(o.autoPlayDirection == 'left')
                                    self.moveLeft(o.index);
                                else
                                    self.moveRight(o.index);
                            },o.autoPlayChangeTime);
                        }
                    },
                    moveRight : function(index){
                        var self = this;
                        o = self.data;
                        var cur_index = index;
                        var prev_index = cur_index-1;
                        prev_index = prev_index < 0? o.maxNum  : prev_index;
                        var next_index = cur_index+1;
                        next_index = next_index > o.maxNum ? 0 : next_index;
                        var next_next_index = next_index+1;
                        next_next_index = next_next_index > o.maxNum ? 0 : next_next_index;
                        var next_next_next_index = next_next_index+1;
                        next_next_next_index = next_next_next_index > o.maxNum ? 0 : next_next_next_index;

                        var cur_dom = o.childs[cur_index];
                        var prev_dom = o.childs[prev_index];
                        var next_dom = o.childs[next_index];
                        var next_next_dom = o.childs[next_next_index];
                        var next_next_next_dom = o.childs[next_next_next_index];


                        prev_dom.style.cssText += o.Str_change_left_l;
                        cur_dom.style.cssText += o.Str_change_left;
                        next_dom.style.cssText += o.Str_change_center;
                        next_next_dom.style.cssText += o.Str_change_right;
                        next_next_next_dom.style.cssText += o.Str_change_right_r;
                        /*****update o.index*****/
                        o.index = next_index;
                        if(o.isShowDots)
                            self.dotsChange(o.index);
                        var naturalIndex = self.getNaturalIndex();
                        self.moveCalllBack(o.index);
                    },
                    moveLeft : function(index){
                        var self = this;
                        o = self.data;
                        var cur_index = index;
                        var next_index = cur_index+1;
                        next_index = next_index > o.maxNum ? 0 : next_index;
                        var prev_index = cur_index - 1;
                        prev_index = prev_index < 0? o.maxNum  : prev_index;
                        var prev_prev_index = prev_index - 1;
                        prev_prev_index = prev_prev_index < 0 ? o.maxNum : prev_prev_index;
                        var prev_prev_prev_index = prev_prev_index - 1;
                        prev_prev_prev_index = prev_prev_prev_index < 0 ? o.maxNum : prev_prev_prev_index;

                        var cur_dom = o.childs[cur_index];
                        var next_dom = o.childs[next_index];
                        var prev_dom = o.childs[prev_index];
                        var prev_prev_dom = o.childs[prev_prev_index];
                        var prev_prev_prev_dom = o.childs[prev_prev_prev_index];

                        next_dom.style.cssText += o.Str_change_right_r;
                        cur_dom.style.cssText += o.Str_change_right;
                        prev_dom.style.cssText += o.Str_change_center;
                        prev_prev_dom.style.cssText += o.Str_change_left;
                        prev_prev_prev_dom.style.cssText += o.Str_change_left_l;
                        /*****update o.index*****/
                        o.index = prev_index;
                        if(o.isShowDots)
                            self.dotsChange(o.index);
                        var naturalIndex = self.getNaturalIndex();
                        self.moveCalllBack.call(self,o.index);
                    },
                    initEventListener:function(){
                        var self = this;
                        o = self.data;
                        if(o.next)
                            document.getElementById(o.next).addEventListener('click',function(){
                                self.moveRight(o.index);
                            });
                        if(o.prev)
                            document.getElementById(o.prev).addEventListener('click',function(){
                                self.moveLeft(o.index);
                            });
                        var touchEnd = function() {
                            if(o.X < -20){
                                self.moveRight(o.index);
                            }
                            if(o.X > 20){
                                self.moveLeft(o.index);
                            }
                        };
                        o.dom.addEventListener('touchstart',function(e){
                            o.pageX = e.touches[0].pageX;
                            o.pageY = e.touches[0].pageY;
                            o.X = 0;
                        });
                        o.dom.addEventListener('touchmove',function(e){
                            o.X = e.touches[0].pageX - o.pageX;
                        });
                        o.dom.addEventListener('touchend',touchEnd);
                        o.dom.addEventListener('touchcancel',touchEnd);
                        var childs = o.dom.children;
                        for(var i =0;i < childs.length;i++){
                            childs[i].addEventListener('webkitTransitionEnd', function(){
                                self.webkitTransitionEndCallBack.call(self);
                            }, false);
                        }

                    },
                    dotsChange : function(index){
                        var self = this;
                        o = self.data;
                        var dots_area = document.getElementById('carousel-dots-area');
                        dots_area.innerHTML = '';
                        for(var i = 0;i < o.dots_len;i++){
                            var b = document.createElement('b');
                            dots_area.appendChild(b);
                        }
                        o.dots[index%o.dots_len].id = 'carousel-selected';
                    },
                    getNaturalIndex : function(){
                        var self = this;
                        o = self.data;
                        if(o.isCloneNode)
                            return o.index % 2;
                        return o.index;
                    },
                    moveCalllBack:function(index){
                        this.flag = true;
                    },
                    webkitTransitionEndCallBack: function(){
                        if(this.flag == true){
                            this.flag = false;
                            index = this.getNaturalIndex();
                            this.data.animateEndCallBack(index)
                        }
                    }
            }
            window.carousel = carousel;
        }(window))