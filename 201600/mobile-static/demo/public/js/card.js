define(['view','text!demo/cardtpl.html'], function(view, share){

    return Jumei.create(view,{
        onEvent: function(){
            this.events = {
            };
        },
        onCreate: function(){
            context = this;
            this.elem.html(share);
            this.demo();
            $('#back').show();
        },
        //demo的例子
        demo: function(){
            var scratchcard = Jumei.getModule('ui.scratchcard');
            new scratchcard({
                element:'.card-area',
                width: 262,
                height: 53,
                img: 'http://p0.jmstatic.com/mobile/act/active301/702luodi/prize-area-un.jpg',
                backgroundImg: 'http://p0.jmstatic.com/mobile/act/active301/702luodi/prize-area.png'
            });
            $('#card .change-btn').on('click',function(e){
                $('#card-text').toggleClass('height0');
            });
        },
        setTitle: function(){
            this.title('刮刮卡组件');
        }
    });
});