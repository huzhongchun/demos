/**
 * @file 弹出框组件
 * @import zepto.js jumei.js
 * @example
    $('#test').click(function() {
       $(this).dialog();
    });
 */
Jumei.widget('ui.dialog', {
    init: function() {

        this.options = {
            element: "element",
            //默认弹出框宽度
            width: 300,
            height: 200,
            //传进来显示的html
            content: "聚美提示您！",
            //弹出框title
            title: "提示", //弹出框的title
            //显示一个按钮还是两个
            type: 2,
            //按钮文字
            ok: '确定',
            cancel: '取消',
            //初始化函数
            init: function() {
            },
            //成功回调函数
            successCallback: null,
            //取消回调函数
            cancelCallback: function() {
            }
        };

        this.tpl = '<div id="container-dialog">'
                + '<div id="bg"></div>'
                + '<div id="flagBox">'
                + '<div id="titleBox"><div><%=title%></div><div class="close"></div></div>'
                + '<div id="contentBox"><%=content%></div>'
                + '<div id="buttonBox"><div class="cancel"><%=cancel%></div><div class="determine"><%=ok%></div>'
                + '</div>'
                + '</div>'
                + '</div>';
    },
    _create: function() {
        var htmls = Jumei.parseTpl(this.tpl, this.options);
        var self = this, DEFAULTS = this.options;
        //初始化dom
        $("#container-dialog").remove();
        $('#wrapper').append(htmls);
        //按钮是否显示
        var $buttonBox = $('#buttonBox');
        if (DEFAULTS.type == 1) {
            $buttonBox.html('<div class="determine" style="border-left: none;width: 100%;">' + DEFAULTS.ok + '</div>');
        } else if (DEFAULTS.type == 0) {
            $buttonBox.hide();
        }
        //初始化方法
        DEFAULTS.init();

        //事件绑定，可以封装到一个方法里
        var $cancel = $('#container-dialog .cancel,#container-dialog .close');
        if ($cancel) {
            $cancel.click(function() {
                self._setClose();
                DEFAULTS.cancelCallback();
                return false;
            });
        }
        $(window).resize(function() {
            self._setBg();
            self._setFlag();
        });
        var $determine = $('#container-dialog .determine');
        if ($determine) {
            $determine.click(function() {
                if (typeof (DEFAULTS.successCallback) === "function") {
                    var call = DEFAULTS.successCallback();
                }
                if (call != false) {
                    self._setClose();
                }
                return true;
            });
        }
        //设置背景等
        self._setBg();
        self._setFlag();
        self._initScroll();
    },
    _initScroll: function(){
        $('#bg').on('touchmove', function(e){
            e.stopPropagation();
            e.preventDefault();
        });
        $(document).on('touchmove','#container-dialog', function(e){
             e.preventDefault();
        });
    },
    _setBg: function() {
        var self = this, $bg = $('#bg');
        self.windowHeight = $(window).height();
        self.windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
//        $bg.width(self.windowWidth);
//        $bg.height(self.windowHeight);
        $bg.css('opacity',0.8);
    },
    //设置弹出框居中 
    _setFlag: function() {
        var DEFAULTS = this.options;
        var $flagBox = $('#flagBox');
        $flagBox.width(DEFAULTS.width);
        var scrollTop = this.getScrollTop() / window.Jumei.scale;
        var boxLeft = (this.windowWidth / window.Jumei.scale - $flagBox.width()) / 2,
                boxTop = (this.windowHeight - $flagBox.height()) / 2 + scrollTop;
        boxLeft = boxLeft;
        boxTop = boxTop;
        $flagBox.css({'left': boxLeft + 'px', 'top': boxTop + 'px'});
    },
    //弹出框关闭 
    _setClose: function() {
        var $containerDialog = $('#container-dialog');
        $containerDialog.remove();
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

