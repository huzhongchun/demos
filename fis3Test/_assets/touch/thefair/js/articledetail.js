require(["widget/jsbridge","widget/setAppAndWxShare"],function(t,e){function i(){button4.title=parseInt(button4.title)+1+"",button4.image="http://resource.thefair.net.cn/touch/thefair/images/favorite_icon_btn_active.png?123",window.location.href="taooweb://updateToolBarButton?identifier=button4&item="+encodeURIComponent(JSON.stringify(button4))}function o(){s.title.setStatus("hidden")}function n(){window.location.href="taooweb://setToolBarContent?content="+encodeURIComponent(JSON.stringify(_content))}function r(){window.location.href="taooweb://setToolBarStatus?show=show"}function a(){f(u)}function c(t){var e=Thefair.platform();if(t.length>0&&"browser"!=e){var i=t.shift();setTimeout(function(){i()},d),t.length>0?(d+=50,c(t)):d=0}else d=0}var h=function(){location.href="taooweb://closeWebView?goback=true"},l=function(){location.href="taooweb://showSharePanel"},g=function(){alert("收藏")};window.callbackFavorite=i,window.button4={type:"button",identifier:"button4",min_width_percentage:"0.25",height_percentage:"0.35",max_image_height:"17.5",offsetY:"0",title:"0",image:"http://resource.thefair.net.cn/touch/thefair/images/favorite_icon_btn.png?123",bg_color:"#fff",bg_image:null,corner_radius:"4.0",title_color:"#9B9B9B",highlight_title_color:"#9B9B9B",call_back:encodeURIComponent(i.toString()),font_size:"14"};var _=function(){location.href="newthefair://page/comment_list?note_id="+$.getQueryString(location.href,"note_id")};window._content={height:"50.0",bg_color:"#FFFFFF",bg_image:null,alignment:"left",style:{top_separator:{show:!0,height:1,color:"#DBDBDB",alpha:1},bottom_separator:{show:!1,height:0,color:"#FFFFFF",alpha:1}},buttons:[{type:"button",identifier:"button1",min_width_percentage:"0.15",height_percentage:"0.35",max_image_height:"17.5",offsetY:"0",title:"",image:"http://resource.thefair.net.cn/touch/thefair/images/back_icon.png?123",bg_color:"#FFFFFF",bg_image:null,corner_radius:"4.0",title_color:"#FFFFFF",highlight_title_color:"#9B9B9B",call_back:h.toString(),font_size:"12"},{type:"space",identifier:"space1",width_percentage:"0.05"},{type:"button",identifier:"button2",min_width_percentage:"0.15",height_percentage:"0.35",max_image_height:"17.5",offsetY:"0",title:"",image:"http://resource.thefair.net.cn/touch/thefair/images/share_icon.png?123",bg_color:"#FFFFFF",bg_image:null,corner_radius:"4.0",title_color:"#FFFFFF",highlight_title_color:"#9B9B9B",call_back:l.toString(),font_size:"14"},{type:"button",identifier:"button3",min_width_percentage:"0.15",height_percentage:"0.35",max_image_height:"17.5",offsetY:"0",title:"",image:"http://resource.thefair.net.cn/touch/thefair/images/collection_icon.png?123",bg_color:"#FFFFFF",bg_image:null,corner_radius:"4.0",title_color:"#FFFFFF",highlight_title_color:"#9B9B9B",call_back:g.toString(),font_size:"14"},{type:"button",identifier:"button4",min_width_percentage:"0.25",height_percentage:"0.35",max_image_height:"17.5",offsetY:"0",title:"0",image:"http://resource.thefair.net.cn/touch/thefair/images/favorite_icon_btn.png?123",bg_color:"#fff",bg_image:null,corner_radius:"4.0",title_color:"#9B9B9B",highlight_title_color:"#9B9B9B",call_back:encodeURIComponent(i.toString()),font_size:"14"},{type:"button",identifier:"button5",min_width_percentage:"0.25",height_percentage:"0.35",max_image_height:"17.5",offsetY:"0",title:"1000",image:"http://resource.thefair.net.cn/touch/thefair/images/comment_icon.png?123",bg_color:"#FFFFFF",bg_image:null,corner_radius:"4.0",title_color:"#9B9B9B",highlight_title_color:"#9B9B9B",call_back:encodeURIComponent(_.toString()),font_size:"14"}]};var s=t,f=e,u={title:"穿得好看才有力气上班，她们分享7种办公室时髦大法",text:"工作很无聊，可穿衣服有得聊",link:location.href,image:"http://resource.bj.taooo.cc/activity/201604/1/images/top_banner_cn.jpg"},d=0,p=[o,a,n,r];c(p),setTimeout(function(){var t=function(){for(var t=$(window).height(),e=$(window).scrollTop(),i=$("img[data-src]"),o=0;o<i.length;o++){var n=$(i[o]);if(n.attr("data-src")){var r=n.offset().top;if(t+e>=r-800){var a=n.attr("data-src");n.attr("src",a),n.removeAttr("data-src")}}}};$(window).on("scroll",function(){t()}),$("iframe.video_iframe").each(function(){var t=$(this).attr("data-src"),e=$(this).parent(),i={vid:$.getQueryString(t,"vid"),auto:$.getQueryString(t,"auto"),ref:"",width:$.getQueryString(t,"width"),height:$.getQueryString(t,"height")};if(e.html('<div id="mod_player"></div>'),tvp.$.each(i,function(t){var e=tvp.$.getUrlParam(t);""!=e&&(i[t]=decodeURIComponent(e),i[t]=tvp.$.filterXSS(i[t]))}),!i.vid)return void console.log("没有找到vid参数!");var o=new tvp.VideoInfo,n=window.__player=new tvp.Player,r={width:"100%",height:"100%",video:o,modId:"mod_player",isHtml5UseUI:!0,autoplay:"0"===i.auto?0:1,isHtml5UseFakeFullScreen:!tvp.$.os.ios,isiPhoneShowPlaysinline:tvp.$.browser.WeChat,flashWmode:"transparent",vodFlashSkin:"http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf",vodFlashExtVars:{clientbar:0,searchpanel:0,showend:0}};o.setVid(i.vid),n.create(r)})},100)});