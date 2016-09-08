require(['book/js/public'],function(p) {
	var _public = p;
    _public.setWxShareContent();

	var cookieVerify = $.getCookie('verifyCodeVip');
	if(cookieVerify && parseInt(cookieVerify) > 0){
		$('.check-btn').addClass('active');
		_verifyCode = cookieVerify;
		_loop = setInterval(function(){
        	_verifyCode--;
        	if(_verifyCode > 0){
        		var exprireTime = _verifyCode/60/60/24;
        		$('.count-down-numb').text(_verifyCode);
				$('.count-down-tips').show();
        		$.setCookie('verifyCode',_verifyCode,exprireTime,'/');
        	}
        	else{
        		clearInterval(_loop);
        		$('.check-btn').removeClass('active');
        		$('.count-down-tips').hide();
        	}

        	console.log(_verifyCode);
        },1000)
	}
	$('.check-btn').on('click',function(){
		if($(this).hasClass('active')){
			return false;
		}
		var mobile = $('input[name="mobile"]').val();
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(mobile))){
            alert("请输入正确的11位手机号~");
            return false;
        }
        $(this).addClass('active');
        _verifyCode = cookieVerify>0 ? cookieVerify : 60;
        _loop = setInterval(function(){
        	_verifyCode--;
        	if(_verifyCode > 0){
        		var exprireTime = _verifyCode/60/60/24;
        		$('.count-down-numb').text(_verifyCode);
        		$('.count-down-tips').show();
        		$.setCookie('verifyCodeVip',_verifyCode,exprireTime,'/');
        	}
        	else{
        		clearInterval(_loop);
        		$('.check-btn').removeClass('active');
        		$('.count-down-tips').hide();
        	}

        	console.log(_verifyCode);
        },1000);

        

        $.ajax({
			url: '/book/sms/get_sms_code',
			type: 'post',
			data: { mobile: mobile},
			success: function(data){
				if(data.code == 0){

				}else{
					clearInterval(_loop);
					$('.count-down-numb').hide();
					$('.check-btn').removeClass('active');
					alert(data.message.text);
				}
			},
			error: function(e){
				clearInterval(_loop);
				$('.count-down-numb').hide();
				$('.check-btn').removeClass('active');
                var errorObj = JSON.parse(e.responseText);
                alert(errorObj.message.text);
			}
		})
	})



	$('.submit-btn').on('click',function(){
		var _this = this;
		var mobile = $('input[name="mobile"]').val();
		var vipCode = $('input[name="vip_code"]').val();
		var verifyCode = $('input[name="verify_code"]').val();
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(mobile))){
            alert("请输入正确的11位手机号~");
            return false;
        }
		if(!vipCode){
			alert("请输入会员卡号~");
            return false;
		}
		$(this).addClass('active');
		$.ajax({
			url: '/book/user/bind_card',
			type: 'post',
			data: { mobile: mobile, code: verifyCode,card_code: vipCode},
			success: function(data){
				if(data.code == 0){
					var tpl = '<p>恭喜，绑定成功！</p><br><p>成为“新世相·图书馆”会员后：</p><br><p>1、您有机会参加只面向会员的阅读服务；</p><p>2、您可以优先参加“新世相·图书馆计划”后续项目；</p><p>3、您将优先获得参与“新世相·图书馆”线下活动的资格。</p><br><p>为了更好地行使您的会员权益，请妥善保管您的专属会员编号和注册手机号。</p>';
					$('.vip-intro').html(tpl);
					$('.vip-area').hide();
				}else{
					alert(data.message.text);
				}
				$(_this).removeClass('active');
			},
			error: function(e){
                var errorObj = JSON.parse(e.responseText);
				alert(errorObj.message.text);
				$(_this).removeClass('active');
			}
		})

	});



});