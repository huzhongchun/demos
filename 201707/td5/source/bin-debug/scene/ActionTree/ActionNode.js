var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var ActionNode = (function () {
        function ActionNode() {
        }
        //重置行为对象;
        ActionNode.prototype.onResetAction = function (self) {
        };
        //是否激活;
        ActionNode.prototype.onIsActivate = function (self) {
            return false;
        };
        //逻辑Tick;
        ActionNode.prototype.onTick = function (self, time, delay) {
        };
        //是否完成;
        ActionNode.prototype.onIsComplete = function (self) {
            return true;
        };
        return ActionNode;
    }());
    egret3d.ActionNode = ActionNode;
    __reflect(ActionNode.prototype, "egret3d.ActionNode");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ActionNode.js.map