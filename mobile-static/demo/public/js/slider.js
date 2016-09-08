define(['view','text!demo/slidertpl.html'], function(view, share){

    return Jumei.create(view,{
        onEvent: function(){
             this.iscrollFlag = false;
             this.events = {
                'click .li-list': function(){

                },
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
            $('#slider .change-btn').on('click',function(e){
                $('#slider-text').toggleClass('height0');
            });
            // code...
            var slider = Jumei.getModule('ui.slider');
            var sliderObj = new slider({
                id: 'slider-boxs',
                index: 2,
                imgInit:  1,
                autoPlay:  false,
                switchTime:  1000,
                animateTime:  400,
                dotsClass:  'slider-dots',
                dotsSelectedClass:  'slider-dot-select',
                showDot:  true,
                slideEnd: null,
                slideStart: null,
                direction: 'left',
            });
        },
        setTitle: function(){
            this.title('左右滑动轮播组件');
        }
    });
});



































