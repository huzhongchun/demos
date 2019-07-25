var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 计时器ui
var TimeKeeper = (function (_super) {
    __extends(TimeKeeper, _super);
    function TimeKeeper() {
        var _this = _super.call(this) || this;
        _this.number1 = new egret.Bitmap();
        _this.number2 = new egret.Bitmap();
        _this.number3 = new egret.Bitmap();
        _this.number4 = new egret.Bitmap();
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("ui/gameUI.json#bg_title.png");
        _this.addChild(bg);
        var maohao = new egret.Bitmap();
        maohao.texture = RES.getRes("ui/gameUI.json#maohao.png");
        maohao.width = 20;
        maohao.height = 20;
        _this.addChild(maohao);
        var initX = 45;
        var maohaoX = 0;
        _this.numbers = [_this.number1, _this.number2, _this.number3, _this.number4];
        for (var i = 0; i < 4; i++) {
            var num = _this.numbers[i];
            num.texture = RES.getRes("ui/gameUI.json#0.png");
            num.width = 20;
            num.height = 20;
            num.x = initX + num.width * i + (i >= 2 ? maohao.width : 0);
            num.y = num.height;
            _this.addChild(num);
        }
        maohao.x = initX + 20 * 2;
        maohao.y = maohao.height;
        return _this;
    }
    TimeKeeper.prototype.start = function () {
        var _this = this;
        var data = new Date();
        this.stop();
        this.timer = setInterval(function () {
            var str = _this.formatDuring(new Date().getTime() - data.getTime());
        }, 1000);
    };
    TimeKeeper.prototype.stop = function () {
        clearInterval(this.timer);
    };
    TimeKeeper.prototype.reset = function () {
        var num;
        for (var i = 0; i < 4; i++) {
            num = this.numbers[i];
            num.texture = RES.getRes("ui/gameUI.json#0.png");
        }
    };
    TimeKeeper.prototype.formatDuring = function (mss) {
        var days = Math.floor(mss / (1000 * 60 * 60 * 24));
        var hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((mss % (1000 * 60)) / 1000);
        var str = days + " days " + hours + " hours " + minutes + " minutes "
            + seconds + " seconds ";
        var num;
        this.reset();
        if (minutes > 9) {
            num = this.number1;
            num.texture = RES.getRes("ui/gameUI.json#" + Math.floor(minutes / 10) + ".png");
            num = this.number2;
            num.texture = RES.getRes("ui/gameUI.json#" + (minutes % 10) + ".png");
        }
        else {
            num = this.number2;
            num.texture = RES.getRes("ui/gameUI.json#" + minutes + ".png");
        }
        if (seconds > 9) {
            num = this.number3;
            num.texture = RES.getRes("ui/gameUI.json#" + Math.floor(seconds / 10) + ".png");
            num = this.number4;
            num.texture = RES.getRes("ui/gameUI.json#" + (seconds % 10) + ".png");
        }
        else {
            num = this.number4;
            num.texture = RES.getRes("ui/gameUI.json#" + seconds + ".png");
        }
    };
    return TimeKeeper;
}(egret.Sprite));
__reflect(TimeKeeper.prototype, "TimeKeeper");
//# sourceMappingURL=TimeKeeper.js.map