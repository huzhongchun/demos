define(["view","distance"],function(view,distance){var htmlWrapper=['<div id="beauty-detail">',"</div>",'<div id="select-meal-wrapper">',"</div>"].join(""),html=['<div class="detail-content">','<div id="detail-image" class="detail-image">',"<% if(more_image_urls.length>0){ %>","<% for(var i = 0; i < more_image_urls.length; i++){ var item = more_image_urls[i]; %>",'<div><img src="<%=item%>"/></div>',"<% } %>","<% }else{ %>",'<div><img src="<%=image_url%>"/></div>',"<% } %>","</div>",'<div class="detail-sale-price">已售 <%=purchase_count%></div>','<div class="detail-price"><span class="detail-current-price">¥<%=current_price%></span><span class="detail-old-price">¥<%=list_price%></span><span title="<%=title%>" price=<%=current_price%> deal_id=<%=deal_id%> class="start-buy">立即抢购</span></div>','<div class="group-detail common-list">','<div class="group-detail-title common-header"><%=title%></div>','<div class="group-detail-content common-content">','<div class="group-detail-desc"><%=description%></div>','<div class="orders-tag">',"<% if(restrictions.is_reservation_required != 1){ %>",'<span class="mian-yu-yue">免预约</span>',"<% } %>",'<span class="wei-xiao-fei">未消费退款</span>','<span class="guo-qi">过期自动退款</span>',"</div>","</div>","</div>",'<div class="detail-discuss">','<span class="good-discuss">4个好评</span>','<span class="discuss-total">共4个评价</span>',"</div>",'<% if(notice && $.trim(notice) !="<p>&nbsp;</p><p>&nbsp;</p>"){  %>','<div class="group-buy-detail common-list">','<div class="common-header">通知</div>','<div class="common-content">','<div class="tongzhi-list"> <%=notice%></div>',"</div>","</div>","<% } %>","<% if(currentBus.length>0){ %>","<% for(var j = 0; j < currentBus.length; j++){ var busItem = currentBus[j]; %>",'<div class="detail-notice common-list">','<div class="common-header">商家信息</div>','<div class="notice-content common-content">','<div class="deals-info">','<div class="notice-content-title">[<%=busItem.name%>]<span class="detail-distance"><%=busItem.distance%></span></div>','<div class="notice-content-xing clear">',"<% var man =  Math.floor(busItem.avg_rating); var ban = Math.ceil(busItem.avg_rating%1);var xing = 5-man-ban; %>","<% for(var z = 0; z < man; z++){ %>",'<span class="xing-select"></span>',"<%}%>","<% for(var y = 0; y < ban; y++){ %>",'<span class="xing-select-ban"></span>',"<%}%>","<% for(var x = 0; x < xing; x++){ %>",'<span class="xing"></span>',"<%}%>","</div>",'<div class="notice-address"><%=busItem.address%><br/>联系电话：<%=busItem.telephone%></div>',"</div>",'<div class="notice-btn"><span name="<%=busItem.name%>" latitude="<%=busItem.latitude%>" longitude="<%=busItem.longitude%>" class="goto-here">到这里去</span><span class="connect-dealers"><a class="right-tell shangjia-tell" tell="<%=busItem.telephone%>">联系商家</a></span></div>',"<% if(businesses.length > 1){ %>",'<div class="look-other">查看全部<%=businesses.length%>家适用商户</div>',"<% } %>","</div>","</div>","<% } %>","<% } %>","<% if(details){ %>",'<div class="group-buy-detail common-list">','<div class="common-header">团购详情</div>','<div class="common-content">','<div class="group-detail-header">美容美体项目3选择1条餐</div>',"<ul>","<li>","<div><%=detail%></div>","</li>","</ul>","</div>","</div>","<% } %>","<% if(restrictions.special_tips){ %>",'<div class="common-list buy-notice">','<div class="common-header">购买须知</div>','<div class="common-content">',"<ul>","<li><%=restrictions.special_tips%></li>","</ul>","</div>","</div>","<% } %>",'<div id = "bottom-fix-dazong">本次团购由大众点评提供，消费时请告知店员使用大众点评团购券消费</div>',"</div>"].join(""),meal_list=["<ul>","<% for(var i = 0; i < deals.length; i++){ var item = deals[i]; %>",'<li deal-id="<%=item.dealId%>" price="<%=item.dealPrice%>">','<span class="meal-list-title" limit="<%=item.onceLimitNum%>"><%=item.dealTitle%></span>','<span class="meal-list-price">¥<%=item.dealPrice%></span>',"</li>","<% } %>","</ul>"].join("");String.prototype.replaceAll=function(str1,str2){var str=this,result=str.replace(eval("/"+str1+"/gi"),str2);return result};var context=null,detailScroll=null,mealScroll=null,cloneNode=null,categories="",initUI=function(e){var i={deal_group:e};$("#wrapper").loadding(),$.ajax({type:"get",dataType:"json",data:i,url:"/dp/getDealDetails",success:function(e){if(e.status){$("#wrapper").loadding("close");var i=e.deals[0],t=[];categories=i.categories.join(","),i.detail=i.details.replace(/[\r\n|\n]/g,"<br/>").replace(/\s*/g,""),context.param.required=i.restrictions.is_reservation_required,i.restrictions.special_tips=i.restrictions.special_tips.replace(/[\r\n|\n]/g,"<br/>").replace(/(\s*<br\/>\s*<br\/>\s*){1,5}/g,"<br/>").replace(/(?:^\s*<br\/>)*/,"").replace(/\s*/g,""),i.notice=i.notice.replace(/[\r\n|\n]/g,"<br/>").replace(/(\s*<br\/>\s*<br\/>\s*){1,5}/g,"<br/>").replace(/(?:^\s*<br\/>)*/,"").replace(/\s*/g,""),window.tips=i.restrictions.special_tips;for(var a=0;a<i.businesses.length;a++){var s="";if("undefined"!=context.param.latitude&&0!=context.param.latitude&&0!=i.businesses[a].latitude){var s=distance.getDistance(context.param.latitude,context.param.longitude,i.businesses[a].latitude,i.businesses[a].longitude);s=s>=1e3?(s/1e3).toFixed(1)+"km":parseInt(s)+"m"}i.businesses[a].distance=s,context.param.business_id>0&&context.param.business_id==i.businesses[a].business_id&&t.push(i.businesses[a])}t.length<=0&&t.push(i.businesses[0]),i.currentBus=t;var l=Jumei.parseTpl(html,i);$("#beauty-detail").html(l),context.initSlider(),initDetailScroll()}},error:function(){}})},initDetailScroll=function(){detailScroll=null,context.goTop(detailScroll)};return initMealScroll=function(){mealScroll?mealScroll.refresh():mealScroll=new IScroll("#select-meal-wrapper",{preventDefault:!1,scrollX:!1,scrollY:!0,momentum:!0,scrollbars:!0,fadeScrollbars:!0,shrinkScrollbars:"clip"})},getDealId=function(e){var i=context.param.deal_id.replace(/[0-9]*-/,"");$.ajax({type:"get",dataType:"json",url:"/dp/getDeals",data:{dealgroupId:i},success:function(i){if(1==i.resultCode){var t=i.data.deals;if(1==t.length)context.onBack(),context.forward("#module=beauty&action=submit_orders&deal_id="+t[0].dealId+"&categories="+categories+"&required="+context.param.required+"&price="+t[0].dealPrice+"&title="+$(e).attr("title")+"&image_url="+context.param.image_url+"&dealgroupid="+context.param.deal_id+"&limit="+t[0].onceLimitNum);else{context.param.title=$(e).attr("title");var a=Jumei.parseTpl(meal_list,i.data);$("#select-meal-wrapper").html(a),$("#select-meal-wrapper").show(),window.scrollTo(0,0)}}else dialog('<div class="dialog-alert">该商品已售完或下架</div>',"我知道了")},error:function(){}})},dialog=function(e,i){context.hasCurrentView()&&$("#wrapper").dialog({width:260,height:200,content:e,title:"",type:1,init:function(){},ok:i,cancel:"取消",successCallback:function(){}})},Jumei.create(view,{onCreate:function(){context=this,this.iscrollFlag=!1,this.elem.html(htmlWrapper),initUI(this.param.deal_id),this.param.is_close&&"1"==this.param.is_close&&($("#back").off("tap"),$("#back").on("tap",function(){return JMWebView.close(),!1}),$("#home").on("tap",function(){context.onBack()})),$("#select-meal-wrapper").on("touchmove",function(e){e.preventDefault()})},onBack:function(){var e=this;$("#back").off(),$("#back").on("tap",function(){return e.controller._action&&"index"==e.controller._action?(JMWebView.close(),!1):void history.go(-1)})},setTitle:function(){this.title("团购详情")},onRefresh:function(){this.setTitle(),this.param.is_close&&"1"==this.param.is_close&&($("#back").off("tap"),$("#back").on("tap",function(){return JMWebView.close(),!1}),$("#home").on("tap",function(){context.onBack()}))},onEvent:function(){var e=this;this.events={"click .start-buy":function(){var e=this;login.isLogin(function(i){0>=i?location.href="jumeimall://page/login":getDealId(e)}),Jumei.ja("dpevent","startbuy")},"click .look-other":function(){e.forward("#module=beauty&action=business_list&deal_id="+e.param.deal_id+"&latitude="+e.param.latitude+"&longitude="+e.param.longitude+"&image_url="+context.param.image_url)},"click .goto-here":function(){var i=$(this).attr("latitude"),t=$(this).attr("longitude"),a=$(this).attr("name"),s=e.param.latitude,l=e.param.longitude;context.href(s&&0!=s&&""!=s&&"undefined"!=s?"http://mo.amap.com/?from="+s+","+l+"(起点)&to="+i+","+t+"("+a+")&type=0&opt=1&dev=1":"http://mo.amap.com/?q="+i+","+t+"&name="+a+"&dev=0"),Jumei.ja("dpevent","shangjiamap")},"click #select-meal-wrapper li":function(){var e=$(this).attr("deal-id"),i=$(this).attr("price"),t=$(this).attr("limit");$("#select-meal-wrapper").hide(),context.onBack(),context.forward("#module=beauty&action=submit_orders&deal_id="+e+"&categories="+categories+"&required="+context.param.required+"&price="+i+"&title="+context.param.title+"&image_url"+context.param.image_url+"&dealgroupid="+context.param.deal_id+"&limit="+t)},"click .shangjia-tell":function(){var e=$(this).attr("tell");$.os.iphone?location.href="tel:"+e:dialog('<div class="dialog-alert">请您拨打电话：'+e+"</div>","确定"),Jumei.ja("dpevent","shangtellxiangqing")},"click .more-detail-btn":function(){e.forward("#module=beauty&action=more_detail&deal_id="+e.param.deal_id+"&business_id="+e.param.business_id+"&latitude="+e.param.latitude+"&longitude="+e.param.longitude+"&image_url="+e.param.image_url)}}},onClose:function(){},initSlider:function(){if($("#detail-image img").length>0){new Slider("detail-image",{index:0})}}})});