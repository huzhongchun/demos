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
    //巡逻到指定点的Action;
    var ActionAttackTo = (function (_super) {
        __extends(ActionAttackTo, _super);
        function ActionAttackTo(targetPoint) {
            var _this = _super.call(this) || this;
            _this._attackTarget = null;
            _this._targetPoint = targetPoint;
            _this._actionAttackTarget = null;
            return _this;
        }
        //重置行为对象;
        ActionAttackTo.prototype.onResetAction = function (self) {
            this._attackTarget = null;
        };
        //是否激活;
        ActionAttackTo.prototype.onIsActivate = function (self) {
            return !this.onIsComplete(self);
        };
        //逻辑Tick;
        ActionAttackTo.prototype.onTick = function (self, time, delay) {
            if (this._actionAttackTarget) {
                this._actionAttackTarget.onTick(self, time, delay);
                if (this._actionAttackTarget.onIsComplete(self)) {
                    this._attackTarget = null;
                    this._actionAttackTarget = null;
                }
            }
            else if (this._actionMoveTo) {
                this._actionMoveTo.onTick(self, time, delay);
                if (this._actionMoveTo && this._actionMoveTo.onIsComplete(self)) {
                    this._actionMoveTo = null;
                    self.isMove = false;
                }
            }
            else {
                var enemyActors = [];
                self.findNearEnemy(enemyActors);
                if (enemyActors.length > 0 && egret3d.Vector3D.distance(enemyActors[0].position, self.position) < self.itemConfig.attack_range) {
                    this._actionAttackTarget = new egret3d.ActionAttackTarget(this._attackTarget = enemyActors[0], self.itemConfig.skill_0_id);
                    this._actionAttackTarget.onIsActivate(self);
                    this._actionMoveTo = null;
                    self.isMove = false;
                    //self.animLock = true;
                    self.changeState("Idle", 1.0, false);
                }
                else {
                    var nav = egret3d.sceneManager.currentScene.nav;
                    if (nav.xToGridX(self.position.x) != nav.xToGridX(this._targetPoint.x) || nav.yToGridY(self.position.z) != nav.yToGridY(this._targetPoint.z)) {
                        this._actionMoveTo = new egret3d.ActionMoveTo(this._targetPoint);
                        this._actionMoveTo.onIsActivate(self);
                        this._actionMoveTo.setTestCallback(function () {
                            var enemyActors = [];
                            self.findNearEnemy(enemyActors);
                            if (enemyActors.length > 0 && egret3d.Vector3D.distance(enemyActors[0].position, self.position) < self.itemConfig.attack_range) {
                                this._actionAttackTarget = new egret3d.ActionAttackTarget(this._attackTarget = enemyActors[0], self.itemConfig.skill_0_id);
                                this._actionAttackTarget.onIsActivate(self);
                                this._actionMoveTo = null;
                                self.isMove = false;
                                //self.animLock = true;
                                self.changeState("Idle", 1.0, false);
                                return false;
                            }
                            return true;
                        }, this);
                    }
                }
            }
        };
        //是否完成;
        ActionAttackTo.prototype.onIsComplete = function (self) {
            if (this._attackTarget) {
                return false;
            }
            else if (egret3d.Vector3D.distance(self.position, this._targetPoint) > 24) {
                return false;
            }
            else {
                var enemyActors = [];
                self.findNearEnemy(enemyActors);
                if (enemyActors.length > 0 && egret3d.Vector3D.distance(enemyActors[0].position, self.position) < self.itemConfig.attack_range) {
                    return false;
                }
            }
            self.isMove = false;
            return true;
        };
        return ActionAttackTo;
    }(egret3d.ActionNode));
    egret3d.ActionAttackTo = ActionAttackTo;
    __reflect(ActionAttackTo.prototype, "egret3d.ActionAttackTo");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ActionAttackTo.js.map