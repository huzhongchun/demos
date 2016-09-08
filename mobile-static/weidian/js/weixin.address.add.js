$(function() {
    var template = '<% for(var i in areas){ if(areas.hasOwnProperty(i)){ var  item = areas[i];%>' +
            '<option value="<%=item.code%>"><%=item.name%></option>' +
            '<% } } %>';
    var defaultProvince = '<option value="">选择省</option>';
    var defaultCity = '<option value="">选择市</option>';
    var defaultArea = '<option value="">选择区/县</option>';
    var dialogClass = Jumei.getModule('ui.dialog');
    var dialog = new dialogClass({
        element: 'body',
        //默认弹出框宽度
        width: 260,
        height: 200,
        //传进来显示的html
        content: '<div id="dialog-container"></div>',
        //弹出框title
        title: '提示', //弹出框的title
        type: 'default',
        //显示一个按钮还是两个
        btn: 1,
        //按钮文字
        ok: '确定',
        cancel: '取消',
        //初始化函数
        init: function() {
        },
        //成功回调函数
        okCallback: null,
        //取消回调函数
        cancelCallback: function() {
        }
    });
    var addaddress = Jumei.addModule('addaddress', {
        init: function() {
            this.initAddress();
        },
        initAddress: function() {
            this.initProvince();
            this.initEvent();
            if(Jumei.getQueryString(location.href,'item_type').indexOf('global') > -1){
                $('.global-tips').show();
            }
        },
        initProvince: function() {
            $('#wrapper').loadding("close");
            $.ajax({
                type: 'post',
                url: '/microshop/order/get_child_area_list?parent_area_code=0',
                dataType: 'json',
                success: function(data) {
                    if (data.status === 1 && data.areas) {
                        var cityStr = Jumei.parseTpl(template, data);
                        $('.province').html(defaultProvince + cityStr);
                    } else {
                        var $dialogContent = $('#dialog-container');
                        $('#wrapper').loadding("close");
                        $dialogContent.html('网络不给力，过会儿试试～');
                        dialog.show();
                        return false;
                    }
                },
                error: function(e) {
                    var $dialogContent = $('#dialog-container');
                    $('#wrapper').loadding("close");
                    $dialogContent.html('网络不给力，过会儿试试～');
                    dialog.show();
                    return false;
                }
            });
        },
        initEvent: function() {
            $('.province').change(function() {
                var cityCode = $(this).val();
                $.ajax({
                    type: 'post',
                    url: '/microshop/order/get_child_area_list?parent_area_code=' + cityCode,
                    dataType: 'json',
                    success: function(data) {
                        if (data.status === 1 && data.areas) {
                            var cityStr = Jumei.parseTpl(template, data);
                            $('.city').html(defaultCity + cityStr);
                            $('.area').html(defaultArea + cityStr);
                        } else {
                            var $dialogContent = $('#dialog-container');
                            $('#wrapper').loadding("close");
                            $dialogContent.html('网络不给力，过会儿试试～');
                            dialog.show();
                            return false;
                        }
                    },
                    error: function(e) {
                        var $dialogContent = $('#dialog-container');
                        $('#wrapper').loadding("close");
                        $dialogContent.html('网络不给力，过会儿试试～');
                        dialog.show();
                        return false;
                    }
                });
            });

            $('.city').change(function() {
                $('#wrapper').loadding();
                var cityCode = $(this).val();
                $.ajax({
                    type: 'post',
                    url: '/microshop/order/get_child_area_list?parent_area_code=' + cityCode,
                    dataType: 'json',
                    success: function(data) {
                        $('#wrapper').loadding("close");
                        if (data.status === 1 && data.areas) {
                            var cityStr = Jumei.parseTpl(template, data);
                            $('.area').html(defaultArea + cityStr);
                        } else {
                            var $dialogContent = $('#dialog-container');
                            $('#wrapper').loadding("close");
                            $dialogContent.html('网络不给力，过会儿试试～');
                            dialog.show();
                            return false;
                        }
                    },
                    error: function(e) {
                        var $dialogContent = $('#dialog-container');
                        $('#wrapper').loadding("close");
                        $dialogContent.html('网络不给力，过会儿试试～');
                        dialog.show();
                        return false;
                    }
                });
            });

            $('.confirm-submit').on('click', function() {
                var $dialogContent = $('#dialog-container');
                var name = $('#username').val();
                if ($.isString(name) && $.trim(name) === '') {
                    $dialogContent.html('~亲，收货人姓名不能为空！');
                    dialog.show();
                    return false;
                }

                var tell = $('#tell').val();
                if ($.isString(tell) && $.trim(tell) === '') {
                    $dialogContent.html('~亲，手机号不能为空！');
                    dialog.show();
                    return false;
                } else if (!/^\d{11}$/g.test(tell)) {
                    $dialogContent.html('~亲，手机号格式不正确！');
                    dialog.show();
                    return false;
                }
                var idNum = $('#card').val();
                if(Jumei.getQueryString(location.href,'item_type').indexOf('global') > -1){
                    if($.isString(idNum) && $.trim(idNum) === ''){
                        $dialogContent.html('~亲，身份证号不能为空！');
                        dialog.show();
                        return false;
                    }
                }
                var province = $('#province').val();
                if ($.isString(province) && $.trim(province) === '') {
                    $dialogContent.html('~亲，请选择省份！');
                    dialog.show();
                    return false;
                }

                var city = $('#city').val();
                if ($.isString(city) && $.trim(city) === '') {
                    $dialogContent.html('~亲，请选择市！');
                    dialog.show();
                    return false;
                }

                var area = $('#area').val();
                if ($.isString(area) && $.trim(area) === '') {
                    $dialogContent.html('~亲，请选择区！');
                    dialog.show();
                    return false;
                }

                var detail = $('#address-detail').val();
                if ($.isString(detail) && $.trim(detail) === '') {
                    $dialogContent.html('~亲，请填写详细地址！');
                    dialog.show();
                    return false;
                }
                $('#wrapper').loadding();
                $.ajax({
                    type: 'post',
                    url: '/microshop/order/address_add',
                    dataType: 'json',
                    data: {
                        'address': detail,
                        'receiver_name': name,
                        'hp': tell,
                        'id_num': idNum,
                        'structured_code': area,
                        'item_type': Jumei.getQueryString(location.href,'item_type'),
                    },
                    success: function(data) {
                        $('#wrapper').loadding("close");
                        try {
                            if (data.state === 1) {
                                if (data.info.address_id > 0) {
                                    var url = $('#query_string').val();
                                    url = url + '&select_id=' + data.info.address_id;
                                    location.href = url;
                                } else {
                                    alert(data.info.message);
                                }
                            } else {
                                $('#wrapper').loadding("close");
                                $dialogContent.html(data.msg);
                                dialog.show();
                                return false;
                            }
                        } catch (e) {

                        }
                    },
                    error: function(e) {
                        $('#wrapper').loadding("close");
                        $dialogContent.html('网络不给力，过会儿试试～');
                        dialog.show();
                        return false;
                    }
                });
            });

        }
    });
    addaddress.init();
});