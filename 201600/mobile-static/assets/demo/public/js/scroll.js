define(["view","text!demo/inertiaScroll.html"],function(t,l){return Jumei.create(t,{onEvent:function(){this.iscrollFlag=!1,this.events={"click .li-list":function(){}}},onCreate:function(){context=this;({"static":Jumei.static});this.elem.html(l),this.demo(),$("#back").show()},demo:function(){$("#scroll .change-btn").on("click",function(){$("#scroll-text").toggleClass("height0")});{var t=Jumei.getModule("ui.inertiaScroll");new t({id:"boxs",pullDownCallback:function(){console.log("aaaa")},pullUpCallback:function(){console.log("bbb")},startPullDownCallback:function(){console.log("cccc")}}),new t({id:"boxs-content"})}},setTitle:function(){this.title("惯性滚动组件")}})});