!function(t){var e=function(t,e){var o=this;e=e||{},o.data={id:t,dom:document.getElementById(t),index:e.index||0,perspective:e.perspective||600,rotateY:e.rotateY||75,transitionTime:e.transitionTime||.8,isShowDots:"undefined"==typeof e.isShowDots?!0:e.isShowDots,isPlayAuto:e.isPlayAuto||!1,autoPlayDirection:e.autoPlayDirection||"right",autoPlayChangeTime:e.autoPlayChangeTime||3e3,animateEndCallBack:e.animateEndCallBack||null,prev:e.prev,next:e.next},o.Init()};e.prototype={flag:!1,Init:function(){var t=this;o=t.data,o.translateX=parseInt(o.dom.clientWidth*(Math.cos(o.rotateY*Math.PI/180)+.5)),o.translateZ=parseInt(o.dom.clientWidth*Math.sin(o.rotateY*Math.PI/180)),o.Str_change_left_l="-webkit-transform: translateX(-"+(o.translateX+50)+"px) translateZ(-"+(o.translateZ+50)+"px) rotateY("+o.rotateY+"deg);opacity:0;",o.Str_change_left="-webkit-transform: translateX(-"+o.translateX+"px) translateZ(-"+o.translateZ+"px) rotateY("+o.rotateY+"deg);opacity:0.5;",o.Str_change_center="-webkit-transform: translateX(0px) translateZ(0px) rotateY(0deg);opacity:1;",o.Str_change_right="-webkit-transform: translateX("+o.translateX+"px) translateZ(-"+o.translateZ+"px) rotateY(-"+o.rotateY+"deg);opacity:0.5;",o.Str_change_right_r="-webkit-transform: translateX("+(o.translateX+50)+"px) translateZ(-"+(o.translateZ+50)+"px) rotateY(-"+o.rotateY+"deg);opacity:0;",o.dom.style.cssText+="-webkit-transform-style: preserve-3d;-webkit-perspective: "+o.perspective+"px;position:relative";var e=o.dom,a=e.children;if(o.dots_len=a.length,o.dots_len<=1)return!1;if(o.dots_len<5){for(var n=0;n<o.dots_len;n++){var i=a[n].cloneNode(!0);e.appendChild(i)}o.isCloneNode=!0}if(o.isShowDots){var s=document.createElement("div");s.id="carousel-dots-area",e.parentNode.appendChild(s);for(var n=0;n<o.dots_len;n++){var r=document.createElement("b");s.appendChild(r)}o.dots=document.getElementById("carousel-dots-area").children,t.dotsChange(o.index)}o.childs=e.children;for(var n=0;n<o.childs.length;n++)o.childs[n].style.cssText+="position: absolute;opacity:0;-webkit-transition: -webkit-transform "+o.transitionTime+"s ease 0s,opacity "+o.transitionTime+"s ease 0s;";o.maxNum=o.childs.length-1;var l=o.index-1;l=0>l?o.maxNum:l,o.childs[l].style.cssText+=o.Str_change_left;var d=l-1;d=0>d?o.maxNum:d,o.childs[d].style.cssText+=o.Str_change_left_l,o.childs[o.index].style.cssText+=o.Str_change_center;var c=o.index+1;c=c>o.maxNum?0:c,o.childs[c].style.cssText+=o.Str_change_right;var h=c+1;h=h>o.maxNum?0:h,o.childs[h].style.cssText+=o.Str_change_right_r,t.initEventListener(),o.isPlayAuto&&setInterval(function(){"left"==o.autoPlayDirection?t.moveLeft(o.index):t.moveRight(o.index)},o.autoPlayChangeTime)},moveRight:function(t){var e=this;o=e.data;var a=t,n=a-1;n=0>n?o.maxNum:n;var i=a+1;i=i>o.maxNum?0:i;var s=i+1;s=s>o.maxNum?0:s;var r=s+1;r=r>o.maxNum?0:r;var l=o.childs[a],d=o.childs[n],c=o.childs[i],h=o.childs[s],m=o.childs[r];d.style.cssText+=o.Str_change_left_l,l.style.cssText+=o.Str_change_left,c.style.cssText+=o.Str_change_center,h.style.cssText+=o.Str_change_right,m.style.cssText+=o.Str_change_right_r,o.index=i,o.isShowDots&&e.dotsChange(o.index);e.getNaturalIndex();e.moveCalllBack(o.index)},moveLeft:function(t){var e=this;o=e.data;var a=t,n=a+1;n=n>o.maxNum?0:n;var i=a-1;i=0>i?o.maxNum:i;var s=i-1;s=0>s?o.maxNum:s;var r=s-1;r=0>r?o.maxNum:r;var l=o.childs[a],d=o.childs[n],c=o.childs[i],h=o.childs[s],m=o.childs[r];d.style.cssText+=o.Str_change_right_r,l.style.cssText+=o.Str_change_right,c.style.cssText+=o.Str_change_center,h.style.cssText+=o.Str_change_left,m.style.cssText+=o.Str_change_left_l,o.index=i,o.isShowDots&&e.dotsChange(o.index);e.getNaturalIndex();e.moveCalllBack.call(e,o.index)},initEventListener:function(){var t=this;o=t.data,o.next&&document.getElementById(o.next).addEventListener("click",function(){t.moveRight(o.index)}),o.prev&&document.getElementById(o.prev).addEventListener("click",function(){t.moveLeft(o.index)});var e=function(){o.X<-20&&t.moveRight(o.index),o.X>20&&t.moveLeft(o.index)};o.dom.addEventListener("touchstart",function(t){o.pageX=t.touches[0].pageX,o.pageY=t.touches[0].pageY,o.X=0}),o.dom.addEventListener("touchmove",function(t){o.X=t.touches[0].pageX-o.pageX}),o.dom.addEventListener("touchend",e),o.dom.addEventListener("touchcancel",e);for(var a=o.dom.children,n=0;n<a.length;n++)a[n].addEventListener("webkitTransitionEnd",function(){t.webkitTransitionEndCallBack.call(t)},!1)},dotsChange:function(t){var e=this;o=e.data;var a=document.getElementById("carousel-dots-area");a.innerHTML="";for(var n=0;n<o.dots_len;n++){var i=document.createElement("b");a.appendChild(i)}o.dots[t%o.dots_len].id="carousel-selected"},getNaturalIndex:function(){var t=this;return o=t.data,o.isCloneNode?o.index%2:o.index},moveCalllBack:function(){this.flag=!0},webkitTransitionEndCallBack:function(){1==this.flag&&(this.flag=!1,index=this.getNaturalIndex(),this.data.animateEndCallBack(index))}},t.carousel=e}(window);