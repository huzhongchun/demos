
require(['book/js/public','widget/refreshLoad'],function(public,refreshLoad){
    var _public = public;
    var _refreshLoad = refreshLoad;
	var _page = parseInt($('.hidden-page-value').val()),
        _totalPage = parseInt($('.hidden-totalpage-value').val()),
        _bookCode = $('.hidden-bookcode-value').val();

    _public.setWxShareContent();

    $('.recommend-desc .desc-text').each(function(){
        var _this = this;
        var content = $(this).html().replace(/[\n]/g, '<br>');
        $(this).data('content_original', content);
        $('.hidden-box .desc-text-2').html($(this).html());
        if ($('.hidden-box').height() > 132) {
            $(this).subStr(165);
            setTimeout(function () {
                $(_this).data('content_short', $(_this).html());
            }, 30);
            $(this).parent().find('.check-more').css('visibility', 'visible');
        }
        $(this).removeClass('original');
    });

	function initFunc(){	
		_public.initCommentStars();
		$('.desc-text.original').each(function(){
            var _this = this;
            var content = $(this).html().replace(/[\n]/g, '<br>');
            $(this).data('content_original', content);

            $('.hidden-box .desc-text-2').html($(this).html());
            if ($('.hidden-box').height() > 132) {
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
	};

	initFunc();


	$('.content-container').on('click','.check-more',function(){
		var $desc = $(this).parent().find('.desc-text');
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

	function getBookCommentsFunc(){
		$.ajax({
			url: '/book/comment/get_book_comments',
			type: 'get',
			data: {page: _page,book_code: _bookCode},
			success: function(data){
				if(data.code == 0){
					if(data.result.data.item_list.length > 0){
						var itemList = data.result.data.item_list;
						for (var i = 0; i < itemList.length; i++) {
							var tpl = '<div class="comment-item">'+
						                '<div class="user-info">'+
                                            '<span class="user-head" style="background-image: url(http://static.bj.taooo.cc/public/user/avatar/default_avatar_v1.png)"></span>'+
                                            '<div class="user-text-box">'+
                                                '<span class="user-nick">'+itemList[i].nick+'</span>'+
                                                '<span class="star-list" data-stars="'+itemList[i].grade+'">'+
                                                    '<i class="star-icon"></i>'+
                                                    '<i class="star-icon"></i>'+
                                                    '<i class="star-icon"></i>'+
                                                    '<i class="star-icon"></i>'+
                                                    '<i class="star-icon"></i>'+
                                                '</span>'+
                                                '<span class="user-wechat">微信号: '+(itemList[i].wechat ? itemList[i].wechat : '未公开' )+'</span>'+
                                            '</div>'+
						                '</div>'+
						                '<div class="user-comment">'+
						                    '<span class="desc-text original">'+itemList[i].content.replace(/[\n]/g,'<br>')+'</span>'+
						                    '<span class="check-more">更多</span>'+
						                '</div>'+
						            '</div>';
				            $('.comment-list-area').append(tpl);
						};
						initFunc();
					}
				}

				load.changeFlag();
			},
			error: function(){
				load.changeFlag();

			}
		})
	}

	var load = new _refreshLoad({
		triggerLen: 400,
		callback: function(){
			if(_page < _totalPage){
                _page++;
				getBookCommentsFunc();
			}else{
                load.changeFlag();
            }
		}
	});

});





