define(['view','text!demo/imglazyloadtpl.html'], function(view, share){
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
            var imglazeload = Jumei.getModule('ui.imglazyload');
            new imglazeload({classSelector:'.img-lazy'});
            $('#imglazyload .change-btn').on('click',function(e){
                $('#imglazyload-text').toggleClass('height0');
            });
        },
        setTitle: function(){
            this.title('赖加载组件');
        }
    });
});