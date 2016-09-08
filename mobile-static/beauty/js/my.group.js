define(['view'], function(view){
    var main = [
            '<div id="my-group-main" style="position:relative;"></div>',
            
            ].join('');
    var html = ['<div id="my-group-wrapper">',
                        '<ul class="my-group-tuangou">',
                           '<li deal_id = "<%=data[0].deal_group_id%>">',
                               '<img src="<% if(data[0].image_url != "undefined"){ %><%=data[0].image_url%><% } %>"/>',
                               '<div class="list-content-content">',
                                   '<div class="content-desc"><%=data[0].title%></div>',
                               '</div>',
                           '</li>',
                        '</ul>',
                        '<div style="text-align: right;padding: 3px 8px;color: #666666;font-size:12px;">订单号：<%=data[0].dp_order_id%></div>',
                        '<div class="tuangou-list">',
                            '<% for(var i = 0; i < data.length; i++){ var item = data[i];var dateStr = item.endDate;%>',
                            '<div class="common-list tuangou-coupon">',
                                '<% var str = "";if(item.receipt_status == 0){ %>',
                                    '<div class="common-header">团购券<span style="float: right;font-size: 12px;color: #329205;">未消费</span></div>',
                                '<% }else if(item.receipt_status == 1){ %>',
                                    '<div class="common-header">团购券<span style="float: right;font-size: 12px;">已消费</span></div>',
                                '<% }else{ %>',
                                     '<div class="common-header">团购券<span style="float: right;font-size: 12px;">已退款</span></div>',
                                '<% } %>',
                                '<div class="common-content"><%=item.receipt%> <span class="coupon-endtime">有效期：<%=dateStr%></span></div>',
                            '</div>',
                            '<% } %>',
                        '</div>',

                        '<div class="buy-tip">',
                            '<div class="buy-tip-title">消费时请告知店员使用大众点评团购券消费</div>',
                            '<div class="buy-tip-content">',
                            '<a class="shangjia-tell" tell="400 820 5527" style="color:#666666;">',
                                '<div><span>点评客服电话：</span>400 820 5527</div>',
                            '</a>',
                            '</div>',
                        '</div>',
                        '<div class="height60"></div>',
                '</div>',
                '<div class="bottom-fixed" id="tuikuan-btn" style="display:block;"> <div class="submit-orders-btn"><a tell="400 820 5527" style="color:white;">退款</a></div></div>',
                
    ].join('');

    var context = null,
    getData = function(){
        $('#wrapper').loadding();
        $.ajax({
            type:'get',
            dataType:'json',
            data:{order_id:context.param.order_id},
            url:'/dp/getDetailByOrderId',
            success: function(res){
                if(res){
                    var data = {data:res};
                    var tpl = Jumei.parseTpl(html, data);
                    $('#my-group-main').html(tpl);
                    context.refresh();
                    var requireNum = 0;
                    for(var i = 0; i < res.length; i++){
                        if(res[i].receipt_status == 0){
                           ++requireNum;
                        }
                    }

                    if(requireNum == 0){
                       $('#tuikuan-btn').hide();
                    }else{
                       $('#tuikuan-btn').show();
                    }
                }
                $('#wrapper').loadding('close');
            },
            error: function(){
                $('#wrapper').loadding('close');
                dialog('<div class="dialog-alert">网络不给力，请稍候再试</div>');
            }
        });
    },
    dialog = function(title,btn){
        if(context.hasCurrentView()){ 
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
               ok: btn,
               cancel: '取消',
               successCallback:function(){
                   //$('.change-city').trigger('click');
               },
           });
        }
     }



    return Jumei.create(view,{
        onCreate: function(){
            context = this;
            context.elem.html(main);
            getData();
        },
        setTitle: function(){
            this.title('我的团购券');
        },
        onRefresh: function(){
            this.setTitle();
            if($('#tuikuan-btn').css('display') == 'block'){
                //解决返回时候fixed 的bug
                $('#tuikuan-btn').hide();
                setTimeout(function(){
                    $('#tuikuan-btn').show();
                },500);
            }
        },
        onEvent: function(){
            var self = this;
            this.events = {
                'click .my-group-tuangou li': function (e) {
                    var deal_group_id = $(this).attr('deal_id');
                    self.forward('#module=beauty&action=detail&deal_id='+deal_group_id+'&latitude='+context.param.latitude+'&longitude='+context.param.longitude);
                },
                'click .shangjia-tell': function(){
                    var tell = $(this).attr('tell');
                    if($.os.iphone){
                        location.href = 'tel:'+tell;
                    }else{
                        dialog('<div class="dialog-alert">请您拨打电话：'+ tell +'</div>','确定');
                    }
                },
                'click #tuikuan-btn': function(){
                    Jumei.ja('dpevent','tuikuan');
                    dialog('<div class="dialog-alert" style="margin-bottom: 20px;padding: 0px 20px;font-size: 13px;color: #666666;line-height: 18px;">申请退款请致电大众点评客服，团购券过期后会自动退款到您的支付宝。','我知道了');
                }
                
            };
        },
        onClose: function(){

        }
    });
});
