define(['view','distance'], function(view, distance){

    var htmlWrapper = ['<div id="beauty-business-list">',
                 '</div>',
               ].join('');
    var html = [
                         '<% if(businesses.length>0){ %>',
                         '<% for(var j = 0; j < businesses.length; j++){ var busItem = businesses[j];%>',
                         '<div class="detail-notice common-list">',
                             '<div class="common-header">商家信息</div>',
                             '<div class="notice-content common-content">',
                                 '<div class="deals-info">',
                             '<div class="notice-content-title">[<%=busItem.name%>]<span class="detail-distance"><%=busItem.distance%></span></div>',
                                 '<div class="notice-content-xing clear">',
                                     '<% var man =  Math.floor(busItem.avg_rating); var ban = Math.ceil(busItem.avg_rating%1);var xing = 5-man-ban; %>',
                                     '<% for(var z = 0; z < man; z++){ %>',
                                     '<span class="xing-select"></span>',
                                     '<%}%>',
                                     '<% for(var y = 0; y < ban; y++){ %>',
                                     '<span class="xing-select-ban"></span>',
                                     '<%}%>',
                                     '<% for(var x = 0; x < xing; x++){ %>',
                                     '<span class="xing"></span>',
                                     '<%}%>',  
                                 '</div>',
                                 '<div class="notice-address"><%=busItem.address%><br/>联系电话：<%=busItem.telephone%></div></div>',
                                 '</div>',
                                 '<div class="notice-btn"><span class="goto-here" latitude="<%=busItem.latitude%>" longitude="<%=busItem.longitude%>" name = "<%=busItem.name%>">到这里去</span><span class="connect-dealers"><a class="right-tell shangjia-tell" tell="<%=busItem.telephone%>">联系商家</a></span></div>',
                             '</div>',
                         '</div>',
                         '<% } %>',
                         '<% } %>',

                         '<div id = "bottom-fix-dazong">本次团购由大众点评提供，消费时请告知店员使用大众点评团购券消费</div>',
               ].join('');

    
               var context = null, 
               initUI = function(dealid){
                   var datas = {
                       deal_group: dealid
                   };
                   $.ajax({
                       type:'get',
                       dataType:'json',
                       data: datas,
                       url:'/dp/getDealDetails',
                       success: function(res){
                           if(res.status){
                               var result = res.deals[0];
                               for(var i = 0; i < result.businesses.length; i++){
                                   var juli = '';
                                   if(context.param.latitude != 'undefined' && context.param.latitude !=0 && result.businesses[i].latitude != 0){
                                       var juli = distance.getDistance(context.param.latitude,context.param.longitude,result.businesses[i].latitude,result.businesses[i].longitude); 

                                       if(juli>=1000){
                                           juli = (juli/1000).toFixed(1) + 'km';
                                       }else{
                                           juli = parseInt(juli) + 'm';
                                       }
                                   }
                                   result.businesses[i].distance = juli;
                               }
                               var listHtml = Jumei.parseTpl(html, result);
                               $('#beauty-business-list').html(listHtml);
                               context.refresh();
                           }
                       },
                       error: function(){
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
                       this.elem.html(htmlWrapper);
                       initUI(this.param.deal_id);
                    },
                    setTitle: function(){
                        this.title('商家列表');
                    },
                    onRefresh: function(){
                        this.setTitle();
                    },
                   onEvent: function(){
                       var self = this;
                       this.events = {
                           'click .goto-here': function () {
                               var gotoLatitude = $(this).attr('latitude');
                               var gotoLongitude = $(this).attr('longitude');
                               var gotoName = $(this).attr('name');
                               var hereLatitude = self.param.latitude;
                               var hereLongitude = self.param.longitude;
                               if(hereLatitude && hereLatitude != 0 && hereLatitude != ''&& hereLatitude !='undefined' ){
                                   // location.href = 'http://mo.amap.com/?q=' + gotoLatitude + ',' + gotoLongitude + '&name='+ gotoName + '&dev=0';
                                   context.href('http://mo.amap.com/?from='+ hereLatitude + ','+ hereLongitude +'(起点)&to='+gotoLatitude+','+gotoLongitude+'('+ gotoName +')&type=0&opt=1&dev=1');
                               }else{
                                   context.href('http://mo.amap.com/?q=' + gotoLatitude + ',' + gotoLongitude + '&name='+ gotoName + '&dev=0');
                               }
                           },
                           'click .shangjia-tell': function(){
                               var tell = $(this).attr('tell');
                               if($.os.iphone){
                                   location.href = 'tel:'+tell;
                               }else{
                                   dialog('<div class="dialog-alert">请您拨打电话：'+ tell +'</div>');
                               }
                               Jumei.ja('dpevent','shangtellliebiao');
                           }
                       }
                   },
                   onClose: function(){

                   },
               });
});
