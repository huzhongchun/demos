require(['book/js/public','book/js/citys'],function(public,citys) {
    var _public = public, _citys = citys;
	$('.submit-btn').on('click',function(){
        if($(this).hasClass('active')){
          return false;
        }
        var _data = $(this).data(),_this = this;
        var receiverState = $('.address-area select[name="receiver_state"]').val(),
            receiverCity = $('.address-area select[name="receiver_city"]').val(),
            receiverDistrict = $('.address-area select[name="receiver_district"]').val(),
            receiverAddress = $('.address-area textarea[name="receiver_address"]').val();


		if(!(receiverState && receiverCity && receiverDistrict && receiverAddress)){
			alert("请填完所有必填项");
            return false;
		}
		$(this).addClass('active');
        $.ajax({
            type: "post",
            url: "/book/user/update_address",
            data: { receiver_state : receiverState,
                    receiver_city : receiverCity ,
                    receiver_district : receiverDistrict,
                    receiver_address : receiverAddress,
                    receiver_name: _data.receiver_name,
                    mobile: _data.mobile,
                    uid: _data.uid,
                    order_id: _data.order_id,
            },
            dataType: "json",
            success: function (data) {
                if(data.code == 0){
                    alert('修改成功，下次发货将使用新地址');
                    window.location.href = '/book/home/index';
                }else{
                    alert(data.message.text);
                }
                $(_this).removeClass('active');
            },
            error: function (e) {
                var errorObj = JSON.parse(e.responseText);
                alert(errorObj.message.text);
                $(_this).removeClass('active');
            }
        });

	})



    var _state = $('.hide-state-value').val(),
        _city = $('.hide-city-value').val(),
        _district = $('.hide-district-value').val();

    $('select[name="receiver_state"]').on('change',function(){
        var val = $(this).val();
        var city = $(this).find('option[value="'+val+'"]').data('city');
        $('select[name="receiver_city"]').html('');
        for (var i = 0;i < city.length;i++){
            var item = city[i], select = '';
            if(_city && _city == item.name){
                select = 'selected';
            }
            var tpl = '<option value="'+item.name+'" '+select+'>'+item.name+'</option>';
            var $tpl = $(tpl).data('area',item.area);
            $('select[name="receiver_city"]').append($tpl);
        }
        $('select[name="receiver_city"]').trigger('change');
    });
    $('select[name="receiver_city"]').on('change',function(){
        var val = $(this).val();
        var area = $(this).find('option[value="'+val+'"]').data('area');
        $('select[name="receiver_district"]').html('');
        for (var i = 0;i < area.length;i++){
            var item = area[i], select = '';
            if(_district && _district == item){
                select = 'selected';
            }
            var tpl = '<option value="'+item+'" '+select+'>'+item+'</option>';
            $('select[name="receiver_district"]').append(tpl);
        }
    });

    for (var i = 0;i < _citys.length;i++){
        var item = _citys[i], select = '';
        if(_state && _state == item.name){
            select = 'selected';
        }
        var tpl = '<option value="'+item.name+'" '+select+'>'+item.name+'</option>';
        var $tpl = $(tpl).data('city',item.city);
        $('select[name="receiver_state"]').append($tpl);
    }
    $('select[name="receiver_state"]').trigger('change');
});