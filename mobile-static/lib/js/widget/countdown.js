/**
 * @file 倒计时组件
 * @import zepto.js jumei.js
 * @description $('#countDownBanner').countdown({endTime:'2014/11/03 23:59:59', isShow:true});
 *              $('#countDownBanner').countdown({endtime:'2014/11/03 23:59:59', isShow:true});
 *              endtime:结束时间
 *              isShow:是否显示倒计时
 *              callback:是回调函数
 */

Jumei.widget('ui.countdown', {
    init: function() {
        this.options = {
            endTime: "",
            isShow: false,
            callback: function() {
            }
        };
        this.tpl = '<span class="count-day"></span><span class="count-hour"></span><span class="count-minute"></span><span class="count-second"></span>';
        this.overTpl = '<span class="count-day"><i class="digit">0</i><i class="digit">0</i></span><span class="count-hour"><i class="digit">0</i><i class="digit">0</i></span><span class="count-minute"><i class="digit">0</i><i class="digit">0</i></span><span class="count-second"><i class="digit">0</i><i class="digit">0</i></span>';
    },
    _create: function() {
        $(this.element).html(this.tpl);
        $(this.element).addClass('countdown');
        this.createTime();
        //初始化dom        
    },
    createTime: function() {
        var _this = this;
        function countdown(elem, endTime, isShow, callback) {
            this.elem = elem;
            this.endTime = endTime;
            this.isShow = isShow;
            this.callback = callback || function() {
            };
            this.init();
        }
        countdown.prototype = {
            init: function() {
                var self = this,
                        tmp1 = 0,
                        tmp2 = 0,
                        tmp3 = 0,
                        dd = null,
                        hh = null,
                        mm = null,
                        ss = null,
                        elemD = $(_this.element).find('.count-day'),
                        elemH = $(_this.element).find('.count-hour'),
                        elemM = $(_this.element).find('.count-minute');

                function down() {

                    var ts = (new Date(self.endTime)) - (new Date());//计算剩余的毫秒数
                    if (ts <= 0) {
                        self.callback();
                        clearInterval(self.timer);
                        if (_this.options.isShow) {
                            $(_this.element).html(_this.overTpl);
                        }
                        return false;
                    }
                    tmp1 = ts / 1000;
                    tmp2 = ts / 1000 / 60;
                    tmp3 = ts / 1000 / 60 / 60;


                    function animate(ss, elem) {
                        var str = '';
                        if (ss > 0) {
                            if (ss % 10 == 9) {
                                var s1 = parseInt(ss / 10);
                                var s2 = parseInt(ss % 10);
                                str = '<i class="digit-wrap"><i class="digit">' + (s1) + '</i><i class="digit">' + (s1 + 1) + '</i></i> <i class="digit-wrap"><i class="digit">' + s2 + '</i><i class="digit">' + ((s2 + 1) == 10 ? 0 : (s2 + 1)) + '</i></i>';
                                elem.html(str);
                                elem.find('.digit-wrap').animate({
                                    top: '0px'
                                }, 500, 'ease-out');
                            } else {
                                var s1 = parseInt(ss / 10);
                                var s2 = parseInt(ss % 10);
                                str = '<i class="digit">' + (s1) + '</i><i class="digit-wrap"><i class="digit">' + (s2) + '</i><i class="digit">' + ((s2 + 1) == 10 ? 0 : (s2 + 1)) + '</i></i>';
                                elem.html(str);
                                elem.find('.digit-wrap').animate({
                                    top: '0px'
                                }, 500, 'ease-out');
                            }
                        } else {
                            var s1 = parseInt(ss / 10);
                            var s2 = parseInt(ss % 10);
                            str = '<i class="digit">' + (s1) + '</i> <i class="digit-wrap"><i class="digit">' + s2 + '</i><i class="digit">' + ((s2 + 1) == 10 ? 0 : (s2 + 1)) + '</i></i>';
                            elem.html(str);
                            elem.find('.digit-wrap').animate({
                                top: '0px'
                            }, 500, 'ease-out');
                        }
                    }
                    function animateSS(ss) {
                        var str = '';
                        if (ss > 0) {
                            if (ss % 10 == 9) {
                                var s1 = parseInt(ss / 10);
                                var s2 = parseInt(ss % 10);
                                str = '<i class="digit-wrap"><i class="digit">' + (s1) + '</i><i class="digit">' + (s1 + 1) + '</i></i> <i class="digit-wrap"><i class="digit">' + s2 + '</i><i class="digit">' + ((s2 + 1) == 10 ? 0 : (s2 + 1)) + '</i></i>';
                                $('.count-second').html(str);
                                $('.count-second .digit-wrap').animate({
                                    top: '0px'
                                }, 500, 'ease-out');
                            } else {
                                var s1 = parseInt(ss / 10);
                                var s2 = parseInt(ss % 10);
                                str = '<i class="digit">' + (s1) + '</i><i class="digit-wrap"><i class="digit">' + (s2) + '</i><i class="digit">' + ((s2 + 1) == 10 ? 0 : (s2 + 1)) + '</i></i>';
                                $('.count-second').html(str);
                                $('.count-second .digit-wrap').animate({
                                    top: '0px'
                                }, 500, 'ease-out');
                            }
                        } else {
                            var s1 = parseInt(ss / 10);
                            var s2 = parseInt(ss % 10);
                            str = '<i class="digit-wrap"><i class="digit">' + (s1) + '</i><i class="digit">' + (s1 + 1) + '</i></i> <i class="digit-wrap"><i class="digit">' + s2 + '</i><i class="digit">' + ((s2 + 1) == 10 ? 0 : (s2 + 1)) + '</i></i>';
                            $('.count-second').html(str);
                            $('.count-second .digit-wrap').animate({
                                top: '0px'
                            }, 500, 'ease-out');
                        }
                    }
                    if (_this.options.isShow) {
                        //计算剩余的天数
                        if (dd != parseInt(tmp3 / 24, 10) || dd == null) {
                            dd = parseInt(tmp3 / 24, 10);
                            animate(dd, elemD);
                        }
                        //计算剩余的小时数
                        if (hh != parseInt(tmp3 % 24, 10) || hh == null) {
                            hh = parseInt(tmp3 % 24, 10);
                            animate(hh, elemH);
                        }
                        //计算剩余的分钟数
                        if (mm != parseInt(tmp2 % 60, 10) || mm == null) {
                            mm = parseInt(tmp2 % 60, 10);
                            animate(mm, elemM);
                        }
                        //计算剩余的秒数
                        if (ss != parseInt(tmp1 % 60, 10) || parseInt(tmp1 % 60, 10) == 0 || ss == null) {
                            ss = parseInt(tmp1 % 60, 10);
                            animateSS(ss);
                        }
                    }
                }
                var self = this;
                self.timer = setInterval(function() {
                    down();
                }, 1000);
            },
        };
        new countdown($(_this.element), _this.options.endTime, _this.options.isShow, _this.options.callback);
    }
});
