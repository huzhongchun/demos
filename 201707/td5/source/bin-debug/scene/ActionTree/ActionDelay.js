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
    //延迟指定时间的Action;
    var ActionDelay = (function (_super) {
        __extends(ActionDelay, _super);
        function ActionDelay(delay) {
            var _this = _super.call(this) || this;
            _this._delay_time = 0;
            _this._delay = delay;
            _this._delay_time = _this._delay;
            return _this;
        }
        //重置行为对象;
        ActionDelay.prototype.onResetAction = function (self) {
            this._delay_time = this._delay;
        };
        //是否激活;
        ActionDelay.prototype.onIsActivate = function (self) {
            return this._delay_time > 0;
        };
        //逻辑Tick;
        ActionDelay.prototype.onTick = function (self, time, delay) {
            this._delay_time -= delay;
        };
        //是否完成;
        ActionDelay.prototype.onIsComplete = function (self) {
            return this._delay_time <= 0;
        };
        return ActionDelay;
    }(egret3d.ActionNode));
    egret3d.ActionDelay = ActionDelay;
    __reflect(ActionDelay.prototype, "egret3d.ActionDelay");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ActionDelay.js.map