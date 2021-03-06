
/**
 * @name imglazyload
 * @grammar  imglazyload(opts) => self
 * @desc 图片延迟加载
 * **Options**
 * - ''placeHolder''     {String}:              (可选, 默认值:\'\')图片显示前的占位符
 * - ''container''       {Array|Selector}:      (可选, 默认值:window)图片延迟加载容器，若innerScroll为true，则传外层wrapper容器即可
 * - ''threshold''       {Array|Selector}:      (可选, 默认值:0)阀值，为正值则提前加载
 * - ''urlName''         {String}:              (可选, 默认值:data-url)图片url名称
 * - ''eventName''       {String}:              (可选, 默认值:scrollStop)绑定事件方式
 * - --''refresh''--     {Boolean}              --(可选, 默认值:false)是否是更新操作，若是页面追加图片，可以将该参数设为true--（该参数已经删除，无需使用该参数，可以同样为追加的图片增加延迟加载）
 * - ''innerScroll''     {Boolean}              (可选, 默认值:false)是否是内滚，若内滚，则不绑定eventName事件，用户需在外部绑定相应的事件
 * - ''isVertical''      {Boolean}              (可选, 默认值:true)是否竖滚
 *
 * **events**
 * - ''startload'' 开始加载图片
 * - ''loadcomplete'' 加载完成
 * - ''error'' 加载失败
 *
 * 使用img标签作为初始标签时，placeHolder无效，可考虑在img上添加class来完成placeHolder效果，加载完成后移除。使用其他元素作为初始标签时，placeHolder将添加到标签内部，并在图片加载完成后替换。
 * 原始标签中以\"data-\"开头的属性会自动添加到加载后的图片中，故有自定义属性需要放在图片中的可以考虑以data-开头
 * @example $('.lazy-load').imglazyload({threshold:400});
 * $('.lazy-load').imglazyload().on('error', function (e) {
 *     e.preventDefault();      //该图片不再加载
 * });
 */


Jumei.widget('ui.imglazyload', {
    init: function(options) {
        this.options = {
            threshold: 0,
            container: window,
            urlName: 'data-url',
            placeHolder: '',
            eventName: 'scrollStop',
            innerScroll: false,
            isVertical: true,
            classSelector: 'img',
        };
        //主要用于存储所有的图片dom zepto对象
        this.pedding = [];
        this._super.call(this, options);
    },
    _create: function() {
        this.initElem();
        this.initEvent();
    },
    isShow: function(offset) {
        var $wrapper = $(this.options.container),
                isVertical = this.options.isVertical,
                isWindow = $.isWindow($wrapper.get(0)),
                OFFSET = {
                    win: [isVertical ? 'scrollY' : 'scrollX', isVertical ? 'innerHeight' : 'innerWidth'],
                    img: [isVertical ? 'top' : 'left', isVertical ? 'height' : 'width']
                },
        viewOffset = isWindow ? window : $wrapper.offset(),
                viewTop = viewOffset[OFFSET.win[0]],
                viewHeight = viewOffset[OFFSET.win[1]],
                flag = true;
        if (viewTop >= (offset[OFFSET.img[0]] - this.options.threshold - viewHeight) && viewTop <= (offset[OFFSET.img[0]] + offset[OFFSET.img[1]])) {
            flag = true;
        } else {
            flag = false;
        }
        return flag;
    },
    initElem: function() {
        var opts = this.options,
                self = this;
        //把元素push到pedding
        $(opts.classSelector).each(function() {
            self.pedding.push(this);
            if (opts.placeHolder.length > 0) {
                $(this).attr('src', opts.placeHolder);
            }
        });
    },
    initEvent: function() {
        var self = this;
        $(function() {
            self.detect();
            setTimeout(function() {
                self.detect();
            }, 500);
        });
        $(window).on(this.options.eventName + ' ortchange', function() {    //不是内滚时，在window上绑定事件
            if (self.pedding.length <= 0) {
                $(window).off(self.options.eventName + ' ortchange');
            } else {
                self.detect();
            }
        });
    },
    load: function(div) {
        var $div = $(div),
                attrObj = {},
                $img = $div,
                self = this,
                isImg = $(div).is('img'),
                attrName = '';
        if (!isImg) {
            $.each($div.get(0).attributes, function() {   //若不是img作为容器，则将属性名中含有data-的均增加到图片上
                ~this.name.indexOf('data-') && (attrObj[this.name] = this.value);
            });
            $img = $('<img />').attr(attrObj);
        }
        $div.trigger('startload');
        $img.on('load', function() {
            $img.css({'opacity': 1});
            !isImg && $div.replaceWith($img);     //若不是img，则将原来的容器替换，若是img，则直接将src替换
            $div.trigger('loadcomplete');
            $img.off('load');
        }).on('error', function() {     //图片加载失败处理
            $img.off('error').remove();
        });
        attrName = $div.attr(self.options.urlName);
        if (attrName && attrName !== '') {
            $img.attr('src', attrName);
        }
    },
    detect: function() {
        var i,
        $image,
        offset,
        div,
        self = this,
        splice = [].splice;
        for (i = self.pedding.length; i--; ) {
            $image = $(div = self.pedding[i]);
            offset = $image.offset();
            $(div).css({'opacity': 0, '-webkit-transition': 'all 350ms ease'});
            self.isShow(offset) && (splice.call(self.pedding, i, 1), self.load(div));
        }
    }
});
