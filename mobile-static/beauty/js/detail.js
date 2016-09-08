define(['view','distance'], function(view, distance){
    var htmlWrapper = ['<div id="beauty-detail">',
                       '</div>',
                       '<div id="select-meal-wrapper">',
                       '</div>',
               ].join('');
    var html = [
                     '<div class="detail-content">',
                         '<div id="detail-image" class="detail-image">',
                             '<% if(more_image_urls.length>0){ %>',
                             '<% for(var i = 0; i < more_image_urls.length; i++){ var item = more_image_urls[i]; %>',
                             '<div><img src="<%=item%>"/></div>',
                             '<% } %>',
                             '<% }else{ %>',
                                 '<div><img src="<%=image_url%>"/></div>',
                             '<% } %>',
                         '</div>',
                         '<div class="detail-sale-price">已售 <%=purchase_count%></div>',
                         '<div class="detail-price"><span class="detail-current-price">¥<%=current_price%></span><span class="detail-old-price">¥<%=list_price%></span><span title="<%=title%>" price=<%=current_price%> deal_id=<%=deal_id%> class="start-buy">立即抢购</span></div>',


                         '<div class="group-detail common-list">',
                             '<div class="group-detail-title common-header"><%=title%></div>',
                             '<div class="group-detail-content common-content">',
                                 '<div class="group-detail-desc"><%=description%></div>',

                                '<div class="orders-tag">',
                                    '<% if(restrictions.is_reservation_required != 1){ %>',
                                    '<span class="mian-yu-yue">免预约</span>',
                                    '<% } %>',
                                    '<span class="wei-xiao-fei">未消费退款</span>',
                                    '<span class="guo-qi">过期自动退款</span>',
                                '</div>',
                             '</div>',
                         '</div>',

                         '<div class="detail-discuss">',
                             '<span class="good-discuss">4个好评</span>',
                             '<span class="discuss-total">共4个评价</span>',
                         '</div>',

                         '<% if(notice && $.trim(notice) !="<p>&nbsp;</p><p>&nbsp;</p>"){  %>',
                         '<div class="group-buy-detail common-list">',
                             '<div class="common-header">通知</div>',
                             '<div class="common-content">',
                                 '<div class="tongzhi-list"> <%=notice%></div>',
                             '</div>',
                         '</div>',
                         '<% } %>',

                         '<% if(currentBus.length>0){ %>',
                         '<% for(var j = 0; j < currentBus.length; j++){ var busItem = currentBus[j]; %>',
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
                                 '<div class="notice-address"><%=busItem.address%><br/>联系电话：<%=busItem.telephone%></div>',
                                 '</div>',
                                 '<div class="notice-btn"><span name="<%=busItem.name%>" latitude="<%=busItem.latitude%>" longitude="<%=busItem.longitude%>" class="goto-here">到这里去</span><span class="connect-dealers"><a class="right-tell shangjia-tell" tell="<%=busItem.telephone%>">联系商家</a></span></div>',
                                 '<% if(businesses.length > 1){ %>',
                                 '<div class="look-other">查看全部<%=businesses.length%>家适用商户</div>',
                                 '<% } %>',
                             '</div>',
                         '</div>',
                         '<% } %>',
                         '<% } %>',

                         '<% if(details){ %>',
                         '<div class="group-buy-detail common-list">',
                             '<div class="common-header">团购详情</div>',
                             '<div class="common-content">',
                                 '<div class="group-detail-header">美容美体项目3选择1条餐</div>',
                                 '<ul>',
                                     '<li>',
                                         '<div><%=detail%></div>',
                                     '</li>',
          
                                 '</ul>',
                             '</div>',
                         '</div>',
                         '<% } %>',


                         '<% if(restrictions.special_tips){ %>',
                         '<div class="common-list buy-notice">',
                             '<div class="common-header">购买须知</div>',
                             '<div class="common-content">',
                                 '<ul>',
                                     '<li><%=restrictions.special_tips%></li>',
                                 '</ul>',
                             '</div>',
                         '</div>',
                         '<% } %>',
                         '<div id = "bottom-fix-dazong">本次团购由大众点评提供，消费时请告知店员使用大众点评团购券消费</div>',
                     '</div>',
               ].join('');


    var meal_list = [
               '<ul>',
                   '<% for(var i = 0; i < deals.length; i++){ var item = deals[i]; %>',
                   '<li deal-id="<%=item.dealId%>" price="<%=item.dealPrice%>">',
                       '<span class="meal-list-title" limit="<%=item.onceLimitNum%>"><%=item.dealTitle%></span>',
                       '<span class="meal-list-price">¥<%=item.dealPrice%></span>',
                   '</li>',
                   '<% } %>',
                '</ul>',

    ].join('');

    String.prototype.replaceAll = function (str1,str2){
         var str = this;     
         var result = str.replace(eval("/"+str1+"/gi"),str2);
         return result;
    }
               



    var context = null,
    detailScroll = null, 
    mealScroll = null,
    cloneNode = null,
    categories = '',
    initUI = function(dealid){
        var datas = {
            deal_group: dealid
        };
        $('#wrapper').loadding();
        $.ajax({
            type:'get',
            dataType:'json',
            data: datas,
            url:'/dp/getDealDetails',
            success: function(res){
                if(res.status){
                    $('#wrapper').loadding('close');
                    var result = res.deals[0],business = [];
                    categories = result.categories.join(',');
                    result.detail = result.details.replace(/[\r\n|\n]/g,"<br/>").replace(/\s*/g,'');
                    context.param.required = result.restrictions.is_reservation_required;
                    result.restrictions.special_tips = result.restrictions.special_tips.replace(/[\r\n|\n]/g,"<br/>").replace(/(\s*<br\/>\s*<br\/>\s*){1,5}/g,'<br/>').replace(/(?:^\s*<br\/>)*/,'').replace(/\s*/g,'');
                    result.notice = result.notice.replace(/[\r\n|\n]/g,"<br/>").replace(/(\s*<br\/>\s*<br\/>\s*){1,5}/g,'<br/>').replace(/(?:^\s*<br\/>)*/,'').replace(/\s*/g,'');
                    window.tips = result.restrictions.special_tips;
                    for(var i = 0; i < result.businesses.length; i++){
                        var juli = '';
                        if(context.param.latitude != 'undefined' && context.param.latitude !=0 && result.businesses[i].latitude != 0){
                            var juli = distance.getDistance(context.param.latitude,context.param.longitude,result.businesses[i].latitude,result.businesses[i].longitude); 

                            if(juli>=1000){
                                juli = (juli/1000).toFixed(1)+'km';
                            }else{
                                juli = parseInt(juli)+'m';
                            }
                        }
                        result.businesses[i].distance = juli;

                        if(context.param.business_id > 0 && (context.param.business_id == result.businesses[i].business_id)){
                            business.push(result.businesses[i]);
                        }
                    }
                    if(business.length <= 0){
                         business.push(result.businesses[0]);
                    }

                    result.currentBus = business;
                    var listHtml = Jumei.parseTpl(html, result);
                    $('#beauty-detail').html(listHtml);
                    context.initSlider();
                    initDetailScroll();
                }
            },
            error: function(){
            }
        });
    },
    initDetailScroll = function(){
         detailScroll = null;
//            cloneNode = null;
////            if(!cloneNode){
////                cloneNode = $('.detail-price').clone();
////                context.elem.append(cloneNode);
////                cloneNode.css({'position':'absolute','top':'0px','display':'none'});
////            }
//            detailScroll = new IScroll('#beauty-detail', {
//                preventDefault: false, 
//                probeType:2,
//                scrollX: !1,
//                scrollY: !0,
//                momentum: !0,
//                scrollbars: !0,
//                fadeScrollbars: !0,
//                shrinkScrollbars: "clip",
//                useTransition: true,
//            });
//            detailScroll.on('scroll', function(){
//                if(-this.y > 198){
//                    cloneNode.show();
//                }else{
//                    cloneNode.hide();
//                }
//            });
//            detailScroll.on('scrollEnd', function(){
//                if(-this.y > 198){
//                    cloneNode.show();
//                }else{
//                    cloneNode.hide();
//                }
//            });
         context.goTop(detailScroll);
    }
    initMealScroll = function(){
         if(!mealScroll){
             mealScroll = new IScroll('#select-meal-wrapper', {
                 preventDefault: false, 
                 scrollX: !1,
                 scrollY: !0,
                 momentum: !0,
                 scrollbars: !0,
                 fadeScrollbars: !0,
                 shrinkScrollbars: "clip"
             });
         }else{
             mealScroll.refresh();
         }
    },
    getDealId = function(_this){
        var dealGroupId = context.param.deal_id.replace(/[0-9]*-/,'');
        $.ajax({
            type:'get',
            dataType:'json',
            url:'/dp/getDeals',
            data:{dealgroupId:dealGroupId},
            success: function(res){
                if(res.resultCode == 1){
                    var deals = res.data.deals;
                    if(deals.length == 1){
                        context.onBack();
                        context.forward('#module=beauty&action=submit_orders&deal_id='+deals[0].dealId +'&categories='+categories+'&required='+context.param.required+'&price='+deals[0].dealPrice + '&title='+$(_this).attr('title')+'&image_url=' + context.param.image_url+'&dealgroupid=' + context.param.deal_id+'&limit='+deals[0].onceLimitNum);
                    }else{                          
                        context.param.title = $(_this).attr('title');
                        var mealTpl = Jumei.parseTpl(meal_list, res.data);
                        $('#select-meal-wrapper').html(mealTpl);
                        $('#select-meal-wrapper').show();
                        window.scrollTo(0,0);
                    }
                }else{
                    dialog('<div class="dialog-alert">该商品已售完或下架</div>','我知道了');
                }
            },
            error: function(){
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


    return Jumei.create(view, {
        onCreate: function() {
            context = this;
            this.iscrollFlag = false;
            this.elem.html(htmlWrapper);
            initUI(this.param.deal_id);
            //this.initSlider();
            
            if(this.param.is_close && this.param.is_close == '1'){
                $('#back').off('tap');
                $('#back').on('tap', function(){
                    JMWebView.close();
                    return false;
                });
                $('#home').on('tap', function(){
                    context.onBack();
                });
            }
            $('#select-meal-wrapper').on('touchmove', function(e) {
                e.preventDefault();
            });
        },
        onBack: function(){
            var self = this;
            $('#back').off();
            $('#back').on('tap', function(){
                if(self.controller._action && self.controller._action == 'index'){
                    JMWebView.close();
                    return false;
                };
                history.go(-1);
            });
        },
        setTitle: function() {
            this.title('团购详情');
        },
        onRefresh: function() {
            this.setTitle();
            if(this.param.is_close && this.param.is_close == '1'){
                $('#back').off('tap');
                $('#back').on('tap', function(){
                    JMWebView.close();
                    return false;
                });
                $('#home').on('tap', function(){
                    context.onBack();
                });
            }
        },
        onEvent: function() {
            var self = this;
            this.events = {
                'click .start-buy': function() {
                    var _this = this;
                    login.isLogin(function(uid) {
                        if (uid <= 0) {
                            location.href = "jumeimall://page/login";
                        } else {
                            getDealId(_this);
                        }
                    });
                    Jumei.ja('dpevent', 'startbuy');
                },
                'click .look-other': function() {
                    self.forward('#module=beauty&action=business_list&deal_id=' + self.param.deal_id + '&latitude=' + self.param.latitude + '&longitude=' + self.param.longitude + '&image_url=' + context.param.image_url);
                },
                'click .goto-here': function() {
                    var gotoLatitude = $(this).attr('latitude');
                    var gotoLongitude = $(this).attr('longitude');
                    var gotoName = $(this).attr('name');
                    var hereLatitude = self.param.latitude;
                    var hereLongitude = self.param.longitude;
                    if (hereLatitude && hereLatitude != 0 && hereLatitude != '' && hereLatitude != 'undefined') {

                        context.href('http://mo.amap.com/?from=' + hereLatitude + ',' + hereLongitude + '(起点)&to=' + gotoLatitude + ',' + gotoLongitude + '(' + gotoName + ')&type=0&opt=1&dev=1');
                    } else {
                        context.href('http://mo.amap.com/?q=' + gotoLatitude + ',' + gotoLongitude + '&name=' + gotoName + '&dev=0');
                    }
                    Jumei.ja('dpevent', 'shangjiamap');
                },
                'click #select-meal-wrapper li': function() {
                    var dealid = $(this).attr('deal-id');
                    var price = $(this).attr('price');
                    var limit = $(this).attr('limit');
                    $('#select-meal-wrapper').hide();
                    context.onBack();
                    context.forward('#module=beauty&action=submit_orders&deal_id=' + dealid + '&categories=' + categories + '&required=' + context.param.required + '&price=' + price + '&title=' + context.param.title + '&image_url' + context.param.image_url + '&dealgroupid=' + context.param.deal_id + '&limit=' + limit);
                },
                'click .shangjia-tell': function() {
                    var tell = $(this).attr('tell');
                    if ($.os.iphone) {
                        location.href = 'tel:' + tell;
                    } else {
                        dialog('<div class="dialog-alert">请您拨打电话：' + tell + '</div>', '确定');
                    }
                    Jumei.ja('dpevent', 'shangtellxiangqing');
                },
                'click .more-detail-btn': function() {
                    self.forward('#module=beauty&action=more_detail&deal_id='+self.param.deal_id+'&business_id='+self.param.business_id+'&latitude='+self.param.latitude+'&longitude='+self.param.longitude+'&image_url='+self.param.image_url);
                }
            }
        },
        onClose: function() {

        },
        initSlider: function() {
            if ($('#detail-image img').length > 0) {
                var slider = new Slider('detail-image', {index: 0});
            }
        },
    });
});
