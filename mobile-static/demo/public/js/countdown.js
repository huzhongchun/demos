define(['view','text!demo/countdowntpl.html'], function(view, share){

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
            $('#countdown .change-btn').on('click',function(e){
                $('#countdown-text').toggleClass('height0');
            });
            var countdown = Jumei.getModule('ui.countdown');
            new countdown({element:'#countdown .countdown-text','endTime':'2015/1/10 13:00:00','isShow':true});
            //$('#countdown .countdown-text').countdown({'endTime':'2015/1/10 13:00:00','isShow':true});
        },
        setTitle: function(){
            this.title('倒计时组件');
        }
    });
});