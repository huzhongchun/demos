Jumei.widget("ui.loadding",{init:function(i){this.options={src:"http://images.jumei.com/mobile/act/image/loadding/8.gif",width:20,height:20,scrollFlag:!0},this.tpl='<div id="loadding-img" style="width:20px;height:20px;z-index: 10000;position: absolute;" class="loadding"><img style="width:100%;display:block;" src="<%=src%>"/></div>',this._super.call(this,i)},_create:function(){var i=Jumei.parseTpl(this.tpl,this.options),t=this;$("#loadding-img").length>0?t.showLoadding():($("#wrapper").append(i),t.showLoadding()),this.show()},showLoadding:function(){this._setBg(),this._setFlag()},_setBg:function(){var i=this;i.windowHeight=$(window).height(),i.windowWidth=document.documentElement&&document.documentElement.clientWidth||document.body.clientWidth||window.innerWidth},_setFlag:function(){var i=this.options,t=$("#loadding-img"),o=0;t.width(i.width),t.height(i.width),this.options.scrollFlag&&(o=this.getScrollTop()/window.Jumei.scale);var d=(this.windowWidth/window.Jumei.scale-t.width())/2,n=(this.windowHeight-t.height())/2+o;d=d,n=n,t.css({left:d+"px",top:n+"px"})},show:function(){$("#loadding-img").show(),this.showLoadding()},close:function(){$("#loadding-img").hide()},getScrollTop:function(){var i=0;return document.documentElement&&document.documentElement.scrollTop?i=document.documentElement.scrollTop:document.body&&(i=document.body.scrollTop),i}});