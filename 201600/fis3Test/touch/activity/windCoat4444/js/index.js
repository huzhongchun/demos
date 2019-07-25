$(function(){
	var country = $('.hide-country-value').val();

	$('.url-scheme').urlScheme({
		country: country,
		selector: 'url-scheme',
	})


	var session = {
        title: country == 'cn' ? '最后几天，抓紧时间！' : '残りわずか、急げ！',
        text: country == 'cn' ? '穿上风衣做心机宝贝' : 'お宝アイテムのコートを着よう',
        link: location.href,
        image: country == 'cn' ? 'http://resource.bj.taooo.cc/activity/windCoat/images/top_banner_cn.jpg' : 'http://resource.bj.taooo.cc/activity/windCoat/images/top_banner_jp.jpg',
        wechatTimeline: {
            title : country == 'cn' ? '最后几天，抓紧时间！穿上风衣做心机宝贝' : '残りわずか、急げ！お宝アイテムのコートを着よう',
        }
    }
    
    //设置分享
    F.widget.setShareContentFunc(session);
});