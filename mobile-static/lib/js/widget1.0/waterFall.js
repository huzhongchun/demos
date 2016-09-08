/**
 * @file 瀑布流组件
 * @import zepto.js jumei.js
 */
Jumei.widget('ui.waterFall', {
    init: function(options) {//构造函数
        //组件的所有属性
        this.options = {
            id: 'waterfall-boxs',
            columnWidth: 140, //列宽
            columnClassName: 'waterfall-column', //列的类名
            columnGap: 0, //列间距
            cellSelector: 'cell', //要排列的砖块的选择器，限定在瀑布流的容器内
            imgSelector: 'img', //要加载的图片的选择器
            hasSetImgHeight: true, //是否设置了图片的高度
            fadeIn: true, //是否渐显载入
            fadeInTime: 600, //渐显速率，单位毫秒
            insertType: 2, //每个条目块插入方式，1为插入最短那列，2为按序轮流插入
        }
        this._super.call(this, options);
    },
    _create: function() {//组件初始化函数
        $.fn.fadeTo = function(animateTime, opa) {
            return this.each(function(index) {
                $(this).animate({'opacity': opa}, animateTime, 'ease', function() {
                });
            })
        }
        var self = this, opt = this.options;
        if (!opt.id || !$('#' + opt.id)) {
            console.log('id或dom为null！');
            return false;
        }
        self.$dom = $('#' + opt.id);
        self.$dom.addClass('clearfloat');
        var boxsWidth = self.$dom.width();
        self.columnAmount = parseInt((boxsWidth + opt.columnGap) / (opt.columnWidth + opt.columnGap));
        if (self.columnAmount < 1) {
            alert('列的宽度过大,请重新调节列的宽度！');
            return false;
        }
        self.childs = self.$dom.children().detach();
        self.$column = self.createColnum(self.columnAmount);
        self.appendChilds(self.childs);
    },
    appendChilds: function(childs) {
        var self = this, opt = this.options;
        if (!childs.length)
            return false;
        childs.each(function(index) {
            var _this = this;
            var _index = index;
            if (opt.hasSetImgHeight) {
                if (opt.insertType == 2) {
                    self.insertByOder($(_this), _index, opt.fadeIn);
                }
                else {
                    self.insertByMinHieght($(_this), opt.fadeIn);
                }
            }
            else {
                if ($(_this)[0].nodeName.toLowerCase() == 'img' || $(_this).find(opt.imgSelector).length > 0) {
                    var image = new Image;
                    var src = $(_this)[0].nodeName.toLowerCase() == 'img' ? $(_this).attr('src') : $(_this).find(opt.imgSelector).attr('src');
                    image.onload = function() {
                        image.onreadystatechange = null;
                        if (opt.insertType == 2) {
                            self.insertByOder($(_this), _index, opt.fadeIn);
                        }
                        else {
                            self.insertByMinHieght($(_this), opt.fadeIn);
                        }
                        image = null;
                    }
                    image.onreadystatechange = function() { //处理IE等浏览器的缓存问题：图片缓存后不会再触发onload事件
                        if (image.readyState == "complete") {
                            image.onload = null;
                            if (opt.insertType == 2) {
                                self.insertByOder($(_this), _index, opt.fadeIn);
                            }
                            else {
                                self.insertByMinHieght($(_this), opt.fadeIn);
                            }
                            image = null;
                        }
                    }
                    image.src = src;
                }
            }
        })
    },
    createColnum: function(l) {
        var self = this, opt = this.options;
        var content = '';
        for (var i = 0; i < l; i++) {
            var columnGap = (i + 1) % self.columnAmount == 0 ? 0 : opt.columnGap;
            content += '<div class=' + opt.columnClassName + ' style="float:left;width:' + opt.columnWidth + 'px;overflow:hidden;margin-right:' + columnGap + 'px;margin-bottom:' + opt.columnGap + 'px;"></div>'
        }
        self.$dom.prepend(content);
        return $('.' + opt.columnClassName);
    },
    insertByOder: function(element, index, fadeIn) {
        var self = this, opt = this.options;
        var insertColumnOder = index % self.columnAmount;
        if (fadeIn)
            $(element).css('opacity', 0).appendTo(self.$column[insertColumnOder]).fadeTo(opt.fadeInTime, 1);
        else
            $(element).appendTo(self.$column[insertColumnOder]);
    },
    insertByMinHieght: function(element, fadeIn) {
        var self = this, opt = this.options;
        var minHeightIndex = 0;
        var minHeight = 10000000;
        var $column = $('.waterfall-column');
        for (var i = 0; i < $column.length; i++) {
            if ($($column[i]).height() < minHeight) {
                minHeight = $($column[i]).height();
                minHeightIndex = i;
            }
        }
        if (fadeIn)
            $(element).css('opacity', 0).appendTo(self.$column[minHeightIndex]).fadeTo(opt.fadeInTime, 1);
        else
            $(element).appendTo(self.$column[minHeightIndex]);
    },
});




