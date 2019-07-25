define(['view','distance'], function(view, distance){
    var html = [
                '<div id="search-category">',
                    '<div id="search-category-header">',
                        '<div id="search-input-wrapper" class="clear">',
                        '<input type="search" placeholder="搜商户" class="search-category-input" />',
                        '<span id="search-category-btn">搜索</span>',
                        '</div>',
                        '<div class="search-close"></div>',
                     '</div>',
                    '<div id="search-category-tag" class="clear">',
                        '<span>木子造型</span>',
                        '<span>美联社</span>',
                        '<span>修颜造型</span>',
                        '<span>凤王美</span>',
                    '</div>',
                    '<div id="search-category-list">',
                       '<div class="search-category-scroll"></div>',
                    '</div>',
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


        var dataSearchFlag = true,
            context = null,
            pos = {latitude:0,longitude:0},
            getDataBySearch = function( keyword ){
                 if(dataSearchFlag){
                     dataSearchFlag = false;
                     var data = {
                         keyword:keyword,
                         city:context.param.city,
                         limit:30
                     };
                     if(pos.latitude != 0){
                         data.latitude = pos.latitude;
                         data.longitude = pos.longitude;
                         data.radius = -1;
                     }
                     $('#wrapper').loadding();
                     $.ajax({
                         type:'get',
                         dataType:'json',
                         url:'/dp/searchByCity',
                         data:data,
                         success: function(res){
                             dataSearchFlag = true;
                             $('#wrapper').loadding('close');
                             if(res.status == "OK" && res.businesses.length > 0){
                                 res.param = pos;
                                 res.param.distance = distance;
                                 res.static = Jumei.static;
                                 var listHtml = Jumei.parseTpl(list, res);
                                 $('#search-category-list .search-category-scroll').html(listHtml);
                                 $('.search-category-scroll .content-desc').subStr(45);
                                 $('.search-category-scroll .list-title .list-title-cut').subStr(35);
                                 initSearchScroll();
                             }else{
                                 var emptys = '<div id="find-empty">什么也没找到~<br>看看文字输入是否有误</div>';
                                 $('#search-category-list .search-category-scroll').html(emptys);
                                 initSearchScroll();
                             }
                         },
                         error: function(){
                             dataSearchFlag = true;
                             $('#wrapper').loadding('close');
                         }
                     });
                 }
             },
             searchScroll = null,
             initSearchScroll =  function(){
//                 if(!searchScroll){
//                     $('#search-category-list').height(context.height-52);
//                     searchScroll = new IScroll('#search-category-list', {
//                         preventDefault: false, 
//                         scrollX: !1,
//                         scrollY: !0,
//                         momentum: !0,
//                         scrollbars: !0,
//                         fadeScrollbars: !0,
//                         shrinkScrollbars: "clip"
//                     });
//                 }else{
//                     searchScroll.refresh();
//                 }
             }

           


             return Jumei.create(view,{
                 onCreate: function(){
                     context = this;
                     pos.latitude = context.param.latitude;
                     pos.longitude = context.param.longitude;
                     this.elem.html(html);
                 },
                 onEvent: function(){
                     var self = this;
                     this.iscrollFlag = false;
                     this.events = {
                        'click #search-category-btn': function(){
                            var categoryInput =  $('.search-category-input').val();
                            Jumei.ja('searchkey', categoryInput);
                            getDataBySearch(categoryInput);
                            Jumei.ja('dpevent','confirmsearch');
                        },
                        'click .list-content li': function(){
                            var business_id = $(this).parent().parent().find('.list-title').attr('business_id');
                            var image_url = $(this).find('img').attr('src');
                            Jumei.ja('dpevent','detail搜索');
                            self.forward('#module=beauty&action=detail&deal_id='+$(this).attr('deal_id')+  '&business_id=' + business_id +'&latitude='+pos.latitude+'&longitude='+pos.longitude +'&image_url=' + image_url);
                        },
                        'click .list-content-more': function(){
                            $(this).hide();
                            $(this).parent().find('.list-content').height('auto');
                            initSearchScroll();
                        },
                        'click .search-close': function(){
                            history.go(-1);
                        }
                     }
                 },
                 onClose: function(){

                 },
                 setTitle: function(){
                    this.title('丽人团搜索');
                 },
                 onRefresh: function(){
                    //searchScroll.refresh();
                    this.setTitle();
                 },
             });
});
