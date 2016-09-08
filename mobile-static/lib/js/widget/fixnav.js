/**
 * @file fixnav组件
 * @import zepto.js jumei.js
 * 加载  $("wrapper-nav").fixnav({'data':[{'linkid':'asdfasdf','title':'aadsf'}]});
 * linkid 是指跳转的a标签id，
 * title  指导航
 * 
 * 
 * 结构
    <div id="nav-wrapper">

    </div>
 */



Jumei.widget('ui.fixnav', {
    init: function() {
        this.options = {
            data: [], //data:[{'linkid':'asdfasdf','title':'aadsf'}]
            height:null,//fixed占用的高度，没有设置的话去fixnav得高度
        };
        this.tpl = '<div id="nav" class="fixedtop">' +
                        '<ul class="navigation clearfloat" style="-webkit-transform-origin: 0px 0px; width: 320px;">' +
                        '</ul>' +
                    '</div>';
    },
    _create: function() {
        var str = '';
        if ($('#nav').length <= 0) {
            $(this.element).html(this.tpl);
            for (var i = 0; i < this.options.data.length; i++) {
                str += '<li><a index="' + this.options.data[i].linkid + '">' + this.options.data[i].title + '</a></li>';
            }
            $('.navigation').html(str);
            this.bindEvent();
        }
    },
    bindEvent: function() {
        var self = this;
        var start_top = null,
                nav_sign = 1,
                slideUp = function(height, old) {
                    if (height < old) {
                        for (var i = 500; i >= 0; i -= 5) {
                            (function() {
                                var pos = i;
                                setTimeout(function() {
                                    if (pos <= 0) {
                                        window.scrollTo(0, height);
                                    } else {
                                        window.scrollTo(0, old - (pos / 500 * (old - height)));
                                    }
                                }, (pos));
                            })();
                        }
                    } else {
                        for (var i = 0; i <= 500; i += 5) {
                            (function() {
                                var pos = i;
                                setTimeout(function() {
                                    window.scrollTo(0, old + (pos / 500 * (height - old)));
                                }, (pos));
                            })();
                        }
                    }
                },
                fireScroll = function(hashStr) {
                    var top = offset($('#' + hashStr)[0]).top;
                    var height = 0;
                    if(self.options.height == null){
                        height = $(self.element).height();
                    }else{
                        height = self.options.height;
                    }
                    top = (top - height) * Jumei.scale;
                    var scrollHeight = 0;
                    scrollHeight = $(window).scrollTop();
                    scrollHeight = (scrollHeight) * Jumei.scale;
                    slideUp(top, scrollHeight);
                },
                offset = function(elem) {
                    var left = 0,
                            top = 0,
                            _this = elem;
                    while (_this.offsetParent) {
                        left += _this.offsetLeft;
                        top += _this.offsetTop;
                        _this = _this.offsetParent;
                    }
                    return {
                        "left": left,
                        "top": top
                    }
                }
        $(document).on('touchstart', function() {
            start_top = $(window).scrollTop();
        });
        $(window).scroll(function() {
            var top = $(window).scrollTop();
            if (top > start_top) {
                if (nav_sign == 1) {
                    setTimeout(function() {
                        $('.fixedtop').addClass('fixedhide');
                        nav_sign = 0;
                    }, 100);
                }
            } else {
                if (nav_sign == 0) {
                    setTimeout(function() {
                        $('.fixedtop').removeClass('fixedhide');
                        nav_sign = 1;
                    }, 100);

                }
            }

        });
        $('.navigation a').on('click', function(e) {
            e.preventDefault();
            var hash = $(this).attr('index');
            fireScroll(hash);
        });
    }
});
