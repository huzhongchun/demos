/**
 * Created by huzhongchun on 16/7/26.
 */

require(['book/js/public','widget/dialog','book/js/china','echarts'],function(public,d,china,e){
    var _public = public, _dialog = d;
    _public.setWxShareContent();

    /**
     * 初始化地图
     */
    china(e);
    initEchartsMap(e);


    function initEchartsMap(echarts) {
        var _driftData = JSON.parse($('#drift_data').val());
        var _cityData = JSON.parse($('#city_data').val());
        var dom = document.getElementById("map-container");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        var geoCoordMap = _cityData;

        var BJData = [];
        for (var i = 0; i < _driftData.length;i++){
            if(i == 0) {
                BJData.push([
                    {name:'北京市'},
                    { name: _driftData[i][0].name, value:25}
                ])
            }else{
                BJData.push([
                    { name: _driftData[i-1][0].name, value:25},
                    { name: _driftData[i][0].name, value:25}
                ])
            }
        }

        var planePath = 'path://m41,159l48,-76l41,76l-89,0z';
        var convertData = function (data) {
            var len = data.length;
            var res = [
                {
                    fromName: '北京市',
                    toName: data[len-1][0].name,
                    coords: [[116.3264,39.9756]]
                }
            ];
            for (var i = len-1; i >= 0; i--) {
                var dataItem = data[i];
                    res[0].coords.push(geoCoordMap[dataItem[0].name]);
            }
            return res;
        };

        function handleScatterData(data){
            var result = data.map(function (dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
            });
            //增加起始点北京的显示
            result.push({
                name: '北京市',
                value: [116.3264,39.9756,20]
            });
            return result;
        }

        /**
         * 去除重复的地理坐标
         * @param dataArray
         * @returns {*}
         */
        function clearRepeatCity(dataArray) {
            var reuslt = [];
            for(var i = 0;i < dataArray.length;i++){
                for(var j = 0;j < dataArray.length;j++){
                    var item1 =  dataArray[i] && dataArray[i].name ? dataArray[i].name : 'null1';
                    var item2 = dataArray[j] && dataArray[j].name ? dataArray[j].name : 'null2';
                    if(item1 == item2 && i != j){
                        dataArray.splice(j,1);
                    }
                }
            }

            return dataArray;
        }

        console.log(clearRepeatCity(handleScatterData(BJData)));
        var series = [];
            series.push(
                {
                    name: ' Top10',
                    type: 'lines',
                    zlevel: 1,
                    polyline: true,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: '#fff',
                        symbolSize: 3
                    },
                    lineStyle: {
                        normal: {
                            color: '#FFF100',
                            width: 0,
                            curveness: 0.2
                        }
                    },
                    data: convertData(_driftData)
                },
                // {
                //     name: 'Top10',
                //     type: 'lines',
                //     zlevel: 2,
                //     polyline: true,
                //     effect: {
                //         show: true,
                //         period: 6,
                //         trailLength: 0,
                //         symbol: planePath,
                //         symbolSize: 15
                //     },
                //     lineStyle: {
                //         normal: {
                //             color: '#fff',
                //             width: 1,
                //             opacity: 0.4,
                //             curveness: 0.2
                //         }
                //     },
                //     data: convertData(BJData)
                // },
                {
                    name: ' Top10',
                    //type: 'effectScatter',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}',
                            textStyle:{
                                color: '#fff',
                            }
                        }
                    },
                    symbolSize: function (val) {
                        return val[2] / 8;
                    },
                    itemStyle: {
                        normal: {
                            color: '#FFF100',
                        },

                    },
                    data: clearRepeatCity(handleScatterData(BJData))
                });

        option = {
            backgroundColor: '#404a59',
            title : {
                text: '',
                subtext: '',
                left: 'center',
                textStyle : {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item',
                show: false
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data:['北京 Top10', '上海 Top10', '广州 Top10'],
                textStyle: {
                    color: '#fff'
                },
                selectedMode: 'single',
                show: false
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                zoom: 1.2,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: series
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

    }

    /**
     * 内容裁剪,显示更多
     */
    $('.user-comment-box .comment-text').each(function(){
        var _this = this;
        var content = $(this).html().replace(/[\n]/g, '<br>');
        $(this).data('content_original', content);
        $('.hidden-box .desc-text-2').html($(this).html());
        if ($('.hidden-box').height() > 150) {
            $(this).subStr(165);
            setTimeout(function () {
                $(_this).data('content_short', $(_this).html());
            }, 30);
            $(this).parent().find('.check-more').css('visibility', 'visible');
        }else{
            $(this).parent().find('.check-more').hide();
        }
        $(this).removeClass('original');
    });
    $('.content-container').on('click','.check-more',function(){
        var $desc = $(this).parent().find('.comment-text');
        if($desc.data().original){
            $desc.data('original',false);
            $desc.html($desc.data().content_short);
            $(this).text('更多');
        }else{
            $desc.data('original',true);
            $desc.html($desc.data().content_original);
            $(this).text('收起');
        };
    });


    /**
     * 判断是否设置过隐私,如果没有设置过强制打开设置弹窗
     */
    var _isSet = false;
    if($('.set-status').length > 0 && $('.set-status').val() == 'yes'){
        _isSet = true;
    }else{
        _isSet = false
    }

    /**
     * 隐私设置
     */
    _public.settingDialog.init({
        autoShow: _isSet ? false : true,
    });

    var _savedData = $('.self-set-btn').data() ? $('.self-set-btn').data() : {};
    var _setData = {
        'wechat': {
            status: _savedData.status ? _savedData.status : 'no',
            id: _savedData.wechat
        },
        'sms': {
            status: _savedData.sms_status ? _savedData.sms_status : 'no',
        }
    }
    $('.self-set-btn').on('click',function (e) {
        e.preventDefault();
        if(_isSet)
            _public.settingDialog.show(_setData);
        else
            _public.settingDialog.show();
    });
    $('.set-dialog-bg').on('click',function () {
        if(_isSet)
            _public.settingDialog.hide();
    });


    /**
     * 认识一下
     */

    //登录用户的微信号
    var _wechatId = $('.self-wechat').val().trim();

    var dialogTpl_1 = '<div class="send-sms-box sms-box-1">' +
        '<div class="send-sms-box-title">TA 的微信号没有公开。你若希望认识他，我们可将你的微信号，通过短信主动发给 TA。（每人每天可发给三位用户）</div>'+
        '<div class="send-sms-box-content">' +
        '微信号: '+_wechatId+
        '</div>'+
        '<div class="send-sms-box-btns">' +
        '<span class="sms-btn-item send-btn">发送</span>'+
        '<span class="sms-btn-item cancle-btn">取消</span>'+
        '</div>'+
        '</div>';
    var dialogTpl_2 = '<div class="send-sms-box sms-box-2">' +
        '<div class="send-sms-box-title">TA 的微信号没有公开。你若希望认识他，我们可将你的微信号，通过短信主动发给 TA。（每人每天可发给三位用户）</div>'+
        '<div class="send-sms-box-content">' +
        '<span>微信号: </span><input class="input-wechat" type="text">'+
        '</div>'+
        '<div class="send-sms-box-btns">' +
        '<span class="sms-btn-item send-btn">发送</span>'+
        '<span class="sms-btn-item cancle-btn">取消</span>'+
        '</div>'+
        '</div>';
    var dialogTpl_3 = '<div class="send-sms-box sms-box-3">' +
        '<div class="send-sms-box-content">' +
        '对方设置不接收书友短信'+
        '</div>'+
        '<div class="send-sms-box-btns">' +
        '<span class="sms-btn-item close-btn">关闭</span>'+
        '</div>'+
        '</div>';
    var dialog_1 = new _dialog({
        content: dialogTpl_1,
        type: 'slidedown',
        width: 310,
    });
    var dialog_2 = new _dialog({
        content: dialogTpl_2,
        type: 'slidedown',
        width: 310,
    });
    var dialog_3 = new _dialog({
        content: dialogTpl_3,
        type: 'slidedown',
        width: 310,
    });

    $('.cancle-btn').on('click',function () {
        $(this).parents('.ui-dialog').hide();
        $('.ui-bg').hide();
    });
    $('.close-btn').on('click',function () {
        $(this).parents('.ui-dialog').hide();
        $('.ui-bg').hide();
    });



    /**
     * 发送微信短信
     */
    var _targetOrderId = '';
    $('.send-wechat-btn').on('click',function(){
        var smsSet = $(this).data().sms_status;
        var orderId = $(this).data().order_id;
        if(smsSet == 'yes'){
            _targetOrderId = orderId;
            if(_wechatId){
                dialog_1.show();
            }else{
                dialog_2.show();
            }
        }else{
            dialog_3.show();
        }
    });

    //需要输入微信号
    $('.sms-box-2 .send-btn').on('click',function () {
        var wechat = $('.sms-box-2 .input-wechat').val().trim();
        if(!wechat){
            alert('请输入微信号!');
            return false;
        }

        $.ajax({
            url: '/book/sms/send_wechat',
            type: 'post',
            data: {wechat:wechat,order_id: _targetOrderId,type: 'drift'},
            success: function (data) {
                if(data.code ==0){
                    alert('发送成功!');
                    dialog_2.hide();
                }else{
                    alert(data.message.text);
                }
            },
            error: function (e) {
                var errorObj = JSON.parse(e.responseText);
                alert(errorObj.message.text);
            }
        })
    });

    //不需要输入微信号
    $('.sms-box-1 .send-btn').on('click',function () {
        $.ajax({
            url: '/book/sms/send_wechat',
            type: 'post',
            data: {wechat:_wechatId,order_id: _targetOrderId,type: 'drift'},
            success: function (data) {
                if(data.code ==0){
                    alert('发送成功!');
                    dialog_1.hide();
                }else{
                    alert(data.message.text);
                }
            },
            error: function (e) {
                var errorObj = JSON.parse(e.responseText);
                alert(errorObj.message.text);
            }
        })
    });


});