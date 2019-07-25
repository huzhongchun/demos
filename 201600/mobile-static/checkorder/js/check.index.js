$(function(){
    var confirmOrder = {
        init:function(){
            var self = this;
            self.canTapBtnFlag = true;
            self.productArray = [];
            self.JMWebView = JMWebView;
            var url = "http://mobile.jumei.com/msapi/order/order_wap.json?";
            self.orderId = Jumei.getQueryString(location.href,'order_id'); /*订单号*/;
            self.shippingNo = Jumei.getQueryString(location.href,'shipping_no'); /*包裹号*/;
            $.ajax({
                url: url+'order_id='+self.orderId+'&shipping_no='+self.shippingNo,
                type: 'get',
                dataType:'jsonp',
                success:function(data){
                    if(!data){
                        return false;
                    }
                    var itemDetails = data.item_details;
                    for (var i = 0; i < itemDetails.length; i++) {
                        var productItem = itemDetails[i];
                        var tempObject ={
                            'product_id': productItem.product_id,
                            'sku': productItem.sku_no,
                            'order_id': self.orderId,
                            'shipping_no': self.shippingNo,
                            'hash_id':productItem.deal_hash_id,
                            'short_name':productItem.deal_short_name,
                            'type':productItem.type,
                            'shipping_system_id': data.shipping_system_id,
                        }
                        self.productArray.push(tempObject);
                        var contentStr = '<div class="product-items"'+
                                                'data-hashid="'+productItem.deal_hash_id+'"'+
                                                'data-productid="'+productItem.product_id+'"'+
                                                'data-sku="'+productItem.product_id+'"'+
                                                '>'+
                                            '<div class="product-info-area clearfloat">'+
                                                '<img class="product-img fl" src="'+productItem.image+'">'+
                                                '<div class="product-des fl">'+self.subStr(productItem.deal_short_name,48)+'</div>'+
                                            '</div>'+
                                            '<div class="product-mark-stars-area">'+
                                                '<div class="product-feel clearfloat" >'+
                                                    '<div class="feel-name fl">商品质量：</div>'+
                                                    '<div class="stars-boxs fl">'+
                                                        '<span class="stars"><img class="star-img" src="http://images.jumei.com/mobile/act/activities/2014_12/1216_confirmOrder/star.png"></span>'+
                                                        '<span class="stars"><img class="star-img" src="http://images.jumei.com/mobile/act/activities/2014_12/1216_confirmOrder/star.png"></span>'+
                                                        '<span class="stars"><img class="star-img" src="http://images.jumei.com/mobile/act/activities/2014_12/1216_confirmOrder/star.png"></span>'+
                                                        '<span class="stars"><img class="star-img" src="http://images.jumei.com/mobile/act/activities/2014_12/1216_confirmOrder/star.png"></span>'+
                                                        '<span class="stars"><img class="star-img" src="http://images.jumei.com/mobile/act/activities/2014_12/1216_confirmOrder/star.png"></span>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="product-feel-des clearfloat" >'+
                                                    '<div class="feel-name fl">填写短评：</div>'+
                                                    '<textarea maxlength=120 class="des-input" type="text" placeholder="小美建议您多说说使用后的效果感受，可以使用之后再评论哦！建议不少于30字^^"></textarea>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>';
                        $('.product-evaluate-items').append(contentStr);
                    }
                },
                error:function(){
                    alert('网络错误!');
                }
            });
            self.getModuleFunc();
            self.addEventListener();
        },
        addEventListener:function(){
            var self = this;
            $(window).on('tap','.stars-boxs',function(e){
                var targetStar = e.target;
                if(e.target.className.toLowerCase() == 'star-img'){
                    var orderIndex = $(targetStar).parent('span').index();
                    var stars = $(this).find('span');
                    $(this).find('.active').removeClass('active');
                    for (var i = 0; i <= orderIndex; i++) {
                        $(stars[i]).addClass('active');
                    };
                }
            });
            $('.draw-cancel').on('click',function(e){
                self.dialogObj.hide();
                self.JMWebView.close(); //关闭webview
            })
            $('.chose-boxs span').on('click',function(e){
                $('.chose-boxs .selected').removeClass('selected');
                $(this).addClass('selected');
            });
            $('.confirm-receipt').on('click',function(){
                Jumei.ja('querenshouhuo','click','btn_fabupingjia');
                var recommendScore = $('.chose-boxs .selected').attr('data-numb');
                var deliverySpeedScore = $('.logistic .active').length;
                var sellerAttitudeScore = $('.service .active').length;
                if(!recommendScore || deliverySpeedScore == 0 || sellerAttitudeScore == 0){
                    alert('请完成所有评分项再提交哦');
                    return false;
                }
                var $productItems = $('.product-items');
                for (var i = 0; i < $productItems.length; i++) {
                    var productQualityScore = $($productItems[i]).find('.product-feel .active').length;
                    var comments = $($productItems[i]).find('.product-feel-des textarea')[0].value;
                    if(productQualityScore == 0){
                        alert('请完成所有评分项再提交哦');
                        return false;
                    }
                    self.productArray[i].productQualityScore = productQualityScore;
                    self.productArray[i].comments = comments;
                    self.productArray[i].sellerAttitudeScore = sellerAttitudeScore;
                    self.productArray[i].deliverySpeedScore = deliverySpeedScore;
                    self.productArray[i].recommendScore = recommendScore;
                };
                if(self.canTapBtnFlag){
                    self.length = self.productArray.length - 1;
                    self.ajaxFunc(self.length);
                }
            })

        },
        ajaxFunc : function (n) {
            var self = this;
            var index = n;
            if(n == -1){
                self.endSuccessCallback();
            }
            if(n >= 0){
                var array = self.productArray;
                var url = 'http://mobile.jumei.com/msapi/order/comment_order_wap.json?'+
                        'product_id='+array[n].product_id+
                        '&sku='+array[n].sku+
                        '&order_id='+array[n].order_id+
                        '&shipping_no='+array[n].shipping_no+
                        '&hash_id='+array[n].hash_id+
                        '&shipping_system_id='+array[n].shipping_system_id+
                        '&short_name='+array[n].short_name+
                        '&type='+array[n].type+
                        '&productQualityScore='+array[n].productQualityScore+
                        '&comments='+array[n].comments+
                        '&sellerAttitudeScore='+array[n].sellerAttitudeScore+
                        '&deliverySpeedScore='+array[n].deliverySpeedScore+
                        '&recommendScore='+array[n].recommendScore;
                $.ajax({
                    url: url,
                    type:'GET',
                    dataType:'jsonp',
                    success:function(data){
                        self.status = data.status;
                        if(data.status == "success"){
                            self.canTapBtnFlag = false;
                            self.ajaxFunc(index-1);
                        }
                        else{
                            alert(data.msg);
                            if(data.msg.toLowerCase() == "已评论")
                                self.JMWebView.close(); //关闭webview
                            Jumei.ja('querenshouhuo','click','fabupingjiashibai');
                            self.canTapBtnFlag = true;
                            return false;
                        }
                    },
                    error:function(){
                       alert('网络错误！');
                        self.canTapBtnFlag = true;
                    }
                })
            }
        },
        endSuccessCallback:function() {
            var self = this;
            var url = 'http://mobile.jumei.com/msapi/order/lottery_times.json?order_id='+self.orderId+'&callback=comment_order'
            Jumei.ja('querenshouhuo','click','fabupingjiachenggong');
            self.toastObj.show("确认收货并评价成功!");
            $.ajax({
                url: url,
                type:'GET',
                dataType:'jsonp',
                success:function(data){
                    self.canTapBtnFlag = true;
                    if(!data.status){
                        return false;
                    }
                    if(data.status == "success"){
                        self.drawTimes = data.times;
                        if(self.drawTimes > 0){
                            self.dialogObj.show();
                            Jumei.ja('querenshouhuo','click','choujiantanchuang');
                        }
                        else{
                            $('.confirm-receipt').off('click');
                            self.JMWebView.close(); //关闭webview
                        }
                    }
                    else{
                        alert(data.msg);
                        self.JMWebView.close(); //关闭webview
                       // self.dialogObj.show();
                    }
                },
                error:function(){
                    self.canTapBtnFlag = true;
                    alert('网络错误！');
                }
            })
        },
        getModuleFunc:function(){
            var self = this;
            var dialog = Jumei.getModule('ui.dialog');
            self.dialogObj = new dialog({
                title:'消息',
                btn:0,
                content:'<div class="draw-tips-area clearfloat">'+
                            '<div class="draw-tips-text">评价成功啦，点击“参加抽奖”有惊喜哦!</div>'+
                            '<div class="text-small">您也可以在「我的聚美」中再次进入抽奖</div>'+
                            '<div class="draw-btn-boxs clearfloat">'+
                                '<span class="draw-cancel fl">下次再说</span>'+
                                '<a class="draw-sure fl" href="http://s.h5.jumei.com/pages/1491">参加抽奖</a>'+
                            '</div>'+
                        '</div>'
            });
            var toast = Jumei.getModule('ui.toast');
            self.toastObj = new toast({
                animateTime: 0.8,
                animateCurves: 'ease',
                stopTime: 0.8,
                animateEndCallback:function(){

                }
            })
        },
        subStr : function(str,opts){
            var lengths = str.replace(/[^\x00-\xff]/g, "**").length, i, charNum = 2, cutStr, setLength = opts;
            if(lengths>setLength){
                for(i = 0; i<str.length; ){
                    var strChar = str.charAt(i);
                    var charLength = strChar.replace(/[^\x00-\xff]/g, "**").length;
                    charNum += charLength;
                    if(charNum<=setLength){
                        i++;
                    }else{
                        cutStr = str.slice(0, i);
                        cutStr = cutStr+'...';
                        break
                    }
                }
                return cutStr;
            }
            else
                return str;
        },
    }
    confirmOrder.init();

})