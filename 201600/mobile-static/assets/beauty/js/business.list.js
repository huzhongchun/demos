define(["view","distance"],function(e,t){var a=['<div id="beauty-business-list">',"</div>"].join(""),s=["<% if(businesses.length>0){ %>","<% for(var j = 0; j < businesses.length; j++){ var busItem = businesses[j];%>",'<div class="detail-notice common-list">','<div class="common-header">商家信息</div>','<div class="notice-content common-content">','<div class="deals-info">','<div class="notice-content-title">[<%=busItem.name%>]<span class="detail-distance"><%=busItem.distance%></span></div>','<div class="notice-content-xing clear">',"<% var man =  Math.floor(busItem.avg_rating); var ban = Math.ceil(busItem.avg_rating%1);var xing = 5-man-ban; %>","<% for(var z = 0; z < man; z++){ %>",'<span class="xing-select"></span>',"<%}%>","<% for(var y = 0; y < ban; y++){ %>",'<span class="xing-select-ban"></span>',"<%}%>","<% for(var x = 0; x < xing; x++){ %>",'<span class="xing"></span>',"<%}%>","</div>",'<div class="notice-address"><%=busItem.address%><br/>联系电话：<%=busItem.telephone%></div></div>',"</div>",'<div class="notice-btn"><span class="goto-here" latitude="<%=busItem.latitude%>" longitude="<%=busItem.longitude%>" name = "<%=busItem.name%>">到这里去</span><span class="connect-dealers"><a class="right-tell shangjia-tell" tell="<%=busItem.telephone%>">联系商家</a></span></div>',"</div>","</div>","<% } %>","<% } %>",'<div id = "bottom-fix-dazong">本次团购由大众点评提供，消费时请告知店员使用大众点评团购券消费</div>'].join(""),i=null,n=function(e){var a={deal_group:e};$.ajax({type:"get",dataType:"json",data:a,url:"/dp/getDealDetails",success:function(e){if(e.status){for(var a=e.deals[0],n=0;n<a.businesses.length;n++){var l="";if("undefined"!=i.param.latitude&&0!=i.param.latitude&&0!=a.businesses[n].latitude){var l=t.getDistance(i.param.latitude,i.param.longitude,a.businesses[n].latitude,a.businesses[n].longitude);l=l>=1e3?(l/1e3).toFixed(1)+"km":parseInt(l)+"m"}a.businesses[n].distance=l}var o=Jumei.parseTpl(s,a);$("#beauty-business-list").html(o),i.refresh()}},error:function(){}})},l=function(e){i.hasCurrentView()&&$("#wrapper").dialog({width:260,height:200,content:e,title:"",type:1,init:function(){},ok:"确定",cancel:"取消",successCallback:function(){}})};return Jumei.create(e,{onCreate:function(){i=this,this.elem.html(a),n(this.param.deal_id)},setTitle:function(){this.title("商家列表")},onRefresh:function(){this.setTitle()},onEvent:function(){var e=this;this.events={"click .goto-here":function(){var t=$(this).attr("latitude"),a=$(this).attr("longitude"),s=$(this).attr("name"),n=e.param.latitude,l=e.param.longitude;i.href(n&&0!=n&&""!=n&&"undefined"!=n?"http://mo.amap.com/?from="+n+","+l+"(起点)&to="+t+","+a+"("+s+")&type=0&opt=1&dev=1":"http://mo.amap.com/?q="+t+","+a+"&name="+s+"&dev=0")},"click .shangjia-tell":function(){var e=$(this).attr("tell");$.os.iphone?location.href="tel:"+e:l('<div class="dialog-alert">请您拨打电话：'+e+"</div>"),Jumei.ja("dpevent","shangtellliebiao")}}},onClose:function(){}})});