Jumei.widget("ui.uprotate",{init:function(){this.options={index:0,showDot:!0}},_create:function(){var e=$(window).width(),t=$(window).height(),i=$(this.element),n=i.children();i.width(e),i.height(t),n.height(t),n.each(function(e){$(this).css({position:"absolute",width:"100%","z-index":n.length-e})}),this.options.windowHeight=t;var s=document.createElement("div");s.className="slider-dots";for(var a=document.createElement("b"),d=0;d<n.length;d++)s.appendChild(a.cloneNode());var o=s.cloneNode();o.className="slider-dots-wrapper",o.appendChild(s),$("#slider-ul").after(o);var r=this.options;r.dot=s,r.index=r.index||0,r.dots=s.children,r.dots[r.index].id="slider-dot-select",this.initEvent()},initEvent:function(){var e=this.options,t=this,i=e.wheel=this.element;e.height=$(window).height(),e.length=$(i).children().length;var n=e.childrenArr=i.querySelectorAll("li");n[e.index].style.display="block",i.addEventListener("touchstart",function(t){e.pageX=t.touches[0].pageX,e.pageY=t.touches[0].pageY,e.S=!1,e.T=!1,e.X=0,e.Y=0}),i.addEventListener("touchmove",function(t){var i=e.X=t.touches[0].pageX-e.pageX,s=Math.abs(i);if(!e.T){var a=Math.abs(i)<Math.abs(t.touches[0].pageX-e.pageX);a||clearTimeout(e.play),e.T=!0,e.S=a}e.S||(t.stopPropagation(),t.preventDefault(),Math.abs(i)<1e3&&(i>0&&e.index>0?(e.index-1>=0&&(n[e.index-1].style.display="block",n[e.index-1].style.webkitTransitionDuration="0ms",n[e.index-1].style.webkitTransform="translate3d(-"+(388-s/320*388)+"px,-"+(50-s/320*50)+"px,0px) rotate("+(15-s/320*15)+"deg)"),e.index+1<=e.length-1&&(n[e.index+1].style.display="none"),n[e.index].style.webkitTransitionDuration="0ms",n[e.index].style.webkitTransform="translate3d("+s/320*388+"px,-"+s/320*50+"px,0px) rotate(-"+s/320*15+"deg)"):0>i&&e.index<e.length-1&&(e.index-1>=0&&(n[e.index-1].style.display="none"),e.index+1<=e.length-1&&(n[e.index+1].style.display="block",n[e.index+1].style.webkitTransitionDuration="0ms",n[e.index+1].style.webkitTransform="translate3d("+(388-s/320*388)+"px,-"+(50-s/320*50)+"px,0px) rotate(-"+(15-s/320*15)+"deg)"),n[e.index].style.webkitTransitionDuration="0ms",n[e.index].style.webkitTransform="translate3d(-"+s/320*388+"px,-"+s/320*50+"px,0px) rotate("+s/320*15+"deg)")))});var s=function(){e.S||t.slide(n[e.index],e.index+(e.X<=-20?Math.ceil(-e.X/e.height):e.X>20?-Math.ceil(e.X/e.height):0))};i.addEventListener("touchend",s),i.addEventListener("touchcancel",s);for(var a=0;a<n.length;a++)n[a].addEventListener("webkitTransitionEnd",function(){n[e.index].style.display="block",e.showDot&&(document.getElementById("slider-dot-select").id="",e.dots[e.index].id="slider-dot-select")})},slide:function(e,t){var i=this.options,n=this,s=i.length;e>-1&&s>e?n.move(e):e>=s?(n.move(s-(t?2:1)),i._direction=-1):(n.move(t?1:0),i._direction=1)},move:function(){var e=this.options,t=e.childrenArr,i=e.index;e.X<0&&i!=e.length-1?e.X<-20?(t[e.index].style.webkitTransitionDuration="400ms",t[e.index].style.webkitTransform="translate3d(-388px,-50px,0px) rotate(15deg)",e.index+=e.X>0?-1:1,t[e.index].style.webkitTransitionDuration="400ms",t[e.index].style.webkitTransform="translate3d(0px,0px,0px) rotate(0deg)"):(t[e.index].style.webkitTransitionDuration="400ms",t[e.index].style.webkitTransform="translate3d(0,0,0px) rotate(0)",i+=e.X>0?-1:1,t[i].style.webkitTransitionDuration="400ms",t[i].style.webkitTransform="translate3d(388px,-50px,0px) rotate(-15deg)"):e.X>0&&0!=i&&(e.X>20?(t[e.index].style.webkitTransitionDuration="400ms",t[e.index].style.webkitTransform="translate3d(388px,-50px,0px) rotate(-15deg)",e.index+=e.X>0?-1:1,t[e.index].style.webkitTransitionDuration="400ms",t[e.index].style.webkitTransform="translate3d(0px,0px,0px) rotate(0deg)"):(t[e.index].style.webkitTransitionDuration="400ms",t[e.index].style.webkitTransform="translate3d(0,0px,0px) rotate(0deg)",i+=e.X>0?-1:1,t[i].style.webkitTransitionDuration="400ms",t[i].style.webkitTransform="translate3d(-388px,-50px,0px) rotate(15deg)"))}});