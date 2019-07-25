define(['view','distance'], function(view, distance){
    var html = [
                '<div class="category-select"> ',
                    '<span class="category-liren" type="category-liren"><span>全部</span><i class="down-icon"></i></span>',
                    '<span class="category-shangqu" type="category-shangqu"><span>全部商区</span><i class="down-icon"></i></span>',
                    '<span class="category-paixu" type="category-paixu"><span>智能排序</span><i class="down-icon"></i></span>', 
                '</div>',
                '<div class="user-position"><div class="user-position-content">某某区区域某某城<span class="position-refresh"></span></div></div>',
                '<div id="beauty-category-wrapper">',
                    '<div id="category-scroll">',
                        '<section class="custom-category" id="custom-category">',
                            '<div class="custom-container">',
                            '</div>',
                        '</section>',

                        '<div class="pullUp" id="pullUpCategory">',
                           '<span class="pullUpLabel">点击查看更多</span>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div id="category-liren-list" class="category-common-type">',
                   '<div id="liren-list-scroll">',
                       '<ul>',
                           '<li type="丽人" html="全部" class="丽人 selected">全部</li>',
                           '<li type="美发" html="美发" class="美发">美发</li>',
                           '<li type="美容" html="美容" class="美容">美容</li>',
                           '<li type="SPA" html="SPA" class="SPA">SPA</li>',
                           '<li type="美甲" html="美甲" class="美甲">美甲</li>',
                           '<li type="齿科" html="齿科" class="齿科">齿科</li>',
                           '<li type="瑜伽" html="瑜伽" class="瑜伽">瑜伽</li>',
                           '<li type="瘦身纤体" html="瘦身" class="瘦身纤体">瘦身</li>',
                           '<li type="舞蹈" html="舞蹈" class="舞蹈">舞蹈</li>',
                           '<li type="写真" html="摄影写真" class="写真">摄影写真</li>',
                           '<li type="整形" html="整形" class="整形">整形</li>',
                       '</ul>',
                   '</div>',
                   '<div class="bottom"></div>',
               '</div>',
               '<div id="category-shangqu-list" class="category-common-type">',
                   '<div id="shangqu-list-scroll">',
                       '<ul>',
                       '</ul>',
                   '</div>',
                   '<div id="shangqu-second-scroll">',
                       '<ul>',
                       '</ul>',
                   '</div>',
                   '<div class="bottom"></div>',
               '</div>',
               '<div id="category-paixu-list" class="category-common-type">',
                   '<div id="paixu-list-scroll">',
                       '<ul>',
                           '<li type = "1" class="selected">智能排序</li>',
                           '<li type = "2">评价最高</li>',
                           '<li type = "4">环境好评</li>',
                           '<li type = "5">服务好评</li>',
                           '<li type = "7">离我最近</li>',
                           '<li type = "8">价格最低</li>',
                       '</ul>',
                   '</div>',
                   '<div class="bottom"></div>',
               '</div>',
               '<div id="category_bg"></div>',

                ].join('');



    var list = [
                '<ul>',
                    '<% for(var i = 0; i < businesses.length; i++){ var item = businesses[i]; %>',
                     '<% if(param.latitude != "undefined" && param.latitude !=0 && item.latitude != 0){ %>',
                     '<% var distances = param.distance.getDistance(param.latitude,param.longitude,item.latitude,item.longitude); %>',
                        '<% if(distances>=1000){%>',
                          '<% distances = (distances/1000).toFixed(1) + "km";%>',
                        '<% }else{%>',
                          '<% distances = parseInt(distances) + "m";%>',
                        '<% }%>',
                     '<% }%>',
                   
                    '<li class="custom-list">',
                        '<div class="list-title" business_id="<%=item.business_id%>"><span class="list-title-cut"><%=item.name%><% if(item.branch_name &&item.branch_name !="") { %>(<%=item.branch_name%>)<%}%></span><span class="custom-distance"><%=distances%></span></div>',
                        '<ul class="list-content" <%if(item.deals.length>2){ %>style = "height:173px;"<%}%> >',
                           '<% for(var j = 0; j < item.deals.length; j++){ var list = item.deals[j];%>',
                           '<li deal_id = <%=list.deal_id%>>',
                               '<img src="<%=list.image_url%>"/>',
                               '<% if(list.restrictions && list.restrictions.is_reservation_required != 1){ %>',
                               '<img class="is-yuyue" src="<%=static%>beauty/image/free_make@2x.png"/>',
                               '<% } %>',
                               '<div class="list-content-content">',
                                   '<div class="content-desc"><%=list.description%></div>',
                                   '<div class="content-price"><span class="current-price">¥<%=list.current_price%></span><span class="old-price">¥<%=list.list_price%></span><span class="sale-num">已售:<%=list.purchase_count%></span></div>',
                               '</div>',
                           '</li>',
                           '<% } %>',
                        '</ul>',
                        '<div class="list-content-more hidden" <%if(item.deals.length>2){ %>style = "display:block;"<%}%> >更多团购项目</div>',
                    '</li>',
                    '<% } %>',
                '</ul>',                 
               ].join('');




           var ereaList = [
                           '<% if(is_show){  %>',
                           '<li class="附近"><span>附近</span></li>',
                           '<% } %>',
                           '<li class="全部 selected"><span>全部商区</span></li>',
                           '<% for(var i = 0; i < data.length; i++){ var item = data[i];%>',
                           '<li class="<%=item.district_name%>"><span><%=item.district_name%></span></li>',
                           '<% } %>'
                          ].join('');

          var ereaSecondList = [
                                '<% for(var i = 0; i < data.length; i++){ var item = data[i]; %>' ,
                                    '<li type="<%=item.type %>" value="<%=item.value%>"><span><%=item.area_second  %></span></li>',
                                '<% } %>',
                               ].join('');

          var fujinData = [{
                               type:'fujin',
                               area_second:'500米',
                               value: 500
                           },
                           {
                               type:'fujin',
                               area_second:'1000米',
                               value: 1000
                           },
                           {
                               type:'fujin',
                               area_second:'2000米',
                               value: 2000
                           },
                           {
                               type:'fujin',
                               area_second:'5000米',
                               value: 5000
                           },{
                               type:'fujin',
                               area_second:'不限距离',
                               value: -1 
                           }];


             var indexScroll = null,
             sortScroll = null,
             ereaScroll = null,
             typeScroll = null,
             ereaSecondScroll = null,
             context,
             pullDownOffset,
             pullUpEl,
             pullUpOffset,
             initErea = function(city){
                 var arealist = {};
                 arealist.data = window.citys && window.citys[city] ? window.citys[city] : '北京';
                 arealist.is_show = (context.param.city == context.param.pos_city? true : false);
                 $("#shangqu-second-scroll ul").html('');
                 var listHtml = Jumei.parseTpl(ereaList, arealist);
                 $('#shangqu-list-scroll ul').html(listHtml);
                 if(context.param.area){
                     $('#shangqu-list-scroll .selected').removeClass('selected');
                     $('.'+context.param.area).addClass('selected');
                     initAreaByData(context.param.area);
                 }
             },
             initAreaByData = function(city){
                     var data = {};
                     data.data = [];
                     var neighborhoods = window.citys[ajaxPage.currentCity];;
                     for(var z = 0; z < neighborhoods.length; z++){
                         if(city == neighborhoods[z].district_name){
                             var itemList = neighborhoods[z].neighborhoods;
                             for(var i = 0; i < itemList.length; i++){
                                 var item = {
                                     type:'area',
                                     value: itemList[i],
                                     area_second: itemList[i],
                                 }
                                 data.data.push(item);
                             }
                         }
                     }
                     var tpl = Jumei.parseTpl(ereaSecondList, data);
                     $('#shangqu-second-scroll ul').html(tpl);
                     initAreaSecondScroll();
             },
             initSelectStatus = function(){
                 if(ajaxPage.category){
                     $('#liren-list-scroll .selected').removeClass('selected');
                     $('.'+ajaxPage.category).addClass('selected');
                     var html = $('.'+ajaxPage.category).attr('html');
                     $('.category-liren span').html(html);
                 }
                 if(ajaxPage.currentArea){
                     $('#shangqu-list-scroll .selected').removeClass('selected');
                     $('.'+ajaxPage.currentArea).addClass('selected');
                 }
             },
             initUI= function(){
//                 $('#beauty-category-wrapper').height(context.height-36);
//                 $('#liren-list-scroll').height();

//                 function pullUpAction () {
//                     ajaxPage.getList();
//                     indexScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
//                 }
//                 pullUpEl = document.querySelector('#beauty-category-wrapper .pullUp');   
//                 pullUpOffset = pullUpEl.offsetHeight;
//                 setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
//                 indexScroll = new IScroll('#beauty-category-wrapper', {
//                     preventDefault: false, 
//                     probeType:2,
//                     scrollX: !1,
//                     scrollY: !0,
//                     momentum: !0,
//                     scrollbars: !0,
//                     fadeScrollbars: !0,
//                     shrinkScrollbars: "clip",
//                     useTransition: true,
//                     topOffset: pullDownOffset,
//                 });
//                 indexScroll.on('scroll',function(){
//                     if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
//                         pullUpEl.className = 'flip';
//                         pullUpEl.querySelector('.pullUpLabel').innerHTML = '放开刷新...';
//                         this.maxScrollY = this.maxScrollY;
//                     } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
//                         pullUpEl.className = '';
//                         pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
//                         this.maxScrollY = pullUpOffset;
//                     }
//                 });
//                 indexScroll.on('scrollEnd',function(){
//                     if (pullUpEl.className.match('flip')) {
//                         pullUpEl.className = 'loading';
//                         pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';                
//                         pullUpAction(); // Execute custom function (ajax call?)
//                     }
//                 });
                    $('#category_bg').on('touchmove', function(e){
                        e.preventDefault();
                    });
                    pullUpEl = document.querySelector('#beauty-category-wrapper .pullUp');   
                    $('#pullUpCategory').off('click');
                    $('#pullUpCategory').on('click', function(){
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                        ajaxPage.getList();
                    });
                    
             },
             initLirenScroll = function(){
                 if(!typeScroll){
                     typeScroll = new IScroll('#liren-list-scroll', {
                         preventDefault: false, 
                         scrollX: !1,
                         scrollY: !0,
                         momentum: !0,
                         scrollbars: !0,
                         fadeScrollbars: !0,
                         shrinkScrollbars: "clip"
                     });
                     $('#category-liren-list').on('touchmove', function(e){
                        e.preventDefault();
                     });
                 }
             },
             initSortScroll = function(){
                 if(!sortScroll){
                     sortScroll = new IScroll('#paixu-list-scroll', {
                         preventDefault: false, 
                         scrollX: !1,
                         scrollY: !0,
                         momentum: !0,
                         scrollbars: !0,
                         fadeScrollbars: !0,
                         shrinkScrollbars: "clip"
                     });
                     $('#category-paixu-list').on('touchmove', function(e){
                        e.preventDefault();
                     });
                 }
             },
             initAreaScroll =  function(){
                     ereaScroll = new IScroll('#shangqu-list-scroll', {
                         preventDefault: false, 
                         scrollX: !1,
                         scrollY: !0,
                         momentum: !0,
                         scrollbars: !0,
                         fadeScrollbars: !0,
                         shrinkScrollbars: "clip"
                     });
                     $('#category-shangqu-list').on('touchmove', function(e){
                        e.preventDefault();
                     });
             },
             initCityData = function(){
                 if($('#shangqu-list-scroll ul li').length<=1){
                     getArea();
                 }else{
                    initAreaScroll();
                    initAreaSecondScroll();
                 }
             },
             initAreaSecondScroll =  function(){
                 if(!ereaSecondScroll){
                     ereaSecondScroll = new IScroll('#shangqu-second-scroll', {
                         preventDefault: false, 
                         scrollX: !1,
                         scrollY: !0,
                         momentum: !0,
                         scrollbars: !0,
                         fadeScrollbars: !0,
                         shrinkScrollbars: "clip"
                     });
                 }else{
                     ereaSecondScroll.refresh();
                 }
             },
             pos = {
                 latitude:0,
                 longitude:0,
             },
             ajaxPage = {
                 currentPage : 0,
                 currentCity: null,
                 currentArea: null,
                 totalPage: 0,
                 loadFlag: true,
                 category: '丽人',
                 sort: 1,
                 radius:-1,
                 getList: function(changeFlag){
                     if(ajaxPage.loadFlag){
                         ajaxPage.loadFlag = false;
                         var erea = '',datas = {},self = this;
                         if( ( ajaxPage.currentCity != null ) || ( pos.latitude == 0 && pos.longitude == 0)){
                             datas.city = ajaxPage.currentCity || '北京';
                             datas.page = ++self.currentPage;
                             datas.category = ajaxPage.category;
                             datas.sort = ajaxPage.sort;
                             datas.radius = ajaxPage.radius;
                             datas.limit  = 15;
                             if(ajaxPage.currentArea != null){
                                 datas.region = ajaxPage.currentArea;
                             }
                             if(pos.latitude != 0 && pos.longitude != 0){
                                 datas.longitude = pos.longitude;
                                 datas.latitude = pos.latitude;
                             }
                         }else{
                             datas = {
                                 latitude : pos.latitude,
                                 longitude : pos.longitude,
                                 page : ++self.currentPage,
                                 sort: ajaxPage.sort,
                                 category:ajaxPage.category,
                                 longitude : pos.longitude,
                                 radius : ajaxPage.radius,
                                 latitude : pos.latitude,
                                 limit : 15
                             }
                         }
                         $('#wrapper').loadding();
                         $.ajax({
                             type:'get',
                             dataType:'json',
                             data: datas,
                             url:'/dp/getTopBusinessesByLocation',
                             success: function(res){
                                 $('#pullUpCategory').show();
                                 $('#wrapper').loadding('close');
                                 if(res.status == 'OK' && res.businesses.length > 0){
                                     self.totalPage = res.total_count;
                                     res.param = context.param;
                                     res.param.distance = distance;
                                     res.static = Jumei.static;
                                     var listHtml = Jumei.parseTpl(list, res);
                                     if( changeFlag == true){
                                         $('#beauty_category .custom-container').html(listHtml);
                                     }else{
                                         $('#beauty_category .custom-container').append(listHtml);
                                     }
                                     $('#beauty_category .content-desc').subStr(46);
                                     $('#beauty_category .list-title .list-title-cut').subStr(35);
                                     if($('#beauty-category-wrapper').height()>$('#category-scroll').height()){
                                         $('#pullUpCategory').hide();
                                     }else{
                                         $('#pullUpCategory').show();
                                     }
                                     if(pullUpEl){
                                         pullUpEl.querySelector('.pullUpLabel').innerHTML = '点击查看更多';
                                     }
                                     //indexScroll.refresh();
                                 }else{
                                     if(ajaxPage.currentPage == 1){
                                         $('#beauty_category .custom-container').html('<div class="empty-tip"></div>');
                                         dialog('<div class="dialog-alert">没有当前城市的团购信息！</div>');
                                     }
                                     $('#pullUpCategory').hide();
                                     //indexScroll.refresh();
                                 }
                                 ajaxPage.loadFlag = true;
//                                 if (pullUpEl.className.match('loading')) {
//                                     pullUpEl.className = '';
//                                     pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
//                                 }
                             },
                             error: function(){
                                 ajaxPage.loadFlag = true;
                                 $('#wrapper').loadding('close');
                             }
                         });
                     }
                 }
             },
             changeFunc = function(city, area){
                 var flag = false;
                 ajaxPage.currentPage = 0;
                 ajaxPage.totalPage = 0;
                 if(city != ajaxPage.city || area != ajaxPage.area){
                     ajaxPage.currentCity = city;
                     ajaxPage.currentArea = area;
                     flag = true;
                     ajaxPage.getList(flag);
                 }
             },
             getArea = function(){
                 if(window.citys){
                     initErea(context.param.city);
                     return;
                 }else{
                     getCitys();
                 }
             },
             toChangeCity = function(obj){
                 window.citys = {};
                 for(var i in obj){
                     if(obj.hasOwnProperty(i)){
                        for(var z = 0; z < obj[i].length; z++){
                            window.citys[obj[i][z].city_name] = obj[i][z].districts;
                        }
                     }
                 }
             },
             getCityFlag = true,
             getCitys = function(callback, city){
                 if(getCityFlag){
                     getCityFlag = false;
                     $.ajax({
                         type:'get',
                         dataType:'json',
                         url:'/dp/getCities',
                         success: function(res){
                             getCityFlag = true;
                             if(res){
                                 toChangeCity(res);
                                 initErea(context.param.city);
                                 callback && callback.call(context,city);
                             }
                         },
                         error: function(){
                             getCityFlag = true;
                         }
                     });
                 }
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
                       ok: '我知道了',
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
                     this.elem.html(html);
                    // var listHtml = Jumei.parseTpl(list, data);
                    // $('#beauty_category .custom-container').html(listHtml);
                     ajaxPage.currentPage = 0;
                     ajaxPage.currentCity = this.param.city;
                     ajaxPage.sort = 1;
                     ajaxPage.category = this.param.type;
                     if(this.param.city == this.param.pos_city){
                        pos.latitude = this.param.latitude;
                        pos.longitude = this.param.longitude;
                     }
                     
                     if(context.param.area){
                         ajaxPage.currentArea = context.param.area;
                         $('.category-shangqu span').html(context.param.area);
                     }else{
                         ajaxPage.currentArea = null;
                     }
                     ajaxPage.getList(true);
                     initUI();
                     getArea();
                     initSelectStatus();
                 },
                 onEvent: function(){
                     var self = this;
                     this.iscrollFlag = false;
                     this.events = {
                         'click .list-content li': function (e) {
                             var business_id = $(this).parent().parent().find('.list-title').attr('business_id');
                             var image_url = $(this).find('img').attr('src');
                             Jumei.ja('dpevent','detail'+ context.param.type);
                             self.forward('#module=beauty&action=detail&deal_id='+$(this).attr('deal_id')+  '&business_id=' + business_id +'&latitude='+self.param.latitude+'&longitude='+self.param.longitude + '&image_url=' + image_url);
                         },
                         'click .list-content-more': function(){
                             $(this).hide();
                             $(this).parent().find('.list-content').height('auto');
                             self.refresh();
                         },
                         'click #category_bg': function(){
                             $('#category-paixu-list').hide();
                             $('#category-shangqu-list').hide();
                             $('#category-liren-list').hide();
                             $(this).hide();
                             $('#category_bg').hide();
                             $('.category-select span').removeClass('hidden');
                         },
                         'touchmove #category_bg': function(e){
                             e.preventDefault();
                             e.stopPropagation();
                         },
                         'click .category-select>span': function(){
                             $('.category-common-type').hide();
                             var clickClass =  $(this).attr('type');
                             if($(this).hasClass('hidden')){
                                 $(this).removeClass('hidden');
                                 $('#category_bg').hide();
                                 $('#'+clickClass+'-list').hide();
                             }else{
                                 $(this).addClass('hidden');
                                 $('#category_bg').show();
                                 $('#'+clickClass+'-list').show();
                                 if(clickClass=='category-shangqu'){                                     
                                     initCityData();
                                 }else if(clickClass == 'category-liren'){
                                     initLirenScroll();
                                 }else if(clickClass == 'category-paixu'){
                                     initSortScroll();
                                 }
                             }
                             $(this).siblings().removeClass('hidden');
                         },
                         'click #liren-list-scroll ul li': function(){
                             if($(this).hasClass('selected')){
                                 return;
                             }else{
                                 $(this).addClass('selected').siblings().removeClass('selected');
                                 ajaxPage.currentPage = 0;
                                 ajaxPage.category = $(this).attr('type');
                                 ajaxPage.getList(true);
                                 $('.category-liren span').html($(this).html());
                             }
                             $('.category-liren').trigger('click');
                         },
                         'click #shangqu-list-scroll ul li': function(){
                             if($(this).hasClass('selected')){
                                 return;
                             }else{
                                 $(this).addClass('selected').siblings().removeClass('selected');
                                 if( $(this).hasClass('全部')){
                                     ajaxPage.currentPage = 0;
                                     ajaxPage.currentArea  = null;
                                     $('#shangqu-second-scroll ul').html('');
                                     ajaxPage.getList(true);
                                     $('.category-shangqu span').html('全部商区');
                                     $('.category-shangqu').trigger('click');
                                     Jumei.ja('dpevent','sortall');
                                 }else if( $(this).hasClass('附近')){
                                     var data = {};
                                     data.data = fujinData;
                                     var tpl = Jumei.parseTpl(ereaSecondList,data);
                                     $('#shangqu-second-scroll ul').html(tpl);
                                     Jumei.ja('dpevent','sortfujin');
                                     ereaSecondScroll.refresh();
                                 }else{
                                    var _this = this;
                                    var city = $(_this).find('span').html().trim();
                                  // var tpl = Jumei.parseTpl(ereaSecondList, data);
                                  //  $('#shangqu-second-scroll ul').html(tpl);
                                   // ereaSecondScroll.refresh();
                                     if( window.citys ){
                                         initAreaByData(city);
                                     }else{
                                         getCitys( initAreaByData ,city);
                                     }

                                 }
                             }
                         },
                         'click #shangqu-second-scroll ul li': function(){
                             if($(this).hasClass('selected')){
                                 return;
                             }else{
                                 if($(this).attr('type') == 'fujin'){
                                     pos.latitude = context.param.latitude;
                                     pos.longitude = context.param.longitude;
                                     $(this).addClass('selected').siblings().removeClass('selected');
                                     ajaxPage.currentPage = 0;
                                     $('.category-shangqu span').html('附近');
                                     ajaxPage.radius = $(this).attr('value');
                                     ajaxPage.getList(true);
                                     //$('.category-shangqu span').html(ajaxPage.currentArea);
                                 }else{
                                     pos.latitude = 0;
                                     pos.longitude = 0;
                                     $(this).addClass('selected').siblings().removeClass('selected');
                                     ajaxPage.currentPage = 0;
                                     ajaxPage.currentArea = $(this).find('span').html();
                                     ajaxPage.getList(true);
                                     $('.category-shangqu span').html(ajaxPage.currentArea);
                                 }
                             }
                             $('.category-shangqu').trigger('click');
                         },
                         'click #paixu-list-scroll ul li': function(){
                             if($(this).hasClass('selected')){
                                 return;
                             }else{
                                 $(this).addClass('selected').siblings().removeClass('selected');
                                 ajaxPage.currentPage = 0;
                                 ajaxPage.sort = $(this).attr('type');
                                 if(pos.latitude == 0 && ajaxPage.sort == 7){
                                     ajaxPage.sort = 1;
                                 }
                                 ajaxPage.getList(true);
                                 Jumei.ja('dpevent','sort'+ $(this).html());
                                 $('.category-paixu span').html($(this).html());
                             }
                             $('.category-paixu').trigger('click');
                         },
                         'click .bottom': function(){
                             $('.category-select span').removeClass('hidden');
                             $('.category-common-type').hide();
                             $('#category_bg').hide();
                         },
                     }
                 },
                 onClose: function(){

                 },
                 setTitle: function(){
                    this.title('丽人生活团');
                 },
                 onRefresh: function(){
                   // indexScroll.refresh();
                    this.setTitle();
                 },
             });
});
