onmessage = function(message){
    var data = message.data,curPage = 1,totalPage = 1,content = '',result = {};
    
    contentAjaxFunc(data.page,data.noteId,data.path);
    /***********   获取笔记内容卡片 ************/

    function ajax(options){
    	var xhr = new XMLHttpRequest();
    	xhr.onreadystatechange = function(){
    		if(xhr.readyState == 4 && xhr.status==200){
    			var result = xhr.responseText;
    			options.success.call(this,result);
    		}
    	}
    	xhr.open(options.type,options.url,true);
  		xhr.send(options.data);
    }
    function contentAjaxFunc(pagenumb,noteId,path){
        var noteId = noteId;
        var url = 'http://h5.lo.taooo.cc/api?path='+path+'&params={"page":"'+pagenumb+'","note_id":"'+noteId+'"}';
        ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            success: function(data){
                if(data.code == 0){
                    curPage = data.result.page;
                    totalPage = data.result.page_count;
                    //匹配换行符
                    content += decodeURIComponent(data.result.content.replace(/[\n]/g,'<br>'));
                    //如果还有分页则，再次请求分页内容
                    if(data.result.page < data.result.page_count){
                        contentAjaxFunc(++curPage,noteId,path)
                    }
                    else if(data.result.page = data.result.page_count){
                    	var result = {
                    		boxName: data.boxName,
                    		content: content
                    	}
                    	postMessage(result);
                    }
                }
            },
            error: function(){
                //alert('网络似乎有问题，请刷新重试～');
            }
        })
    }



}