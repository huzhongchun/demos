/**
 * @file refresh组件
 * @import zepto.js jumei.js
 * 加载  $('body').gotop();
 */

Jumei.widget('ui.gotop', {
    init: function(options) {
        this.options = {
            img: 'http://ms0.jmstatic.com/beauty/image/back_top@2x.png',
        };
        this._super.call(this, options);
    },
    _create: function() {
        var self = this;
        if ($('#toTop').length <= 0) {
            $('#wrapper').append('<div id="toTop" style="background: url(' + self.options.img + ') left center no-repeat !important;background-size: 44px 44px !important;position: fixed;bottom: 20px;width: 45px;height: 45px;z-index: 200000;right: 10px;display: none;"></div>');
        }
        self.initEvent();
    },
    initEvent: function() {
        var $toTop = $('#toTop'),
                self = this;
        $toTop.off('click');
        $toTop.on('click', function() {
            var top = $(window).scrollTop();
            self.scrollTo(0, top);
            $toTop.hide();
        });
        $(window).on('scroll', function() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 100) {
                $toTop.show();
            } else {
                $toTop.hide();
            }
        });
    },
    scrollTo: function(height, old) {
        for (var i = 500; i >= 0; i -= 5) {
            (function() {
                var pos = i;
                setTimeout(function() {
                    if (pos <= 0) {
                        window.scrollTo(0, height);
                    } else {
                        window.scrollTo(0, old - (pos / 500 * (old - height)));
                    }
                }, (pos / 3));
            })();
        }
    }
});
