!function(e,n){e.waterFallObject=function(e){this.options=n.extend({id:"waterfall-boxs",columnWidth:140,columnClassName:"waterfall-column",columnGap:0,cellSelector:"cell",imgSelector:"img",hasSetImgHeight:!0,fadeIn:!0,fadeInTime:600,insertType:2},e),this.init()},e.waterFallObject.prototype={constructor:"waterFallObject",init:function(){this._create()},_create:function(){n.fn.fadeTo=function(e,t){return this.each(function(){n(this).animate({opacity:t},e,"ease",function(){})})};var e=this,t=this.options;if(!t.id||!n("#"+t.id))return console.log("id或dom为null！"),!1;e.$dom=n("#"+t.id),e.$dom.addClass("clearfloat");var o=e.$dom.width();return e.columnAmount=parseInt((o+t.columnGap)/(t.columnWidth+t.columnGap)),e.columnAmount<1?(alert("列的宽度过大,请重新调节列的宽度！"),!1):(e.childs=e.$dom.children().detach(),e.$column=e.createColnum(e.columnAmount),void e.appendChilds(e.childs))},appendChilds:function(e){var t=this,o=this.options;return e.length?void e.each(function(e){var i=this,a=e;if(o.hasSetImgHeight)2==o.insertType?t.insertByOder(n(i),a,o.fadeIn):t.insertByMinHieght(n(i),o.fadeIn);else if("img"==n(i)[0].nodeName.toLowerCase()||n(i).find(o.imgSelector).length>0){var l=new Image,r="img"==n(i)[0].nodeName.toLowerCase()?n(i).attr("src"):n(i).find(o.imgSelector).attr("src");l.onload=function(){l.onreadystatechange=null,2==o.insertType?t.insertByOder(n(i),a,o.fadeIn):t.insertByMinHieght(n(i),o.fadeIn),l=null},l.onreadystatechange=function(){"complete"==l.readyState&&(l.onload=null,2==o.insertType?t.insertByOder(n(i),a,o.fadeIn):t.insertByMinHieght(n(i),o.fadeIn),l=null)},l.src=r}}):!1},createColnum:function(e){for(var t=this,o=this.options,i="",a=0;e>a;a++){var l=(a+1)%t.columnAmount===0?0:o.columnGap;i+="<div class="+o.columnClassName+' style="float:left;width:'+o.columnWidth+"px;overflow:hidden;margin-right:"+l+"px;margin-bottom:"+o.columnGap+'px;"></div>'}return t.$dom.prepend(i),n("."+o.columnClassName)},insertByOder:function(e,t,o){var i=this,a=this.options,l=t%i.columnAmount;o?n(e).css("opacity",0).appendTo(i.$column[l]).fadeTo(a.fadeInTime,1):n(e).appendTo(i.$column[l])},insertByMinHieght:function(e,t){for(var o=this,i=this.options,a=0,l=1e7,r=n(".waterfall-column"),c=0;c<r.length;c++)n(r[c]).height()<l&&(l=n(r[c]).height(),a=c);t?n(e).css("opacity",0).appendTo(o.$column[a]).fadeTo(i.fadeInTime,1):n(e).appendTo(o.$column[a])}},F.addWidget("waterFallObject",e.waterFallObject),define(function(){return waterFallObject})}(window,Zepto);