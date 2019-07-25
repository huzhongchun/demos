var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 连击效果ui
var HitContainer = (function (_super) {
    __extends(HitContainer, _super);
    function HitContainer() {
        var _this = _super.call(this) || this;
        _this.hitCount = 0;
        _this.hitTime = 0;
        var hits = new egret.Bitmap();
        hits.texture = RES.getRes("ui/gameUI.json#hits.png");
        var number1 = _this.number1 = new egret.Bitmap();
        number1.texture = RES.getRes("ui/gameUI.json#1.png");
        number1.x = hits.width;
        var number2 = _this.number2 = new egret.Bitmap();
        number2.texture = RES.getRes("ui/gameUI.json#1.png");
        number2.x = number1.x + number1.width;
        _this.addChild(hits);
        _this.addChild(number1);
        _this.addChild(number2);
        _this.number2.visible = false;
        return _this;
    }
    HitContainer.prototype.hits = function () {
        this.visible = true;
        this.number2.visible = false;
        this.hitCount++;
        if (this.hitCount > 99) {
            this.hitCount = 99;
        }
        if (this.hitCount > 9) {
            this.number1.texture = RES.getRes("ui/gameUI.json#" + Math.floor(this.hitCount / 10) + ".png");
            this.number2.texture = RES.getRes("ui/gameUI.json#" + Math.floor(this.hitCount % 10) + ".png");
            this.number2.visible = true;
        }
        else {
            this.number1.texture = RES.getRes("ui/gameUI.json#" + this.hitCount + ".png");
        }
        // tween
        if (this.hitTween1) {
            this.hitTween1.kill();
        }
        if (this.hitTween2) {
            this.hitTween2.kill();
        }
        this.number1.scaleX = this.number1.scaleY = 2;
        this.number2.scaleX = this.number2.scaleY = 2;
        this.hitTween1 = TweenLite.to(this.number1, 0.1, { scaleX: 1, scaleY: 1, ease: Linear.easeIn });
        this.hitTween2 = TweenLite.to(this.number2, 0.1, { scaleX: 1, scaleY: 1, ease: Linear.easeIn });
        if (this.hitTime > 0) {
            clearTimeout(this.hitTime);
        }
        this.hitTime = setTimeout(function () {
            this.visible = false;
            this.hitCount = 0;
            clearTimeout(this.hitTime);
        }.bind(this), 2000);
    };
    HitContainer.prototype.clear = function () {
        if (this.hitTween1) {
            this.hitTween1.kill();
        }
        if (this.hitTween2) {
            this.hitTween2.kill();
        }
        if (this.hitTime > 0) {
            clearTimeout(this.hitTime);
        }
        this.visible = false;
        this.hitCount = 0;
        this.number2.visible = false;
    };
    return HitContainer;
}(egret.Sprite));
__reflect(HitContainer.prototype, "HitContainer");
//# sourceMappingURL=HitContainer.js.map