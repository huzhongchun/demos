require(['book/js/public'],function(public) {
    var _public = public;
	var _bookId = $('.hidden-bookId-value').val();
	var _produtId = $('.hidden-productId-value').val();
    var _orderId = $('.hidden-orderId-value').val();

    _public.setWxShareContent();
    _public .initCommentStars();
    var _loading = _public.loading;
    _loading.init()

    var _refer = $.getQueryString(location.href,'refer');
	//textarea自适应高度
    var autoTextarea = function (elem, extra, maxHeight) {
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
            isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
            addEvent = function (type, callback) {
                elem.addEventListener ?
                    elem.addEventListener(type, callback, false) :
                    elem.attachEvent('on' + type, callback);
            },
            getStyle = elem.currentStyle ? function (name) {
                var val = elem.currentStyle[name];

                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                        parseFloat(getStyle('paddingTop')) -
                        parseFloat(getStyle('paddingBottom')) + 'px';
                };

                return val;
            } : function (name) {
                return getComputedStyle(elem, null)[name];
            },
            minHeight = parseFloat(getStyle('height'));


        elem.style.resize = 'none';

        var change = function () {
            var scrollTop, height,
                padding = 0,
                style = elem.style;

            if (elem._length === elem.value.length) return;

            elem._length = elem.value.length;

            if (!isFirefox && !isOpera) {
                padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
            };
            scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            elem.style.height = minHeight + 'px';
            if (elem.scrollHeight > minHeight) {
                if (maxHeight && elem.scrollHeight > maxHeight) {
                    height = maxHeight - padding;
                    style.overflowY = 'auto';
                } else {
                    height = elem.scrollHeight - padding;
                    style.overflowY = 'hidden';
                };
                style.height = height + extra + 'px';
                scrollTop += parseInt(style.height) - elem.currHeight;
                //document.body.scrollTop = scrollTop;
                //document.documentElement.scrollTop = scrollTop;
                elem.currHeight = parseInt(style.height);
            };
        };

        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
    };
    autoTextarea($('.input-comment')[0]);



    $('.star-list .star-icon').on('click',function(){
    	var index = $(this).index();
    	$('.star-list .active').removeClass('active');
    	var stars = $('.star-list .star-icon');
    	for (var i = 0; i <= index; i++) {
    		$(stars[i]).addClass('active');
    	};
        if(index == 4){
            $('.star-text').html('力荐');
        }else if(index == 3){
            $('.star-text').html('推荐');
        }else if(index == 2){
            $('.star-text').html('还行');
        }else if(index == 1){
            $('.star-text').html('较差');
        }else if(index == 0){
            $('.star-text').html('很差');
        }
    });


    $('.submit-btn').on('click',function(){
        var _this = this;
    	var grade = $('.star-list .active').length;
        var comment = $('.input-comment').val().trim();
        if($(_this).hasClass('active')){
            return false;
        }
        if(grade == 0){
            alert('请给这本书打分');
            return false;
        }
    	if(!comment){
    		alert('请输入书评内容');
    		return false;
    	}
        $(_this).addClass('active');
        _loading.show();
    	$.ajax({
			url: '/book/comment/add_comment',
			type: 'post',
			data: { 'grade': grade, 'content': encodeURIComponent(comment),'book_id' : _bookId,'product_id': _produtId, 'order_id': _orderId},
			success: function(data){
				if(data.code == 0){
                    try {
                        if (data.result.data.comment_id) {
                            getCommentPosterImg(data.result.data.comment_id);
                        } else {
                            if (_refer)
                                window.location.href = _refer;
                            else
                                window.location.href = '/book/user/book_list';
                        }
                    }catch (e){
                        if (_refer)
                            window.location.href = _refer;
                        else
                            window.location.href = '/book/user/book_list';
                    }
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

    function getCommentPosterImg(commentId) {

        $.ajax({
            url: '/book/comment/get_comment_poster_img',
            type: 'get',
            data: { comment_id: commentId},
            dataType: 'json',
            success: function(data){
                if(data.code == 0){
                    window.location.href = '/book/comment/comment_poster?poster='+encodeURIComponent(data.result.url);
                }else{
                    alert(data.message.text);
                }
                _loading.hide();
            },
            error: function (e) {
                var errorObj = JSON.parse(e.responseText);
                alert(errorObj.message.text);
                _loading.hide();
            }
        });
    }

});




