define(["view","text!demo/cardtpl.html"],function(t,e){return Jumei.create(t,{onEvent:function(){this.events={}},onCreate:function(){context=this,this.elem.html(e),this.demo(),$("#back").show()},demo:function(){var t=Jumei.getModule("ui.scratchcard");new t({element:".card-area",width:262,height:53,img:"http://p0.jmstatic.com/mobile/act/active301/702luodi/prize-area-un.jpg",backgroundImg:"http://p0.jmstatic.com/mobile/act/active301/702luodi/prize-area.png"}),$("#card .change-btn").on("click",function(){$("#card-text").toggleClass("height0")})},setTitle:function(){this.title("刮刮卡组件")}})});