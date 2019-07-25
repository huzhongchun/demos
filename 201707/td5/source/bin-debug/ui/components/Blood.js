var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 战斗中掉血的数字
var Blood = (function (_super) {
    __extends(Blood, _super);
    function Blood() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.complete = false;
        _this._g = 80.8;
        _this._speedY = -8;
        _this._lifeTime = 800;
        _this._scale = 50;
        _this._speedX = 2;
        _this._speedZ = 3;
        _this._minSpeedX = 2;
        _this._maxSpeedX = 4;
        return _this;
    }
    Blood.prototype.createNumberView = function (value) {
        if (value === 0)
            return;
        value = Math.floor(value);
        var result = [];
        while (value > 0) {
            result.push(value % 10);
            value = Math.floor(value / 10);
        }
        result.reverse();
        var quad;
        for (var i = 0; i < result.length; i++) {
            quad = new egret.Bitmap();
            quad.texture = RES.getRes("ui/gameUI.json#" + result[i] + ".png");
            quad.width = quad.height = 20;
            quad.x = quad.width * i * 0.8;
            this.addChild(quad);
        }
        this._width = quad.x + quad.width;
        this._speedX = Math.random() * (this._maxSpeedX - this._minSpeedX) + this._minSpeedX;
        if (Math.random() > 0.5)
            this._speedX *= -1;
    };
    Object.defineProperty(Blood.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Blood.prototype.update = function (time, delay) {
        if (this._lifeTime <= 0) {
            this.complete = true;
            return;
        }
        var pt = this.camera.object3DToScreenRay(this.pos3D);
        // this.x = pt.x;
        // this.y = pt.y;
        var stage = this.stage;
        if (stage) {
            // 黑科技来处理坐标适配，这里应该有更好的方法
            // var p = stage.$screen["webTouchHandler"].getLocation({pageX: pt.x, pageY: pt.y, identifier: 0});
            this.x = pt.x;
            this.y = pt.y;
        }
        //            this.pos3D.y -= this._speedY * delay / 1000 * 5;// * this._scale;
        //            this._lifeTime -= delay;
        this.pos3D.y -= this._speedY * delay / 1000 * this._scale;
        this._speedY += this._g * delay / 1000;
        if (this._speedY > 5) {
            this._speedY = 5;
        }
        this._lifeTime -= delay;
        this.pos3D.x += this._speedX;
        this.pos3D.z += this._speedZ;
    };
    return Blood;
}(egret.Sprite));
__reflect(Blood.prototype, "Blood");
//# sourceMappingURL=Blood.js.map