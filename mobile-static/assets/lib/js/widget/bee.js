!function(e){e.fn.beatBee=function(s){var a=this,o={number:8,speed:150,show:350,successNum:5,success:function(){}},i=e.extend(o,s);i.show=i.show+500;var t=[],n=0,c=[],r='<div class="bee-game-area"><div class="bee-game-score-box"><span class="bee-game-score-finish">0</span><span class="bee-game-score-goal">/10</span></div><div style="clear:both;"></div></div><div class="z301 bee-hack"></div>',v='<div class="honeycomb"><div class="honeycomb-bg"></div><div class="honeycomb-bottom"></div><div class="bee"></div></div>';e(a).html(r);for(var d=0;d<i.number;d++){var m=e(v);e(".bee-game-area").prepend(m);var l=e(m).find(".bee");m.addClass(4>d?"z301":"z300"),t.push(l),c.push(m)}var u=[],h=setInterval(function(){u=[],t.forEach(function(e){e.hasClass("active")||u.push(e)});var s=Math.floor(0+Math.random()*u.length),a=u[s];if(a){var o=e(a[0]);o.removeClass("die"),o.addClass("active"),o.addClass("up"),setTimeout(function(){o.removeClass("up"),setTimeout(function(){o.removeClass("active")},500)},i.show)}},i.speed);e(".honeycomb").on("tap",function(){var s=e(this).find(".bee");if(!e(s).hasClass("die")){var a=e(s).css("-webkit-transform"),o=/\-?[0-9]+\.?[0-9]*/g,t=a.match(o);t[5]<-10&&(e(s)[0].style.webkitTransform=a,e(s).addClass("die"),setTimeout(function(){e(s)[0].style.removeProperty("-webkit-transform"),e(s).removeClass("up"),setTimeout(function(){e(s).removeClass("active")},500)},300),n++,e(".bee-game-score-finish").html(n)),n>9&&setTimeout(function(){i.success(),e(".bee").remove(),clearInterval(h)},100)}})}}(Zepto);