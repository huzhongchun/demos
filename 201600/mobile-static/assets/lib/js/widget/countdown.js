Jumei.widget("ui.countdown",{init:function(){this.options={endTime:"",isShow:!1,callback:function(){}},this.tpl='<span class="count-day"></span><span class="count-hour"></span><span class="count-minute"></span><span class="count-second"></span>',this.overTpl='<span class="count-day"><i class="digit">0</i><i class="digit">0</i></span><span class="count-hour"><i class="digit">0</i><i class="digit">0</i></span><span class="count-minute"><i class="digit">0</i><i class="digit">0</i></span><span class="count-second"><i class="digit">0</i><i class="digit">0</i></span>'},_create:function(){$(this.element).html(this.tpl),$(this.element).addClass("countdown"),this.createTime()},createTime:function(){function i(i,s,t,a){this.elem=i,this.endTime=s,this.isShow=t,this.callback=a||function(){},this.init()}var s=this;i.prototype={init:function(){function i(){function i(i,s){var t="";if(i>0)if(i%10==9){var a=parseInt(i/10),n=parseInt(i%10);t='<i class="digit-wrap"><i class="digit">'+a+'</i><i class="digit">'+(a+1)+'</i></i> <i class="digit-wrap"><i class="digit">'+n+'</i><i class="digit">'+(n+1==10?0:n+1)+"</i></i>",s.html(t),s.find(".digit-wrap").animate({top:"0px"},500,"ease-out")}else{var a=parseInt(i/10),n=parseInt(i%10);t='<i class="digit">'+a+'</i><i class="digit-wrap"><i class="digit">'+n+'</i><i class="digit">'+(n+1==10?0:n+1)+"</i></i>",s.html(t),s.find(".digit-wrap").animate({top:"0px"},500,"ease-out")}else{var a=parseInt(i/10),n=parseInt(i%10);t='<i class="digit">'+a+'</i> <i class="digit-wrap"><i class="digit">'+n+'</i><i class="digit">'+(n+1==10?0:n+1)+"</i></i>",s.html(t),s.find(".digit-wrap").animate({top:"0px"},500,"ease-out")}}function g(i){var s="";if(i>0)if(i%10==9){var t=parseInt(i/10),a=parseInt(i%10);s='<i class="digit-wrap"><i class="digit">'+t+'</i><i class="digit">'+(t+1)+'</i></i> <i class="digit-wrap"><i class="digit">'+a+'</i><i class="digit">'+(a+1==10?0:a+1)+"</i></i>",$(".count-second").html(s),$(".count-second .digit-wrap").animate({top:"0px"},500,"ease-out")}else{var t=parseInt(i/10),a=parseInt(i%10);s='<i class="digit">'+t+'</i><i class="digit-wrap"><i class="digit">'+a+'</i><i class="digit">'+(a+1==10?0:a+1)+"</i></i>",$(".count-second").html(s),$(".count-second .digit-wrap").animate({top:"0px"},500,"ease-out")}else{var t=parseInt(i/10),a=parseInt(i%10);s='<i class="digit-wrap"><i class="digit">'+t+'</i><i class="digit">'+(t+1)+'</i></i> <i class="digit-wrap"><i class="digit">'+a+'</i><i class="digit">'+(a+1==10?0:a+1)+"</i></i>",$(".count-second").html(s),$(".count-second .digit-wrap").animate({top:"0px"},500,"ease-out")}}var m=new Date(t.endTime)-new Date;return 0>=m?(t.callback(),clearInterval(t.timer),s.options.isShow&&$(s.element).html(s.overTpl),!1):(a=m/1e3,n=m/1e3/60,e=m/1e3/60/60,void(s.options.isShow&&((l!=parseInt(e/24,10)||null==l)&&(l=parseInt(e/24,10),i(l,d)),(c!=parseInt(e%24,10)||null==c)&&(c=parseInt(e%24,10),i(c,r)),(o!=parseInt(n%60,10)||null==o)&&(o=parseInt(n%60,10),i(o,u)),(p!=parseInt(a%60,10)||0==parseInt(a%60,10)||null==p)&&(p=parseInt(a%60,10),g(p)))))}var t=this,a=0,n=0,e=0,l=null,c=null,o=null,p=null,d=$(s.element).find(".count-day"),r=$(s.element).find(".count-hour"),u=$(s.element).find(".count-minute"),t=this;t.timer=setInterval(function(){i()},1e3)}},new i($(s.element),s.options.endTime,s.options.isShow,s.options.callback)}});