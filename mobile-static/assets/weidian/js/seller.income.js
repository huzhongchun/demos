$(function(){var t=Jumei.addModule("weidian",{init:function(){var t=null,i=1;$(document).on("touchstart",function(){t=$(window).scrollTop()}),$(window).scroll(function(){var e=$(window).scrollTop();e>t?1==i&&setTimeout(function(){$("#bottom-nav").addClass("fixedhide"),i=0},100):0==i&&setTimeout(function(){$("#bottom-nav").removeClass("fixedhide"),i=1},100)}),this.getNeedModule(),this.initEventListener()},getNeedModule:function(){var t=this,i=Jumei.getModule("ui.dialog");t.dialogObj=new i({title:"提示",btn:1,ok:"我知道了",content:'<div class="cash-tips">累计收入包含冻结中的佣金。冻结的佣金将在自售出商品发货日起的35天后进行解冻。解冻后的金额将自动打入您的聚美余额。</div>'})},initEventListener:function(){var t=this;$(".all-income-help,.all-income-to-cash").click(function(i){i.preventDefault(),$($(".ui-dialog-title div").first()).html("提示"),$(".cash-tips").html("累计收入包含冻结中的佣金。冻结的佣金将在自售出商品发货日起的35天后进行解冻。解冻后的金额将自动打入您的聚美余额。"),setTimeout(function(){t.dialogObj.show()},100)}),$(".recent-income-help,.recent-income-status").click(function(i){i.preventDefault();var e=$("#content").attr("data-img"),n='<div class="text"><span class="txt-bold">佣金冻结：</span>佣金收入在售出商品后的35天日内为冻结期。</div><div class="text"><span class="txt-bold">佣金解冻：</span>当售出的商品在冻结期内没有申请退货，佣金将解冻等待管理员审核并打入您的聚美余额。</div><img src="'+e+'">';$(".cash-tips").html(n),$($(".ui-dialog-title div").first()).html("收入状态"),setTimeout(function(){t.dialogObj.show()},100)}),$(".ui-bg").click(function(i){i.preventDefault(),t.dialogObj.hide()})}});t.init();var i=Jumei.addModule("polyline",{init:function(t){this.interval=15,this.updateLine(t)},getLineScale:function(t){for(var i=-1,e=0;e<t.length;e++)parseInt(t[e])>parseInt(i)&&(i=t[e]);return 0==i?0:80/i},updateLine:function(t){for(var i="0,120",n=0,o=this.getLineScale(t),a=0;a<e.length;a++){n+=this.interval;var l=120-Math.floor(e[a]*o);i+=" "+n+","+l+" "+(n+=this.interval)+",120"}$("#polyline").attr("points",i)}}),e=$("svg").attr("data-line").split(","),n=e.length;$(".before-yesterday-visitors-amount").html("前天"+e[n-3]+"人"),$(".yesterday-visitors-amount").html("昨天"+e[n-2]+"人"),i.init(e)});