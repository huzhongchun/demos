define(["view"],function(i){var t=['<div id="city-search-wrapper">','<div class="city-select-list" id="city-select-list">','<div class="city-iscroll">','<div class="city-state">当前城市：<span class="current-city"></span> <span class="position" style="display:none;"></span></div>','<div class="city-state-fail" style="display:none;">定位城市失败了，请手动选择</div>','<div class="hot-city-title">热门城市</div>','<ul class="hot-city clear">',"<li>上海</li>","<li>北京</li>","<li>杭州</li>","<li>广州</li>","<li>南京</li>","<li>苏州</li>","<li>深圳</li>","<li>成都</li>","<li>重庆</li>","<li>天津</li>","<li>武汉</li>","<li>西安</li>","</ul>",'<div class="all-city-title">全部城市</div>','<ul class="all-city">',"</ul>","</div>","</div>","</div>"].join(""),l=["<% var count = 0; for(var i in data){if(data.hasOwnProperty(i)){var item; if (data.hasOwnProperty(i)) { ++count;item = data[i];  %>",'<li class="all-city-list<% if(count<=1){ %> all-city-select<% } %>">','<div class="city-title"><%=i%></div>','<div class="city-content">','<ul class="clear">',"<% var num = item.length%4;if(num>0){num = 4-num;}%>","<% for(var j = 0; j < item.length; j++){ var list = item[j]; %>","<li><%=list.city_name%></li>","<% } %>","<% for(var z = 0; z < num; z++){%>","<li></li>","<% } %>","</ul>","</div>","</li>","<% } %>","<% } } %>"].join(""),e=null,a=!0,c=function(i){window.citys={},window.citysEn={};for(var t in i)if(i.hasOwnProperty(t))for(var l=0;l<i[t].length;l++)window.citys[i[t][l].city_name]=i[t][l].districts,window.citysEn[i[t][l].city_name]=i[t][l].enname},n=function(){a&&(a=!1,$("#wrapper").loadding(),$.ajax({type:"get",dataType:"json",url:"/dp/getCities",success:function(i){if(a=!0,$("#wrapper").loadding("close"),i){c(i);var t={data:i},n=Jumei.parseTpl(l,t);$(".all-city").html(n),e.refresh()}},error:function(){a=!0,$("#wrapper").loadding("close")}}))},s=function(){function i(){var i={};i.data=window.citysOrigin;var t=Jumei.parseTpl(l,i);$(".all-city").html(t)}$(".current-city").html(e.param.city),window.citysOrigin?i():n()};return Jumei.create(i,{onCreate:function(){e=this,e.elem.html(t),s()},onEvent:function(){var i=this;this.events={"click .city-title":function(){var i=$(this).parent();$(".all-city-select").removeClass("all-city-select"),i.addClass("all-city-select"),e.refresh()},"click .hot-city li":function(){localStorage&&localStorage.removeItem("liren_area"),e.controller.setStoryItem("liren_city",$(this).html()),i.forward("#module=beauty&action=index&city="+$(this).html())},"click .all-city-list ul li":function(){localStorage&&localStorage.removeItem("liren_area"),e.controller.setStoryItem("liren_city",$(this).html()),i.forward("#module=beauty&action=index&city="+$(this).html())}}},setTitle:function(){this.title("选择城市")},onRefresh:function(){this.setTitle()}})});