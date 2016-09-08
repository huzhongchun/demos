require(["book/js/public","widget/dialog","book/js/china","echarts"],function(t,e,s,n){function a(t){function e(t){var e=t.map(function(t){return{name:t[1].name,value:l[t[1].name].concat([t[1].value])}});return e.push({name:"北京市",value:[116.3264,39.9756,20]}),e}function s(t){for(var e=0;e<t.length;e++)for(var s=0;s<t.length;s++){var n=t[e]&&t[e].name?t[e].name:"null1",a=t[s]&&t[s].name?t[s].name:"null2";n==a&&e!=s&&t.splice(s,1)}return t}var n=JSON.parse($("#drift_data").val()),a=JSON.parse($("#city_data").val()),o=document.getElementById("map-container"),i=t.init(o);option=null;for(var l=a,r=[],c=0;c<n.length;c++)r.push(0==c?[{name:"北京市"},{name:n[c][0].name,value:25}]:[{name:n[c-1][0].name,value:25},{name:n[c][0].name,value:25}]);var d=function(t){for(var e=t.length,s=[{fromName:"北京市",toName:t[e-1][0].name,coords:[[116.3264,39.9756]]}],n=e-1;n>=0;n--){var a=t[n];s[0].coords.push(l[a[0].name])}return s};console.log(s(e(r)));var m=[];m.push({name:" Top10",type:"lines",zlevel:1,polyline:!0,effect:{show:!0,period:6,trailLength:.7,color:"#fff",symbolSize:3},lineStyle:{normal:{color:"#FFF100",width:0,curveness:.2}},data:d(n)},{name:" Top10",type:"scatter",coordinateSystem:"geo",zlevel:2,rippleEffect:{brushType:"stroke"},label:{normal:{show:!0,position:"right",formatter:"{b}",textStyle:{color:"#fff"}}},symbolSize:function(t){return t[2]/8},itemStyle:{normal:{color:"#FFF100"}},data:s(e(r))}),option={backgroundColor:"#404a59",title:{text:"",subtext:"",left:"center",textStyle:{color:"#fff"}},tooltip:{trigger:"item",show:!1},legend:{orient:"vertical",top:"bottom",left:"right",data:["北京 Top10","上海 Top10","广州 Top10"],textStyle:{color:"#fff"},selectedMode:"single",show:!1},geo:{map:"china",label:{emphasis:{show:!1}},roam:!0,zoom:1.2,itemStyle:{normal:{areaColor:"#323c48",borderColor:"#404a59"},emphasis:{areaColor:"#2a333d"}}},series:m},option&&"object"==typeof option&&i.setOption(option,!0)}var o=t,i=e;o.setWxShareContent(),s(n),a(n),$(".user-comment-box .comment-text").each(function(){var t=this,e=$(this).html().replace(/[\n]/g,"<br>");$(this).data("content_original",e),$(".hidden-box .desc-text-2").html($(this).html()),$(".hidden-box").height()>150?($(this).subStr(165),setTimeout(function(){$(t).data("content_short",$(t).html())},30),$(this).parent().find(".check-more").css("visibility","visible")):$(this).parent().find(".check-more").hide(),$(this).removeClass("original")}),$(".content-container").on("click",".check-more",function(){var t=$(this).parent().find(".comment-text");t.data().original?(t.data("original",!1),t.html(t.data().content_short),$(this).text("更多")):(t.data("original",!0),t.html(t.data().content_original),$(this).text("收起"))});var l=!1;l=$(".set-status").length>0&&"yes"==$(".set-status").val()?!0:!1,o.settingDialog.init({autoShow:l?!1:!0});var r=$(".self-set-btn").data()?$(".self-set-btn").data():{},c={wechat:{status:r.status?r.status:"no",id:r.wechat},sms:{status:r.sms_status?r.sms_status:"no"}};$(".self-set-btn").on("click",function(t){t.preventDefault(),l?o.settingDialog.show(c):o.settingDialog.show()}),$(".set-dialog-bg").on("click",function(){l&&o.settingDialog.hide()});var d=$(".self-wechat").val().trim(),m='<div class="send-sms-box sms-box-1"><div class="send-sms-box-title">TA 的微信号没有公开。你若希望认识他，我们可将你的微信号，通过短信主动发给 TA。（每人每天可发给三位用户）</div><div class="send-sms-box-content">微信号: '+d+'</div><div class="send-sms-box-btns"><span class="sms-btn-item send-btn">发送</span><span class="sms-btn-item cancle-btn">取消</span></div></div>',h='<div class="send-sms-box sms-box-2"><div class="send-sms-box-title">TA 的微信号没有公开。你若希望认识他，我们可将你的微信号，通过短信主动发给 TA。（每人每天可发给三位用户）</div><div class="send-sms-box-content"><span>微信号: </span><input class="input-wechat" type="text"></div><div class="send-sms-box-btns"><span class="sms-btn-item send-btn">发送</span><span class="sms-btn-item cancle-btn">取消</span></div></div>',u='<div class="send-sms-box sms-box-3"><div class="send-sms-box-content">对方设置不接收书友短信</div><div class="send-sms-box-btns"><span class="sms-btn-item close-btn">关闭</span></div></div>',p=new i({content:m,type:"slidedown",width:310}),b=new i({content:h,type:"slidedown",width:310}),v=new i({content:u,type:"slidedown",width:310});$(".cancle-btn").on("click",function(){$(this).parents(".ui-dialog").hide(),$(".ui-bg").hide()}),$(".close-btn").on("click",function(){$(this).parents(".ui-dialog").hide(),$(".ui-bg").hide()});var f="";$(".send-wechat-btn").on("click",function(){var t=$(this).data().sms_status,e=$(this).data().order_id;"yes"==t?(f=e,d?p.show():b.show()):v.show()}),$(".sms-box-2 .send-btn").on("click",function(){var t=$(".sms-box-2 .input-wechat").val().trim();return t?void $.ajax({url:"/book/sms/send_wechat",type:"post",data:{wechat:t,order_id:f,type:"drift"},success:function(t){0==t.code?(alert("发送成功!"),b.hide()):alert(t.message.text)},error:function(t){var e=JSON.parse(t.responseText);alert(e.message.text)}}):(alert("请输入微信号!"),!1)}),$(".sms-box-1 .send-btn").on("click",function(){$.ajax({url:"/book/sms/send_wechat",type:"post",data:{wechat:d,order_id:f,type:"drift"},success:function(t){0==t.code?(alert("发送成功!"),p.hide()):alert(t.message.text)},error:function(t){var e=JSON.parse(t.responseText);alert(e.message.text)}})})});