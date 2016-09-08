$(function() {
	var getCode = Jumei.addModule('vip', {
		init: function() {
			this.addEventFunc();
			$('.module-content').each(function() {
				$(this).css('height', 0); //初始化设定height的值，否则第一次没有动画
			})
		},
		addEventFunc: function() {
			var self = this;
			$('.invite-code').tap(function(e){
				Jumei.ja('bai_jin_hui_yuan_fen_xiang','click','dian_ji_yao_qing_ma')
			})
			$('.share-btn').tap(function(e) {
				Jumei.ja('bai_jin_hui_yuan_fen_xiang','click','dian_ji_fen_xiang')
				var type = $(this).attr('type');
				self.openShareUrl(type);
			});
			$('.module-title').tap(function(e) {
				$(this).find('.module-title-icon').toggleClass('down');
				var $content = $(this).parent().find('.module-content');
				var $contentChild = $(this).parent().find('.module-content>div');
				var contentHeight = parseInt($($content).css('height'));
				var childHeight = parseInt($($contentChild).css('height'));
				if (contentHeight > 0)
					$($content).css({
						'height': '0'
					});
				else
					$($content).css({
						'height': childHeight + 'px'
					});
			})
		},
		openShareUrl: function(type) {
			var title = "5个小伙伴，3个都领了。我的邀请码能兑换20元>>";
			var content = "5个小伙伴，3个都领了。我的邀请码能兑换20元>>";
			var imgUrl = "http://p2.jmstatic.com/mobile/act/activities/2015_01/vip/share.png?2";
			var LinkUrl = 'http://'+location.host+'/activity/vip/share_code?code='+$('.invite-code').html();
			switch (type) {
				case 'weixin-friend':
					var url = 'jumeimall://action/share/weixin?&link=' + encodeURIComponent(LinkUrl) +
						'&img=' + encodeURIComponent(imgUrl) +
						'&title=' + encodeURIComponent(title) +
						'&des=' + encodeURIComponent(content); //微信聊天;
						break;
				case 'weixin-quan':
					var url = 'jumeimall://action/share/weixin/pengyouquan?&link=' + encodeURIComponent(LinkUrl) +
						'&img=' + encodeURIComponent(imgUrl) +
						'&title=' + encodeURIComponent(content) +
						'&des=' + encodeURIComponent(content); //微信朋友圈;
						break;
				case 'duanxin':
					var url = "";
						break;
			}
			window.location.href = url;
		}
	});
	getCode.init();
})