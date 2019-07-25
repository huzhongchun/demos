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
    //重复执行指定Action的行为;
    var ActionRepeat = (function (_super) {
        __extends(ActionRepeat, _super);
        function ActionRepeat(action, loopCount) {
            var _this = _super.call(this) || this;
            _this._action = action;
            _this._forever = loopCount <= 0;
            _this._loopCount = loopCount;
            _this._isContinue = false;
            return _this;
        }
        //重置行为对象;
        ActionRepeat.prototype.onResetAction = function (self) {
            this._isContinue = false;
            this._action.onResetAction(self);
        };
        //是否激活;
        ActionRepeat.prototype.onIsActivate = function (self) {
            return this._isContinue = this._action.onIsActivate(self);
        };
        //逻辑Tick;
        ActionRepeat.prototype.onTick = function (self, time, delay) {
            this._action.onTick(self, time, delay);
            if (this._action.onIsComplete(self)) {
                this._isContinue = false;
                this._loopCount--;
                if (this._forever || this._loopCount > 0) {
                    this._action.onResetAction(self);
                    this._action.onIsActivate(self);
                    this._isContinue = true; //this._action.onIsActivate(self);
                }
            }
        };
        //是否完成;
        ActionRepeat.prototype.onIsComplete = function (self) {
            return !this._isContinue;
        };
        return ActionRepeat;
    }(egret3d.ActionNode));
    egret3d.ActionRepeat = ActionRepeat;
    __reflect(ActionRepeat.prototype, "egret3d.ActionRepeat");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ActionRepeat.js.map