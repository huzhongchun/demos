Jumei.widget("ui.gotop",{init:function(o){this.options={img:"http://ms0.jmstatic.com/beauty/image/back_top@2x.png"},this._super.call(this,o)},_create:function(){var o=this;$("#toTop").length<=0&&$("#wrapper").append('<div id="toTop" style="background: url('+o.options.img+') left center no-repeat !important;background-size: 44px 44px !important;position: fixed;bottom: 20px;width: 45px;height: 45px;z-index: 200000;right: 10px;display: none;"></div>'),o.initEvent()},initEvent:function(){var o=$("#toTop"),i=this;o.off("click"),o.on("click",function(){var t=$(window).scrollTop();i.scrollTo(0,t),o.hide()}),$(window).on("scroll",function(){var i=$(window).scrollTop();i>100?o.show():o.hide()})},scrollTo:function(o,i){for(var t=500;t>=0;t-=5)!function(){var n=t;setTimeout(function(){0>=n?window.scrollTo(0,o):window.scrollTo(0,i-n/500*(i-o))},n/3)}()}});