$(function(){
	var _tplList = [], _curTpl = 0;

    /**
     * 初始化
     */
    getKeyDataFunc('start',data);


    /**
     * 点击问题事件
     */
    var _onlyId = 0;
	$('#scale-wrapper').on('click','.qus_btn',function(){
		if($(this).hasClass('clicked')){
			return false;
		}
        var marginTop = 0;
        var originIndex = $(this).index();
		var answerData = $(this).data();
        var $parent = $(this).parents('.chat-box');
        var parentH = $parent.height();
        $parent.height(parentH);
        var children = $parent.children().clone();
        if(children.length > 1) {
            marginTop  = parentH - (children.length - 1) * (36+15) + 15;
            var top = $parent.offset().top;
            $parent.attr('data-top',top).attr('id','id-'+_onlyId);
            var $abChatBox = $('<div class="absolute-chat-box text-right"></div>');
            //去掉run-right 不然append到dom树的时候会触发动画
            children.each(function(){
                var node = $(this).removeClass('run-right');
                $abChatBox.append(node);
            });
            $parent.removeClass('run-right').html($abChatBox);
            $abChatBox.height($abChatBox.height());

            var brotherNode = $abChatBox.find('.btn');
            brotherNode.each(function (index) {
                var _this = this;
                //如果是在点击按钮前面的
                if(index < originIndex){
                    $(_this).removeClass('run-right').animate({
                        opacity: 0,
                    }, 800, function () {
                        //$(_this).remove();
                    });
                    setTimeout(function () {
                        $(_this).removeClass('run-right').animate({
                            height: 0,
                            'margin-bottom': 0
                        }, 800, function () {
                            //$(_this).remove();
                        });
                    },200)
                }else if(index > originIndex){
                    if (index != originIndex){
                        $(_this).removeClass('run-right').animate({
                            opacity: 0,
                        }, 800, function () {
                            $(_this).remove();
                        });
                    }
                }else{
                    $(_this).addClass('clicked');
                }

            });
            // $abChatBox.animate({
            //     height: '36px'
            // }, 1600, function () {
            //
            // });
        }
		if(answerData.result && answerData.result.length > 0){
            $(this).addClass('clicked');
            var result = answerData.result;
			for (var i = 0; i < result.length; i++) {
				var resultItem = result[i];
				if(resultItem.match(/\.(jpg|png|jpeg|gif)$/)){
					var txtTpl = '<div class="run-left"><img src="'+resultItem+'"></div>';
				}else if(resultItem.match(/\.(mp4)$/)){
					var txtTpl = '<div class="run-left"><video poster="http://img2.cache.netease.com/cnews/2016/4/25/2016042517200229dda.jpg" src="'+resultItem+'" controls="controls">您的浏览器不支持 video 标签。</video></div>';
				}else{
					var txtTpl = '<div class="run-left"><span class="txt">'+resultItem+'</span></div></div>';
				}
				_tplList.push([{
					tpl: txtTpl,
					position: 'left',
					data: ''
				}]);
			};

			getKeyDataFunc(answerData.nextid,data,marginTop);
		}
	})



    /**
     * 添加对话
     * @param answerData
     */
	function appendSessionFunc(answerData,marginTop){
		var appendTpl = null,tpl = '',marginTop = parseInt(marginTop) ? marginTop: 0;
        var position = answerData[0].position;
        switch (position) {
            case 'left':
                appendTpl = $('<div class="chat-box text-left run-left"></div>').css({
                    'margin-top': -marginTop+'px'
                });
                break;
            case 'right':
                appendTpl = $('<div class="chat-box text-right run-right"></div>');;
                break;
        }

        //多个选择按钮
        for(var i=0;i<answerData.length;i++) {
            var temp = answerData[i].tpl;
            //带上数据
            if(answerData[i].data instanceof Object){
                temp = $(answerData[i].tpl).data(answerData[i].data);
            }
            $(appendTpl).append(temp);
        }
		$('.chat-area').append($(appendTpl));
		scrollBody();
	}


    /**
     * 滚动页面
     * @param callback
     */
	function scrollBody(callback){
		var scrollTop = $('body')[0].scrollHeight;
		$('body').animate({scrollTop: scrollTop},800,function(){
			handleTplListFunc()
		});
	}


    /**
     * 获取对应节点的数据
     * @param key
     * @param data
     */
    function getKeyDataFunc(key,data,marginTop){
        if(key && data){
            var item = data[key];
            var answerArray = [];
            for(var prop in item){
                var answerData = item[prop];
                if(answerData.btn){
                    var txtTpl = '<div class="run-right btn qus_btn"><span class="txt">'+answerData.btn+'</span></div>';
                    //appendSessionFunc(txtTpl,'right',answerData);
                    answerArray.push({
                            tpl: txtTpl,
                            position: 'right',
                            data: answerData
                        });
                }
            }
            _tplList.push(answerArray);
            handleTplListFunc(true,marginTop);
        }
    }

    /**
     * 处理待渲染的模板列表
     * @param first 是否是渲染第一个对话条
     */
	function handleTplListFunc(first,marginTop){
		if(first){
			var len = _tplList.length;
			if(_curTpl < len){
				tplItem = _tplList[_curTpl];
				appendSessionFunc(tplItem,marginTop);
				_curTpl++;
			}else{
				_curTpl = 0;
				_tplList = [];
			}
		}else{
            var len = _tplList.length;
                if(_curTpl < len){
                    tplItem = _tplList[_curTpl];
                    //如果是展示右边的对话条,则间隔时间小一点
                    if(_tplList[_curTpl-1][0] && _tplList[_curTpl-1][0].position == 'right' && tplItem[0].position == 'right'){
                        setTimeout(function(){
                            appendSessionFunc(tplItem,marginTop);
                            _curTpl++;
                        },500);
                    }else{
                        setTimeout(function(){
                            appendSessionFunc(tplItem,marginTop);
                            _curTpl++;
                        },1000);
                    }
                }else{
                    _curTpl = 0;
                    _tplList = [];
                }
		}
		

	}


})