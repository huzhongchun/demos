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

    initTag($('.display-tag-box .tag-box'));
    initTag($('.edit-tag-box .tag-box'));

    function  initTag(dom){
        $(dom).each(function(index){
        //待图片加载完全后再初始化tag
            var self = this;
            $(this).parent().find('.p-img').on('load',function(){
                setTag(self);
            })
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
        if (detail.direction == 'left') {
            $(dom).css({'top': p.top+'px','left': p.left+'px'}).addClass('left');
        }else if(detail.direction == 'right' ){
            $(dom).css({'top': p.top +'px','left': p.left+'px'}).addClass('right');
        }
    }

    //坐标修正
    function correctPosition(dom,left,top,direction,viewW,viewH){
        
        //换算成坐标位置
        var left = viewW  * parseFloat(left);
        var top =  viewH* parseFloat(top);
        //获取tag的宽度和高度
        var tagW = $(dom).find('.tag-txt').width() + $(dom).find('.shining-box').width() + 20; //闪动坐标点的宽度+文字的长度+间隙  = 整个tag的宽度
        var tagTxtW = $(dom).find('.tag-txt').width() + 20; //去掉点坐标后的宽度
        var shiningW = $(dom).find('.shining-box').width(); //点坐标的宽度
        var tagH = $(dom).height();

        //坐标纠正
        
        if(direction == 'left'){
            if(left + tagW > viewW){
                left = viewW - tagW;
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
            }
            else if(viewW - left <= shiningW){
                left = viewW - shiningW;
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
        }

        //坐标均大于0
        if(left <= 0 )
            left = 0;
        if(top <= 0 )
            top = 0;
        return {'top': top,'left': left}
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

            touchP.startX = e.changedTouches[0].clientX;
            touchP.startY = e.changedTouches[0].clientY;
            tagP.left = $(this).position().left;
            tagP.top = $(this).position().top;
            tagP.direction = $(this).attr('data-direction');

        })
        $(window).on('touchmove','.edit-tag-box .tag-box',function(e){
            var self  = this;
            e.preventDefault();
            e.stopPropagation();
            var movingX = (e.changedTouches[0].clientX - touchP.startX) / F.scale;
            var movingY = (e.changedTouches[0].clientY - touchP.startY) / F.scale;

            var l = (tagP.left + movingX) / tagP.viewW ;
            var t = (tagP.top + movingY) / tagP.viewH;
            
            p = correctPosition(self,l,t,tagP.direction,editBoxW,editBoxH);
            console.log(p);
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
        var tagTpl = '<div class="tag-box clearfloat left show-tag" data-change="no" data-direction="left" data-info='+"'"+info+"'"+'>'+
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
})(window,Zepto)
