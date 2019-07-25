define(['view'], function(view){
    var html = [
               '<div id="buy-success-wrapper">',
                    '<div class="buy-success-list">',
                        '<div class="buy-success-title"><%=title%></div>',
                        '<% for(var i = 0; i< data.length; i++){var item = data[i]; %>',
                        '<div class="group-coupon">团购券：<%=item.receipt%></div>',
                        '<% } %>',
                    '</div>',
                    '<div class="buy-tip">',
                        '<div class="buy-tip-title">消费时请告知店员使用大众点评团购券消费</div>',
                        '<div class="buy-tip-content">',
                            '<a class="shangjia-tell" tell="400 820 5527" style="color:#666666;">',
                            '<div>点评客服电话：400 820 5527</div>',
                            '</a>',
                        '</div>',
                    '</div>',
                    '<div class="fixed">',
                        '<div class="look-coupon">查看团购券</div>',
                        '<div class="continue-buy">继续购买</div>',
                    '</div>',
                '</div>'
            ].join('');


    var context = null,
    dialog = function(title){
        $('#wrapper').dialog({
            //默认弹出框宽度
            width: 260,
            height: 200,
            //传进来显示的html
            content: title,
            //弹出框title
            title: "", //弹出框的title
            //显示一个按钮还是两个
            type: 1,
            init: function(){
            },
            //按钮文字
            ok: '刷新',
            cancel: '取消',
            successCallback:function(){
                //$('.change-city').trigger('click');
                location.reload();
            },
        });
    },
    getCode = function(){
        $('#wrapper').loadding();
        $.ajax({
            type:'get',
            dataType:'json',
            data: {order_id: context.param.order_id},
            url:'/dp/getReceiptsByOrder',
            success: function(res){
                 $('#wrapper').loadding('close');
                if(res.length > 0){
                    var data = {
                        title: res.length> 0 ? res[0].title : '',
                        order_id: context.param.order_id,
                        data : res
                    }
                    context.param.dp_order_id = res.length > 0 ? res[0].dp_order_id : ''
                    var tpl = Jumei.parseTpl(html, data);
                    context.elem.html(tpl);
                }else{
                    if(context.hasCurrentView()){ 
                        dialog('<div id="buy_success_name">正在处理中，请稍候刷新</div>');
                    }
                }
            },
            error: function(){
            }
        });
}

    return Jumei.create(view,{
        onCreate: function(){
            context = this;
            getCode();
        },
        setTitle: function(){
            this.title('购买成功');
        },
        onRefresh: function(){
            this.setTitle();
            $('#buy-success-wrapper .fixed').hide();
            setTimeout(function(){
                $('#buy-success-wrapper .fixed').show();
            },500);
        },
        onEvent: function(){
            var self = this;
            this.events = {
                'click .look-coupon': function (e) {
                    Jumei.ja('dpevent','lookcoupon');
                    self.forward('#module=beauty&action=my_group&order_id='+self.param.dp_order_id);
                },
                'click .continue-buy': function(){
                    Jumei.ja('dpevent','continuebuy');
                    self.forward('#module=beauty&action=index');
                },
                'click .shangjia-tell': function(){
                     var tell = $(this).attr('tell');
                     if($.os.iphone){
                         location.href = 'tel:'+tell;
                     }else{
                         dialog('<div class="dialog-alert">请您拨打电话：'+ tell +'</div>');
                     }
                 }
            }
        },
        onClose: function(){

        }
    });
});
