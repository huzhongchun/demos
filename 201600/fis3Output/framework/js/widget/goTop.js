!function(t){var i=function(t){this.settings=$.extend({img:"http://static.bj.taooo.cc/public/img/back_top@2x.png",whereShow:800,bottom:100,left:"",right:20,width:50,height:50,zIndex:2e5},t),this.init()};i.prototype={constructor:i,init:function(){var t=this;if($("#widget-to-top").length<=0){var i="bottom: "+t.settings.bottom+"px;"+(t.settings.left?"left: "+t.settings.left+"px;":"")+(t.settings.right?"right: "+t.settings.right+"px;":""),o='style="background-image: url('+t.settings.img+") !important;background-size: cover ;position: fixed;"+i+";width: "+t.settings.width+"px;height: "+t.settings.height+"px;z-index: "+t.settings.zIndex+';display: none;-webkit-tap-highlight-color: rgba(0,0,0,0);"';$("#scale-wrapper").append('<div id="widget-to-top" '+o+"></div>")}t.initEvent()},initEvent:function(){var i=this,o=this.settings,n=$("#widget-to-top");n.off("click"),n.on("click",function(o){o.preventDefault(),o.stopPropagation();var e=$(t).scrollTop();i.scrollTo(0,e),t.scrollTo(0,0),n.hide()}),$(t).on("scroll",function(){var i=$(t).scrollTop();i>o.whereShow?n.show():n.hide()})},scrollTo:function(i,o){for(var n=500;n>=0;n-=5)!function(){var e=n;setTimeout(function(){0>=e?t.scrollTo(0,i):t.scrollTo(0,o-e/500*(o-i))},e/3)}()}},F.addWidget("goTopObject",i),define(function(){return i})}(window);