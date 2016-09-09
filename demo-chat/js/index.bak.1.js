$(function(){
	// var tpl = '<div class=""><img src="http://resource.bj.taooo.cc/activity/201605/01/images/3.jpg?v=1462369403"></div>';
	// $('.start_btn').click(function(){
	// 	// $(tpl).addClass('run_lf').insertBefore($(this));
	// 	// scrollBody(500);
	// 	appendSessionFunc(tpl,'right',data);
	// });


	var _tplList = [], _curTpl = 0;


    getKeyDataFunc('start',data);



    /**
     * 点击问题事件
     */
	$('#scale-wrapper').on('click','.qus_btn',function(){
		if($(this).hasClass('clicked')){
			return false;
		}
		var answerData = $(this).parents('.chat-box').data();
		$(this).addClass('clicked');
		if(answerData.result && answerData.result.length > 0){
			var result = answerData.result;
			for (var i = 0; i < result.length; i++) {
				var resultItem = result[i];
				if(resultItem.match(/\.(jpg|png|jpeg|gif)$/)){
					var txtTpl = '<div class="chat-box text-left"><div class="run-left"><img src="'+resultItem+'"></div></div>';
				}else if(resultItem.match(/\.(mp4)$/)){
					var txtTpl = '<div class="chat-box text-left"><div class="run-left"><video poster="http://img2.cache.netease.com/cnews/2016/4/25/2016042517200229dda.jpg" src="'+resultItem+'" controls="controls">您的浏览器不支持 video 标签。</video></div></div>';
				}else{
					var txtTpl = '<div class="chat-box text-left"><div class="run-left"><span class="txt">'+resultItem+'</span></div></div>';
				}
				_tplList.push({
					tpl: txtTpl,
					position: 'left',
					data: '',
				});
				//appendSessionFunc(txtTpl,'left');
			};

			getKeyDataFunc(answerData.nextid,data);
		}
	})



    /**
     * 添加对话
     * @param tpl
     * @param position
     * @param answerData
     */
	function appendSessionFunc(tpl,position,answerData){
		var appendTpl = null;
		switch(position){
			case 'left':
				appendTpl = $(tpl).addClass('run-left');
				break;
			case 'right':
				appendTpl = $(tpl).addClass('run-right');
				break;
		}
		//带上数据
		$(appendTpl).data(answerData);
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
    function getKeyDataFunc(key,data){
        if(key && data){
            var item = data[key];
            for(var prop in item){
                var answerData = item[prop];
                if(answerData.btn){
                    var txtTpl = '<div class="chat-box text-right"><div class="run-right btn qus_btn"><span class="txt">'+answerData.btn+'</span></div></div>';
                    //appendSessionFunc(txtTpl,'right',answerData);
                    _tplList.push({
                        tpl: txtTpl,
                        position: 'right',
                        data: answerData,
                    });
                }
            }
            handleTplListFunc(true);
        }
    }

    /**
     * 处理待渲染的模板列表
     * @param first 是否是渲染第一个对话条
     */
	function handleTplListFunc(first){
		if(first){
			var len = _tplList.length;
			if(_curTpl < len){
				tplItem = _tplList[_curTpl];
				appendSessionFunc(tplItem.tpl,tplItem.position,tplItem.data);
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
                    if(_tplList[_curTpl-1] && _tplList[_curTpl-1].position == 'right' && tplItem.position == 'right'){
                        setTimeout(function(){
                            appendSessionFunc(tplItem.tpl,tplItem.position,tplItem.data);
                            _curTpl++;
                        },500);
                    }else{
                        setTimeout(function(){
                            appendSessionFunc(tplItem.tpl,tplItem.position,tplItem.data);
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