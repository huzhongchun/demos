define(["view"],function(i){var e=['<div id="buy-success-wrapper">','<div class="buy-success-list">','<div class="buy-success-title"><%=title%></div>',"<% for(var i = 0; i< data.length; i++){var item = data[i]; %>",'<div class="group-coupon">团购券：<%=item.receipt%></div>',"<% } %>","</div>",'<div class="buy-tip">','<div class="buy-tip-title">消费时请告知店员使用大众点评团购券消费</div>','<div class="buy-tip-content">','<a class="shangjia-tell" tell="400 820 5527" style="color:#666666;">',"<div>点评客服电话：400 820 5527</div>","</a>","</div>","</div>",'<div class="fixed">','<div class="look-coupon">查看团购券</div>','<div class="continue-buy">继续购买</div>',"</div>","</div>"].join(""),t=null,n=function(i){$("#wrapper").dialog({width:260,height:200,content:i,title:"",type:1,init:function(){},ok:"刷新",cancel:"取消",successCallback:function(){location.reload()}})},o=function(){$("#wrapper").loadding(),$.ajax({type:"get",dataType:"json",data:{order_id:t.param.order_id},url:"/dp/getReceiptsByOrder",success:function(i){if($("#wrapper").loadding("close"),i.length>0){var o={title:i.length>0?i[0].title:"",order_id:t.param.order_id,data:i};t.param.dp_order_id=i.length>0?i[0].dp_order_id:"";var a=Jumei.parseTpl(e,o);t.elem.html(a)}else t.hasCurrentView()&&n('<div id="buy_success_name">正在处理中，请稍候刷新</div>')},error:function(){}})};return Jumei.create(i,{onCreate:function(){t=this,o()},setTitle:function(){this.title("购买成功")},onRefresh:function(){this.setTitle(),$("#buy-success-wrapper .fixed").hide(),setTimeout(function(){$("#buy-success-wrapper .fixed").show()},500)},onEvent:function(){var i=this;this.events={"click .look-coupon":function(){Jumei.ja("dpevent","lookcoupon"),i.forward("#module=beauty&action=my_group&order_id="+i.param.dp_order_id)},"click .continue-buy":function(){Jumei.ja("dpevent","continuebuy"),i.forward("#module=beauty&action=index")},"click .shangjia-tell":function(){var i=$(this).attr("tell");$.os.iphone?location.href="tel:"+i:n('<div class="dialog-alert">请您拨打电话：'+i+"</div>")}}},onClose:function(){}})});