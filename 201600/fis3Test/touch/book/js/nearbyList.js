/**
 * Created by huzhongchun on 16/6/20.
 */

require(['book/js/public','book/js/citys','widget/dialog'],function(public,citys,dialog){
    var _public = public, _citys = citys, _dialog = dialog;
    _public.setWxShareContent();

    var bookItem = $('.book-list-area .book-item');
    var len = bookItem.length;

    if(len % 2 == 0){
        $(bookItem[len-1]).addClass('last-item');
        $(bookItem[len-2]).addClass('last-item');
    }else{
        $(bookItem[len-1]).addClass('last-item');
    }

    $('body').append('<div class="search-address-bg"></div>');


    initCitysSelect();

    /**
     * 初始化,地址的联动选择
     */
    function initCitysSelect() {
        var _state = $('.address').data().receiver_state,
            _city =  $('.address').data().receiver_city,
            _district = $('.address').data().receiver_district,
            _detailAddress = $('.address').data().detail_address;
        if(_detailAddress){
            $('input[name="detail_address"]').val(_detailAddress);
        }
        for (var i = 0; i < _citys.length; i++) {
            var item = _citys[i], select = '';
            if (_state && _state == item.name) {
                select = 'selected';
            }
            var tpl = '<option value="' + item.name + '" ' + select + '>' + item.name + '</option>';
            var $tpl = $(tpl).data('city', item.city);
            $('select[name="receiver_state"]').append($tpl);
        }
        $('select[name="receiver_state"]').on('change', function () {
            var val = $(this).val();
            var city = $(this).find('option[value="' + val + '"]').data('city');
            $('select[name="receiver_city"]').html('');
            if(city && city.length > 0) {
                for (var i = 0; i < city.length; i++) {
                    var item = city[i], select = '';
                    if (_city && _city == item.name) {
                        select = 'selected';
                    }
                    var tpl = '<option value="' + item.name + '" ' + select + '>' + item.name + '</option>';
                    var $tpl = $(tpl).data('area', item.area);
                    $('select[name="receiver_city"]').append($tpl);
                }
            }else{
                $('select[name="receiver_city"]').html('<option value="0">选择地址</option>');
            }
            $('select[name="receiver_city"]').trigger('change');
        });
        $('select[name="receiver_city"]').on('change', function () {
            var val = $(this).val();
            var area = $(this).find('option[value="' + val + '"]').data('area');
            $('select[name="receiver_district"]').html('');
            if(area && area.length > 0) {
                for (var i = 0; i < area.length; i++) {
                    var item = area[i], select = '';
                    if (_district && _district == item) {
                        select = 'selected';
                    }
                    var tpl = '<option value="' + item + '" ' + select + '>' + item + '</option>';
                    $('select[name="receiver_district"]').append(tpl);
                }
            }else{
                $('select[name="receiver_district"]').html('<option value="0">选择地址</option>');
            }
        });

        $('select[name="receiver_state"]').trigger('change');
    }

    /**
     * 显示搜索框
     */
    function showSearchBox() {
        $('.search-box').show();
        $('.search-address-bg').show();
    }

    /**
     * 隐藏搜索框
     */
    function hideSearchBox() {
        $('.search-box').hide();
        $('.search-address-bg').hide();
    }

    $('.search-address-box').on('click',function () {
        showSearchBox();
    });
    $('.search-address-bg').on('click',function () {
        hideSearchBox();
    });

    $('.search-btn').on('click',function () {
        var receiverState = $('select[name="receiver_state"]').val();
        var receiverCity = $('select[name="receiver_city"]').val();
        var receiverDistrict = $('select[name="receiver_district"]').val();
        var detailAddress = $('input[name="detail_address"]').val();
        if(receiverState == 0 || receiverDistrict == 0 || receiverDistrict == 0){
            alert('请选择完整的地址信息');
            return false;
        }
        $('input[name="address"]').val(receiverState+receiverCity+receiverDistrict+detailAddress);
        $('.search-box').submit();

    });


    /**
     * 认识一下
     */

    //登录用户的微信号
    var _wechatId = $('.self-wechat').val().trim();
    var _wechatId_2 = '';
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
    var dialogTpl_4 = '<div class="send-sms-box sms-box-4">' +
        '<div class="send-sms-box-title">长按可复制微信号</div>'+
        '<div class="send-sms-box-content">' +
        '微信号: '+_wechatId_2+
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
    var dialog_4 = new _dialog({
        content: dialogTpl_4,
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
        var wechatSet = $(this).data().status;
        var smsSet = $(this).data().sms_status;
        var orderId = $(this).data().order_id;
        _wechatId_2 = $(this).data().wechat;
        _targetOrderId = orderId;
        if(wechatSet == 'yes'){
            $('.sms-box-4 .send-sms-box-content').html('微信号: '+_wechatId_2);
            dialog_4.show();
        }else {
            if (smsSet == 'yes') {
                if (_wechatId) {
                    dialog_1.show();
                } else {
                    dialog_2.show();
                }
            } else {
                dialog_3.show();
            }
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
            data: {wechat:wechat,order_id: _targetOrderId,type: 'nearby'},
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
            data: {wechat:_wechatId,order_id: _targetOrderId,type: 'nearby'},
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


});