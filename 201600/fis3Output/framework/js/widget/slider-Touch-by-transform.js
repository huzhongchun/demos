!function(t,e){var i=function(t,i){var n=this;i=i||{},n.data={dom:document.getElementById(t.replace(/^#/,"")),index:i.index||0,imgInit:i.imgInit||2,autoPlay:i.autoPlay||!1,switchTime:i.switchTime||3e3,animateTime:i.animateTime||400,dotsClass:i.dotsClass||"slider-dots",dotsSelectedId:i.dotsSelectedId||"slider-dot-select",showDot:i.showDot!==e?i.showDot:!0,slideEnd:i.slideEnd||null,slideStart:i.slideStart||null,_needPlay:!0,_direction:i.direction!==e?i.direction:1,_jumpFlagOrigin:!1},n.init(),n.initEvent(),n.start(),n.data.dom.style.visibility="visible"};i.prototype={constructor:i,moveFlag:!1,init:function(){var t=this,e=t.data;e.moveDirection=1==e._direction?"right":"left",t.doubleChildren(),e.dom.className+=" slider";for(var i,n,a=e.dom.offsetWidth,d=(e.dom.offsetHeight,e.dom.children),s=document.createElement("div"),r=s.cloneNode(),o=document.createElement("b"),l=[],m=0,c=d.length;m<d.length;m++)i=d[m].cloneNode(!0),i.className+=" slider-item",i.style.cssText+="width:"+a+"px",s.appendChild(i),s.setAttribute("class","slide-wrapper clearfloat"),n=i.getElementsByTagName("img")[0],m<e.imgInit?n&&!n.src&&n.getAttribute("lazyload")&&(n.src=n.getAttribute("lazyload")):l.push(n);for(var h=0;h<=e.Maxlen;h++)r.appendChild(o.cloneNode());s.style.width=a*c+"px",s.style.cssText+="position:relative;transform:translate3d(-"+e.index*a+"px,0,0);-webkit-transform:translate3d(-"+e.index*a+"px,0,0)",r.className=e.dotsClass,e.showDot||(r.style.display="none"),$(e.dom).html("").append($(s)),e.dom.appendChild(r),e.wheel=s,e.items=s.children,e.length=e.items.length,1==e.length&&(r.style.display="none"),e.dots=r.children,e.dots.length>0&&(e.dots[e.index-e.Prevlen-1].className=e.dotsSelectedId),e.width=a,e.lazyImgs=l},doubleChildren:function(){function t(){return n.dom.children}var e,i=this,n=i.data,a=n.dom.children.length-1,d=parseInt(a/2);i.data.Maxlen=a,i.data.Prevlen=d,i.data.Lastlen=a+d+1,i.data.index=d+1;for(var s=t(),r=0;d>r;r++)e=s[r].cloneNode(!0),n.dom.appendChild(e);for(var o=a;o>=a-d;o--)e=s[o].cloneNode(!0),n.dom.insertBefore(e,n.dom.firstChild)},changeCurentPosition:function(){var t=this,e=t.data;e.index<=e.Prevlen&&"right"==e.moveDirection?(e.index=e.index+e.Maxlen+1,e.wheel.style.cssText+="-webkit-transition: 0ms;-moz-transition: 0ms;-ms-transition: 0ms;position:relative;transform:translate3d(-"+e.index*e.width+"px,0,0);-webkit-transform:translate3d(-"+e.index*e.width+"px,0,0)"):e.index>=e.Lastlen+1&&"left"==e.moveDirection&&(e.index=e.index-(e.Maxlen+1),e.wheel.style.cssText+="-webkit-transition: 0ms;-moz-transition: 0ms;-ms-transition: 0ms;position:relative;transform:translate3d(-"+e.index*e.width+"px,0,0);-webkit-transform:translate3d(-"+e.index*e.width+"px,0,0)")},initEvent:function(){function t(){e.moveFlag=!1,i.curIndex-i.index<0?i.moveDirection="left":i.curIndex-i.index>0&&(i.moveDirection="right"),e.changeCurentPosition(),i.showDot&&(i.dom.querySelector("."+i.dotsSelectedId).setAttribute("class",""),i.dots[i.index-i.Prevlen-1].className=i.dotsSelectedId),e._setTimeout(),e.data.slideEnd&&e.data.slideEnd.apply(e)}var e=this,i=e.data,n=i.wheel;n.addEventListener||(n.addEventListener=n.attachEvent),n.addEventListener("touchstart",function(t){i.pageX=t.touches[0].pageX,i.pageY=t.touches[0].pageY,i.S=!1,i.T=!1,i.X=0,i.wheel.style.webkitTransitionDuration="0ms",i.curIndex=i.index}),n.addEventListener("touchmove",function(t){e._closeCallFlag();var n=i.X=t.touches[0].pageX-i.pageX;if(!i.T){var a=Math.abs(n)<Math.abs(t.touches[0].pageY-i.pageY);a||clearTimeout(i.play),i.T=!0,i.S=a}i.S||(t.stopPropagation(),t.preventDefault(),e.moveFlag=!0,0===e.data.index||e.data.index==e.data.length-1?Math.abs(n)<100&&(i.wheel.style.transform="translate3d("+(n-i.index*i.width)+"px,0,0);-webkit-translate3d("+(n-i.index*i.width)+"px,0,0)"):i.wheel.style.transform="translate3d("+(n-i.index*i.width)+"px,0,0);-webkit-translate3d("+(n-i.index*i.width)+"px,0,0)")});var a=function(){i.S||e._slide(i.index+(i.X<=-20?Math.ceil(-i.X/i.width):i.X>20?-Math.ceil(i.X/i.width):0))};n.addEventListener("touchend",a),n.addEventListener("touchcancel",a),n.addEventListener("webkitTransitionEnd",t),n.addEventListener("transitionend",t)},_slide:function(t,e,i){{var n=this,a=n.data;a.length}return n._move(t,i),n.data.slideStart&&n.data.slideStart.apply(n),n},_move:function(t,e){var i=this.data,n=this,a=i.index;if(i.lazyImgs.length){var d=i.items[t].getElementsByTagName("img")[0];d&&!d.src&&(d.src=d.getAttribute("lazyload"))}i.index=t,1==e?(i.wheel.style.removeProperty("-webkit-transition"),i.wheel.style.cssText+="position:relative;transform:translate3d(-"+t*i.width+"px,0,0);-webkit-transform:translate3d(-"+t*i.width+"px,0,0)",document.getElementById(i.dotsSelectedId).id="",i.dots[2].id=i.dotsSelectedId):-1==t||t==i.length?i.wheel.style.cssText+="-webkit-transition:"+i.animateTime+"ms;-moz-transition:"+i.animateTime+"ms;-ms-transition:"+i.animateTime+"ms;position:relative;transform:translate3d(-"+(t*i.width-100)+"px,0,0);-webkit-transform:translate3d(-"+(t*i.width-100)+"px,0,0)":(i.wheel.style.cssText+="-webkit-transition:"+i.animateTime+"ms;-moz-transition:"+i.animateTime+"ms;-ms-transition:"+i.animateTime+"ms;position:relative;transform:translate3d(-"+t*i.width+"px,0,0);-webkit-transform:translate3d(-"+t*i.width+"px,0,0)",3==a&&2==e&&i.slideEnd&&i.slideEnd.apply(n))},_closeCallFlag:function(){this.data._jumpFlagOrigin=!1},_openCallFlag:function(){this.data._jumpFlagOrigin=!0},_setTimeout:function(){var t=this,e=t.data;return e._needPlay&&e.autoPlay?(clearTimeout(e.play),e.play=setTimeout(function(){e.curIndex=e.index,t._slide.call(t,e.index+e._direction,!0)},e.switchTime),t):t},_resize:function(){var t=this,e=t.data,i=e.dom.offsetWidth,n=e.items,a=document.createElement("b");e.length=$("#slider .slider-item").length;var d=e.length;if(!i)return t;e.width=i,clearTimeout(e.play);var s=document.querySelector(".slider-dots");s.innerHTML="";for(var r=0;d>r;r++)n[r].style.cssText+="width:"+i+"px;",s.appendChild(a.cloneNode());return e.dots=s.children,e.dots[e.index].id=e.dotsSelectedId,e.wheel.style.removeProperty("-webkit-transition"),e.wheel.style.cssText+="width:"+i*d+"px;position:relative;transform:translate3d(-"+e.index*i+"px,0,0);-webkit-transform:translate3d(-"+e.index*i+"px,0,0)",e._direction=1,$(".slider-dots").html(),t._setTimeout(),t},start:function(){var t=this;return t.data._needPlay=!0,t._setTimeout(),t},stop:function(){var t=this;return clearTimeout(t.data.play),t.data._needPlay=!1,t},prev:function(){var t=this,e=t.data;return e.curIndex=e.index,this._slide(this.data.index-1,!1)},next:function(){var t=this,e=t.data;return e.curIndex=e.index,this._slide(this.data.index+1,!1)},moveTo:function(t){var e=this,i=e.data,n=t+i.Prevlen+1;return this._slide(n,!1)},refresh:function(){this.init(),this.initEvent()}},F.addWidget("SliderObject",i),define(function(){return i})}(window);