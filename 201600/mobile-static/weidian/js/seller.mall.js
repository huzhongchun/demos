$(function() {
                var mall = Jumei.addModule('weidian',{
                    init:function(){
                        /*截断*/
                        $('.goods-row-two-des').subStr(40);
                        $('.imglazy').imglazyload({
                            classSelector:'.imglazy'
                        });
                        var $boxs = $('.module-boxs');
                        for (var i = 0; i < $boxs.length; i++) {
                            if($($boxs[i]).find('.goods-row-two-area').children().length < 22)
                                $($boxs[i]).find('.get-more').hide();
                        };
                        this.initEventListener();
                        this.getNeedModule();
                    },
                    getNeedModule: function(){
                        var self = this;
                        var toast = Jumei.getModule('ui.toast');
                        self.toastObj = new toast({
                            animateTime: 0.5,
                            animateCurves: 'ease',
                            stopTime: 0.8,
                        })
                    },
                    initEventListener:function(){
                        var self = this;
                        self.n = 1;
                        var $addBtn = $('.add-recommend');
                        var clickOnece = true;
                        $('.goods-row-two-items').click(function(e) {
                                Jumei.ja('weidianAPP','click','dianjishangpinxiangqing');
                        });
                        $(window).on('click','.add-recommend',function(e){
                            e.preventDefault();
                            var _this = this;
                            var isAdded = $(_this).attr('data-added');
                            /*添加*/
                            var isAddProduct = $(_this).html();
                            var itemId = $(this).attr('data-hashid');
                            if(clickOnece && isAddProduct=="添加推荐"){
                                clickOnece = false;
                                if(isAdded == 'no'){
                                    $.ajax({
                                        url: '/microshop/manage/ajaxAddRecommendation',
                                        type:'POST',
                                        data:{'item_id':itemId},
                                        success:function(data){
                                            if(data.toLowerCase() =="ok"){
                                                $(_this).attr('data-added','yes');
                                                $(_this).html('取消推荐');
                                                self.toastObj.show('添加成功，返回我的微店查看');
                                                self.toastObj.animateEndCallback = function(){
                                                    clickOnece = true;
                                                }
                                            }
                                            else if(data.toLowerCase() == 'limited'){
                                                self.toastObj.show('别贪心，只能推荐6个商品哟！');
                                                self.toastObj.animateEndCallback = function(){
                                                    clickOnece = true;
                                                }
                                            }
                                            else{
                                                self.toastObj.show('添加商品失败');
                                                self.toastObj.animateEndCallback = function(){
                                                    clickOnece = true;
                                                }
                                            }
                                        },
                                        error:function(){
                                            alert("网络错误！");
                                        }
                                    })
                                }
                            }
                            /*取消*/
                            if(clickOnece && isAddProduct=="取消推荐"){
                                $.ajax({
                                    url: '/microshop/manage/ajaxCancelRecommendation',
                                    type:'POST',
                                    data:{'item_id':itemId},
                                    success:function(data){
                                        if(data=="ok"){
                                            $(_this).attr('data-added','no');
                                            $(_this).html('添加推荐');
                                            self.toastObj.show('商品已从我的推荐中移除');
                                            self.toastObj.animateEndCallback = function(){
                                                clickOnece = true;
                                            }
                                        }
                                        else{
                                            self.toastObj.show('移除商品失败');
                                            self.toastObj.animateEndCallback = function(){
                                                clickOnece = true;
                                            }
                                        }
                                    },
                                    error:function(){
                                        alert("网络错误！");
                                    }
                                })
                            }
                        })
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
                                                                '<div class="goods-row-two-add-btn add-recommend fr" data-added="no" data-hashid="'+item.id+'">添加推荐</div>'+
                                                            '</div>'+
                                                        '</a>'
                                            $(parent).append(tpl);
                                            _this.changeFlag();
                                            $('.get-more').hide();
                                        };
                                    },
                                    error:function(){
                                        alert("网络错误！");
                                    }
                                })
                            }
                        })
                    }
                });
                mall.init();
            });


