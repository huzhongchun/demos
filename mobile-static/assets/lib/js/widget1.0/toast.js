Jumei.widget("ui.toast",{init:function(t){this.options={animateTime:1,animateCurves:"ease",stopTime:2,moveLength:-10,animateEndCallback:function(){}},this._super.call(this,t)},_create:function(){var t=this,i=this.options;if(t.transformEndFlag=!0,t.order=0,$("#toast-boxs").length>0)return console.log("id名‘toast-boxs’命名冲突！"),!1;var e='<span id="toast-boxs" style="transition: -webkit-transform '+i.animateTime+"s "+i.animateCurves+" 0s , opacity "+i.animateTime+"s "+i.animateCurves+" 0s;-webkit-transition: -webkit-transform "+i.animateTime+"s "+i.animateCurves+" 0s , opacity "+i.animateTime+"s "+i.animateCurves+' 0s;opacity:0;visibility: hidden;position:fixed"></span>';$("#wrapper").append(e),t.dom=$("#toast-boxs"),t.dom.on("webkitTransitionEnd",function(i){"opacity"==i.propertyName&&(t.order++,2==t.order&&(t.transformEndFlag=!0,t.dom.css({visibility:"hidden"}),t.order=0,t.animateEndCallback()))})},show:function(t,i,e){var n=this,a=this.options;if(n.transformEndFlag){n.dom.html(t);var o=$(window).height(),s=$(window).width(),r=n.dom.height(),m=n.dom.width();n.centerTop=(o-r)/2,n.centerLeft=(s-m)/2;var d="undefined"!=typeof i?i:a.bottom,p="undefined"!=typeof e?e:a.right;n.dom.css({bottom:("undefined"!=typeof d?d:n.centerTop)+"px",right:("undefined"!=typeof p?p:n.centerLeft)+"px"}),n.dom.css({opacity:1,"z-index":111111,visibility:"visible","-webkit-transform":"translate(0,"+a.moveLength+"px)",transform:"translate(0,"+a.moveLength+"px)"}),setTimeout(function(){n.dom.css({opacity:0,"z-index":0,"-webkit-transform":"translate(0,0)",transform:"translate(0,0)"})},1e3*a.stopTime)}n.transformEndFlag=!1},animateEndCallback:function(){var t=this,i=this.options;i.animateEndCallback(t)}});