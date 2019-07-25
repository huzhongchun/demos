/**
 * 大转盘
 * @example
 *  <div class="turntable-container">
 <div class="plugin-area"></div>
 </div>
 //初始化大转盘
 var $pluginArea = $('.plugin-area').turntable({
 img: 'http://images.jumei.com/mobile/act/activities/2014_12/1219_queren/pan.png',
 arrowImg:  'http://images.jumei.com/mobile/act/activities/2014_11/souhuxinwenzhuanpan/turntable-btn.png',
 arrowHeight: 155,
 arrowWidth: 109,
 //random是否开启随机
 random: false,
 //中奖的各个地方的位置  area代表位置，message中奖信息
 prizeArea:{                             
 '10': {
 'area': [1,3],
 'message': '满100减10元现金券'
 },
 '40': {
 'area': [2,5],
 'message': '满300减40元现金券'
 },
 '70': {
 'area': [1,7],
 'message': '满500减70元现金券'
 },
 '0': {
 'area': [6],
 'message': '满500减70元现金券'
 },
 },
 success: function(data, rewardinfo, message) {
 
 }
 });
 
 大转盘调用 pluginArea.turntable('startRotate', 0, 'meizhong');
 * 
 * 
 */

Jumei.widget('ui.turntable', {
    init: function(options) {
        this.options = {
            img: '', //背景转盘的图片地址
            arrowImg: '', //转盘指针的图片地址
            arrowWidth: 0, //指针图片的宽度（用来将指针定位到中央）
            arrowHeight: 0, //指针图片的高度（用来将指针定位到中央）
            arrowTop: 86.25,//指针距离上面大抓盘的高度，实现指针居中的位置
            width: 280, //转盘的宽度
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
                '<div class="turntable-area" style="position:relative;margin:0px auto;">' +
                '<img class="turntable-arrow turntable-btn" style="position: absolute;z-index: 2;" src="<%=arrowImg%>">' +
                '<img class="turntable-img" src="<%=img%>"/>' +
                '</div>';

        //需要集成父类的构造函数需要这样调用
        //初始化入口
        this._super.call(this, options);
    },
    rotate: 0,
    sign: 0,
    prizeMessage: '',
    _create: function() {
        var opts = this.options;
        var turntableHtml = Jumei.parseTpl(this.template, this.options);
        $(this.element).append(turntableHtml);
        $('.turntable-arrow').css({'width': opts.arrowWidth / 2, 'top': opts.arrowTop, 'left': (opts.width - opts.arrowWidth/2) / 2});
        $('.turntable-img').css('width', opts.width);
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
                //self.args.push(opts.prizeArea[self.sign].message);
                opts.success.apply(self, self.args);
            } catch (e) {
                Jumei.log(e);
                opts.success.apply(self, [self.sign, '没有中奖信息']);
            }
        });
    },
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
