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
    //并行执行的行为;
    var ActionParallel = (function (_super) {
        __extends(ActionParallel, _super);
        function ActionParallel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //重置行为对象;
        ActionParallel.prototype.onResetAction = function (self) {
        };
        //是否激活;
        ActionParallel.prototype.onIsActivate = function (self) {
            return false;
        };
        //逻辑Tick;
        ActionParallel.prototype.onTick = function (self, time, delay) {
        };
        //是否完成;
        ActionParallel.prototype.onIsComplete = function (self) {
            return true;
        };
        return ActionParallel;
    }(egret3d.ActionNode));
    egret3d.ActionParallel = ActionParallel;
    __reflect(ActionParallel.prototype, "egret3d.ActionParallel");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ActionParallel.js.map