$(function(){var i=Jumei.addModule("detail",{init:function(){this.initSlider(),this.initEvent(),this.initFixed(),this.initImage(),this.openByApp()},initImage:function(){$(".lazy-image").imglazyload()},initSlider:function(){var i=Jumei.getModule("ui.slider");$("#product-image-ul li").length>1&&new i({id:"#product-image-ul"})},initEvent:function(){$(".start-buy").click(function(){Jumei.ja("weidian","weixin","startbuy");var i=$(this).find("a").attr("jump"),t=$(".attr-list-select").attr("sku"),n=$(".attr-list-select").attr("stoct"),e=$("#status").val();return"soldout"===e?(alert("亲，您来晚了，该商品已经售完！"),!1):"expired"===e?(alert("亲，您来晚了，该商品已过期！"),!1):"offshelf"===e?(alert("亲，您来晚了，该商品已下架！"),!1):void(void 0===t||""===$.trim(t)?(alert("sku不能为空,请您选择！"),$(window).scrollTo(350),$(".product-attr-container").addClass("attr-container-select"),setTimeout(function(){$(".product-attr-container").removeClass("attr-container-select")},1e3)):"0"==n||""===n||void 0===n?alert("亲，此商品已经售完!"):location.href=i+"&sku="+t)}),$(".attr-list span").click(function(){$(this).hasClass("attr-list-disable")||($(".attr-list-select").removeClass("attr-list-select"),$(this).addClass("attr-list-select"))}),$(".header-btn span").highlight("collect-select"),$(".collection-btn").click(function(){$("#shouchang").show()}),$("#shouchang").click(function(){Jumei.ja("weidian","weixin","shouchang"),$("#shouchang").hide()}),$(".product-xinxi").on("click",function(){var i=$(this).find("ul");$(this).hasClass("product-attr-show")?(i.hide(),$(this).removeClass("product-attr-show")):(i.show(),$(this).addClass("product-attr-show"))}),$(".header-btn a").tap(function(){Jumei.ja("weidian","weixin","jinrudianup")}),$("#jinru-weidian").tap(function(){Jumei.ja("weidian","weixin","jinrudianpudown")}),$("#start-weidian").tap(function(){Jumei.ja("weidian","weixin","zenyangkaidian")}),$(".goods-row-two-items").tap(function(){Jumei.ja("weidian","weixin","zenyangkaidian")})},initFixed:function(){var i=1;$(window).scroll(function(){var t=$(window).scrollTop();t>300?1===i&&setTimeout(function(){$(".fix-btn").removeClass("fixedhide"),i=0},100):0===i&&setTimeout(function(){$(".fix-btn").addClass("fixedhide"),i=1},100)})},openByApp:function(){var i=Jumei.getQueryString(location.href,"can_buy");"false"==i&&($("#header,.order-fix,.start-buy,.fix-btn,.product-tag,.baokuan,.comein-weidian").hide(),$("#weixin-detail").css("padding-bottom","40px"))}});i.init()});