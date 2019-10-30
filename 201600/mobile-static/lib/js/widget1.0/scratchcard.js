/**
 * @file 刮刮卡组件
 * @import zepto.js jumei.js
 */

Jumei.widget('ui.scratchcard', {
    init: function(options) {
        this.options = {
            element: '',
            width: 100,
            height: 30,
            img: 'http://p0.jmstatic.com/mobile/act/active301/702luodi/prize-area-un.jpg',
            backgroundImg: 'http://p0.jmstatic.com/mobile/act/active301/702luodi/prize-area.png'
        };
        this.tpl = '<canvas class="canvas"></canvas>';
        //需要集成父类的构造函数需要这样调用
        //初始化入口
        this._super.call(this, options);
    },
    _create: function() {
        try {
            document.createElement("canvas").getContext("2d");
        } catch (e) {
            alert('对不起，您的浏览器不支持刮刮卡功能');
            return false;
        }
        this.initCanvas();
    },
    initCanvas: function() {
        var bodyStyle = document.body.style,
                self = this,
                img = new Image(),
                undoImg = new Image(),
                canvas = $(self.element).find('.canvas')[0];
        if (!canvas) {
            $(self.element).html(self.tpl);
            canvas = $(self.element)[0].querySelector('.canvas');
        }
        bodyStyle.mozUserSelect = 'none';
        bodyStyle.webkitUserSelect = 'none';
        canvas.style.backgroundColor = 'transparent';
        canvas.style.position = 'absolute';
        undoImg.addEventListener('load', function(e) {
            var ctx,
                    w = img.width,
                    h = img.height,
                    mousedown = false,
                    pat;
            function eventDown(e) {
                e.preventDefault();
                mousedown = true;
            }
            function eventUp(e) {
                e.preventDefault();
                mousedown = false;
            }
            function eventMove(e) {
                e.preventDefault();
                if (mousedown) {
                    if (e.changedTouches) {
                        e = e.changedTouches[e.changedTouches.length - 1];
                    }
                    var x = (e.clientX / Jumei.scale + document.body.scrollLeft || e.pageX) - $(canvas).offset().left,
                            y = (e.clientY / Jumei.scale + document.body.scrollTop || e.pageY) - $(canvas).offset().top;
                    with (ctx) {
                        beginPath();
                        arc(x, y, 30, 0, Math.PI * 4);
                        fill();
                    }
                }
            }
            canvas.width = w;
            canvas.height = h;
            canvas.style.backgroundImage = 'url(' + self.options.backgroundImg + ')';
            canvas.style.backgroundSize = 'cover';
            ctx = canvas.getContext('2d');
            pat = ctx.createPattern(undoImg, "no-repeat");
            ctx.drawImage(undoImg, 0, 0, undoImg.width, undoImg.height, 0, 0, self.options.width, self.options.height);
            ctx.globalCompositeOperation = 'destination-out';

            canvas.addEventListener('touchstart', eventDown);
            canvas.addEventListener('touchend', eventUp);
            canvas.addEventListener('touchmove', eventMove);
            canvas.addEventListener('mousedown', eventDown);
            canvas.addEventListener('mouseup', eventUp);
            canvas.addEventListener('mousemove', eventMove);
        });
        undoImg.src = self.options.img;
        img.src = self.options.backgroundImg;
        img.width = self.options.width;
        img.height = self.options.height;
    }
});