define(['view','text!demo/circleNavtpl.html'], function(view, tpl){

    return Jumei.create(view,{
        onEvent: function(){
             var self = this;
             this.iscrollFlag = false;
             this.events = {
                'click .li-list': function(){

                },
            }
        },
        onCreate: function(){
            context = this;
            var data = {static:Jumei.static};
            this.elem.html(tpl);
            this.demo();
            $('#back').show();
        },
        //demo的例子
        demo: function(){
            $('#circleNav .change-btn').on('click',function(e){
                $('#circleNav-text').toggleClass('height0');
            })
            //实例化调用模式
            var circleNav = Jumei.getModule('ui.circleNav');
            var circleNavobj = new circleNav({
                radius: 50,
                animateTime: 0.3,
                baseDeg: 30,
                hrefsText: [['http://www.baidu.com','a'],['','a'],['http://www.jumei.com','a'],['','q'],['http://m.jumei.com','a'],['','a'],['','a']],
                touchSupport: false,
                startDeg: 2,
                offsetX: 0,
                offsetY: 0,
                intervalTime: 100
            });
        },
        setTitle: function(){
            this.title('圆形导航组件');
        }
    });
});



































