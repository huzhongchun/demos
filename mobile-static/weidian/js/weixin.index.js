$(function() {
    window.Jumei.changeScheme('.url-scheme');
    var weidian = Jumei.addModule('weidian', {
        'init': function() {
            this.initEvent();
            this.initScroll();
            this.initCut();
            this.initImage();
            this.initPage();
        },
        initImage: function() {
            $('.lazy-image').imglazyload();
        },
        initEvent: function() {
            //收藏
            $('.share').click(function(e) {
                e.preventDefault();
                $('#shouchang').show();
            });
            $('#shouchang').click(function(e) {
                $('#shouchang').hide();
            });
        },
        initScroll: function() {
            var start_top = null,
                    nav_sign = 1;
            $(document).on('touchstart', function() {
                start_top = $(window).scrollTop();
            });
            $(window).scroll(function() {
                var top = $(window).scrollTop();
                if (top > start_top) {
                    if (nav_sign == 1) {
                        setTimeout(function() {
                            $('#bottom-nav').addClass('fixedhide');
                            nav_sign = 0;
                        }, 100);
                    }
                } else {
                    if (nav_sign === 0) {
                        setTimeout(function() {
                            $('#bottom-nav').removeClass('fixedhide');
                            nav_sign = 1;
                        }, 100);

                    }
                }

            });
        },
        initCut: function() {
            /*截断*/
            $('.goods-des .des').subStr(90);
            $('.goods-row-two-des .des').subStr(45);
            /**/
            $('.nav-item').on('click', function() {
                $('.nav-item').each(function() {
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
                var target = $(this).index() * 107;
                $('.selected-arrow').css({
                    '-webkit-transform': 'translate3d(' + target + 'px,0,0)',
                });
            });
        },
        initPage: function(){
            var tpl =   '<% for(var i in data){ if(data.hasOwnProperty(i)){ var vo = data[i]; %>'+
                        '<a href="/microshop/buy/detail?shop_id=<%=vo.shopId%>&item_id=<%=vo.jumei_item_id%>&item_type=<%=vo.jumei_item_type%>" class="goods-row-two-items fl">'+
                            '<div class="goods-row-two-pic">'+
                                '<img class="lazy-image" src="<%=vo.original_image%>">'+
                            '</div>'+
                            '<div class="goods-row-two-des">'+
                                '<%if (vo.medium_name !=""){ %>'+
                                    '<span class="des"><%=vo.medium_name%></span>'+
                                '<% }else { %>'+
                                    '<span class="des"><%=vo.short_name%></span>'+
                                '<% } %>'+
                            '</div>'+
                            '<div class="goods-row-two-price clearfloat">'+
                                '<div class="goods-row-two-price-boxs fl">'+
                                    '<% if(vo.discounted_price != ""){ %>'+
                                    '<span class="price-now">￥<%=vo.discounted_price%></span>'+
                                    '<span class="price-old">￥<%=vo.original_price%></span>'+
                                    '<% } %>'+
                               '</div>'+
                                '<% if (vo.discount != 10){ %>'+
                                '<div class="goods-row-two-add-btn fr"><span><%=vo.discount%>折</span></div>'+
                                '<% } %>'+
                            '</div>'+
                        '</a>'+
                        '<% } } %>';
                
                
            var benjiTpl = '<% for(var i in data){ if(data.hasOwnProperty(i)){ var vo = data[i]; %>'+
                '<a href="/microshop/buy/detail?shop_id=<%=vo.shopId%>&item_id=<%=vo.jumei_item_id%>&item_type=<%=vo.jumei_item_type%>">'+
                '<div class="selected-recomend-goods-items">'+
                    '<div class="goods-pic">'+
                        '<% if(vo.image.length >0){ %>'+
                            '<img class="lazy-image" src="{=vo.image[0]=}">'+
                        '<% }else{ %>'+
                            '<% if(vo.dx_image){ %>'+
                                '<img class="lazy-image" src="<%=vo.dx_image%>">'+
                            '<% }else{ %>'+
                                '<img class="lazy-image" src="<%=vo.original_image%>">'+
                            '<% } %>'+
                        '<% } %>'+
                    '</div>'+
                    '<div class="goods-des">'+
                        '<% if(vo.description != ""){ %>'+
                            '<span class="des"><%=vo.description%></span>'+
                        '<% }else if(vo.medium_name != ""){ %>'+
                            '<span class="des"><%=vo.medium_name%></span>'+
                        '<% }else{ %>'+
                            '<span class="des"><%=vo.short_name%></span>'+
                        '<% } %>'+
                    '</div>'+
                    '<div class="goods-price clearfloat">'+
                        '<div class="price-area fl">'+
                            '<span class="price-now">￥<%=vo.discounted_price%></span>'+
                            '<span class="price-old">￥<%=vo.original_price%></span>'+
                        '</div>'+
                        '<% if(vo.discount != 10){ %>'+
                        '<div class="start-buy"><%=vo.discount%>折</div>'+
                        '<% } %>'+
                    '</div>'+
                '</div>'+
                '</a>'+
                '<% } } %>';

                $('.more-page').on('click', function(){
                    var $parent = $(this).parent();
                    var self = this;
                    var page = parseInt($parent.attr('page'));
                    var flag = true;
                    if(flag){
                        flag = false;
                        page += 1;
                        $.ajax({
                            type: "get",
                            url: "/microshop/buy/ajaxGetPageByCategory",
                            dataType: 'json',
                            data: {
                                shop_id: $parent.attr('shop_id'),
                                page: page,
                                category: $parent.attr('id')
                            },
                            success: function(data) {
                                $parent.attr('page',page)
                                flag = true;
                                if(data.length === 0){
                                    alert('对不起，没有更多的商品了~!');
                                    $(self).hide(); 
                                    return false;
                                }
                                
                                if(data.length > 0){
                                    for(var i in data){
                                        if(data.hasOwnProperty(i)){
                                            data[i].shopId = $parent.attr('shop_id');
                                        }
                                    }
                                    var allData = {};
                                    allData['data'] = data;
                                    if($parent.attr('id') == '本季热卖'){
                                        var html = Jumei.parseTpl(benjiTpl, allData);
                                        $parent.find('.selected-recomend-goods-area').append(html);
                                    }else{
                                        var html = Jumei.parseTpl(tpl, allData);
                                        $parent.find('.goods-row-two-area').append(html);
                                    }
                                    $('.goods-des .des').subStr(90);
                                    $('.goods-row-two-des .des').subStr(45);
                                    if(data.length < 22){
                                        $(self).hide();
                                    }
                                }else{
                                   $(self).hide(); 
                                }
                            },
                            error: function(){
                                flag = true;
                            }
                        }); 
                    }
                });
        }
    });
    weidian.init();
});
