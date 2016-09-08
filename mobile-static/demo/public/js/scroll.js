define(['view','text!demo/inertiaScroll.html'], function(view, tpl){

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
            $('#scroll .change-btn').on('click',function(e){
                $('#scroll-text').toggleClass('height0');
            });
            var inertiaScroll = Jumei.getModule('ui.inertiaScroll');
            var inertiaScrollObj_1 = new inertiaScroll({
                id:'boxs',
                pullDownCallback: function(){
                    console.log('aaaa');
                },
                pullUpCallback: function(){
                    console.log('bbb');
                },
                startPullDownCallback: function(fn){
                    console.log('cccc');

                },
            });
            var inertiaScrollObj_2 = new inertiaScroll({
                id:'boxs-content',
            });
        },
        setTitle: function(){
            this.title('惯性滚动组件');
        }
    });
});



































