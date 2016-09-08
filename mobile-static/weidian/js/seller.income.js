$(function() {
    var income = Jumei.addModule('weidian', {
        init:function(){
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
                }
                else {
                    if (nav_sign == 0) {
                        setTimeout(function() {
                            $('#bottom-nav').removeClass('fixedhide');
                            nav_sign = 1;
                        }, 100);
                    }
                }
            });
            this.getNeedModule();
            this.initEventListener();
        },
        getNeedModule: function(){
            var self = this;
            var dialog = Jumei.getModule('ui.dialog');
            self.dialogObj = new dialog({
            title:'提示',
                    btn:1,
                    ok:'我知道了',
                    content:'<div class="cash-tips">' +
                    '累计收入包含冻结中的佣金。冻结的佣金将在自售出商品发货日起的35天后进行解冻。解冻后的金额将自动打入您的聚美余额。' +
                    '</div>'
            })
        },
        initEventListener:function(){
            var self = this;
            $('.all-income-help,.all-income-to-cash').click(function(e){
                e.preventDefault();
                $($('.ui-dialog-title div').first()).html('提示');
                $('.cash-tips').html('累计收入包含冻结中的佣金。冻结的佣金将在自售出商品发货日起的35天后进行解冻。解冻后的金额将自动打入您的聚美余额。');
                setTimeout(function(){
                    self.dialogObj.show();
                },100);
            });
            $('.recent-income-help,.recent-income-status').click(function(e){
                e.preventDefault();
                var img = $('#content').attr('data-img');
                var temp = '<div class="text"><span class="txt-bold">佣金冻结：</span>佣金收入在售出商品后的35天日内为冻结期。</div>'+
                           '<div class="text"><span class="txt-bold">佣金解冻：</span>当售出的商品在冻结期内没有申请退货，佣金将解冻等待管理员审核并打入您的聚美余额。</div>'+
                           '<img src="'+img+'">';
                $('.cash-tips').html(temp);
                $($('.ui-dialog-title div').first()).html('收入状态');
                setTimeout(function(){
                    self.dialogObj.show();
                },100);
            });
            $('.ui-bg').click(function(e){
                e.preventDefault();
                self.dialogObj.hide();
            });
            var n = 1;
            /*if($('#all-sales-area tbody').children().length >= 10){
                $('.get-more').show();
            }
            $('.get-more').click(function(){
                $.ajax({
                    url:'/microshop/overview/ajaxGetOrders',
                    type:'POST',
                    dataType:'json',
                    data:{page: ++n},
                    success:function(data){
                        for (var i = 0; i < data.length; i++){
                            if(data[i].status.toLowerCase() != "not_paid"){
                                var st = "";
                                switch(data[i].status){
                                    case 'PENDING':
                                        st = (35 - data[i].pending_time)+"天后解冻";
                                        break;
                                    case 'DONE':
                                        st = "已打入余额";
                                        break;
                                    case 'REFUNDED':
                                        st = "已退货";
                                }
                                var commission = st == "已退货" ? 0 : data[i].commission;
                                var tpl = '<tr>' +
                                    '<td class="td-name">' +
                                    '   <span class="td-goods-name">' + data[i].deal_short_name + '</span>' +
                                    '    <span class="td-goods-time">' + data[i].order_time + '</span>' +
                                    '</td>' +
                                    '<td class="td-sale-numb">' + data[i].quantity + '</td>' +
                                    '<td class="td-income">' + commission + '</td>' +
                                    '<td class="td-income-status">' +
                                    '    <span class="td-thaw">' + st+ '</span>' +
                                    '</td>' +
                                    '</tr>';
                                $('tbody').append(tpl);
                            }
                        }
                    },
                    error:function(){

                    }
                });
            })*/
        }
    });
    income.init();
    var polyline = Jumei.addModule('polyline', {
        init:function(array){
            this.interval = 15;
            this.updateLine(array);
        },
        getLineScale:function(array){
            var Max = - 1;
            for (var i = 0; i < array.length; i++){
                if (parseInt(array[i]) > parseInt(Max))
                    Max = array[i];
            }
            return Max == 0 ? 0 : 80 / Max;
        },
        updateLine:function(array){
            var points = '0,120';
                var X = 0;
                var svgScale = this.getLineScale(array);
            for (var i = 0; i < data.length; i++){
                X += this.interval;
                var Y = 120 - Math.floor(data[i] * svgScale);
                points += ' ' + X + ',' + Y + ' ' + (X += this.interval) + ',120';
            }
            $('#polyline').attr('points', points);
        }
    });
    var data = $('svg').attr('data-line').split(',');
    var l = data.length;
    $('.before-yesterday-visitors-amount').html('前天'+data[l-3]+'人');
    $('.yesterday-visitors-amount').html('昨天'+data[l-2]+'人');
    polyline.init(data);
});
