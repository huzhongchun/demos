define(function(){var i=function(i){this.settings=$.extend({element:"element",width:300,height:200,content:"This is the content!",title:"提示",buttonShowType:2,ok:"确定",cancel:"取消",successCallback:null,type:"",cancelCallback:function(){}},i),this.tpl='<div class="ui-dialog"><div class="ui-dialog-title"><div class="title-txt"><%=title%></div><div class="ui-dialog-close"></div></div><div class="ui-dialog-content"><%=content%></div><% if(buttonShowType == 2){  %><div class="ui-dialog-btn"><div class="ui-dialog-cancel"><%=cancel%></div><div class="ui-dialog-ok"><%=ok%></div></div><% }else if(buttonShowType == 1){ %><div class="ui-dialog-btn"><div class="ui-dialog-ok" style="border-left: none;width: 100%;" ><%=ok%></div></div><% } %></div>',this.bg='<div class="ui-bg"></div>',this.init()};return i.prototype={constructor:i,init:function(){this._appendHtml(),this._bindEvent()},_appendHtml:function(){var i=this,t=$(".ui-bg"),e=$("body"),a=this.parseTpl(this.tpl,this.settings);this.dialog=$(a),$("#scale-wrapper").append(i.dialog),t.length<=0&&e.append(i.bg)},show:function(){var i=$("body").height(),t=$(window).height()*(Thefair.scale?Thefair.scale:1),e=i>t?i:t;$(".ui-bg").css({position:"absolute",height:e+"px",top:"0",left:"0"}),this._culculate(),this._setFlag(),this._animateShow()},_animateShow:function(){var i=$(".ui-bg"),t=this.settings.type;switch(i.show(),i.animate({opacity:.5},500,"ease-out"),t){case"slidedown":this.dialog.show(),this.dialog.css({transform:"translate3d(0,-300px,0)","-webkit-transform":"translate3d(0,-300px,0)"}),this.dialog.animate({transform:"translate3d(0,0,0)","-webkit-transform":"translate3d(0,0,0)",opacity:1},300,"ease");break;case"rotate":this.dialog.show(),this.dialog.wrap('<div class="ui-dialog-wrap"></div>'),this.dialog.css({transform:"rotateY(-390deg)","-webkit-transform":"rotateY(-390deg)"}),this.dialog.animate({transform:"rotateY(0deg)","-webkit-transform":"rotateY(0deg)"},500,"ease");break;case"scale":this.dialog.show(),this.dialog.css({transform:"scale(0)","-webkit-transform":"scale(0)"}),this.dialog.animate({transform:"scale(1)","-webkit-transform":"scale(1)"},200,"ease",function(){});break;case"fadein":this.dialog.show(),this.dialog.css("opacity",0),this.dialog.animate({opacity:1},400,"ease",function(){});break;default:this.dialog.show(),i.show(),i.animate({opacity:.5},500,"ease")}},_bindEvent:function(){var i=this,t=$(".ui-dialog-btn .ui-dialog-cancel,.ui-dialog .ui-dialog-close"),e=$(".ui-dialog .ui-dialog-ok");t&&t.click(function(){return i.hide(),i.settings.cancelCallback(),!1}),e&&e.click(function(){var t=!0;return"function"==typeof i.settings.okCallback&&(t=i.settings.okCallback()),t!==!1&&i.hide(),!0}),$(document).on("touchmove",".ui-dialog,.ui-bg",function(i){i.preventDefault()})},_culculate:function(){var i=this;i.windowHeight=$(window).height(),i.windowWidth=375,i.dialog.show(),i.height=i.dialog.height(),i.dialog.hide()},_setFlag:function(){var i=0,t=0,e=0;this.dialog.width(this.settings.width),i=$(window).scrollTop(),e=(this.windowWidth-this.settings.width)/2,t=(this.windowHeight-this.height)/2+i,this.dialog.css({left:e+"px",top:t+"px"})},hide:function(){$(".ui-bg").hide(),this.dialog.hide()},parseTpl:function(i,t){var e="var __p=[];with(obj||{}){__p.push('"+i.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/<%=([\s\S]+?)%>/g,function(i,t){return"',"+t.replace(/\\'/,"'")+",'"}).replace(/<%([\s\S]+?)%>/g,function(i,t){return"');"+t.replace(/\\'/,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+'\');}return __p.join("");',a=new Function("obj",e);return t?a(t):a}},i});