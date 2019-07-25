$(function() {
	var addressList = Jumei.addModule('addaddress', {
		init:function(){
			this.addEventListenerFunc();
			this.initAddressHrefFunc();
			this.editAddressFunc();
		},
		addEventListenerFunc:function(){
			var self = this;
			$('.address-item').tap(function(){
				$(this).find('input').attr('checked',true);
			})
		},
		initAddressHrefFunc:function(){
			var self = this;
			self.addressList = $('.address-item');
			self.addressList.each(function(index){
				$(this).attr({'href' : $(this).attr('data-href')});
			})
		},
		editAddressFunc:function(){
			var self = this;
			var index = '';
			$('.address-edit-btn').tap(function(){
				if($(this).hasClass('edit')){
					$(this).removeClass('edit').addClass('finish').html('完成');
					$('.choose-boxs').hide();
					self.addressList.each(function(index){
						$(this).attr({'href' : '/microshop/order/address_edit?type=list&'+$(this).attr('data-address')});
					});
					index = $('.add-address-select').parent().index();
					$('.address-item .add-address-select').removeClass('add-address-select');
				}
				else if($(this).hasClass('finish')){
					$(this).removeClass('finish').addClass('edit').html('编辑');
					$('.choose-boxs').show();
					self.addressList.each(function(index){
						$(this).attr({'href' : $(this).attr('data-href')});
					});
					$($('.address-item li')[index]).addClass('add-address-select');
				}
			})
		}
	})
	addressList.init();
})