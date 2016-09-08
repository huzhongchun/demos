define(['view'], function(view){
    var html = ['<div id="history-category-wrapper">',
                    '<div class="history-category-list" id="history-list-iscroll">',

                    '</div>',
                '</div>'
    ].join('');

    var list = [
            '<% var num = 0; %>',
            '<ul class="history-category-ul">',
            '<% for(var i = 0; i< data.length;i++){ var item = data[i][0];num = num+1; %>',
           '<li order_id="<%=item.dp_order_id%>">',
               '<img src="<% if(item.image_url != "undefined"){ %><%=item.image_url%><% } %>"/>',
               '<div class="list-content-content">',
                   '<div class="content-desc"><%=item.title%></div>',
                   '<div class="history-list-num">数量：<%=item.quantity%></div>',
                   '<div class="content-price">',
                        '<span class="consume-price history-price">价格：¥<%=item.total_amount%></span>',
                   '</div>',
               '</div>',
           '</li>',
           '<% } %>',
           '</ul>',
           '<% if(num == 0){ %>',
           '<div class="has-no-history">没有历史记录</div>',
           '<% } %>'
           
    ].join('');


    var old = [
            '<div class="history-category-header" id="history-category-header">',
                '<ul class="clear" id="history-category-ul">',
                    '<li class="history-header-select">全部</li>',
                    '<li>未消费</li>',
                    '<li>退款中</li>',
                    '<li>已退款</li>',
                    '<li>已消费</li>',
                '</ul>',
            '</div>',
    ].join('');


    var context = null,
    historyScroll = null,
    getData = function(){
         $('#wrapper').loadding();
        $.ajax({
            type:'get',
            dataType:'json',
            url:'/dp/getHistoryOrders',
            success: function(res){ 
                if(res){
                    var data = {data:res};
                    var listTpl = Jumei.parseTpl(list, data);
                    $('#history-list-iscroll').html(listTpl);
                    context.refresh();
                }
                $('#wrapper').loadding('close');
            },
            error: function(){
                $('#wrapper').loadding('close');
            }
        });
    }




    return Jumei.create(view,{
        onCreate: function(){
            context = this;
            this.elem.html(html);
            getData();
        },                   
        setTitle: function(){
            this.title('团购历史');
        },
        onRefresh: function(){
            this.setTitle();
        },
        onEvent: function(){
            var self = this;
            this.events = {
                'click .history-category-ul li': function (e) {
                    self.forward('#module=beauty&action=my_group&order_id='+$(this).attr('order_id')+'&latitude='+context.param.latitude+'&longitude='+context.param.longitude);
                },
                'click .icon_home': function () {
                    window.location = '../index.html';
                } 
            };
        },
        initNavScroll: function(){
            var myScroll = new IScroll('#history-category-header', { scrollX: true, scrollY: false, mouseWheel: true });
        },
        onShow: function(){
        },
        onClose: function(){

        }
    });
});
