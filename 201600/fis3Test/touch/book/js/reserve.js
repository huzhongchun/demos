require(['book/js/public'],function(public) {
    var _public = public;
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


        Thefair.addEventGa('library_prev','click','mobile_'+mobile);
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
		var smsCode = $('input[name="verify_code"]').val();
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(mobile))){
            alert("请输入正确的11位手机号~");
            return false;
        }
        if(!smsCode.trim()){
            alert('请输入验证码');
            return false;
        }
		$(this).addClass('active');
		$.ajax({
			url: '/book/user/add_making_user',
			type: 'post',
			data: { mobile: mobile, code: smsCode},
			success: function(data){
				if(data.code == 0){
					var tpl = '<p>恭喜，预约成功！购买时间和链接我们将在活动开始前以短信的方式通知你。</p>';
					$('.prev-intro').html(tpl);
					$('.prev-area').hide();
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