(function(){
	var $pages = $('.page-container .page-area');
	var pageNumb = $pages.length;
	$('.page-container').width(pageNumb * 375);

	var curPos = 0,curIndex = 0, endMove = true;

	function changePageFunc(direction){
		endMove = false;
		if(direction == 'l'){
			curPos -= 375;
			curPos = curPos < -(375 * (pageNumb - 1)) ?  -(375 * (pageNumb - 1)) : curPos;
			curIndex += 1;
			curIndex < (pageNumb - 1) ? (pageNumb - 1) : curIndex;
		}
		else if(direction == 'r'){
			curPos += 375;
			curPos = curPos > 0 ?  0 : curPos;
			curIndex -= 1;
			curIndex < 0 ? 0 : curIndex;
		}
		$('.page-container').css('transform', 'translate3d('+curPos+'px,0,0)');
		setTimeout(function(){
			endMove = true;
		},400)
	}
	$('.page-container').on('webkitTransitionEnd',function(){
		
	})
	$('.btn-pre').on('tap',function(){
		if(endMove){
			changePageFunc('r');
		}
	})
	$('.btn-next').on('tap',function(){
		if(endMove){
			changePageFunc('l');
		}
	})

	//初始化横向滑动选择的宽度
	function initSelectFunc(id,min,max,start,unit){
		var tpl;
		for (var i = min; i <= max; i++) {
			if(i == start)
				tpl ='<li class="select-item active"><div class="item-txt">'+i+'<span class="unit">'+unit+'</div></span></li>';
			else
				tpl ='<li class="select-item"><div class="item-txt">'+i+'<span class="unit">'+unit+'</div></span></li>';
			$(tpl).insertBefore($('#'+id).find('.end-item'));
		};
		var childNumb = max - min +1;
		//首尾2个空白快
		$('#'+id).css({'width':childNumb * 40 + 20+'px','transform': 'translate3d('+(min - start + 4) * 40+'px, 0px, 0px)'});
		$('#'+id).find('.select-item').on('click',function(){
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
		})
		//依赖scroll.js
		new F.widget.scrollXObject({
            id: id,
        });
	}

	initSelectFunc('scroll-1',0,100,23,'岁');
	initSelectFunc('scroll-2',100,200,160,'cm');
	initSelectFunc('scroll-3',30,200,50,'kg');
	

})()