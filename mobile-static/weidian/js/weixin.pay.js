$(function() {
    var pay = Jumei.addModule('pay', {
        init: function() {
            this.initEvent();
            //this.pay();
        },
        initEvent: function() {
            var changeStatus = function(num) {
                if (num === 1) {
                    $('.sub').addClass('sub-gray');
                } else {
                    $('.sub').removeClass('sub-gray');
                }
                if (num === 20) {
                    $('.add').addClass('add-gray');
                } else {
                    $('.add').removeClass('add-gray');
                }
            }

            $('.sub').tap(function() {
                var $inputType = $('.input-type');
                var num = $inputType.val();
                num = parseInt(num);
                if (num > 1) {
                    num = num - 1;
                    changeStatus(num);
                    $inputType.val(num);
                    var price = parseFloat($('.price span').html()) * parseFloat(num) + parseFloat($('.yunfei span').html());
                    $('.total-num').html(price.toFixed(2));
                }
            });
            $('.add').tap(function() {
                var $inputType = $('.input-type');
                var num = $inputType.val();
                num = parseInt(num);
                num = num + 1;
                if (num <= 20) {
                    changeStatus(num);
                    $inputType.val(num);
                    var price = parseFloat($('.price span').html()) * parseFloat(num) + parseFloat($('.yunfei span').html());
                    $('.total-num').html(price.toFixed(2));
                }
            });

            var flag = true;
            $('.weixin-pay').click(function() {
                Jumei.ja('weidian','weixin','querendingdan');
                if (flag === true) {
                    var shopId = $('#shop-id').val();
                    var itemId = $('#item-id').val();
                    var itemType = $('#item-type').val();
                    var sku = $('#sku').val();
                    var deliveryFee = $('#delivery-fee').val();
                    var addressId = '';
                    var idNum = $('.id-num').html();
                    if ($('.address').length > 0) {
                        addressId = $('.address').attr('address-id');
                    } else {
                        alert('亲，请您添加地址！');
                        return false;
                    }
                    if(Jumei.getQueryString(location.href,'item_type').indexOf('global') > -1){
                        if($('.id-num').length <= 0){
                            alert('请输入您的身份证信息。由于法规要求，跨境购物需要在地址信息中填写收件人的身份证信息');
                            return false;
                        }
                    }
                    $('body').loadding();
                    $.ajax({
                        type: "POST",
                        url: "/microshop/pay/ajax_index",
                        dataType: 'json',
                        data: {
                            "shop_id": shopId,
                            "item_id": itemId,
                            "item_type": itemType,
                            "address": addressId,
                            "sku": sku,
                            "delivery_fee": deliveryFee,
                            "num": $('.input-type').val(),
                            "id_num": idNum,
                        },
                        success: function(data) {
                            var query_str = 'shop_id=' + shopId + '&item_id=' + itemId + '&item_type=' + itemType;
                            if (data.state == 1) {
                                WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest',
                                        JSON.parse(data.wx.data), function(res) {
                                    flag = true;
                                    $('body').loadding('close');
                                    query_str += "&order=" + data.order + "&dateTime=" + data.dateTime;
                                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                                        window.location.href = "/microshop/pay/success?state=ok&" + query_str;
                                    } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                                        //alert("url: /microshop/pay/success?state=cancel&" + query_str);
                                        //window.location.href="/microshop/pay/success?state=cancel&" + query_str;
                                    } else {
                                        window.location.href = "/microshop/pay/success?state=fail&" + query_str;
                                    }
                                }
                                );
                            } else {
                                if(Jumei.getQueryString(location.href,'item_type').indexOf('global') > -1 && idNum == '尚未上传身份证'){
                                    if(confirm('请输入您的身份证信息。由于法规要求，跨境购物需要在地址信息中填写收件人的身份证信息')){
                                        location.href = '/microshop/order/address_edit?'+$('.address').attr('data-address');
                                    }
                                }
                                else
                                    alert('支付失败');
                                $('body').loadding('close');
                            }

                        },
                        error: function() {
                            $('body').loadding('close');
                            flag = true;
                        }
                    });
                }
            });
        }

    });
    pay.init();
});