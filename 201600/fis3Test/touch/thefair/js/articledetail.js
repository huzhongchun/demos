require(["widget/jsbridge","widget/setAppAndWxShare"],function(jsb,setShare){

    var callbackBack = function () {
        location.href = 'taooweb://closeWebView?goback=true';
    };

    var callbackShare = function () {
        location.href = 'taooweb://showSharePanel';
    };
    var callbackCollection = function () {
        alert('收藏');
    };
    window.callbackFavorite = callbackFavorite;

    window.button4 = {
        "type": "button",
        "identifier": "button4",
        "min_width_percentage": "0.25",
        "height_percentage": "0.35",
        "max_image_height": "17.5",
        "offsetY": "0",
        "title": "0",
        "image": "http://resource.thefair.net.cn/touch/thefair/images/favorite_icon_btn.png?123",
        "bg_color": "#fff",
        "bg_image": null,
        "corner_radius": "4.0",
        "title_color": "#9B9B9B",
        "highlight_title_color": "#9B9B9B",
        "call_back": encodeURIComponent(callbackFavorite.toString()),
        "font_size": "14"
    };
    function callbackFavorite () {
        button4.title = parseInt(button4.title) + 1 +'';
        button4.image = 'http://resource.thefair.net.cn/touch/thefair/images/favorite_icon_btn_active.png?123';
        window.location.href = 'taooweb://updateToolBarButton?identifier=button4&item='+encodeURIComponent(JSON.stringify(button4));
    };

    var callbackComment = function () {
        location.href = 'newthefair://page/comment_list?note_id='+$.getQueryString(location.href,'note_id');
    };

    window._content = {
        "height": "50.0",
        "bg_color": "#FFFFFF",
        "bg_image": null,
        "alignment": "left",
        "style": {
            "top_separator": {
                "show": true,
                "height": 1,
                "color": "#DBDBDB",
                "alpha": 1
            },
            "bottom_separator": {
                "show": false,
                "height": 0,
                "color": "#FFFFFF",
                "alpha": 1
            }
        },
        "buttons": [
            {
                "type": "button",
                "identifier": "button1",
                "min_width_percentage": "0.15",
                "height_percentage": "0.35",
                "max_image_height": "17.5",
                "offsetY": "0",
                "title": "",
                "image": "http://resource.thefair.net.cn/touch/thefair/images/back_icon.png?123",
                "bg_color": "#FFFFFF",
                "bg_image": null,
                "corner_radius": "4.0",
                "title_color": "#FFFFFF",
                "highlight_title_color": "#9B9B9B",
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
                "height_percentage": "0.35",
                "max_image_height": "17.5",
                "offsetY": "0",
                "title": "",
                "image": "http://resource.thefair.net.cn/touch/thefair/images/share_icon.png?123",
                "bg_color": "#FFFFFF",
                "bg_image": null,
                "corner_radius": "4.0",
                "title_color": "#FFFFFF",
                "highlight_title_color": "#9B9B9B",
                "call_back":  callbackShare.toString(),
                "font_size": "14"
            },
            {
                "type": "button",
                "identifier": "button3",
                "min_width_percentage": "0.15",
                "height_percentage": "0.35",
                "max_image_height": "17.5",
                "offsetY": "0",
                "title": "",
                "image": "http://resource.thefair.net.cn/touch/thefair/images/collection_icon.png?123",
                "bg_color": "#FFFFFF",
                "bg_image": null,
                "corner_radius": "4.0",
                "title_color": "#FFFFFF",
                "highlight_title_color": "#9B9B9B",
                "call_back":  callbackCollection.toString(),
                "font_size": "14"
            },
            {
                "type": "button",
                "identifier": "button4",
                "min_width_percentage": "0.25",
                "height_percentage": "0.35",
                "max_image_height": "17.5",
                "offsetY": "0",
                "title": "0",
                "image": "http://resource.thefair.net.cn/touch/thefair/images/favorite_icon_btn.png?123",
                "bg_color": "#fff",
                "bg_image": null,
                "corner_radius": "4.0",
                "title_color": "#9B9B9B",
                "highlight_title_color": "#9B9B9B",
                "call_back": encodeURIComponent(callbackFavorite.toString()),
                "font_size": "14"
            },
            {
                "type": "button",
                "identifier": "button5",
                "min_width_percentage": "0.25",
                "height_percentage": "0.35",
                "max_image_height": "17.5",
                "offsetY": "0",
                "title": "1000",
                "image": "http://resource.thefair.net.cn/touch/thefair/images/comment_icon.png?123",
                "bg_color": "#FFFFFF",
                "bg_image": null,
                "corner_radius": "4.0",
                "title_color": "#9B9B9B",
                "highlight_title_color": "#9B9B9B",
                "call_back": encodeURIComponent(callbackComment.toString()),
                "font_size": "14"
            }
        ]

    };

    var _jsb = jsb;

    function hideTitleBar() {
        _jsb.title.setStatus('hidden');
    }

    function setToolBarContent() {
        window.location.href = 'taooweb://setToolBarContent?content=' + encodeURIComponent(JSON.stringify(_content));
    }

    function setToolBarStatus() {
        window.location.href = 'taooweb://setToolBarStatus?show=show';
    }

    var _setShare = setShare;
    var _setting = {
        title: '穿得好看才有力气上班，她们分享7种办公室时髦大法' ,
        text: '工作很无聊，可穿衣服有得聊',
        link: location.href,
        image:  'http://resource.bj.taooo.cc/activity/201604/1/images/top_banner_cn.jpg',
    };
    //设置分享
    function setShareContent() {
        _setShare(_setting);
    }


    var _time = 0;
    var jsbFuncArray = [
        hideTitleBar,
        setShareContent,
        setToolBarContent,
        setToolBarStatus
    ];
    function runJsbQueue(jsbArray) {
        var _platform = Thefair.platform();
        if(jsbArray.length > 0 && _platform != 'browser') {
            var jsbFunc = jsbArray.shift();
            setTimeout(function () {
                jsbFunc();
            }, _time);
            if (jsbArray.length > 0) {
                _time += 50;
                runJsbQueue(jsbArray);
            } else {
                _time = 0;
            }
        }else{
            _time = 0;
        }
    }

    //队列执行jsb
    runJsbQueue(jsbFuncArray);







    //所有dom的操作都应该放在bigpipe配置的js里,否则可能dom还没加载完成
    setTimeout(function () {
        var loadDataSrc = function (){
            var _winHeight = $(window).height();
            var _winScrollTop = $(window).scrollTop();
            var list = $('img[data-src]');
            for (var i = 0; i < list.length; i++) {
                var $item = $(list[i]);
                if($item.attr('data-src')){
                    var _offsetTop = $item.offset().top;
                    if((_offsetTop - 800) <= (_winHeight + _winScrollTop)){
                        var src = $item.attr('data-src');
                        $item.attr('src',src);
                        $item.removeAttr('data-src');
                    }
                }
            }
        };
        $(window).on('scroll',function () {
            loadDataSrc();
        });


        // var getPageParams = '{"page_label":"discovery"}';
        // $.ajax({
        //     url : '/api',
        //     type : 'get',
        //     data: { path : '/v1/card/get_page' , params : getPageParams },
        //     dataType: 'jsonp',
        //     success: function(data){
        //         if(data.code == 0){
        //             var data = data.result.card_list;
        //             F.parseCard.handleFeedResultFunc(data);
        //         }else{
        //             alert(data.message.text);
        //         }
        //         F.hideLoading();
        //     },
        //     error: function(e){
        //         //alert(e.responseText);
        //         F.hideLoading();
        //     }
        // });

        $('iframe.video_iframe').each(function(){
            var _src = $(this).attr('data-src'), _parent = $(this).parent();
            var data = {
                "vid": $.getQueryString(_src,'vid'),
                "auto": $.getQueryString(_src,'auto'),
                "ref":"",
                "width": $.getQueryString(_src,'width'),
                "height": $.getQueryString(_src,'height')
            };

            _parent.html('<div id="mod_player"></div>');
            tvp.$.each(data, function(k) {
                var v = tvp.$.getUrlParam(k);
                if (v != "") {
                    data[k] = decodeURIComponent(v);
                    data[k] = tvp.$.filterXSS(data[k]);
                }
            });
            if(!data.vid){
                console.log('没有找到vid参数!');
                return;
            }

            var video = new tvp.VideoInfo();
            var player = window.__player = new tvp.Player();
            var opt = {
                width: '100%',
                height: '100%',
                video: video,
                modId: "mod_player",
                isHtml5UseUI:true,
                autoplay: data.auto==="0"?0:1,
                isHtml5UseFakeFullScreen: !tvp.$.os.ios,
                isiPhoneShowPlaysinline : tvp.$.browser.WeChat,
                flashWmode: 'transparent',
                vodFlashSkin: "http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf",
                vodFlashExtVars: {
                    clientbar:0,
                    searchpanel:0,
                    showend:0
                }
            }
            video.setVid(data.vid);
            player.create(opt);
        });

    },100);
});