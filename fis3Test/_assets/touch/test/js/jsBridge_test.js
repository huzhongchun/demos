function closeBounce(){TaooWebView.setBounce("false")}function openBounce(){TaooWebView.setBounce("true")}function setTitle(){TaooWebView.title.setText("桃花岛")}function setTitleColor(){var e=encodeURIComponent("#FF0000");TaooWebView.title.setColor(e)}function closeShareBtn(){TaooWebView.toolbar.setShare("hidden")}function openShareBtn(){TaooWebView.toolbar.setShare("show")}function setShareContent(){var e=(location.href,{facebook:{link:"http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1",image:"http://static.biyeyuan.com/banner/banner1.jpg",text:"她花了十几年研究怎么变漂亮，却发现经验只有几句话。#穿出大长腿# 点击链接，免费查看。"},twitter:{link:"http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1",image:"http://static.biyeyuan.com/banner/banner1.jpg",text:"她花了十几年研究怎么变漂亮，却发现经验只有几句话。#穿出大长腿# 点击链接，免费查看。"},wechat_session:{link:"http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1",image:"http://static.biyeyuan.com/banner/banner1.jpg",title:"穿出大长腿",text:"她花了十几年研究怎么变漂亮，却发现经验只有几句话："},wechat_timeline:{link:"http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1",image:"http://static.biyeyuan.com/banner/banner1.jpg",title:"穿出大长腿",text:"她花了十几年研究怎么变漂亮，却发现经验只有几句话："},weibo:{link:"http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1",image:"http://static.biyeyuan.com/banner/banner1.jpg",text:"她花了十几年研究怎么变漂亮，却发现经验只有几句话。http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1"},copy_link:{link:"http://h5.taooo.cc/mobile/touch/collection_detail?collection_id=1"}});TaooWebView.toolbar.setShareContent(encodeURIComponent(JSON.stringify(e)))}function closeNavBar(){TaooWebView.title.setStatus("hidden")}function openNavBar(){TaooWebView.title.setStatus("show")}function closeSpinner(){TaooWebView.spinner.setStatus("hidden")}function openSpinner(){TaooWebView.spinner.setStatus("show&exclusiveTouch=false")}function openLogin(){var e=function(e){if("success"==e){document.getElementById("login").innerText="登录成功～",alert("登录成功～"),alert(document.cookie);var t=location.hostname.match(/(\..+)/),o=$.getCookie("tk");account=$.getCookie("account"),platform=$.getCookie("platform"),expires=$.getCookie("expires")?$.getCookie("expires"):30,domain=$.getCookie("domain")?$.getCookie("domain"):t,o&&$.setCookie("tk",o,expires,"/",domain),account&&$.setCookie("account",account,expires,"/",domain),platform&&$.setCookie("platform",platform,expires,"/",domain),alert(document.cookie)}else alert("登录失败～")};TaooWebView.login.setLogin(e)}function closeWebview(){TaooWebView.close()}function setCopyContent(e){var t=function(e){alert("success"==e?"复制到剪切板成功～":"复制到剪切板失败～")},o=encodeURIComponent(e)+"&callback="+encodeURIComponent(t);TaooWebView.copyToPasteboard.setCopyContent(o)}function closeFloatWebview(){TaooWebView.closeFloatWebView()}function alertToast(){TaooWebView.alertToast("标题","内容部分")}function setContactServiceStatus(e){location.href="show"==e?"taooweb://contactCustomerService?status=show&customer_from_url="+encodeURIComponent(location.href):"taooweb://contactCustomerService?status=hidden&customer_from_url="+encodeURIComponent(location.href)}function openContactService(){location.href="taoo://page/meiqiachat?customer_from_url="+encodeURIComponent(location.href)}function openTaoBaoSDK(){var e=function(e){alert(e),alert("success"==e?"success":"error")},t="taooweb://showTaobao?item_id=43768783942&callback="+encodeURIComponent(e);alert(t),location.href=t}function isLogin(){var callback=function(flag,json){if("yes"==flag){for(var cookies=eval(decodeURIComponent(json)),i=0;i<cookies.length;i++){var name=cookies[i].name,value=cookies[i].value,domain=cookies[i].domain,cookieExpires=1e3*cookies[i].expires_date,expiresDays=1;if("Invalid Date"!=new Date(cookieExpires))var expiresDays=(new Date(cookieExpires).getTime()-(new Date).getTime())/864e5;$.getCookie(name)||$.setCookie(name,value,expiresDays,"/",".lo.taooo.cc")}$.ajax({url:"/api?path=%2Fv1%2Fnote%2Fadd_favorite&params=%7B%22note_id%22%3A+%222618441975556841608%22%7D",type:"get",dataType:"jsonp",success:function(e){alert("success"),0==e.code?successCallback&&successCallback.call(this,e):4e4==e.code?setTimeout(function(){alert(e.result.redirect_url),window.location.assign(e.result.redirect_url)},10):alert(e.message.text)},error:function(e){alert(e.responseText)}})}else alert("客户端是未登录状态～");alert(flag)};TaooWebView.login.isLogin(encodeURIComponent(callback))}function editNoteDetail(){var e="96608765184311349",t=function(){alert("回调成功！"),window.location.reload()};window.location.href="taooweb://editNoteDetail?status=show&noteId="+e+"&callback="+encodeURIComponent(t)}function setToolbarContent(){var e=function(){location.href="taooweb://closeWebView?goback=true"},t=function(){location.href="taooweb://showSharePanel"},o=function(){alert("收藏")},n=function(){alert("点赞")},i={height:"50.0",bg_color:"#FFFFFF",bg_image:null,alignment:"left",style:{top_separator:{show:!0,height:1,color:"DBDBDB",alpha:1},bottom_separator:{show:!0,height:0,color:"FFFFFF",alpha:1}},buttons:[{type:"button",identifier:"button1",min_width_percentage:"0.15",height_percentage:"0.9",offsetY:"0",title:"",image:"http://resource.thefair.net.cn/touch/thefair/images/back_icon.png",max_image_height:"50.0",bg_color:"#fff",bg_image:null,corner_radius:"4.0",title_color:"#FFFFFF",highlight_title_color:"#FFFFFF",call_back:e.toString(),font_size:"12"},{type:"space",identifier:"space1",width_percentage:"0.05"},{type:"button",identifier:"button2",min_width_percentage:"0.15",height_percentage:"0.9",offsetY:"0",title:"",image:"http://resource.thefair.net.cn/touch/thefair/images/share_icon.png",max_image_height:"50.0",bg_color:"#fff",bg_image:null,corner_radius:"4.0",title_color:"#FFFFFF",highlight_title_color:"#FFFFFF",call_back:t.toString(),font_size:"14"},{type:"button",identifier:"button3",min_width_percentage:"0.15",height_percentage:"0.9",offsetY:"0",title:"",image:"http://resource.thefair.net.cn/touch/thefair/images/collection_icon.png",max_image_height:"50.0",bg_color:"#fff",bg_image:null,corner_radius:"4.0",title_color:"#FFFFFF",highlight_title_color:"#FFFFFF",call_back:o.toString(),font_size:"14"},{type:"button",identifier:"button3",min_width_percentage:"0.25",height_percentage:"0.9",offsetY:"0",title:"1000",image:"http://resource.thefair.net.cn/touch/thefair/images/favorite_icon_btn_active.png",max_image_height:"50.0",bg_color:"#fff",bg_image:null,corner_radius:"4.0",title_color:"#9B9B9B",highlight_title_color:"#FFFFFF",call_back:n.toString(),font_size:"14"},{type:"button",identifier:"button4",min_width_percentage:"0.25",height_percentage:"0.9",offsetY:"0",title:"1000",image:"http://resource.thefair.net.cn/touch/thefair/images/comment_icon.png",max_image_height:"50.0",bg_color:"#fff",bg_image:null,corner_radius:"4.0",title_color:"#9B9B9B",highlight_title_color:"#FFFFFF",call_back:"",font_size:"14"}]},a=encodeURIComponent(JSON.stringify(i));TaooWebView&&TaooWebView.toolbar.setToolbarContent(a),setTimeout(function(){TaooWebView&&TaooWebView.toolbar.setToolbarStatus("show")},20)}function updateToolbarButton(){var e={type:"button",identifier:"button4",min_width_percentage:"0.15",height_percentage:"0.9",offsetY:"0",title:"2000",image:"http://resource.thefair.net.cn/touch/thefair/images/comment_icon.png",max_image_height:"50.0",bg_color:"#fff",bg_image:null,corner_radius:"4.0",title_color:"#9B9B9B",highlight_title_color:"#FFFFFF",call_back:"",font_size:"14"};TaooWebView&&TaooWebView.toolbar.updateToolbarButton("button1",encodeURIComponent(JSON.stringify(e)))}function playVideo(){var e="http://resource.bj.taooo.cc/_assets/activity/201605/04/images/video.mp4";window.location.href="taooweb://presentVideo?url="+encodeURIComponent(e)}$(function(){function e(e,o,n){"browser"!=t&&(window.location.href="taooweb://"+e+"?"+o+"="+n)}var t=Thefair.platform(),o={_Bounce:"false",setBounce:function(t){e("setWebViewBounce","bounce",t),this._Bounce=t},getBounce:function(){return this._Bounce}};o.toolbar={_Status:"show",_Color:"ffffff",_Share:"hidden",_Content:"shareContent",setShare:function(t){e("setToolbarShare","toolbarshare",t),this._Status=t},getShare:function(){return this._Status},setShareContent:function(t){e("setShareContent","content",t),this._Content=t},getShareContent:function(){return this._Content},setToolbarStatus:function(t){e("setToolBarStatus","show",t)},setToolbarContent:function(t){e("setToolBarContent","content",t)},updateToolbarButton:function(e,o){"browser"!=t&&(window.location.href="taooweb://updateToolBarButton?identifier="+e+"&item="+o)}},o.title={_Status:"hidden",_Text:"title",_Color:"ffffff",setStatus:function(t){e("setTitlebarStatus","titlebarstatus",t),this._Status=t},getStatus:function(){return this._Status},setText:function(t){this._Text=t,e("setTitleText","titletext",t)},getText:function(){return this._Text},setColor:function(t){this._Color=t,e("setTitleColor","titlecolor",t)},getColor:function(){return this._Color}},o.spinner={_Status:"hidden",setStatus:function(t){e("setSpinnerStatus","spinnerstatus",t),this._Status=t},getStatus:function(){return this._Status}},o.login={_Callback:function(){location.reload()},setLogin:function(t){e("login","callback",t),this._Callback=t},isLogin:function(t){e("isLogin","callback",t)}},o.close=function(){"browser"!=t&&(window.location.href="taooweb://closeWebView")},o.refresh=function(){"browser"!=t&&(window.location.href="taooweb://refreshWebView")},o.copyToPasteboard={setCopyContent:function(t){e("copyToPasteboard","content",t)}},o.closeFloatWebView=function(){"browser"!=t&&(window.location.href="taooweb://closeFloatWebView")},o.alertToast=function(t,o){var n={title:t,message:o};e("showToast","content",encodeURIComponent(JSON.stringify(n)))},window.TaooWebView=o}),$(function(){$(".ajax-login").click(function(){$.ajax({url:"/api?path=%2Fv1%2Fnote%2Fadd_favorite&params=%7B%22note_id%22%3A+%222618441975556841608%22%7D",type:"get",dataType:"jsonp",success:function(e){alert("success"),0==e.code?successCallback&&successCallback.call(this,e):4e4==e.code?setTimeout(function(){alert(e.result.redirect_url),window.location.assign(e.result.redirect_url)},10):alert(e.message.text),F.hideLoading()},error:function(e){alert(e.responseText),errorCallback&&errorCallback.call(this,data),F.hideLoading()}})})});