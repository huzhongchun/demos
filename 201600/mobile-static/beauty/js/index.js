define(['view','distance'], function(view, distance){
    var tpl = [
    '<div class="beauty-index-wrapper">',
        '<div class="index-header">',
            '<span class="city-select" city="北京">北京</span>',
            '<input class="search-custom" readonly="readonly" placeholder="搜商户" type="text"/>',
            '<span class="my-group">我的团购</span>',
        '</div>',
        '<div id="beauty-index-container" class="beauty-index-container">',
            '<div id="beauty-index-scroll">',
                '<div class="banner-container">',
                    '<div>',
                        '<a></a>',
                    '</div>',
                '</div>',
                '<div class="category-wrapper">',
                    '<div class="category-icon" id="category-slider">',
                        '<div class="clear">',
                            '<div class="li-list" type="丽人"><img src="<%=static%>beauty/image/all.jpg?123"/></div>',
                            '<div class="li-list" type="美发"><img src="<%=static%>beauty/image/hair_salon.jpg?123"/></div>',
                            '<div class="li-list" type="美容"><img src="<%=static%>beauty/image/beauty.jpg?123"/></div>',
                            '<div class="li-list" type="SPA"><img src="<%=static%>beauty/image/spa.jpg?123"/></div>',
                            '<div class="li-list" type="美甲"><img src="<%=static%>beauty/image/nail_art.jpg?123"/></div>',
                            '<div class="li-list" type="齿科"><img src="<%=static%>beauty/image/dental.jpg?123"/></div>',
                            '<div class="li-list" type="瑜伽"><img src="<%=static%>beauty/image/yoga.jpg?123"/></div>',
                            '<div class="li-list" type="瘦身纤体"><img src="<%=static%>beauty/image/thin_body.jpg?123"/></div>',
                        '</div>',
                        '<div class="clear">',
                            '<div class="li-list" type="舞蹈"><img src="<%=static%>beauty/image/dance.jpg?333"/></div>',
                            '<div class="li-list" type="写真"><img src="<%=static%>beauty/image/photo.jpg?123"/></div>',
                            '<div class="li-list" type="整形"><img src="<%=static%>beauty/image/plastic.jpg?123"/></div>',
                        '</div>',
                    '</div>',
                '</div>',

                '<section class="custom-category">',
                    '<div class="custom-header"> 附近最热</div>',
                    '<div class="custom-container">',

                    '</div>',
                '</section>',

                '<div class="pullUp" id="pullUp">',
                     '<span class="pullUpLabel">点击查看更多</span>',
                '</div>',

            '</div>',

        '</div>',

        '<div class="erea-select-list hidden" id="erea-select-list">',
            '<div class="area-iscroll">',
                '<ul class="clear">',

                '</ul>',
            '</div>',
            '<div class="current-city-content">当前城市：<span class="current-city"></span> <span class="change-city">更换</span></div>',
        '</div>',

        '<div id="main_bg"></div>',
    '</div>',
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
                     '<% if(item.deals.length>0) {%>',
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
                    '<% } %>',
                '</ul>',                 
               ].join('');



    var ereaList =[ 
                '<ul class="clear">',
                   '<ul class="clear">',
                      '<% var num = item.length%4;if(num>0){num = 4-num;}%>',
                      '<% for(var j = 0; j < item.length; j++){ var list = item[j]; %>',
                          '<li><%=list.district_name%></li>',
                      '<% } %>',
                      '<% for(var z = 0; z < num; z++){%>',
                          '<li></li>',
                      '<% } %>',
                   '</ul>',
                 ].join('');



             var ereaScroll = null,
                 indexScroll = null, 
                 context,
                 pullDownOffset,
                 pullUpEl, pullUpOffset,
                 initUI = function(){
                 //$('#city-select-list').height($(window).height());
                 //$('#beauty-index-container').height(context.height-53);
                 indexScroll = null;
//                 if(indexScroll == null){
//                     function pullUpAction () {
//                         ajaxPage.getList();
//                         indexScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
//                     }
//                     pullUpEl = document.querySelector('#beauty-index-container .pullUp');   
//                     pullUpOffset = pullUpEl.offsetHeight;
//                     setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
//                     indexScroll = new IScroll('#beauty-index-container', {
//                         preventDefault: false, 
//                         probeType:2,
//                         scrollX: !1,
//                         scrollY: !0,
//                         momentum: !0,
//                         scrollbars: !0,
//                         fadeScrollbars: !0,
//                         shrinkScrollbars: "clip",
//                         useTransition: true,
//                         topOffset: pullDownOffset,
//                     });
//
//                     indexScroll.on('scroll',function(){
//                            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
//                                 pullUpEl.className = 'flip';
//                                 pullUpEl.querySelector('.pullUpLabel').innerHTML = '放开刷新...';
//                                 this.maxScrollY = this.maxScrollY;
//                             } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
//                                 pullUpEl.className = '';
//                                 pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
//                                 this.maxScrollY = pullUpOffset;
//                             }
//                     });
//                     indexScroll.on('scrollEnd',function(){
//                         if (pullUpEl.className.match('flip')) {
//                             pullUpEl.className = 'loading';
//                             pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';                
//                             pullUpAction(); // Execute custom function (ajax call?)
//                         }
//                     });
//                 }

                    $('#pullUp').off('click');
                    $('#pullUp').on('click', function(){
                        pullUpEl = document.querySelector('#beauty-index-container .pullUp');  
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';   
                        ajaxPage.getList();
                    });
             },
             initCityScroll  = function(){
                 $('#main_bg').on('touchmove', function(e){
                     e.preventDefault();
                     e.stopPropagation();
                 });
//                 if(ereaScroll == null){
//                     ereaScroll = new IScroll('#erea-select-list', {
//                         preventDefault: false, 
//                         scrollX: !1,
//                         scrollY: !0,
//                         momentum: !0,
//                         scrollbars: !0,
//                         fadeScrollbars: !0,
//                         shrinkScrollbars: "clip"
//                     });
//                 }

             },
             pos = {
                 latitude:0,
                 longitude:0,
             },
             ajaxPage = {
                 currentPage : 0,
                 currentCity:'北京',
                 currentArea:null,
                 category:'丽人',
                 totalPage:0,
                 loadFlag:true,
                 latitude:0,
                 longitude:0,
                 getList: function(changeFlag){
                     if(ajaxPage.loadFlag){
                         ajaxPage.loadFlag = false;
                         var erea = '',datas = {},self = this;
                         if( ( ajaxPage.currentCity != null ) || ( ajaxPage.latitude == 0 && ajaxPage.longitude == 0)){
                             datas.city = ajaxPage.currentCity || '北京';
                             datas.page = ++self.currentPage;
                             datas.limit = 15;
                             if(ajaxPage.currentArea != null){
                                 datas.region = ajaxPage.currentArea;
                             }
                             if(ajaxPage.latitude != 0 && ajaxPage.longitude != 0){
                                 datas.latitude = ajaxPage.latitude;
                                 datas.longitude = ajaxPage.longitude;
                                 datas.sort = 7;
                             }
                         }else{
                             datas = {
                                 latitude : ajaxPage.latitude,
                                 longitude : ajaxPage.longitude,
                                 radius : -1,
                                 page : ++self.currentPage,
                                 latitude : ajaxPage.latitude,
                                 longitude : ajaxPage.longitude,
                                 sort : 7,
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
                                 $('#wrapper').loadding('close');
                                 if(res.status == 'OK' && res.businesses.length > 0){
                                     self.totalPage = res.total_count;
                                     res.param = pos;
                                     res.param.distance = distance;
                                     res.static = Jumei.static;
                                     var listHtml = Jumei.parseTpl(list, res);
                                     if( changeFlag == true){
                                         $('#beauty_index .custom-container').html(listHtml);
                                     }else{
                                         $('#beauty_index .custom-container').append(listHtml);
                                     }
                                     $('#beauty_index .content-desc').subStr(46);
                                     $('#beauty_index .list-title .list-title-cut').subStr(35);
                                     if($('#beauty-index-container').height()>$('#beauty-index-scroll').height()){
                                         $('#pullUp').hide();
                                     }else{
                                         $('#pullUp').show();
                                     }
                                     if(pullUpEl){
                                         pullUpEl.querySelector('.pullUpLabel').innerHTML = '点击查看更多';
                                     }
                                    // indexScroll.refresh();
                                 }else{
                                     if(ajaxPage.currentPage == 1){
                                        $('#beauty_index .custom-container').html('<div class="empty-tip"></div>');
                                        dialog('<div class="dialog-alert">没有当前城市的团购信息！</div>');
                                     }
                                     $('#pullUp').hide();
                                    // indexScroll.refresh();
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
                 ajaxPage.latitude = pos.latitude;
                 ajaxPage.longitude = pos.longitude;
                 if(city != ajaxPage.currentCity || area != ajaxPage.area){
                     ajaxPage.currentCity = city;
                     ajaxPage.currentArea = area;
                     ajaxPage.latitude = 0;
                     ajaxPage.longitude = 0;
                     flag = true;
                     ajaxPage.getList(flag);
                 }
             },
             getCityFlag = true, 
             posCity = '',
             toChangeCity = function(obj){
                 window.citys = {};
                 window.citysEn = {};
                 for(var i in obj){
                     if(obj.hasOwnProperty(i)){
                        for(var z = 0; z < obj[i].length; z++){
                            window.citys[obj[i][z].city_name] = obj[i][z].districts;
                            window.citysEn[obj[i][z].city_name] = obj[i][z].enname;
                        }
                     }
                 }
             },
             getCitys = function( callback ){
                 if(!window.citysOrigin){
                 if(getCityFlag){
                     getCityFlag = false;
                     $('#wrapper').loadding();
                     $.ajax({
                         type:'get',
                         dataType:'json',
                         url:'/dp/getCities',
                         success: function(res){
                             getCityFlag = true;
                             $('#wrapper').loadding('close');
                             if(res){
                                 toChangeCity(res);
                                 window.citysOrigin = res;
                                 callback && callback.call(context);
                             }
                         },
                         error: function(){
                             getCityFlag = true;
                             $('#wrapper').loadding('close');
                         }
                     });
                 }
                }
             },
             getCityByLocation = function(latitude, longitude){
                 $.ajax({
                     type:'get',
                     dataType:'json',
                     url:'/dp/getCityNameByLocation',
                     data:{location: longitude + ',' + latitude},
                     success: function(res){
                         if(res){
                             posCity = res.city;
                             res.latitude = latitude;
                             res.longitude = longitude;
                             ajaxPage.latitude = pos.latitude = latitude;
                             ajaxPage.longitude = pos.longitude = longitude;
                             if( !(context.controller.getStoryItem('liren_city')) || context.controller.getStoryItem('liren_city') == res.city){
                                 context.controller.setStoryItem('liren_city', res.city);
                                 context.controller.setStoryItem('liren_pos',JSON.stringify(pos));
                                 context.initList();
                                 $('.city-state-fail').hide();
                                 $('.city-state').show();
                             }else{
                                    if(!context.param.city){
                                       $('#wrapper').dialog({
                                           //默认弹出框宽度
                                           width: 260,
                                           height: 200,
                                           //传进来显示的html
                                           content: '<div id="position-icon"></div><div id="change-city-dialog">目前您的定位城市在'+ res.city +'，是否切换？</div>',
                                           //弹出框title
                                           title: "", //弹出框的title
                                           //显示一个按钮还是两个
                                           type: 2,
                                           init: function(){
                                               var alertDialog = $(".alert-dialog-btn");
                                               alertDialog.off('click');
                                               alertDialog.on('click', function(){
                                                   $("#container-dialog").remove();
                                                   location.reload();
                                               });
                                           },
                                           //按钮文字
                                           ok: '切换',
                                           cancel: '取消',
                                           successCallback:function(){
                                               context.controller.setStoryItem('liren_city', res.city);
                                               initShowCity();
                                               context.initList();
                                           },
                                           cancelCallback: function(){
                                               ajaxPage.latitude = 0;
                                               ajaxPage.longitude = 0;
                                               ajaxPage.currentCity = context.controller.getStoryItem('liren_city');
                                               initShowCity();
                                               context.initList();
                                           }
                                       });
                                   }else{
                                        ajaxPage.latitude = 0;
                                        ajaxPage.longitude = 0;
                                        ajaxPage.currentCity = context.controller.getStoryItem('liren_city');
                                        initShowCity();
                                        context.initList();
                                     };
                                }
                            
                         }
                     },
                     error: function(){

                     }
                 });
             },
             initShowCity = function(){
                var storyCity = context.controller.getStoryItem('liren_city');
                if(storyCity){
                    $('.city-select').attr('city',storyCity);
                    $('.city-select').html(cityCut(storyCity));
                    ajaxPage.currentCity = storyCity;
                }
             },
             getPositionFail = function(){
                 if(context.controller.getStoryItem('liren_city')){
                     context.initList();
                 }else{
                     $('#wrapper').dialog({
                         //默认弹出框宽度
                         width: 260,
                         height: 200,
                         //传进来显示的html
                         content: '<div id="position-fail">定位失败，请手动选择城市</div>',
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
                             $('.change-city').trigger('click');
                         },
                     });
                 }
             },
             cityCut = function(str){
                 var newStr = '';
                 if(str){
                    for(var i = 0; i < 2; i++){
                        newStr += str[i];
                    }
                 }
                 $('.city-select').html(newStr);
             },
             initAds = function(){
                var str = '';
                if($.os.iphone){
                    str = 'iphone';
                }else{
                    str = 'android';
                }
                $.ajax({
                    type:'get',
                    dataType:'json',
                    url:'/dp/ads',
                    data:{platform: str},
                    success: function(res){
                        if(res){
                            if(res.card_list.length > 0 && res.card_list[0].material.length > 0){
                                var bannerLink = $(".banner-container div a");
                                $(".banner-container").show();
                                var img = '<img src="'+res.card_list[0].material[0].img['640']+'"/>';
                                bannerLink.html(img);
                                bannerLink.attr('jump', res.card_list[0].material[0].content);
                                //indexScroll.refresh();
                            }
                        }
                    },
                    error: function(){

                    }
                });
             },
             hideSelectArea = function(){
                $('.erea-select-list').addClass('hidden');
                $('#main_bg').hide();
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
                 onEvent: function(){
                     var self = this;
                     this.iscrollFlag = false;
                     this.events = {
                'click .li-list': function(){
                    var title = $(this).attr('type');
                    var city = ajaxPage.currentCity;
                    var area = '';
                    if(window.area){
                        area = '&area='+window.area;
                    }
                    Jumei.ja('dpevent','category'+ title);
                    self.forward('#module=beauty&action=category&type='+ title + area+'&city=' + city + '&latitude='+pos.latitude+'&longitude='+ pos.longitude+'&pos_city='+posCity);
                },
                'click .list-content-more': function(){
                    $(this).hide();
                    $(this).parent().find('.list-content').height('auto');
                   // indexScroll.refresh();
                },
                'click .my-group': function(){

                    login.isLogin(function(uid) {
                        if (uid <= 0) {
                            location.href = "jumeimall://page/login";
                        }else{
                            self.forward('#module=beauty&action=my_beauty&latitude='+pos.latitude+'&longitude='+pos.longitude);
                        }
                    });
                
                },
                'click .city-select': function(){
                    var $ereaSelect = $('.erea-select-list'), _this = this;
                    if ($ereaSelect.hasClass('hidden')){
                        $ereaSelect.removeClass('hidden');
                        $('#main_bg').show();
                        $('.current-city').html($('.city-select').attr('city'));

                        function initAreaList(){
                            var data = {};
                            data.item = window.citys[$(_this).attr('city')];
                            if(data.item){
                                var listHtml = Jumei.parseTpl(ereaList, data);
                                $('.area-iscroll').html(listHtml);
                                }else{
                                $('.area-iscroll').html('');
                            }
                           // ereaScroll && ereaScroll.refresh();
                        }
                        if(window.citys){
                            initAreaList();
                        }else{
                            getCitys(initAreaList);
                        }

                    }else{
                        $('#main_bg').hide();
                        $ereaSelect.addClass('hidden');
                    }
                    $('#main_bg').off('click');
                    $('#main_bg').on('click', function(){
                        $ereaSelect.addClass('hidden');
                        $(this).hide();
                    });
                    Jumei.ja('dpevent','citybtn');
                },
                'click .change-city': function(){
                    hideSelectArea();
                    self.forward('#module=beauty&action=city_search&city='+$('.city-select').attr('city'));
                    Jumei.ja('dpevent','changecity');
                },
                'click #erea-select-list ul li': function(){
                    hideSelectArea();
                    window.area = $(this).html();
                    context.controller.setStoryItem('liren_area', window.area);
                    $('.city-select').html(cityCut(window.area));
                    changeFunc($('.city-select').attr('city'), window.area);
                },
                'click .list-content li': function(){
                    var business_id = $(this).parent().parent().find('.list-title').attr('business_id');
                    var image_url = $(this).find('img').attr('src');
                    Jumei.ja('dpevent','detail首页');
                    self.forward('#module=beauty&action=detail&deal_id='+$(this).attr('deal_id')+  '&business_id=' + business_id +'&latitude='+pos.latitude+'&longitude='+pos.longitude +'&image_url=' + image_url);
                },
                //搜索
                'click .search-custom': function(){
                    self.forward('#module=beauty&action=search&city='+$('.city-select').attr('city')+'&latitude='+pos.latitude+'&longitude='+pos.longitude);
                    Jumei.ja('dpevent','searchbtn');
                },
                'click .close-search-category': function(){
                    $('#search-category').height(0);
                },
                'click .banner-container div a': function(){
                    var jump = $(this).attr('jump');
                    Jumei.ja('dpevent','ads');
                    context.href(jump);
                }
            }
        },
        onCreate: function(){
            context = this;
            var data = {static:Jumei.static};
            var html = Jumei.parseTpl(tpl,data);
            this.elem.html(html);
            this.initSlider();
            if(this.controller.getStoryItem('liren_first') == 1){
                context.initIndex(); 
            }else{
                var $firstTip = $('.first-tip'),timer = null;
                $firstTip.show();
                if(context.headerHeight == 60){
                    $firstTip.addClass('first-tip-show');
                }
                timer = setTimeout(function(){
                    $firstTip.hide();
                    context.initIndex();
                },23000);
                this.controller.setStoryItem('liren_first',1);
                $firstTip.off('click');
                $firstTip.on('click', function(){
                   $(this).hide(); 
                   clearTimeout(timer);
                   context.initIndex();
                });
            }
        },
        initIndex: function(){
            ajaxPage.currentPage = 0;
            window.area = ajaxPage.currentArea = context.controller.setStoryItem('liren_area') ? context.controller.setStoryItem('liren_area'):null ;
            initShowCity();
            getCitys();
            initUI();
            if(true){
                this.initPos();
            }else{
                initShowCity();
                getPositionFail();
            }
            initAds();
        },
        setTitle: function(){
            this.title('丽人生活团');
        },
        onRefresh: function(){
            hideSelectArea();
           // indexScroll.refresh();
            this.setTitle();
        },
        initSlider: function(){
            var slider = new Slider('category-slider',{index:0});
        },
        onShow: function(){

        },
        initList: function(){
            ajaxPage.getList();
        },
        initPos: function(){
            var self = this, flag = true;
            function getLocation(){
                if (navigator.geolocation){
                   // alert(navigator.geolocation.getCurrentPosition);
                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                    setTimeout(function(){
                        if(flag){
                            flag = false;
                            initShowCity();
                            getPositionFail();
                           // self.initList();
                        }
                    },10000);
                }else{
                    initShowCity();
                    getPositionFail();
                    //self.initList();
                    //不支持定位
                   // x.innerHTML="Geolocation is not supported by this browser.";
                }
            }
            function showPosition(position)
            {
                if(flag){
                    flag = false;
                    pos.longitude = position.coords.latitude;
                    pos.latitude = position.coords.longitude;
                    getCityByLocation(pos.longitude,pos.latitude);
                }
            }
            function showError(error)
            {
                if(flag){
                    flag = false;
                    switch(error.code) 
                    {
                        case error.PERMISSION_DENIED:
                        //用户拒绝
                        case error.POSITION_UNAVAILABLE:
                        //本地信息无效
                        case error.TIMEOUT:
                        //请求超时
                        case error.UNKNOWN_ERROR:
                        //位置错误
                        initShowCity();
                        getPositionFail();
                       // self.initList();
                        break;
                    }
                }
            }
            getLocation();
        }
    });
});
