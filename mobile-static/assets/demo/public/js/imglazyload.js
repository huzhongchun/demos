define(["view","text!demo/imglazyloadtpl.html"],function(t,e){return Jumei.create(t,{onEvent:function(){this.events={}},onCreate:function(){context=this,this.elem.html(e),this.demo(),$("#back").show()},demo:function(){var t=Jumei.getModule("ui.imglazyload");new t({classSelector:".img-lazy"}),$("#imglazyload .change-btn").on("click",function(){$("#imglazyload-text").toggleClass("height0")})},setTitle:function(){this.title("赖加载组件")}})});