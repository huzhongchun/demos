define(["view","text!demo/carousel3D.html"],function(t,e){return Jumei.create(t,{onEvent:function(){this.iscrollFlag=!1,this.events={"click .li-list":function(){}}},onCreate:function(){context=this;({"static":Jumei.static});this.elem.html(e),this.demo(),$("#back").show()},demo:function(){$("#carousel3d .change-btn").on("click",function(){$("#carousel3d-text").toggleClass("height0")});{var t=Jumei.getModule("ui.carousel3D");new t({id:"carousel3D-boxs",index:2,animateEndCallBack:function(t){console.log(t)}})}},setTitle:function(){this.title("3d轮播组件")}})});