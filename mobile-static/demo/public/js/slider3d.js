define(['view','text!demo/carousel3D.html'], function(view, share){

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
            this.elem.html(share);
            this.demo();
            $('#back').show();
        },
        //demo的例子
        demo: function(){
            $('#carousel3d .change-btn').on('click',function(e){
                $('#carousel3d-text').toggleClass('height0');
            });
            // code...
            var carousel3D = Jumei.getModule('ui.carousel3D');
            var carousel3DObj = new carousel3D({
                    id: 'carousel3D-boxs',
                    index: 2,
                    animateEndCallBack: function(index){
                        console.log(index);
                    }
            });
        },
        setTitle: function(){
            this.title('3d轮播组件');
        }
    });
});



































