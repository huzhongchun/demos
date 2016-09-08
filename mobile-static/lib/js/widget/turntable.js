/**
 * 大转盘
 * @example
 <ul id="slider-ul">
 <li class="clearfloat">
 <li>
 <li class="clearfloat">
 <li>
 </ul>
 require('widget/upslide', function(){
 $('#slider-ul').turntable({'elem':''});
 });
 */

Jumei.widget('ui.turntable', {
    init: function() {
        this.options = {
            url: '', //请求接口的url
            img: '', //背景转盘的图片地址
            arrowImg: '', //转盘指针的图片地址
            arrowWidth: 0, //指针的宽度（用来将指针定位到中央）
            arrowHeight: 0, //指针的高度（用来将指针定位到中央）
            width: 320, //转盘的宽度
            len: 8, //扇形数目
            random: false, //是否用默认得随机方法
            randomChance: {//默认的随机方法对应奖项和概率
                "1": 100
            },
            prizeArea: {
                '1': {
                    'area': [1],
                    'message': '满500减50现金券'
                },
                '2': {
                    'area': [2],
                    'message': '化妆品小样'
                },
                '3': {
                    'area': [3, 6],
                    'message': '闪购入场券'
                },
                '4': {
                    'area': [4],
                    'message': '价值100元化妆品'
                },
                '5': {
                    'area': [5, 7],
                    'message': '满200减20现金券'
                },
                '6': {
                    'area': [8],
                    'message': 'iphone6手机'
                },
            }
            , //中奖的区域范围，按照逆时针数，数组得0为第一哥中奖得位置
            success: function() {
                alert('已完成');
            }
        };

        this.template =
                '<div class="turntable-area" style="position:relative;">' +
                '<img class="turntable-arrow turntable-btn" style="position: absolute;z-index: 2;" src="<%=arrowImg%>">' +
                '<img class="turntable-img" src="<%=img%>"/>' +
                '</div>';
    },
    _init: function() {
        var opts = this.options;
        var turntableHtml = Jumei.parseTpl(this.template, this.options);
        $(this.element).append(turntableHtml);
        $('.turntable-arrow').css({'width': opts.arrowWidth / 2, 'top': (opts.width - opts.arrowHeight) / 2, 'left': (opts.width - opts.arrowWidth / 2) / 2});
        $('.turntable-img').css('width', 280);
        $('.turntable-img-2').css('width', 280);
        $('.turntable-img-3').css('width', 280);
        this.initEvent();
    },
    getRand: function(proArr) {
        var result = '';
        //概率数组的总概率精度
        var proSum = 0;
        for (var i in proArr) {
            proSum += proArr[i];
        }
        for (var j in proArr) {
            var randNum = Math.random() * proSum;
            if (randNum <= proArr[j]) {
                result = j;
                break;
            } else {
                proSum -= proArr[j];
            }
        }
        return result;
    },
    initEvent: function() {
        var self = this;

        var opts = self.options;
        if (opts.random) {
            $('.turntable-btn').on('tap', function() {
                var sign = self.getRand(opts.randomChance);
                self.startRotate(sign);
            });
        }
        $('.turntable-img').off('webkitTransitionEnd');
        $('.turntable-img').on('webkitTransitionEnd', function() {
            $('.turntable-btn').css("pointer-events", 'all');
            //this.style.removeProperty('-webkit-transition');
            this.style.webkitTransition = '-webkit-transform 0ms ease-in-out';
            this.style.webkitTransform = 'rotateZ(' + self.rotate + 'deg)';
            try {
                self.args.push(opts.prizeArea[self.sign].message);
                opts.success.apply(self, self.args);
            } catch (e) {
                Jumei.log('没有中奖信息');
                opts.success.apply(self, [self.sign, '没有中奖信息']);
            }
        });
    },
    rotate: 0,
    sign: 0,
    prizeMessage: '',
    startRotate: function(sign) {
        var opts = this.options;
        var self = this;
        self.sign = sign;
        self.args = [].slice.call(arguments);
        var prize = opts.prizeArea[sign].area, area;
        if (prize.length > 1) {
            area = prize[Math.floor(Math.random() * prize.length)];
        } else {
            area = prize[0];
        }

        var single = 360 / opts.len;
        var randomAngle = single * Math.random();
        if (randomAngle <= 10) {
            randomAngle = randomAngle + 10;
        } else if ((single - randomAngle) <= 10) {
            randomAngle = randomAngle - 10;
        }
        var rotate = self.rotate = Math.floor((area - 1) * (single) + randomAngle);

        var $turntable = $('.turntable-img'), $turnBtn = $('.turntable-btn');
        if ($turnBtn.css('pointer-events') != "none") {
            $turntable.css("pointer-events", 'none');
            $turnBtn.css("pointer-events", 'none');
            $turntable[0].style.webkitTransition = '-webkit-transform 6s ease-in-out';
            $turntable[0].style.webkitTransform = 'rotateZ(' + (3240 + rotate) + 'deg)';
        }
    }
});
