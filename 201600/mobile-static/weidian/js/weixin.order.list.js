$(function() {
    var page = 1;
    var url = location.href;
    var shop_id = Jumei.getQueryString(url, 'shop_id');
    var allpage = $('#page').attr('pagecount');
    if (allpage > 1) {
        $('#loadding-content').show();
    }else{
        $('#loadding-content').hide();
    }
    $("body").refresh({
        callback: function() {
            var self = this;
            page = page + 1;
            if (page < parseInt(allpage)) {
                $('#loadding-content').show();
                $.ajax({
                    type: "get",
                    url: "/microshop/order/list?shop_id=" + shop_id,
                    dataType: 'json',
                    data: {
                        shop_id: shop_id,
                        page: page,
                    },
                    success: function(data) {
                        self.changeFlag();//请求成功
                        console.dir(data);
                        if (data.data) {
                            var str = '';
                            for (var i = 0; i < data.data.list.length; i++) {
                                var item = data.data.list[i];
                                var timeStamp = item.creation_time * 1000;
                                var dates = new Date(timeStamp);
                                var timeStr = dates.getFullYear() + '-' + (dates.getMonth() + 1) + '-' + dates.getDate() + ' ' + dates.getHours() + ':' + dates.getMinutes();
                                var href = '';
                                if (item.status === '未支付') {
                                    href = '<span class="look-logistics"><a>未支付</a></span>';
                                } else {
                                    href = '<span class="look-logistics"><a href="/microshop/order/logistics?order_id=' + item.order_id + '&shop_id=' + data.info.shopId + '&item_id=' + item.item_details[0].product_id + '&item_type=' + item.item_details[0].type + '&logistic_id=' + item.shipping_list[0].logistic_id + '&logistic_track_no=' + item.shipping_list[0].logistic_track_no + '">查看物流</a></span>';
                                }
                                str += '<li>' +
                                        '<div class="order-header">' +
                                        '<span class="order-status">' + item.status + '</span>' +
                                        '<div class="fr order-num-list">' +
                                        '<span class="order-num">订单号：' + item.order_id + '</span>' +
                                        '<span class="order-num">' + timeStr + '</span>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="order-content">' +
                                        '<a href="/microshop/order/detail?shop_id=' + data.info.shopId + '&order_id=' + item.id + '&item_id=' + item.item_details[0].product_id + '&item_type=' + item.item_details[0].type + '">' +
                                        '<div class="order-content-img">' +
                                        '<img class="product-img" src="' + item.item_details[0].image + '"/>' +
                                        '<div class="product-info">' +
                                        '<div class="product-name">' + item.item_details[0].deal_short_name + '</div>' +
                                        '<div class="product-price-list">' +
                                        '<span class="product-price"><span class="span-label">价格：</span>￥' + item.item_details[0].deal_price + '</span>' +
                                        '<span class="product-num fr"><span class="span-label">数量：</span>' + item.item_details[0].quantity + '</span>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</a>' +
                                        '<div class="order-price">' +
                                        '<span>合计：<strong>￥' + item.total_price + '</strong></span>' + href +
                                        '</div>' +
                                        '</div>' +
                                        '</li>';

                            }
                            $('.order-list ul').append(str);
                            $('#loadding-content').hide();
                        }else{
                            $('#loadding-content').hide();
                        }
                    }
                });
            }else{
                $('#loadding-content').hide();
            }
        }
    });
});