define(['view','text!demo/toasttpl.html'], function(view, share){
    
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
            $('#toast .change-btn').on('click',function(e){
                $('#toast-text').toggleClass('height0');
            });
            //实例化调用模式
            var toastObj = Jumei.getInstance('ui.toast',{
                animateTime: 1,
                animateCurves: 'ease',
                stopTime: 2,
                animateEndCallback:function(){
                    //alert('动画结束了！');
                }
            });

            $('#toast .btn').click(function(e){
                var index = $(this).index();
                var B = index * 20;
                var R = index * 20;
                toastObj.show('每天只能进6件，请明天再来吧');
            })
        },
        setTitle: function(){
            this.title('toast提示组件');
        }
    });
});



































