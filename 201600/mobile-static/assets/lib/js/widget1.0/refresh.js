Jumei.widget("ui.refresh",{init:function(i){this.options={callback:function(){},flag:!0},this._super.call(this,i)},_create:function(){var i=this;$(window).on("scroll",function(){i.options.flag&&$(window).scrollTop()>$("#wrapper").height()-$(window).height()-10&&(i.options.flag=!1,i.options.callback.call(i))})},changeFlag:function(){var i=this;i.options.flag=!0}});