/**
 * @file loadding组件
 * @import zepto.js jumei.js
 * 加载 $("body").loadding();
 * 关闭 $("body").loadding("close");
 */

Jumei.widget('ui.loadding', {
    init: function() {

        this.options = {
            src: "http://images.jumei.com/mobile/act/image/loadding/8.gif",
            width: 20,
            height: 20,
            //是否有scroll滑动，默认有。可以设置为false
            scrollFlag: true
        };

        this.tpl = '<div id="loadding-img" style="width:20px;height:20px;z-index: 10000;position: absolute;" class="loadding"><img style="width:100%;display:block;" src="<%=src%>"/></div>';
    },
    _create: function() {
        var htmls = Jumei.parseTpl(this.tpl, this.options);
        var self = this;
        //初始化dom
        if ($("#loadding-img").length > 0) {
            self.showLoadding();
        } else {
            $('#wrapper').append(htmls);
            self.showLoadding();
        }
        ;
    },
    showLoadding: function() {
        this._setBg();
        this._setFlag();
    },
    _setBg: function() {
        var self = this;
        //$bg = $('#loadding-show');
        self.windowHeight = $(window).height();
        self.windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
       // $bg.width(self.windowWidth);
       // $bg.height(self.windowHeight);
       // $bg.css('opacity', 0.8);
    },
    //设置弹出框居中 
    _setFlag: function() {
        var DEFAULTS = this.options;
        var $loadding = $('#loadding-img');
        var scrollTop = 0;
        $loadding.width(DEFAULTS.width);
        $loadding.height(DEFAULTS.width);
        if(this.options.scrollFlag){
            scrollTop = this.getScrollTop() / window.Jumei.scale;
        }
        var boxLeft = (this.windowWidth / window.Jumei.scale - $loadding.width()) / 2,
                boxTop = (this.windowHeight  - $loadding.height()) / 2 + scrollTop;
        
        boxLeft = boxLeft;
        boxTop = boxTop;
        $loadding.css({'left': boxLeft + 'px', 'top': boxTop + 'px'});
    },
    //弹出框关闭 
    close: function() {
        $("#loadding-img").remove();
    },
    getScrollTop: function() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
});
