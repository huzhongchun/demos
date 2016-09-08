define(['view'], function(view){
    var tpl = [
    '<div class="beauty-index-wrapper">',
        '<div class="li-list" type="dialog">',
            '<img src="public/img/dialog.png" alt="Dialog">',
            '<span class="title">Dialog</span>',
            '<span class="desc">弹出框</span>',
        '</div>',
        '<div class="li-list" type="goTop">',
            '<img src="public/img/gotop.png" alt="goTop">',
            '<span class="title">goTop</span>',
            '<span class="desc">回到顶部</span>',
        '</div>',
        '<div class="li-list" type="imglazyload">',
            '<img src="public/img/tabs.png" alt="imglazyload">',
            '<span class="title">imglazyload</span>',
            '<span class="desc">懒加载</span>',
        '</div>',
        '<div class="li-list" type="loadding">',
            '<img src="public/img/slider.png" alt="loadding">',
            '<span class="title">loadding</span>',
            '<span class="desc">loading</span>',
        '</div>',
        '<div class="li-list" type="countdown">',
            '<img src="public/img/slider.png" alt="countdown">',
            '<span class="title">countdown</span>',
            '<span class="desc">倒计时</span>',
        '</div>',
        '<div class="li-list" type="turntable">',
            '<img src="public/img/tabs.png" alt="turntable">',
            '<span class="title">turntable</span>',
            '<span class="desc">大转盘</span>',
        '</div>',
        '<div class="li-list" type="card">',
            '<img src="public/img/tabs.png" alt="card">',
            '<span class="title">card</span>',
            '<span class="desc">刮刮卡</span>',
        '</div>',






        '<div class="li-list" type="circleNav">',
            '<img src="public/img/tabs.png" alt="circleNav">',
            '<span class="title">circleNav</span>',
            '<span class="desc">圆形导航</span>',
        '</div>',
        '<div class="li-list" type="scroll">',
            '<img src="public/img/slider.png" alt="scroll">',
            '<span class="title">scroll</span>',
            '<span class="desc">滚动条</span>',
        '</div>',
        '<div class="li-list" type="slider3d">',
            '<img src="public/img/slider.png" alt="slider3d">',
            '<span class="title">slider3d</span>',
            '<span class="desc">3D轮播</span>',
        '</div>',
        '<div class="li-list" type="share">',
            '<img src="public/img/dialog.png" alt="share">',
            '<span class="title">share</span>',
            '<span class="desc">分享</span>',
        '</div>',
        '<div class="li-list" type="slider">',
            '<img src="public/img/slider.png" alt="slider">',
            '<span class="title">slider</span>',
            '<span class="desc">图片轮播</span>',
        '</div>',
        '<div class="li-list" type="waterFall">',
            '<img src="public/img/tabs.png" alt="waterFall">',
            '<span class="title">waterFall</span>',
            '<span class="desc">瀑布流</span>',
        '</div>',
        '<div class="li-list" type="toast">',
            '<img src="public/img/tabs.png" alt="toast">',
            '<span class="title">toast提示</span>',
            '<span class="desc">toast提示</span>',
        '</div>',
    '</div>',
    ].join('');
    return Jumei.create(view,{
        onEvent: function(){
             var self = this;
             this.iscrollFlag = false;
             this.events = {
                'click .li-list': function(){
                    var $type = $(this).attr('type');
                    self.forward('#module=demo&action='+$type);
                },

            }
        },
        onCreate: function(){
            context = this;
            var data = {static:Jumei.static};
            var html = Jumei.parseTpl(tpl,data);
            this.elem.html(html);
            $('#back').hide();
        },
        setTitle: function(){
            this.title('组件demo');
        }
    });
});
