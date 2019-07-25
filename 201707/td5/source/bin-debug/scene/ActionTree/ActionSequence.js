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
    //序列执行的行为;
    var ActionSequence = (function (_super) {
        __extends(ActionSequence, _super);
        function ActionSequence(actions) {
            var _this = _super.call(this) || this;
            _this._actions = [];
            _this._currIndex = 0;
            _this._actions = actions;
            _this._currActivate = false;
            _this._currAction = _this._actions[_this._currIndex];
            return _this;
        }
        //重置行为对象;
        ActionSequence.prototype.onResetAction = function (self) {
            this._currIndex = 0;
            this._currActivate = false;
            this._currAction = this._actions[this._currIndex];
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i].onResetAction(self);
            }
        };
        //是否激活;
        ActionSequence.prototype.onIsActivate = function (self) {
            return !this.onIsComplete(self);
        };
        //逻辑Tick;
        ActionSequence.prototype.onTick = function (self, time, delay) {
            if (this._currAction) {
                this._currActivate = this._currActivate || this._currAction.onIsActivate(self);
                if (this._currActivate) {
                    this._currAction.onTick(self, time, delay);
                    if (this._currAction.onIsComplete(self)) {
                        this._currAction = null;
                        this._currIndex++;
                        if (this._currIndex < this._actions.length) {
                            this._currAction = this._actions[this._currIndex];
                            this._currActivate = this._currAction.onIsActivate(self);
                        }
                    }
                }
            }
        };
        //是否完成;
        ActionSequence.prototype.onIsComplete = function (self) {
            return this._currIndex >= this._actions.length;
        };
        return ActionSequence;
    }(egret3d.ActionNode));
    egret3d.ActionSequence = ActionSequence;
    __reflect(ActionSequence.prototype, "egret3d.ActionSequence");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ActionSequence.js.map