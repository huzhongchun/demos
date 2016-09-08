define(['view'], function(view){
    var main = [
                '<div id="my-beauty-main"></div>',
                ].join('');
    var html = ['<div id="my-beauty-wrapper">',
                    '<div class="my-infor">',
                        '<div class="my-infor-icon"><img src="<%=avatar%>"/></div>',
                        '<div class="my-infor-name"><%=name%></div>',
                        '<div class="my-buy">',
                            '<div class="has-buy">',
                                '<div>0</div>',
                                '<div class="fs12 has-buy-txt">已经买</div>',
                            '</div>',
                            '<div class="has-save">',
                                '<div>0</div>',
                                '<div class="fs12 has-save-txt">已节省</div>',
                            '</div>',
                        '</div>',
                    '</div>',

                    '<div class="not-consume common-list">',
                        '<div class="not-consume-title common-header">未消费的团购券</div>',
                        '<div class="not-consume-content common-content">',
                            '<% for(var i = 0; i < active_orders.length; i++){var item = active_orders[i]; %>',
                            '<div class="not-consume-list" order_id="<%=item[0].dp_order_id%>">',
                                '<div>',
                                    '<div class="consume-list-title"><%=item[0].title%></div>',
                                    '<% var dateStr = item[0].endDate; %>',
                                    '<div class="end-time">大众点评团 有效期：<%=dateStr%></div>',
                                '</div>',
                                '<div class="not-consume-num"><%=item.length%>张</div>',
                            '</div>',
                            '<% } %>',
                        '</div>',
                    '</div>',
                    '<div class="buy-history common-list">',
                        '<div class="common-header buy-history-title">购买历史</div>',
                    '</div>',
                    '<div class="common-list">',
                        '<div class="common-header"><div class="buy-tip-title">丽人生活团由大众点评提供团购和客服支持</div></div>',
                            '<div class="history-customer">',

                            '<a class="shangjia-tell" tell="400 820 5527" style="color:#666666;">',
                                 '<div><span>点评客服电话：</span>400 820 5527</div>',
                            '</a>',
                            '</div>',
                        '</div>',
                    '</div>',

                '</div>'
    ].join('');



    var context = null, 
    getData = function(){
           $('#wrapper').loadding();
           $.ajax({
               type:'get',
               dataType:'json',
               url:'/dp/my',
               success: function(res){
                   if(res){
                       res.name = res.user.name;
                       res.avatar = res.user.avatar;
                       var tpl = Jumei.parseTpl(html,res);
                       $('#my-beauty-main').html(tpl);
                       $('#beauty_my_beauty .consume-list-title').subStr(35);
                       context.refresh();
                   }
                    $('#wrapper').loadding('close');
               },
               error: function(){
                    $('#wrapper').loadding('close');
                    dialog('<div class="dialog-alert">网络不给力，请稍候再试</div>');
               }
           });
    },
    dialog = function(title){
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
               ok: '确定',
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
            this.title('我的丽人团');
        },
        onRefresh: function(){
            this.setTitle();
        },
        onEvent: function(){
            var self = this;
            this.events = {
                'click .not-consume-list': function(e){
                    var orderid = $(this).attr('order_id');
                    Jumei.ja('dpevent','myweixiaofei');
                    self.forward('#module=beauty&action=my_group&order_id='+orderid+'&latitude='+context.param.latitude+'&longitude='+context.param.longitude);
                },
                'click .buy-history-title': function(e){
                    Jumei.ja('dpevent','myhistory');
                    self.forward('#module=beauty&action=history_group&latitude='+context.param.latitude+'&longitude='+context.param.longitude);
                },
                'click .shangjia-tell': function(){
                    var tell = $(this).attr('tell');
                    if($.os.iphone){
                        location.href = 'tel:'+tell;
                    }else{
                        dialog('<div class="dialog-alert">请您拨打电话：'+ tell +'</div>');
                    }
                }
            };
        },
        onClose: function(){

        }
    });
});
