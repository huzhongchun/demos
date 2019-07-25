define(['view','text!demo/waterFalltpl.html'], function(view, share){

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
            $('#waterFall .change-btn').on('click',function(e){
                $('#slider-text').toggleClass('height0');
            });
            // code...
            $('.change-btn').on('click',function(e){
                $('#waterFall-text').toggleClass('height0');
            })
            //实例化调用模式
            var waterFall = Jumei.getModule('ui.waterFall');
            var waterFallObj = new waterFall({
                'id':'boxs',
                'columnWidth': 30,
                'columnGap': 10,
                'hasSetImgHeight':false,
                'insertType': 1,
                'fadeinTime': 600
            });
        },
        setTitle: function(){
            this.title('瀑布流组件');
        }
    });
});



































