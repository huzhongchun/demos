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
    //移动到指定位置的行为;
    var ActionMoveTo = (function (_super) {
        __extends(ActionMoveTo, _super);
        function ActionMoveTo(targetPoint) {
            var _this = _super.call(this) || this;
            _this._currIndex = 0;
            _this._moveNeedTime = 0;
            _this._pathPoints = [];
            _this._direction = new egret3d.Vector3D();
            _this._targetPoint = targetPoint;
            return _this;
        }
        ActionMoveTo.prototype.setTestCallback = function (callbackFun, callbackObj) {
            this._callbackObj = callbackObj;
            this._callbackFun = callbackFun;
        };
        //重置目标点;
        ActionMoveTo.prototype.resetTargetPoint = function (targetPoint) {
            this._targetPoint = targetPoint;
        };
        //重置行为对象;
        ActionMoveTo.prototype.onResetAction = function (self) {
            this.updatePathPoints(self);
        };
        //是否激活;
        ActionMoveTo.prototype.onIsActivate = function (self) {
            if (this._pathPoints.length <= 0) {
                //这里调用寻路返回的路径点;
                this.updatePathPoints(self);
            }
            return this._moveNeedTime > 0;
        };
        //逻辑Tick;
        ActionMoveTo.prototype.onTick = function (self, time, delay) {
            var nav = egret3d.sceneManager.currentScene.nav;
            while (delay > 0) {
                if (this._currIndex >= this._pathPoints.length || self.lockMove) {
                    break;
                }
                this._moveNeedTime -= delay;
                self.isMove = true;
                self.changeState("Run", 1.0, false);
                if (this._moveNeedTime >= 0) {
                    var value = delay * 0.001 * self.moveSpeed;
                    var oldX = nav.xToGridX(this._pathPoints[this._currIndex].x);
                    var oldZ = nav.yToGridY(this._pathPoints[this._currIndex].z);
                    if (false == nav.isPass(oldX, oldZ) && nav.getUserData(oldX, oldZ) != self.actorId) {
                        this.updatePathPoints(self);
                        if (this._currIndex >= this._pathPoints.length) {
                            break;
                        }
                    }
                    else {
                        if (nav.getUserData(nav.xToGridX(self.x), nav.yToGridY(self.z)) == self.actorId) {
                            nav.setUserData(nav.xToGridX(self.x), nav.yToGridY(self.z), 0);
                        }
                        self.x += this._direction.x * value;
                        self.z += this._direction.z * value;
                        if (nav.getUserData(nav.xToGridX(self.x), nav.yToGridY(self.z)) == 0) {
                            nav.setUserData(nav.xToGridX(self.x), nav.yToGridY(self.z), self.actorId);
                        }
                    }
                    delay = 0;
                }
                else {
                    delay = -this._moveNeedTime;
                    self.x = this._pathPoints[this._currIndex].x;
                    self.z = this._pathPoints[this._currIndex].z;
                    if (this._callbackFun && (nav.isPass(nav.xToGridX(self.x), nav.yToGridY(self.z)) || nav.getUserData(nav.xToGridX(self.x), nav.yToGridY(self.z)) == self.actorId)) {
                        if (false == this._callbackFun.call(this._callbackObj, this)) {
                            break;
                        }
                    }
                    if (this._currIndex + 1 >= this._pathPoints.length) {
                        this._moveNeedTime = 0;
                        this._currIndex = this._pathPoints.length;
                        break;
                    }
                    this.moveTo(self, this._pathPoints[++this._currIndex]);
                }
            }
        };
        //是否完成;
        ActionMoveTo.prototype.onIsComplete = function (self) {
            if (this._moveNeedTime <= 0 && this._currIndex >= this._pathPoints.length) {
                self.isMove = false;
                self.changeState("Idle", 1.0, false);
                return true;
            }
            return false;
        };
        ActionMoveTo.prototype.moveTo = function (self, targetPoint) {
            this._moveNeedTime = egret3d.Vector3D.distance(self.position, targetPoint) / (self.moveSpeed * 0.001);
            targetPoint.subtract(self.position, this._direction);
            this._direction.normalize();
            self.actorTrunToDirection(this._direction.x, this._direction.z);
            self.isMove = true;
            //self.changeState("Run", 1.0, false);
        };
        ActionMoveTo.prototype.updatePathPoints = function (self) {
            this._currIndex = 0;
            this._moveNeedTime = 0;
            var nav = egret3d.sceneManager.currentScene.nav;
            egret3d.sceneManager.currentScene.nav.findPath(self.position, this._targetPoint, this._pathPoints);
            if (this._pathPoints.length > 0) {
                this.moveTo(self, this._pathPoints[this._currIndex]);
            }
        };
        return ActionMoveTo;
    }(egret3d.ActionNode));
    egret3d.ActionMoveTo = ActionMoveTo;
    __reflect(ActionMoveTo.prototype, "egret3d.ActionMoveTo");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ActionMoveTo.js.map