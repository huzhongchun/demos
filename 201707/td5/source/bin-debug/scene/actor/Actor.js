var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActorState;
(function (ActorState) {
    ActorState[ActorState["Idle"] = 0] = "Idle";
    ActorState[ActorState["Move"] = 1] = "Move";
    ActorState[ActorState["Attack"] = 2] = "Attack";
    ActorState[ActorState["Death"] = 3] = "Death";
})(ActorState || (ActorState = {}));
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        var _this = _super.call(this) || this;
        _this.isMove = false;
        _this.onHeight = 0;
        _this.moveSpeed = 400;
        _this.hasHeight = false;
        _this.rotSpeed = 0.82; //转身速度 (角度/s)
        _this.rotTime = 800; //转身速度 (角度/s)
        _this._clinetCurrentPose = new egret3d.Vector3D(); //当前存在的点
        _this._movTargetPose = new egret3d.Vector3D;
        _this._wayFixedSpeed = 1;
        _this._runToTargetAngle = 0; //要旋转到指定角度
        _this._curAngle = 0; //当前逻辑角度 [-180, 180]
        _this._posAngle = 0; //当前身体角度 [-180, 180] (显示角度)
        _this._roting = true; //0不转身, -1, 1
        _this._wayDirection = new egret3d.Vector3D(1, 1, 1);
        _this._wayFixSpeed = 0;
        _this._time = 0;
        _this._delay = 0;
        _this._lessDdistance = 0;
        _this._moveNeedTime = 0;
        _this._rotNeedTime = 0;
        _this._numTime = 800;
        _this._currentTime = 0;
        _this._lessAngle = 0;
        _this._delayValue = 0.82;
        _this._maxRot = 0.0;
        _this._start = false;
        _this._pathLength = 0;
        _this._pathPoint = [];
        _this._temp_vecA = new egret3d.Vector3D();
        _this._movePathX = [];
        _this._movePathZ = [];
        _this._movePathIndex = 0;
        return _this;
    }
    Object.defineProperty(Actor.prototype, "roting", {
        get: function () {
            return this._roting;
        },
        set: function (value) {
            this._roting = value;
        },
        enumerable: true,
        configurable: true
    });
    Actor.prototype.setState = function (state) {
        if (this._state == state)
            return;
        this._state = state;
    };
    //public get currentAngle(): Number {
    //    return -_posAngle + 90;
    //}
    /**
     *
     * @param sx 服务器当前目标点 serverCurrentPose
     * @param sz 服务器当前目标点 serverCurrentPose
     */
    Actor.prototype.actorMoveTo = function (sx, sy, sz, turnDir) {
        if (turnDir === void 0) { turnDir = true; }
        this._movTargetPose.x = sx;
        this._movTargetPose.y = sy;
        this._movTargetPose.z = sz;
        this._wayDirection.x = -(this._clinetCurrentPose.x - this._movTargetPose.x);
        this._wayDirection.z = -(this._clinetCurrentPose.z - this._movTargetPose.z);
        this._lessDdistance = egret3d.Vector3D.distance(this.position, this._movTargetPose);
        if (this._lessDdistance == undefined || isNaN(this._lessDdistance)) {
            this._lessDdistance = 0;
        }
        this._moveNeedTime = this._lessDdistance / (this.moveSpeed * 0.001);
        if (!(this._wayDirection.x == 0 && this._wayDirection.z == 0))
            this._wayDirection.normalize();
        if (isNaN(this._wayDirection.x) && isNaN(this._wayDirection.z)) {
            this._wayDirection.x = 0;
            this._wayDirection.z = 0;
        }
        this.actorTrunToDirection(this._wayDirection.x, this._wayDirection.z);
        this.isMove = true;
        this.setState(ActorState.Move);
        return;
    };
    Actor.prototype.actorMoveToEx = function (pointX, pointZ) {
        this._movePathX = pointX;
        this._movePathZ = pointZ;
        this._movePathIndex = 0;
        //GameWorld.Pathinstance.to3DPoint(this._moveGridX[this._moveGridIndex], this._moveGridZ[this._moveGridIndex], this._temp_vecA);
        this.actorMoveTo(this._movePathX[this._movePathIndex], 0, this._movePathZ[this._movePathIndex]);
    };
    Actor.prototype.actorMoveStop = function () {
        if (this.isMove) {
            this.isMove = false;
        }
    };
    Actor.prototype.jumpTo = function (x, z) {
        this.x = this._clinetCurrentPose.x = x;
        this.z = this._clinetCurrentPose.z = z;
    };
    //public lockUnit(target: Unit): void {
    //    this._movTargetPose.x = target.x;
    //    this._movTargetPose.y = 0;
    //    this._movTargetPose.z = target.z;
    //    this._wayDirection.x = -(this._clinetCurrentPose.x - this._movTargetPose.x);
    //    this._wayDirection.z = -(this._clinetCurrentPose.z - this._movTargetPose.z);
    //    this._lessDdistance = egret3d.Vector3D.distance(this.position, this._movTargetPose);
    //    this._moveNeedTime = this._lessDdistance / (this.moveSpeed * 0.001);
    //    if (!(this._wayDirection.x == 0 && this._wayDirection.z == 0))
    //        this._wayDirection.normalize();
    //    if (isNaN(this._wayDirection.x) && isNaN(this._wayDirection.z)) {
    //        this._wayDirection.x = 0;
    //        this._wayDirection.z = 0;
    //    }
    //    this.actorTrunToDirection(this._wayDirection.x, this._wayDirection.z);
    //}
    Actor.prototype.actorTrunToDirection = function (dx, dy) {
        this._runToTargetAngle = EMathEx.normalizeAngle(Math.atan2(dy, dx) * egret3d.MathUtil.RADIANS_TO_DEGREES);
        this._posAngle = this._runToTargetAngle;
        this._rotNeedTime = this.rotTime;
    };
    Actor.prototype.update = function (time, delay, camera) {
        this._delay = delay;
        this._time = time;
        if (this._roting) {
            this._posAngle = this.updateRotion(this._delay, this._runToTargetAngle);
        }
        else
            this._posAngle = this._runToTargetAngle;
        this.rotationY = this.currentAngle;
        //if (!this.isMove) return;
        //while (delay > 0) {
        //    this._moveNeedTime -= delay;
        //    if (this._moveNeedTime >= 0) {
        //        //实时修正目前的速度
        //        this._wayFixSpeed = delay * 0.001 * this.moveSpeed;
        //        this.x = this._clinetCurrentPose.x += this._wayDirection.x * this._wayFixSpeed;
        //        this.z = this._clinetCurrentPose.z += this._wayDirection.z * this._wayFixSpeed;
        //        delay = 0;
        //    }
        //    else {
        //        this.x = this._clinetCurrentPose.x = this._movTargetPose.x;
        //        this.z = this._clinetCurrentPose.z = this._movTargetPose.z;
        //        if (this._movePathIndex + 1 >= this._movePathX.length) {
        //            this.isMove = false;
        //            this.setState(ActionState.AS_IDLE);
        //            break;
        //        }
        //        else {
        //            delay = -this._moveNeedTime;
        //            this._movePathIndex++;
        //            this.actorMoveTo(this._movePathX[this._movePathIndex], 0, this._movePathZ[this._movePathIndex]);
        //        }
        //    }
        //}
    };
    Actor.prototype.updateRotion = function (deltaTime, newDir) {
        if (this._rotNeedTime >= 0) {
            var deltaAngle = newDir - (this._curAngle % 360);
            if (deltaAngle == 0.0)
                return this._curAngle;
            deltaAngle = EMathEx.normalizeAngle(deltaAngle);
            this._currentTime = 0;
            if (this._numTime != this._rotNeedTime)
                this._currentTime = (this._numTime - this._rotNeedTime) / this._numTime;
            this._lessAngle = (1.0 - (1.0 - this._currentTime) * (1.0 - this._currentTime) * this.rotSpeed);
            if (deltaAngle > 0.0)
                this._maxRot = -Math.abs(deltaAngle * this._lessAngle);
            else
                this._maxRot = Math.abs(deltaAngle * this._lessAngle);
            this._curAngle -= this._maxRot;
        }
        var tmp = EMathEx.normalizeAngle(this._curAngle);
        this._rotNeedTime = this._rotNeedTime - deltaTime;
        return tmp;
    };
    Object.defineProperty(Actor.prototype, "currentAngle", {
        get: function () {
            return -this._posAngle + 90;
        },
        enumerable: true,
        configurable: true
    });
    return Actor;
}(egret3d.Object3D));
__reflect(Actor.prototype, "Actor");
//# sourceMappingURL=Actor.js.map