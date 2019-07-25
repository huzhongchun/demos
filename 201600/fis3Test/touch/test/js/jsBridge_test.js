$(function(){
    var _platform = Thefair.platform();
    function calldevice(fuc, parm, val) {
        if(_platform != 'browser')
            window.location.href = 'taooweb://' + fuc + '?' + parm + '=' + val;
    }
    var TaooWebView = {
        _Bounce: 'false',
        //设置回弹效果
        setBounce:function(bounce) {
            calldevice('setWebViewBounce', 'bounce', bounce);
            this._Bounce = bounce;
        },
        getBounce:function() {
            return this._Bounce;
        }
    };
    TaooWebView.toolbar = {
        _Status: 'show',
        _Color: 'ffffff',
        _Share: 'hidden',
        _Content: 'shareContent',
        //设置标题栏分享按钮
        setShare:function(status) {
            calldevice('setToolbarShare', 'toolbarshare', status);
            this._Status = status;
        },
        getShare:function() {
            return this._Status;
        },
        //设置标题栏分享文案
        setShareContent:function(content) {
            calldevice('setShareContent', 'content', content);
            this._Content = content;
        },
        getShareContent:function() {
            return this._Content;
        },
        setToolbarStatus:function(status){
            calldevice('setToolBarStatus', 'show', status);
        },
        setToolbarContent: function(content){
            calldevice('setToolBarContent', 'content', content);
        },
        updateToolbarButton: function(identifier,json){
            if(_platform != 'browser')
                window.location.href = 'taooweb://updateToolBarButton?identifier='+identifier+'&item='+json;
        }
    };
    TaooWebView.title = {
        _Status: 'hidden',
        _Text: 'title',
        _Color: 'ffffff',
        //设置标题栏状态
        setStatus:function(status) {
            calldevice('setTitlebarStatus', 'titlebarstatus', status);
            this._Status = status;
        },
        getStatus:function() {
            return this._Status;
        },
        //设置标题栏文本
        setText:function(text) {
            this._Text = text;
            calldevice('setTitleText', 'titletext', text);
        },
        getText:function() {
            return this._Text;
        },
        //设置标题栏颜色
        setColor:function(color) {
            this._Color = color;
            calldevice('setTitleColor', 'titlecolor', color);
        },
        getColor:function() {
            return this._Color;
        }
    };
    TaooWebView.spinner = {
        _Status: 'hidden',
        //设置spinner状态
        setStatus:function(status) {
            calldevice('setSpinnerStatus', 'spinnerstatus', status);
            this._Status = status;
        },
        getStatus:function() {
            return this._Status;
        }
    };

    TaooWebView.login = {
        _Callback: function(){
            location.reload();
        },
        //设置spinner状态
        setLogin:function(_callback) {
            calldevice('login', 'callback', _callback);
            this._Callback = _callback;
        },
        //判断客户端登录状态
        isLogin:function(_callback) {
            calldevice('isLogin', 'callback', _callback);
        },
    };
    TaooWebView.close = function() {
        if(_platform != 'browser')
            window.location.href = 'taooweb://closeWebView';
    }
    TaooWebView.refresh = function() {
        if(_platform != 'browser')
            window.location.href = 'taooweb://refreshWebView';
    }

    //复制内容到粘贴板
    TaooWebView.copyToPasteboard = {
        setCopyContent:function(content) {
            calldevice('copyToPasteboard', 'content', content);
        }
    }

    //关闭浮动的webView
    TaooWebView.closeFloatWebView = function() {
        if(_platform != 'browser')
            window.location.href = 'taooweb://closeFloatWebView';
    }

    //弹出tost
    TaooWebView.alertToast = function(title,message,callback) {
        var data = {title: title,message: message};
        calldevice('showToast', 'content',encodeURIComponent(JSON.stringify(data)));
    };

    window.TaooWebView = TaooWebView;
});







function closeBounce(){
    TaooWebView.setBounce('false');
}
function openBounce(){
    TaooWebView.setBounce('true');
}

function setTitle(){
    TaooWebView.title.setText('桃花岛')
}
function setTitleColor(){
    var color = encodeURIComponent('#FF0000')
    TaooWebView.title.setColor(color);
}

function closeShareBtn(){
    TaooWebView.toolbar.setShare('hidden');
}
function openShareBtn(){
    TaooWebView.toolbar.setShare('show');
}
function setShareContent(){
    var url = location.href;
    var shareCallback = function(flag){
        if(flag == 'success'){
            alert('分享成功～');
        }
        else{
            alert('分享失败～');
        }
    }
    var json = {
        facebook: {
            link: "http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1",
            image: "http://static.biyeyuan.com/banner/banner1.jpg",
            text: "她花了十几年研究怎么变漂亮，却发现经验只有几句话。#穿出大长腿# 点击链接，免费查看。"
        },
        twitter: {
            link: "http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1",
            image: "http://static.biyeyuan.com/banner/banner1.jpg",
            text: "她花了十几年研究怎么变漂亮，却发现经验只有几句话。#穿出大长腿# 点击链接，免费查看。"
        },
        wechat_session: {
            link: "http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1",
            image: "http://static.biyeyuan.com/banner/banner1.jpg",
            title: "穿出大长腿",
            text: "她花了十几年研究怎么变漂亮，却发现经验只有几句话："
        },
        wechat_timeline: {
            link: "http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1",
            image: "http://static.biyeyuan.com/banner/banner1.jpg",
            title: "穿出大长腿",
            text: "她花了十几年研究怎么变漂亮，却发现经验只有几句话："
        },
        //微博需要手动把链接加在内容中
        weibo: {
            link: "http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1",
            image: "http://static.biyeyuan.com/banner/banner1.jpg",
            text: "她花了十几年研究怎么变漂亮，却发现经验只有几句话。http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1"
        },
        copy_link: {
            link: "http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1"
        }
    }
    var content = 'title=这个是分享的标题&description=这个是分享的内容&webpageUrl='+url+'&image=http://www.taooo.cc/images/index_7.png&callback='+shareCallback;
    TaooWebView.toolbar.setShareContent(encodeURIComponent(JSON.stringify(json)));
}

function closeNavBar(){
    TaooWebView.title.setStatus('hidden');
}
function openNavBar(){
    TaooWebView.title.setStatus('show');
}

function closeSpinner(){
    TaooWebView.spinner.setStatus('hidden');
}
function openSpinner(){
    TaooWebView.spinner.setStatus('show&exclusiveTouch=false');
}

function openLogin(){
    var callback = function(flag){
        if(flag == 'success'){
            document.getElementById('login').innerText = '登录成功～';
            alert('登录成功～');
            alert(document.cookie);
            var curDomain = location.hostname.match(/(\..+)/);
            var tk = $.getCookie('tk');
                account = $.getCookie('account'),
                platform = $.getCookie('platform'),
                expires = $.getCookie('expires') ? $.getCookie('expires') : 30,
                domain = $.getCookie('domain') ? $.getCookie('domain') : curDomain;
            tk && $.setCookie('tk',tk,expires,'/',domain);
            account && $.setCookie('account',account,expires,'/',domain);
            platform && $.setCookie('platform',platform,expires,'/',domain);
            alert(document.cookie);
        }
        else{
            alert('登录失败～');
        }
    }
    TaooWebView.login.setLogin(callback);
}

function closeWebview(){
    TaooWebView.close();
}

function setCopyContent(content){
    var Callback = function(flag){
        if(flag == 'success'){
            alert('复制到剪切板成功～');
        }
        else{
            alert('复制到剪切板失败～');
        }
    }
    var t = encodeURIComponent(content)+'&callback='+encodeURIComponent(Callback);
    TaooWebView.copyToPasteboard.setCopyContent(t);
    //window.location.href = 'taooweb://copyToPasteboard?content='+encodeURIComponent('复制到剪切板')+'&callback='+encodeURIComponent(Callback);
}

function closeFloatWebview(){
    TaooWebView.closeFloatWebView();
}

function alertToast(){
    TaooWebView.alertToast('标题','内容部分');
}

function setContactServiceStatus(status){
    if(status == 'show')
        location.href = "taooweb://contactCustomerService?status=show&customer_from_url="+encodeURIComponent(location.href);
    else if('hidden')
        location.href = "taooweb://contactCustomerService?status=hidden&customer_from_url="+encodeURIComponent(location.href);
}
function openContactService(){
    location.href = "taoo://page/meiqiachat?customer_from_url="+encodeURIComponent(location.href);
}



$(function(){
    $('.ajax-login').click(function(){
        // $.ajax({
        //     url: '/api?path=%2Fv1%2Fcard%2Fget_page&params=%7B%22page_label%22%3A%22search_data%22%2C%22search_title%22%3A%22Nick%22%2C%22area_id%22%3A%220%22%2C%22brand_id%22%3A%222618441975556360076%22%2C%22content_tad_id%22%3A%220%22%7D&__callback=jsonp1',
        //     type: 'get',
        //     dataType: 'jsop',
        //     success: function(data){
        //         alert('success');
        //         window.location.href = 'taoo://page/login';
        //     },
        //     error: function(e){
        //         alert('error');
        //         window.location.href = 'http://www.baidu.com';
        //         window.location.assign('http://www.baidu.com');
        //     },

        // })

        $.ajax({
            url: '/api?path=%2Fv1%2Fnote%2Fadd_favorite&params=%7B%22note_id%22%3A+%222618441975556841608%22%7D',
            type: 'get',
            dataType: 'jsonp',
            //data: { path : '/v1/note/remove_favorite', params : '{"note_id": "'+noteId+'"}'},
            success: function(data){
                alert('success');
                if(data.code == 0){
                    if(successCallback)
                        successCallback.call(this,data);
                }else if(data.code == 40000){  //未登录
                    setTimeout(function(){
                        alert(data.result.redirect_url);
                        window.location.assign(data.result.redirect_url);
                    },10)

                }else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(e){
                alert(e.responseText);
                if(errorCallback)
                    errorCallback.call(this,data);
                F.hideLoading();
            }
        })
    })
})



function openTaoBaoSDK(){
    var callback = function(flag){
        alert(flag);
        if(flag == 'success')
            alert('success');
        else
            alert('error');
    }
    var link = 'taooweb://showTaobao?item_id=43768783942&callback='+encodeURIComponent(callback);
    alert(link);
    location.href = link;
}

function isLogin(){
    var callback = function(flag,json){
        if(flag == 'yes'){
            var cookies = eval(decodeURIComponent(json));
            for (var i = 0; i < cookies.length; i++) {
                var name = cookies[i].name;
                var value = cookies[i].value;
                var domain = cookies[i].domain;
                var cookieExpires = cookies[i].expires_date*1000;
                var expiresDays = 1;
                if((new Date(cookieExpires)) != 'Invalid Date'){
                    var expiresDays = ((new Date(cookieExpires)).getTime() - (new Date()).getTime()) / (1000*60*60*24);
                }
                if(!$.getCookie(name)){
                    $.setCookie(name,value,expiresDays,'/','.lo.taooo.cc');
                }
            };
            $.ajax({
                url: '/api?path=%2Fv1%2Fnote%2Fadd_favorite&params=%7B%22note_id%22%3A+%222618441975556841608%22%7D',
                type: 'get',
                dataType: 'jsonp',
                success: function(data){
                    alert('success');
                    if(data.code == 0){
                        if(successCallback)
                            successCallback.call(this,data);
                    }else if(data.code == 40000){  //未登录
                        setTimeout(function(){
                            alert(data.result.redirect_url);
                            window.location.assign(data.result.redirect_url);
                        },10)
                        
                    }else{
                        alert(data.message.text);
                    }
                },
                error: function(e){
                    alert(e.responseText);
                }
            });
        }else{
            alert('客户端是未登录状态～');
        }

        alert(flag);
    }
    TaooWebView.login.isLogin(encodeURIComponent(callback));

}


function editNoteDetail(){
    var noteId = '96608765184311349';
    var callback = function(){
        alert('回调成功！');
        window.location.reload();
    }
    window.location.href = 'taooweb://editNoteDetail?status=show&noteId='+noteId+'&callback='+encodeURIComponent(callback);
}


function setToolbarContent(){
    var callbackBack = function () {
        location.href = 'taooweb://closeWebView?goback=true';
    };

    var callbackShare = function () {
        location.href = 'taooweb://showSharePanel';
    };
    var callbackCollection = function () {
        alert('收藏');
    };
    var callbackFavorite = function () {
        alert('点赞');
    };
    var callbackComment = function () {
        location.href = 'newthefair://page/comment_list?note_id='+$.getQueryString(location.href,'note_id');
    };

    var _content = {
        "height": "50.0",
        "bg_color": "#FFFFFF",
        "bg_image": null,
        "alignment": "left",
        "style": {
            "top_separator": {
                "show": true,
                "height": 1,
                "color": "DBDBDB",
                "alpha": 1
            },
            "bottom_separator": {
                "show": true,
                "height": 0,
                "color": "FFFFFF",
                "alpha": 1
            }
        },
        "buttons": [
            {
                "type": "button",
                "identifier": "button1",
                "min_width_percentage": "0.15",
                "height_percentage": "0.9",
                "offsetY": "0",
                "title": "",
                "image": "http://resource.thefair.net.cn/touch/thefair/images/back_icon.png",
                "max_image_height": "50.0",
                "bg_color": "#fff",
                "bg_image": null,
                "corner_radius": "4.0",
                "title_color": "#FFFFFF",
                "highlight_title_color": "#FFFFFF",
                "call_back": callbackBack.toString(),
                "font_size": "12"
            },
            {
                "type": "space",
                "identifier": "space1",
                "width_percentage": "0.05"
            },
            {
                "type": "button",
                "identifier": "button2",
                "min_width_percentage": "0.15",
                "height_percentage": "0.9",
                "offsetY": "0",
                "title": "",
                "image": "http://resource.thefair.net.cn/touch/thefair/images/share_icon.png",
                "max_image_height": "50.0",
                "bg_color": "#fff",
                "bg_image": null,
                "corner_radius": "4.0",
                "title_color": "#FFFFFF",
                "highlight_title_color": "#FFFFFF",
                "call_back":  callbackShare.toString(),
                "font_size": "14"
            },
            {
                "type": "button",
                "identifier": "button3",
                "min_width_percentage": "0.15",
                "height_percentage": "0.9",
                "offsetY": "0",
                "title": "",
                "image": "http://resource.thefair.net.cn/touch/thefair/images/collection_icon.png",
                "max_image_height": "50.0",
                "bg_color": "#fff",
                "bg_image": null,
                "corner_radius": "4.0",
                "title_color": "#FFFFFF",
                "highlight_title_color": "#FFFFFF",
                "call_back":  callbackCollection.toString(),
                "font_size": "14"
            },
            {
                "type": "button",
                "identifier": "button3",
                "min_width_percentage": "0.25",
                "height_percentage": "0.9",
                "offsetY": "0",
                "title": "1000",
                "image": "http://resource.thefair.net.cn/touch/thefair/images/favorite_icon_btn_active.png",
                "max_image_height": "50.0",
                "bg_color": "#fff",
                "bg_image": null,
                "corner_radius": "4.0",
                "title_color": "#9B9B9B",
                "highlight_title_color": "#FFFFFF",
                "call_back": callbackFavorite.toString(),
                "font_size": "14"
            },
            {
                "type": "button",
                "identifier": "button4",
                "min_width_percentage": "0.25",
                "height_percentage": "0.9",
                "offsetY": "0",
                "title": "1000",
                "image": "http://resource.thefair.net.cn/touch/thefair/images/comment_icon.png",
                "max_image_height": "50.0",
                "bg_color": "#fff",
                "bg_image": null,
                "corner_radius": "4.0",
                "title_color": "#9B9B9B",
                "highlight_title_color": "#FFFFFF",
                "call_back": "",
                "font_size": "14"
            }
        ]

    };
    var content = encodeURIComponent(JSON.stringify(_content));
    TaooWebView && TaooWebView.toolbar.setToolbarContent(content);
    setTimeout(function(){
        TaooWebView && TaooWebView.toolbar.setToolbarStatus('show');
    },20);
}

function updateToolbarButton(){
    var json = {
                    "type": "button",
                    "identifier": "button4",
                    "min_width_percentage": "0.15",
                    "height_percentage": "0.9",
                    "offsetY": "0",
                    "title": "2000",
                    "image": "http://resource.thefair.net.cn/touch/thefair/images/comment_icon.png",
                    "max_image_height": "50.0",
                    "bg_color": "#fff",
                    "bg_image": null,
                    "corner_radius": "4.0",
                    "title_color": "#9B9B9B",
                    "highlight_title_color": "#FFFFFF",
                    "call_back": "",
                    "font_size": "14"
                };
    TaooWebView && TaooWebView.toolbar.updateToolbarButton('button1',encodeURIComponent(JSON.stringify(json)));
}

function playVideo(){
    var url = 'http://resource.bj.taooo.cc/_assets/activity/201605/04/images/video.mp4';
    window.location.href = 'taooweb://presentVideo?url='+encodeURIComponent(url);
}


