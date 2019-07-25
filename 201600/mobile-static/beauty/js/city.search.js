define(['view'], function(view){
    var html = ['<div id="city-search-wrapper">',
                '<div class="city-select-list" id="city-select-list">',
                    '<div class="city-iscroll">',
                        '<div class="city-state">当前城市：<span class="current-city"></span> <span class="position" style="display:none;"></span></div>',
                        '<div class="city-state-fail" style="display:none;">定位城市失败了，请手动选择</div>',
                        '<div class="hot-city-title">热门城市</div>',
                        '<ul class="hot-city clear">',
                           '<li>上海</li>',
                           '<li>北京</li>',
                           '<li>杭州</li>',
                           '<li>广州</li>',
                           '<li>南京</li>',
                           '<li>苏州</li>',
                           '<li>深圳</li>',
                           '<li>成都</li>',
                           '<li>重庆</li>',
                           '<li>天津</li>',
                           '<li>武汉</li>',
                           '<li>西安</li>',
                        '</ul>',
                        '<div class="all-city-title">全部城市</div>',
                        '<ul class="all-city">',
                        '</ul>',
                    '</div>',
                '</div>',
        '</div>'
    ].join('');

    var cityList =[ 
                  '<% var count = 0; for(var i in data){if(data.hasOwnProperty(i)){var item; if (data.hasOwnProperty(i)) { ++count;item = data[i];  %>',
                      '<li class="all-city-list<% if(count<=1){ %> all-city-select<% } %>">',
                           '<div class="city-title"><%=i%></div>',
                           '<div class="city-content">',
                               '<ul class="clear">',
                                  '<% var num = item.length%4;if(num>0){num = 4-num;}%>',
                                  '<% for(var j = 0; j < item.length; j++){ var list = item[j]; %>',
                                      '<li><%=list.city_name%></li>',
                                  '<% } %>',
                                  '<% for(var z = 0; z < num; z++){%>',
                                      '<li></li>',
                                  '<% } %>',
                               '</ul>',
                           '</div>',
                        '</li>',
                    '<% } %>',
                    '<% } } %>',
    ].join('');

    var context = null,
    cityScroll = null,
    getCityFlag = true, 
    initCityScroll = function(){
//        if(cityScroll == null){
//            cityScroll = new IScroll('#city-select-list', {
//                preventDefault: false, 
//                scrollX: !1,
//                scrollY: !0,
//                momentum: !0,
//                scrollbars: !0,
//                fadeScrollbars: !0,
//                shrinkScrollbars: "clip"
//            });
//        }
    },
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
                        var data = {'data':res};
                        var listHtml = Jumei.parseTpl(cityList, data);
                        $('.all-city').html(listHtml);
                        context.refresh();
                    }
                },
                error: function(){
                    getCityFlag = true;
                    $('#wrapper').loadding('close');
                }
            });
        }
    },
    showCity = function(){
        $('.current-city').html(context.param.city);
        function initAreaList(){
            var data = {};
            data.data = window.citysOrigin;
            var listHtml = Jumei.parseTpl(cityList, data);
            $('.all-city').html(listHtml);
        }
        if(window.citysOrigin){
            initAreaList();
        }else{
            getCitys();
        }

    }


    return Jumei.create(view,{
        onCreate: function(){
            context = this;
            context.elem.html(html);
            showCity();
        },
        onEvent: function(){
            var self = this;
            this.events = {
                //展开城市
                'click .city-title': function(){
                    var $parent = $(this).parent();
                    $('.all-city-select').removeClass('all-city-select');
                    // if($parent.hasClass('all-city-select')){
                    //     $parent.removeClass('all-city-select');
                    // }else{
                    //     $parent.addClass('all-city-select');
                    // }
                    $parent.addClass('all-city-select');
                    context.refresh();
                },
                'click .hot-city li': function(){
                    localStorage && localStorage.removeItem('liren_area');
                    context.controller.setStoryItem('liren_city', $(this).html());
                    self.forward('#module=beauty&action=index&city='+$(this).html());
                },
                'click .all-city-list ul li': function(){
                    localStorage && localStorage.removeItem('liren_area');
                    context.controller.setStoryItem('liren_city', $(this).html());
                    self.forward('#module=beauty&action=index&city='+$(this).html());
                },
            }
        },

        setTitle: function(){
            this.title('选择城市');
        },
        onRefresh: function(){
            this.setTitle();
        },
        
    });
});
