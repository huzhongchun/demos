define([], function(){
    var View = Jumei.create({
        scrollX:0,
        scrollY:0,
        controller:null,
        initialize: function(context){
            //是否默认开启iscroll
            this.iscrollFlag = true;
            this.controller = context;
            this.id = context._module+'_'+context._action;
            this.param = context._param;
            this.elem = $(context.view[this.id]);
            this.height = 0;
            this.windowHeight();
            //显示模板之前
            this.onCreate();
            this.onEvent();
            this.bindEvent();
            this.iscroll = null;
            this.iScroll();
            //显示模板之后
            this.onShow();
            this.setTitle();
            $('body').off('touchmove'); 
        },
        forward: function(url){
            this.controller.forward.call(this.controller, url);
        },
        bindEvent: function(){
            var events = this.events,
                reg = /^(\S+)\s+(.*)$/,
                match = null,
                eventType = null,
                domSelector = null;
                this.unBindEvent();
            for (var key in events) {
                match = key.match(reg);
                eventType = match[1];
                domSelector = match[2];
                eventType += '.' + this.id;
                if (domSelector === '') {
                    this.elem.on(eventType, events[key]);
                } else {
//                    $(domSelector).off(eventType);
//                    $(domSelector).on(eventType, events[key]);
                    this.elem.on(eventType, domSelector, events[key]);
                }
            }
        },
        unBindEvent: function(selector,eventType){
           this.elem.off('.'+this.id);
          //  $(selector).off(eventType);
        },
        createDom: function(){

        },
        onEvent: function(){

        },
        onShow: function(){

        },
        onCreate: function(){

        },
        onRefresh: function(){

        },
        refresh: function(){
            //this.iscroll.refresh();
        },
        title: function(title){
            $('#header-title').html(title);
            //JMWebView.title.text = title;
        },
        setTitle: function(){
            
        },
        destroy: function(){
            this.iscroll.destroy();
        },
        //是否处于现在的view正在显示
        hasCurrentView: function(){
            if(this.elem.hasClass('current')){
                return true;
            }else{
                return false;
            }
        },
        goTop: function(scroll){
            var self = this;
            if(self.elem.find('#toTop').length<=0){
                self.elem.append('<div id="toTop"></div>');
            }
            var $toTop = self.elem.find('#toTop'),
            height = $(window).height();
    
            $toTop.off('click');
            $toTop.on('click', function(){
                window.scrollTo(0,0);
                $toTop.hide();
            });
            
//            scroll.off('scroll');
//            scroll.on('scroll', function(){
//               if((-this.y) > height/2){
//                   $toTop.show();
//               }else{
//                   $toTop.hide();
//               };
//            });
            
//            scroll.off('scrollEnd');
//            scroll.on('scrollEnd', function(){
//               if((-this.y) > height/2){
//                   $toTop.show();
//               }else{
//                   $toTop.hide();
//               };
//            });
            
            $(window).on('scroll',function(){
                var scrollTop = $(window).scrollTop();
                if(scrollTop > 100){
                    $toTop.show();
                }else{
                    $toTop.hide();
                };
            });
        },
        iScroll: function(){
           // this.elem.height($(window).height());
//            if(this.iscrollFlag){
//                if(this.iscroll){
//                    this.refresh();
//                }else{
//                    this.iscroll = new IScroll(this.elem[0], {preventDefault: false, scrollX: !1,scrollY: !0,momentum: !0,scrollbars: !0,fadeScrollbars: !0,shrinkScrollbars: "clip"});
//                }
//            }
        },
        windowHeight: function(){
            var height = $(window).height();
//            if($.os.iphone){
//                var userAgent = navigator.userAgent;
//                var match = userAgent.match(/.*OS\s*(\d)/);
//                if(match[1] && match[1]>6){
//                    this.height = height = height - 60;
//                    $('#container').css('min-height',height);
//                }else{
//                    this.height = height = height - 40;
//                    $('#container').css('min-height',height);
//                }
//
//            }else{
//                this.height = height = height - 40;
//                $('#container').css('min-height',height);
//            }
            if($.os.iphone){
                var userAgent = navigator.userAgent;
                var match = userAgent.match(/.*OS\s*(\d)/);
                if(match[1] && match[1]>6){
                    this.height = height = height - 60;
                    this.elem.css('min-height',height+'px');
                    this.headerHeight = 60;
                }else{
                    this.height = height = height - 40;
                    this.elem.css('min-height',height+'px');
                    this.headerHeight = 40;
                }
            }else{
                this.height = height = height - 40;
                this.headerHeight = 40;
                this.elem.attr('style','min-height:'+height+'px');
            }
        },
        href: function(url){
            var time = null;
            //JMWebView.toolbar.status = 'show';
            setTimeout(function(){
                 time = null;
                 location.href = url;
            },1500);
        }
    });
    return View;
});
