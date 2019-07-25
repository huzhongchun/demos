var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 进度条
var ProcessBar = (function (_super) {
    __extends(ProcessBar, _super);
    function ProcessBar(bgImage, barImage) {
        var _this = _super.call(this) || this;
        _this.background = new egret.Bitmap();
        _this.background.texture = RES.getRes(bgImage);
        _this.addChild(_this.background);
        _this.bar = new egret.Bitmap();
        _this.bar.texture = RES.getRes(barImage);
        _this.addChild(_this.bar);
        return _this;
    }
    Object.defineProperty(ProcessBar.prototype, "ratio", {
        get: function () {
            return this._ratio;
        },
        set: function (num) {
            this._ratio = num;
            this.bar.scaleX = num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessBar.prototype, "width", {
        get: function () {
            return this.background.width;
        },
        set: function (num) {
            this.bar.width = this.background.width = num;
        },
        enumerable: true,
        configurable: true
    });
    return ProcessBar;
}(egret.Sprite));
__reflect(ProcessBar.prototype, "ProcessBar");
//# sourceMappingURL=ProcessBar.js.map