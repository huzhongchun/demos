define(['view','text!demo/dialogtpl.html'], function(view, share){

    return Jumei.create(view,{
        onEvent: function(){
             this.iscrollFlag = false;
             this.events = {
                'click .dialog-btn': function(){
                    var $type = $(this).attr('animate');
                    var dialog = Jumei.getModule('ui.dialog');
                    var dialogObj = new dialog({
                        element: 'body',
                        //默认弹出框宽度
                        width: 260,
                        height: 200,
                        //传进来显示的html
                        content: '聚美提示您！',
                        //弹出框title
                        title: '提示', //弹出框的title
                        type:$type,
                        //显示一个按钮还是两个
                        btn: 2,
                        //按钮文字
                        ok: '确定',
                        cancel: '取消',
                        //初始化函数
                        init: function() {
                        },
                        //成功回调函数
                        okCallback: null,
                        //取消回调函数
                        cancelCallback: function() {
                        }
                    });
                    dialogObj.show();
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
            $('#dialog .change-btn').on('click',function(e){
                $('#dialog-text').toggleClass('height0');
            });
        },
        setTitle: function(){
            this.title('弹出框组件');
        }
    });
});

