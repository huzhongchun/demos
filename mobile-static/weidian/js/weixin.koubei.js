$(function() {
    var page = 1;
    var url = location.href;
    var shop_id = Jumei.getQueryString(url, 'shop_id');
    var item_id = Jumei.getQueryString(url, 'item_id');
    var item_type = Jumei.getQueryString(url, 'item_type');
    var allpage = $('#allpage').val();
    if (allpage > 1) {
        $('#loadding-content').show();
    }
    $("body").refresh({
        callback: function() {
            var self = this;
            page = page + 1;
            if (page <= parseInt(allpage)) {
                $('#loadding-content').show();
                $.ajax({
                    type: "get",
                    url: "/microshop/buy/koubei",
                    dataType: 'json',
                    data: {
                        shop_id: shop_id,
                        item_id: item_id,
                        item_type: item_type,
                        page: page,
                    },
                    success: function(data) {
                        self.changeFlag();//请求成功
                        if (data.koubei) {
                            var str = '';
                            for (var i = 0; i < data.koubei.rows.length; i++) {
                                var item = data.koubei.rows[i];
                                var rate = '';
                                var ratingFLoor = Math.floor(item.rating);
                                var gray = 5 - ratingFLoor;
                                for (var j = 0; j < ratingFLoor; j++) {
                                    rate += '<span class="start-select"></span>';
                                }
                                if (item.rating - ratingFLoor) {
                                    rate += '<span class="start-ban"></span>';
                                }
                                for (var z = 0; z < gray; z++) {
                                    rate += '<span class="start"></span>';
                                }
                                str += '<li>' +
                                        '<div class="li-title">' +
                                        '<a href="/microshop/buy/koubei_detail?shop_id=' + data.shopId + '&item_id=' + data.itemId + 'item_type=' + data.itemType + 'report_id=' + item.report_id + '">' + item.title + '</a>' +
                                        '</div>' +
                                        '<div class="li-name clear">' +
                                        '<div class="fl">' + item.nickname + '</div>' +
                                        '<div class="fr">' + rate +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="li-content">' + item.content_abstract_90 +
                                        '</div>' +
                                        '</li>';
                            }
                            $('#koubei-content ul').append(str);
                            $('#loadding-content').hide();
                        }
                        console.dir(data);
                    }
                });
            }
        }
    });
});