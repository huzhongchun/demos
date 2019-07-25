$(function() {
                var home = Jumei.addModule('weidian',{
                    init:function(){
                        /*截断*/
                        $('.des').subStr(80);
                        $('.goods-row-two-des').subStr(40);
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
                                if (nav_sign == 0) {
                                    setTimeout(function() {
                                        $('#bottom-nav').removeClass('fixedhide');
                                        nav_sign = 1;
                                    }, 100);

                                }
                            }

                        });
                        $('.imglazy').imglazyload({
                            classSelector:'.imglazy'
                        });
                        this.initEventListener();
                        this.getNeedModule();
                        this.isFirstVisit();
                        this.refreshFuc();
                    },
                    getNeedModule: function(){
                        var self = this;
                        var share = Jumei.getModule('ui.share');
                        self.shareObj = new share({

                        });
                        var toast = Jumei.getModule('ui.toast');
                        self.toastObj = new toast({
                            animateTime: 0.5,
                            animateCurves: 'ease',
                            stopTime: 0.8,
                        })
                        var dialog = Jumei.getModule('ui.dialog');
                        self.dialogObj = new dialog({
                            title:'分享到',
                            btn:0,
                            content:'<div class="share-btns-area clearfloat">'+
                                        '<span class="share-btn-icon fl friend-chart" type="wechat"></span>'+
                                        '<span class="share-btn-icon fl friend-circle" type="weixin-friend"></span>'+
                                        '<a class="fl copy-link" type="copy-link"></a>'+
                                    '</div>'
                        })
                    },
                    initEventListener:function(){
                        var self = this;
                        self.n = 1;
                        $('.select-goods-area').on('click',function(e){
                            if($(this).parent().find('.selected-recomend-goods-area').children().length >= 6){
                                e.preventDefault();
                                self.toastObj.show('别贪心，只能推荐6个商品哟！');
                            }
                        });
                        $('.edit-nikename-boxs input').on('keydown',function(e){
                            if(e.keyCode == "13"){
                                e.preventDefault();
                            }
                        })
                        $('.check-btn').on('click',function(){
                            $('.tips-full-bg').remove();
                        });
                        $('.full-bg').on('touchmove',function(e){
                            e.preventDefault();
                        });
                        $('.edit-icon').on('click',function(){
                            self.showEditBoxs();
                        });
                        $('.btn-cancel').on('click',function(){
                            self.hideEditBoxs();
                        });
                        $('.btn-sure').on('click',function(){
                            self.changeNikeName();
                        });
                        $('.goods-row-two-items').click(function(e) {
                                Jumei.ja('weidianAPP','click','dianjishangpinxiangqing');
                        });
                        $('.selected-recomend-goods-area').click(function(e) {
                                Jumei.ja('weidianAPP','click','dianjishangpinxiangqing');
                        });

                        var shareFunc = function(e){
                            if(this.className.indexOf('store-share') > -1)
                                Jumei.ja('weidianAPP','click','dianpufenxiang');
                            else
                                Jumei.ja('weidianAPP','click','shangpinfenxiang');
                            e.stopPropagation();
                            e.preventDefault();
                            var imgUrl = $(this).attr('data-img'),
                                link = $(this).attr('data-link'),
                                title = $(this).attr('data-title'),
                                content = $(this).attr('data-content');
                            $('.copy-link').attr('href','/microshop/overview/copyUrl?'+link);
                            self.dialogObj.show();
                            $('.share-btn-icon').off('click');
                            $('.share-btn-icon').on('click',function(e){
                                var type = $(this).attr('type');
                                self.shareObj.openUrl(type,{
                                    'weiXinChatLinkUrl':link,
                                    'weixinChatTitle':title,
                                    'weiXinChatPic':imgUrl,
                                    'weiXinChatContent':content,
                                    'weiXinFriendLinkUrl':link,
                                    'weiXinFriendTitle':content,
                                    'weiXinFriendPic':imgUrl,
                                    'weiXinFriendContent':content,
                                });
                                self.dialogObj.hide();
                                self.toastObj.show('分享进行中...');
                            })
                        };
                        $('.store-share').click(shareFunc);
                        $(window).on('click','.share-btn',shareFunc);
                        $(window).on('click','.goods-row-two-share-btn',shareFunc);
                        var $shelf = $('.shelf-btn');
                        $shelf.click(function(e){
                            e.stopPropagation();
                            e.preventDefault();
                            Jumei.ja('weidianAPP','click','shangpinxiajia');
                            var _this = this;
                            var itemId = $(this).attr('data-hashid');
                            if(confirm('商品将从店长推荐中移除?')){
                                /*ajax*/
                                $.ajax({
                                    url:'/microshop/manage/ajaxCancelRecommendation',
                                    type:'POST',
                                    data:{'item_id':itemId},
                                    success:function(data){
                                        if(data == 'ok'){
                                            $(_this).parents('.selected-recomend-goods-items').remove();
                                            self.toastObj.show('商品已移出我的推荐');
                                            window.location.reload();
                                        }
                                        else
                                            self.toastObj.show('移出商品失败');
                                    },
                                    error:function(){
                                        alert("网络错误！");
                                    }
                                })
                            }
                        });
                        $('body').refresh({callback:function(e){
                            var _this = this;
                            self.shopName = $('.name-text').html();
                            self.category = $('.module-boxs').last().attr('data-type');
                            var parent = $('.module-boxs').last().children()[1];
                            $('.get-more').show();
                            $.ajax({
                                    url:'/microshop/manage/ajaxGetPageByCategory?category='+self.category+'&page='+(++self.n),
                                    type:'GET',
                                    dataType:'json',
                                    success:function(data){
                                        if(data.length == 0){
                                            $('.get-more').html('对不起，没有更多的商品了~！');
                                            return false;
                                        }
                                        for (var i = 0; i < data.length; i++) {
                                            var tpl = '';
                                            var item = data[i];
                                            var imgTmp = item.image[0]? item.image[0] :  item.original_image;
                                            var imgUrl = typeof item.dx_image == 'undefined' ? imgTmp : item.dx_image;
                                            if(self.category == '本季热卖'){
                                                var des = item.description ? item.description : item.medium_name;
                                                    tpl = '<a class="selected-recomend-goods-items" href="/microshop/buy/detail?shop_id=1___item_id='+item.jumei_item_id+'___item_type='+item.jumei_item_type+'___can_buy=false">'+
                                                            '<div class="goods-pic">'+
                                                                '<img class="imglazy" src="'+imgUrl+'">'+
                                                                '<div class="commission_icon">佣金￥'+item.commission+'</div>'+
                                                            '</div>'+
                                                            '<div class="goods-des">'+
                                                                '<span class="recommend-txt">推荐</span>'+
                                                                '<span class="des">'+des+'</span>'+
                                                            '</div>'+
                                                            '<div class="goods-price clearfloat">'+
                                                                '<div class="price-area fl">'+
                                                                    '<span class="price-now">￥'+item.discounted_price+'</span>'+
                                                                    '<span class="price-old">￥'+item.original_price+'</span>'+
                                                                '</div>'+
                                                                '<div class="shelf-btn fr" data-hashid="'+item.id+'"></div>'+
                                                                '<div class="share-btn fr" data-img="'+item.original_image+'" data-link="'+item.share_url+'" data-content="'+item.share_txt+'" data-title="'+self.shopName+'"></div>'+
                                                            '</div>'+
                                                        '</a>'
                                            }
                                            else{
                                                tpl =   '<a class="goods-row-two-items fl" href="/microshop/buy/detail?shop_id=1___item_id='+item.jumei_item_id+'___item_type='+item.jumei_item_type+'___can_buy=false">'+
                                                            '<div class="goods-row-two-pic">'+
                                                                '<img class="imglazy" src="'+item.original_image+'">'+
                                                                '<div class="goods-row-two-commission-icon">佣金￥'+item.commission+'</div>'+
                                                            '</div>'+
                                                            '<div class="goods-row-two-des">'+item.medium_name+'</div>'+
                                                            '<div class="goods-row-two-price clearfloat">'+
                                                                '<div class="goods-row-two-price-boxs fl">'+
                                                                    '<span class="goods-row-two-price-now">￥'+item.discounted_price+'</span>'+
                                                                    '<span class="goods-row-two-price-old">￥'+item.original_price+'</span>'+
                                                                '</div>'+
                                                                '<div class="goods-row-two-share-btn fr" data-img="'+item.original_image +'" data-link="'+item.share_url+'" data-content="'+item.share_txt+'" data-title="'+self.shopName+'" >分享</div>'+
                                                            '</div>'+
                                                        '</a>'
                                            }
                                            $(parent).append(tpl);
                                            // if(data.length < 22){
                                            //     $('.get-more').hide();
                                            // }
                                            // else
                                            _this.changeFlag();
                                            $('.get-more').hide();
                                        };
                                    },
                                    error:function(){
                                        alert("网络错误！");
                                        _this.changeFlag();
                                    }
                                })
                            }
                        })
                    },
                    showEditBoxs:function(){
                        var window_h = $(window).height();
                        var window_w = $(window).width();
                        var t = parseInt((window_h - 151) / 2);
                        var l = parseInt((window_w - 243) / 2);
                        $('.edit-nikename-boxs').css({
                            top: t+'px',
                            left: l+'px'
                        });
                        $('.full-bg').show();
                    },
                    hideEditBoxs:function(){
                        $('.full-bg').hide();
                    },
                    isFirstVisit:function(){
                        var isFirst =  window.localStorage  &&  window.localStorage.getItem('weidian_first_visit') == 1? false: true;
                        if(isFirst){
                            $('.tips-full-bg').show();
                            window.localStorage  &&  window.localStorage.setItem('weidian_first_visit',1);
                        }
                    },
                    changeNikeName:function(){
                        var self = this;
                        var nikename = $('.edit-nikename-boxs input')[0].value;
                        if(nikename == "")
                            alert('请输入昵称！');
                        else{
                            if(nikename.trim() == "" || nikename.trim().indexOf(" ") > -1){
                                alert('昵称不能包含空格哦！请重新输入');
                                $('.edit-nikename-boxs input')[0].value = "";
                                return false;
                            }
                            $('.name-boxs .name-text').html(nikename.trim()+'的微店');
                            self.hideEditBoxs();
                            $('.edit-nikename-boxs input')[0].value = "";
                            $.ajax({
                                url:'/microshop/manage/ajaxUpdateShopName',
                                type:'POST',
                                data:{'name':nikename},
                                success:function(data){
                                    if(data == 'ok'){
                                        self.toastObj.show('修改成功');
                                    }
                                    else
                                        self.toastObj.show('修改失败!');
                                },
                                error:function(){
                                    alert("网络错误！");
                                }
                            })
                        }
                    },
                    refreshFuc:function(){
                        var self = this;
                        var time = $('#content').attr('data-time');
                        if(!Jumei.getCookie('timestamp')){
                            Jumei.setCookie('timestamp',time);
                        }
                        else{
                            if(time == Jumei.getCookie('timestamp')){
                                location.reload();
                            }
                            else{
                                Jumei.setCookie('timestamp',time);
                            }
                        }
                        
                    }
                });

                home.init();
            });