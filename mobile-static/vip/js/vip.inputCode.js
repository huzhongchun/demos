$(function() {
	var inputCode = Jumei.addModule('vip', {
		init:function(){
			this.getNeedMoudleFunc();
			this.addEventListenerFunc();
		},
		getNeedMoudleFunc:function(){
			var self = this;
			var dialog = Jumei.getModule('ui.dialog');
			self.dialogObj = new dialog({
				title:'消息',
                btn:1,
                ok:'确定',
                content:'<div class="tips-area clearfloat">'+
                            '<div class="tips-mes">您已经是老用户了</div>'+
                        '</div>'
			})
		},
		addEventListenerFunc:function(){
			var self = this;
			$('.submit-btn').tap(function(e){
				var val = $.trim($('.input-boxs input')[0].value);
				if(!val){
					self.showDialogFunc('请输入邀请码！');
					$('.input-boxs input')[0].value = '';
				}
				else{
					$.ajax({
						url: '/activity/vip/input_code',
						type:'post',
						data:{'code':val},
						dataType:'json',
						success:function(data){
							if(data){
								switch(data.state){
									case 0:
										self.showDialogFunc('邀请码错误，请重新输入');
										break;
									case 1:
										self.showDialogFunc('现金券兑换成功');
										$('.ui-dialog-ok').html('查看我的现金券');
										$('.ui-dialog-ok').tap(function(e){
											location.href = 'jumeimall://page/promocard-list';
										});
										break;
									case 2:
										self.showDialogFunc('您已经兑换过了，每个人只有一次兑换机会');
										$('.ui-dialog-ok').html('我知道了');
										$('.ui-dialog-ok').tap(function(e){
											try{
												JMWebView.close();
											}
											catch(e){

											}
										})
										break;
									case 3:
										location.href = '/activity/vip/has_regist';
										break;
								}
							}
						},
						error:function(){
							self.showDialogFunc('网络似乎有问题，请重试！');
						}
					})
				}
			})
		},
		showDialogFunc:function(mes){
			var self = this;
			$('.tips-mes').html(mes);
			setTimeout(function(){
				self.dialogObj.show();
			},50);
		},
		firstStateCheckFunc:function(){
			var self = this;
			if($('#state')[0].value == 0){
				self.showDialogFunc();
				$('.ui-dialog-ok').tap(function(e){
					location.href = 'jumeimall://page/promocard-list';
				})
			}
		}
	});
	inputCode.init();
})