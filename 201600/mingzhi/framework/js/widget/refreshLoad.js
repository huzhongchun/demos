!function(t,n){var i=function(t){this.settings=n.extend({callback:function(){},loadedFlag:!0,triggerLen:50},t),this.init()};i.prototype={constructor:"refreshLoad",init:function(){this.initEvent()},initEvent:function(){var i=this,e=this.settings;n(t).on("scroll",function(){e.loadedFlag&&n(t).scrollTop()>n(document).height()-n(t).height()-e.triggerLen&&(e.loadedFlag=!1,e.callback.call(i))})},changeFlag:function(){var t=this;t.settings.loadedFlag=!0}},F.addWidget("refreshLoad",i)}(window,Zepto);