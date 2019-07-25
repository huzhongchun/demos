(function(w,$){

    //绑定展示tag的事件
    initEvent();
    
    function  initEvent(){
        $('.display-tag-box').on('click',function(){
            var isShowed = $(this).hasClass('show');
            if(isShowed){
                $(this).find('.tag-box').removeClass('show-tag').addClass('hide-tag');
                $(this).removeClass('show')
            }
            else{
                $(this).find('.tag-box').addClass('show-tag').removeClass('hide-tag');
                $(this).addClass('show')
            }
        })

        //目前的方式绑定事件对新添加的元素是无效的，如果采用事件代理，则会冒泡触发display-tag-box对tag的显示和隐藏事件，导致左右切换的时候也会显示隐藏
        //除非每次添加的时候都再绑定事件-----------------------todo
        //$(window).on('click','.display-tag-box .tag-box',function(e){
        $('.display-tag-box .tag-box').click(function(e){
            e.stopPropagation();
            var isLeft = $(this).hasClass('left');
            var canChange = $(this).attr('data-change');
            if(canChange !== 'no'){
                if(isLeft){
                    $(this).removeClass('left').addClass('right');
                    $(this).attr('data-direction','right');
                }
                else {
                    $(this).removeClass('right').addClass('left');
                    $(this).attr('data-direction','left');
                }
            }

            //切换方向后，更新数据
            var info = $.parseJSON($(this).attr('data-info'));
            info['direction'] = $(this).attr('data-direction');
            //将json转成字符串
            var data = $(this).attr('data-info',JSON.stringify(info));
        })
    }
    function showTag(){
        $('.display-tag-box .tag-box').addClass('show-tag').removeClass('hide-tag');
    }
    function hideTag(){
        $('.display-tag-box .tag-box').addClass('show-tag').removeClass('hide-tag');
    }

    //initTag($('.display-tag-box .tag-box'));
    initTag($('.edit-tag-box .tag-box'));

    function  initTag(dom){
        $(dom).each(function(index){
        //待图片加载完全后再初始化tag
            var self = this;
            //$(this).parent().find('.p-img').on('load',function(){
                setTag(self);
            //})
        })
    }

    //批量更新tag信息
    function tagRefresh(dom){
        $(dom).each(function(index){
            setTag(this);
        })
    }
    function setTag(dom){
        var detail = $.parseJSON($(dom).attr('data-info'));
        //获取可视容器的宽度和高度,每批tag对应的容器的高宽不定，所以需要没次都计算一下
        var viewW = $(dom).parent().width();
        var viewH = $(dom).parent().height();
        var  p = correctPosition(dom,detail.p_left,detail.p_top,detail.direction,viewW,viewH);
        $(dom).attr('data-direction',detail.direction);
        $(dom).attr('data-index',$(dom).index()); //因为需要clone所以需要记录index，否则initSingleTagCenterpiontInfo里面的index()方法会失效
        if (detail.direction == 'left') {
            $(dom).css({'top': p.top+'px','left': p.left+'px'}).addClass('left');
        }else if(detail.direction == 'right' ){
            $(dom).css({'top': p.top +'px','left': p.left+'px'}).addClass('right');
        }
    }

    //坐标修正
    function correctPosition(dom,left,top,direction,viewW,viewH){
        
        //换算成坐标位置,left和top为百分比
        var left = viewW  * parseFloat(left);
        var top =  viewH* parseFloat(top);
        //获取tag的宽度和高度
        var tagW = $(dom).find('.tag-txt').width() + $(dom).find('.shining-box').width() + 20; //闪动坐标点的宽度+文字的长度+间隙  = 整个tag的宽度
        var tagTxtW = $(dom).find('.tag-txt').width() + 20; //去掉点坐标后的宽度
        var shiningW = $(dom).find('.shining-box').width(); //点坐标的宽度
        var tagH = $(dom).height();
        var isEdge = {
            l: false,
            r: false,
            t: false,
            b: false
        }; //tag是否在边缘

        //坐标纠正
        
        if(direction == 'left'){
            if(left + tagW > viewW){
                left = viewW - tagW;
                isEdge.r = true;
            }
            //判断是否可以向右切换
            if(left < tagTxtW) {
                $(dom).attr('data-change','no');
            }
            else{
                $(dom).removeAttr('data-change');
            }
        }
        else if(direction == 'right'){
            if(left <= tagTxtW ){
                left = tagTxtW;
                isEdge.l = true;
            }
            else if(viewW - left <= shiningW){
                left = viewW - shiningW;
                isEdge.r = true;
            }
            //判断是否可以向左切换
            if(left + tagW > viewW){
                $(dom).attr('data-change','no');
            }
            else{
                $(dom).removeAttr('data-change');
            }
        }

        if(top + tagH > viewH){
            top = viewH - tagH;
            isEdge.b = true;
        }

        //坐标均大于0
        if(left <= 0 ){
            left = 0;
            isEdge.l = true;
        }
        if(top <= 0 ){
            top = 0;
            isEdge.t = true;
        }


        // //判断是否在边缘
        // if(direction == 'left'){
        //     if(left == 0) isEdge.l = true;
        // }
        return {'top': top,'left': left,edge:isEdge}
    }






    //编辑框内的tag标签可移动
    

    var  editBoxW = 320, editBoxH = 65;  //编辑tag的框的高宽，也可动态获取编辑框的高度 getEditBoxWH方法
    function getEditBoxWH(){
        editBoxW = $('.edit-tag-box').width(); 
        editBoxH = $('.edit-tag-box').height();
    }
    getEditBoxWH();
    function addTagMoveEvent(){
        var touchP = {},tagP = {},p;
        $(window).on('touchstart','.edit-tag-box .tag-box',function(e){
            //获取可视容器的宽度和高度
            tagP.viewW = $(this).parent().width();
            tagP.viewH = $(this).parent().height();

            //touchP.startX = e.changedTouches[0].clientX;
            //touchP.startY = e.changedTouches[0].clientY;
            //mac上使用clientX，chrome模拟的浏览器touchmove无法点对点移动
            touchP.startX = e.changedTouches[0].screenX;
            touchP.startY = e.changedTouches[0].screenY;
            tagP.left = $(this).position().left;
            tagP.top = $(this).position().top;
            tagP.direction = $(this).attr('data-direction');

                s = e.changedTouches[0].clientX;
                console.log(s);
            

        })
        $(window).on('touchmove','.edit-tag-box .tag-box',function(e){
            var self  = this;
            e.preventDefault();
            e.stopPropagation();
            //var movingX = (e.changedTouches[0].clientX - touchP.startX) / F.scale;
            //var movingY = (e.changedTouches[0].clientY - touchP.startY) / F.scale;
            var movingX = (e.changedTouches[0].screenX - touchP.startX) / F.scale;
            var movingY = (e.changedTouches[0].screenY - touchP.startY) / F.scale;
console.log(touchP.startX+'----'+e.changedTouches[0].clientX);
            var l = (tagP.left + movingX) / tagP.viewW ;
            var t = (tagP.top + movingY) / tagP.viewH;
            
            p = correctPosition(self,l,t,tagP.direction,editBoxW,editBoxH);
            //console.log(p);
            $(self).css({'left' : p.left +'px','top' : p.top+'px'});
        })

        //移动结束后更新参数
        $(window).on('touchend','.edit-tag-box .tag-box',function(e){
            //获取可视容器的宽度和高度
            var viewW = $(this).parent().width();
            var viewH = $(this).parent().height();   
            var info = $.parseJSON($(this).attr('data-info'));
            info['direction'] = $(this).attr('data-direction');
            info['p_left'] = $(this).position().left / viewW;
            info['p_top'] = $(this).position().top / viewH;
            //将json转成字符串
            var data = $(this).attr('data-info',JSON.stringify(info));
            //console.log(data);
        })
        $(window).on('click','.edit-tag-box .tag-box',function(e){
            e.stopPropagation();
            var isLeft = $(this).hasClass('left');
            var canChange = $(this).attr('data-change');
            if(canChange !== 'no'){
                if(isLeft){
                    $(this).removeClass('left').addClass('right');
                    $(this).attr('data-direction','right');
                }
                else {
                    $(this).removeClass('right').addClass('left');
                    $(this).attr('data-direction','left');
                }
            }

            //切换方向后，更新数据
            var info = $.parseJSON($(this).attr('data-info'));
            info['direction'] = $(this).attr('data-direction');
            //将json转成字符串
            var data = $(this).attr('data-info',JSON.stringify(info));
        })
    }
        addTagMoveEvent();

    $('.tag-submit').on('click',function(){
        var val =$.trim($('.input-tag-txt').val());
        if( val == '') {
            alert('请输入标签的描述~');
            return false;
        }
        var info = '{"t_id":"1","p_top":"0","p_left":"0","direction":"left","type":"1","t_txt":"'+val+'"}';
        var tagTpl = '<div class="tag-box clearfloat left show-tag" data-direction="left" data-info='+"'"+info+"'"+'>'+
                        '<div class="shining-box">'+
                            '<b class="tag-icon">'+
                                '<span class="icon-img"></span>'+
                                '<span class="tag-shining "></span>'+
                            '</b>'+
                        '</div>'+
                        '<div class="tag-txt triangle">'+val+'</div>'+
                    '</div>';
        $('.edit-tag-box').append(tagTpl);
    })
    $('.tag-check').on('click',function(){
        //编辑完一个就直接移走，避免重复提交同一个tag （如要保留的话，则使用clone()方法即可------------todo）
        $('.display-tag-box').append($('.edit-tag-box .tag-box').off('click'));
        tagRefresh();
    })









    //碰撞检测
    var tagListPostionArray = [];
    //设一个延迟，否则tag信息更新的程序还没跑完
        function initAllTagCenterpiontInfo(){             //更新所有的tag的四个角的坐标
            tagListPostionArray = [];
            $('.edit-tag-box .tag-box').each(function(){
                var tagOb = initSingleTagCenterpiontInfo(this);
                tagListPostionArray.push(tagOb);
            })
        }
        function initSingleTagCenterpiontInfo(tagdom){   //计算中心坐标
            var index = $(tagdom).attr('data-index');
            var direction = $(tagdom).attr('data-direction');
            var w = $(tagdom).find('.tag-txt').width() + $(tagdom).find('.shining-box').width() + 20;
            var s_w = $(tagdom).find('.shining-box').width();
            var h = $(tagdom).height();
            var l = parseFloat($(tagdom).css('left'));
            var t = parseFloat($(tagdom).css('top'));
            var tagOb = {};
            if(direction == 'left')
                tagOb ={
                    'index': index,
                    'w': w,
                    'h': h,
                    'l_t': [l,t],   //tag的左上角坐标
                    'center' : [l+w/2,t+h/2]  //中心点坐标
                } 
            else if(direction == 'right')
                tagOb ={
                    'index': index,
                    'w': w,
                    'h': h,
                    'l_t': [l-w+s_w,t],
                    'center' : [l-w/2+s_w,t+h/2]
                }
            return tagOb;       
        }

        

        function arrayClone(array){
            if(!$.isArray(array)) return;
            var a= [];
            for (var i = 0; i < array.length; i++) {
                a.push(array[i]);
            };
            return a;
        }

        function getOverTagList(arrayP,currenttagOb){  
            if(!$.isArray(arrayP)) return;
            var tempA = [];
            for (var i = 0; i < arrayP.length; i++) {
                //判断两个X坐标差，是否大于两个tag的1/2宽度之和，大于的话，则肯定不会重叠
//console.log(arrayP[i]['center'][0]+'---'+currenttagOb['center'][0]+'---'+arrayP[i]['w']+'---'+currenttagOb['w']);
                var isGapMoreW = Math.abs(arrayP[i]['center'][0] - currenttagOb['center'][0]) > (arrayP[i]['w'] + currenttagOb['w']) / 2
                //判断两个Y坐标差，是否大于两个tag的1/2高度之和，大于的话，则肯定不会重叠
                var isGapMoreH = Math.abs(arrayP[i]['center'][1] - currenttagOb['center'][1]) > (arrayP[i]['h'] + currenttagOb['h']) / 2

//console.log(isGapMoreW +'--------'+ isGapMoreH+'------'+arrayP[i]['index'] +'--------'+currenttagOb['index']);
                if( !(isGapMoreW || isGapMoreH) && arrayP[i]['index'] != currenttagOb['index']){
                    tempA.push(arrayP[i]);
                }
            }

            return tempA;
        }

    setTimeout(function(){
        initAllTagCenterpiontInfo();
        console.log(tagListPostionArray);

        //以第一个tag为当前移动tag
        var currentTag = initSingleTagCenterpiontInfo($('.tag-box')[0]);
        console.log(getOverTagList(tagListPostionArray,currentTag));
    },20)


    //尝试性移动位置，左－右－上－下
    var cloneTarget ;
    //图片load事件触发后，才会运行setTg，但是延时和图片真正加载完的时间可能不同步－－－－－－－－－todo
    setTimeout(function() {
        tryAdjustPosition();

    },1000)
    

    //尝试性的调整位置，找
    function  tryAdjustPosition(){
        $('.hide-box').html('').append($($('.tag-box')[0]).clone());  //克隆一个测试移动，待确定后真实移动 ,但是克隆的的如果不渲染则计算宽度会变成0，则吧他渲染到一个隐藏的容器里；
        cloneTarget = $('.hide-box .tag-box');
        function success(data){
            console.log(data);
            $($('.tag-box')[0]).css({
                left: data.left,
                top: data.top,
            })
        }
        var tryLeft = doAdjust(cloneTarget,'left',success,function(){
            doAdjust(cloneTarget,'right',success,function(){
                doAdjust(cloneTarget,'top',success,function(){
                    doAdjust(cloneTarget,'bottom',success,function(){
                        alert('没有合适的位置～');
                    })
                })
            })
        });
    }

    //调整方法
    function doAdjust(dom,direction,hasCallback,noCallback){
        var overList = [];
        $('.hide-box').html('').append($($('.tag-box')[0]).clone());  //克隆一个测试移动，待确定后真实移动 ,但是克隆的的如果不渲染则计算宽度会变成0，则吧他渲染到一个隐藏的容器里；
        cloneTarget = $('.hide-box .tag-box');
        var loop = setInterval(function(){
            var viewW = $($('.tag-box')[0]).parent().width();
            var viewH = $($('.tag-box')[0]).parent().height();
            switch(direction){
                case 'left':
                    var l = (parseFloat($(cloneTarget).css('left')) - 5) / viewW;
                    var t = parseFloat($(cloneTarget).css('top')) / viewH;
                    break;
                case 'right':
                    var l = (parseFloat($(cloneTarget).css('left')) + 5) / viewW;
                    var t = parseFloat($(cloneTarget).css('top')) / viewH;
                    break;
                case 'top':
                    var l = parseFloat($(cloneTarget).css('left')) / viewW;
                    var t = (parseFloat($(cloneTarget).css('top')) - 5) / viewH;
                    break;
                case 'bottom':
                    var l = parseFloat($(cloneTarget).css('left')) / viewW;
                    var t = (parseFloat($(cloneTarget).css('top')) + 5) / viewH;
                    break;
                default:
                    return false;
            }
            console.log(direction);
            var d = $(cloneTarget).attr('data-direction');
            
            p = correctPosition(cloneTarget,l,t,d,viewW,viewH);
            
            $(cloneTarget).css({
                left: p.left,
                top: p.top,
            })
            setTimeout(function(){
                initAllTagCenterpiontInfo();
                //console.log(tagListPostionArray);

                //以第一个tag为当前移动tag
                var currentTag = initSingleTagCenterpiontInfo(cloneTarget);
                overList = getOverTagList(tagListPostionArray,currentTag);
                //console.log(getOverTagList(tagListPostionArray,currentTag));

                if(overList.length <= 0) {
                    clearInterval(loop); //如果重叠列表为空，则返回此位置作为调整的坐标
                    hasCallback.call(this,p)
                    return p; 
                }
                else{
                    if(p.edge.l && direction == 'left') {
                        clearInterval(loop);  //如果到达边缘且还是有重叠则停止
                        noCallback.call(this);
                    }
                    if(p.edge.r && direction == 'right') {
                        clearInterval(loop);  //如果到达边缘且还是有重叠则停止
                        noCallback.call(this);
                    }
                    if(p.edge.t && direction == 'top') {
                        clearInterval(loop);  //如果到达边缘且还是有重叠则停止
                        noCallback.call(this);
                    }
                    if(p.edge.b && direction == 'bottom') {
                        clearInterval(loop);  //如果到达边缘且还是有重叠则停止
                        noCallback.call(this);
                    }

                    console.log('false');
                }
            },20)
        },50)
    }

})(window,Zepto)
