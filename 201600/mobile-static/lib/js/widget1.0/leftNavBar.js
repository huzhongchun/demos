/**
 * @file navbar组件
* @import zepto.js jumei.js iScroll.js
 * 
 */

Jumei.widget('ui.navbar', {
    init: function(options) {
        this.options = {
            itemsArray: [
                            ['主会场','http://s.m.jumei.com/pages/1232'],
                            ['洗护','http://s.m.jumei.com/pages/1232'],
                            ['美妆','http://s.m.jumei.com/pages/1232'],
                            ['美妆','http://s.m.jumei.com/pages/1232'],
                            ['美妆','http://s.m.jumei.com/pages/1232'],
                            ['美妆','http://s.m.jumei.com/pages/1232'],
                            ['美妆','http://s.m.jumei.com/pages/1232'],
                            ['美妆','http://s.m.jumei.com/pages/1232'],
                            ['美妆','http://s.m.jumei.com/pages/1232'],
                            ['美妆','http://s.m.jumei.com/pages/1232'],
                            ['美妆','http://s.m.jumei.com/pages/1232'],
                            ['美妆','http://s.m.jumei.com/pages/1232'],
                        ],
            autoAddItemsArray: true,//是否自动加载数据,内容完全自己定制
            headImg:'http://p0.jmstatic.com/mobile/act/activities/2014_11/11sharepic/start_pic.png',
            animateTime: 500,
            btnText: '会场导航',
        };
        this._super.call(this, options);
    },
    _create: function() {
        this.initItemsFunc();
        this.addEventListenerFunc();
    },
    addEventListenerFunc: function() {
        var self = this,opt = this.options;
        //菜单动画
        var moveLength = parseInt($('.nav-container').css('width')) + parseInt($('.hidden-nav-btn').css('width')) + 40;
        $('.nav-btn').on('click', function(){
            $(this).animate({
                translate3d: (-moveLength)+'px,0px,0',
            }, opt.animateTime, 'ease-out');
            $('.nav-container').animate({
                left: '0px'
            }, opt.animateTime, 'ease-out');
            $('#nav-bg').show();
        });
        $('.hidden-nav-btn,#nav-bg').on('click', function(){
            $('.nav-btn').animate({
                translate3d: '0px,0px,0'
            }, opt.animateTime, 'ease-out');
            $('.nav-container').animate({
                left: (-moveLength)+'px',
            }, opt.animateTime, 'ease-out')
            $('#nav-bg').hide();
        });
        setTimeout(function(){
            self.addBarScrollFunc();
        },500);
    },
    addBarScrollFunc:function(){
        //菜单加在滚动
        var self = this;
        self.scroll = new IScroll('.scroll-wrapper', {
            preventDefault: false, 
            probeType:2,
            scrollX: !1,
            scrollY: !0,
            momentum: !0,
            scrollbars: !0,
            fadeScrollbars: !0,
            shrinkScrollbars: "clip",
            useTransition: true,
        });
        $('.nav-container').on('touchmove', function(e){
            e.preventDefault(); 
        });
    },
    initItemsFunc:function(){
        var self = this,opt = this.options;
        if(opt.autoAddItemsArray === true){
            var tpl = '<li><img src="'+opt.headImg+'"></li>';
            if(opt.itemsArray.length > 0)
                for (var i = 0; i < opt.itemsArray.length; i++) {
                    tpl += '<li><a href="'+opt.itemsArray[i][1]+'"><span>'+opt.itemsArray[i][0]+'</span></a></li>';
                };
            var content = '<div class="nav-btn"><span>'+opt.btnText.slice(0,2)+'</span><span>'+opt.btnText.slice(2,4)+'</span></div>'+
                            '<div class="nav-container">'+
                                '<div class="scroll-wrapper">'+
                                    '<ul class="scroll-area">'+tpl+'</ul>'+
                                '</div>'+
                                '<div class="hidden-nav-btn"></div>'+
                            '</div>'+
                            '<div id="nav-bg"></div>'+
                         '</div>'
            $('#nav-bar').append(content);
        }
    }
});







