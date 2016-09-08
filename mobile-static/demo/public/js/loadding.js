define(['view','text!demo/loaddingtpl.html'], function(view, share){

    return Jumei.create(view,{
        onEvent: function(){
            this.events = {
            }
        },
        onCreate: function(){
            this.elem.html(share);
            this.demo();
            $('#back').show();
        },
        //demo的例子
        demo: function(){
            var loadding = Jumei.getModule('ui.loadding');
            var loaddingObj = null
            $('#loadding .change-btn').on('click',function(e){
                $('#loadding-text').toggleClass('height0');
            });
            
            $('#loadding .open').on('click', function(){
                if(loaddingObj == null){
                    loaddingObj = new loadding();
                }else{
                    loaddingObj.show();
                }
            });
            $('#loadding .close').on('click', function(){
                loaddingObj.close();
            });
        },
        setTitle: function(){
            this.title('加载loadding组件');
        }
    });
});