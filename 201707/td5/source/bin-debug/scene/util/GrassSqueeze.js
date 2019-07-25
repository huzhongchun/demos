var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    var GrassSqueeze = (function (_super) {
        __extends(GrassSqueeze, _super);
        function GrassSqueeze() {
            var _this = _super.call(this) || this;
            _this._squeezePos = new egret3d.Vector3D();
            return _this;
        }
        GrassSqueeze.instance = function () {
            GrassSqueeze._instance = GrassSqueeze._instance || new GrassSqueeze();
            return GrassSqueeze._instance;
        };
        GrassSqueeze.prototype.bindGrass = function (grass) {
            this._grass = grass;
        };
        GrassSqueeze.prototype.bindActor = function (target) {
            this._target = target;
        };
        GrassSqueeze.prototype.update = function (time, delay, camera) {
            _super.prototype.update.call(this, time, delay, camera);
            if (this._target == null) {
                this._grass.method.updateSqueezeData(this._squeezePos, false, 1, 1);
            }
            else {
                this._squeezePos.copyFrom(this._target.globalPosition);
                this._squeezePos.decrementBy(this._grass.globalPosition);
                this._squeezePos.y = 0;
                this._grass.method.updateSqueezeData(this._squeezePos, true, 160, 0.8);
            }
        };
        return GrassSqueeze;
    }(egret3d.Object3D));
    egret3d.GrassSqueeze = GrassSqueeze;
    __reflect(GrassSqueeze.prototype, "egret3d.GrassSqueeze");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=GrassSqueeze.js.map