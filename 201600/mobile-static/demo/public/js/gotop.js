define(['view','text!demo/gotoptpl.html'], function(view, share){

    return Jumei.create(view,{
        onEvent: function(){
            this.events = {
            }
        },
        onCreate: function(){
            context = this;
            this.elem.html(share);
            this.demo();
            $('#back').show();
        },
        //demo的例子
        demo: function(){
            var gotop = Jumei.getModule('ui.gotop');
            new gotop();
            $('#gotop .change-btn').on('click',function(e){
                $('#gotop-text').toggleClass('height0');
            });
        },
        setTitle: function(){
            this.title('返回顶部组件');
        }
    });
});