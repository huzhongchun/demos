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
    var TimeNode = (function () {
        function TimeNode() {
            this.time = 0;
            this.timeID = 0;
        }
        return TimeNode;
    }());
    egret3d.TimeNode = TimeNode;
    __reflect(TimeNode.prototype, "egret3d.TimeNode");
    var Tween = (function () {
        function Tween() {
        }
        Tween.prototype.timing = function (time, fun, obj) {
            var params = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                params[_i - 3] = arguments[_i];
            }
            var timeNode = new TimeNode();
            timeNode.timeID = setTimeout(function () { return fun.call.apply(fun, [obj].concat(params)); }, 
            //function complete() {
            //    fun.call(obj, params);
            //    clearTimeout(timeNode.timeID);
            //},
            time);
        };
        return Tween;
    }());
    egret3d.Tween = Tween;
    __reflect(Tween.prototype, "egret3d.Tween");
    egret3d.timemer = new Tween();
    var ProPatrolLogic = (function (_super) {
        __extends(ProPatrolLogic, _super);
        function ProPatrolLogic() {
            var _this = _super.call(this) || this;
            //简单AI参数
            _this.aiRadius = 1500;
            _this.isLongRange = false;
            _this.attackRange = 280;
            _this.keepMinRange = 180;
            _this.tickTime = 1001;
            _this.tickCycle = 1000;
            _this.eventTime = -1;
            _this.isParallel = false;
            return _this;
        }
        //根据仇恨？距离？
        ProPatrolLogic.prototype.getNear = function () {
            var nearActor;
            var min = this.aiRadius;
            for (var _i = 0, _a = this.performer.gameRoom.actorlist; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (this.performer.self != actor && actor.groupID != this.performer.self.groupID) {
                    var len = egret3d.Vector3D.distance(this.performer.self.position, actor.position);
                    if (min > len) {
                        min = len;
                        actor.distance = len;
                        nearActor = actor;
                    }
                }
            }
            return nearActor;
        };
        ProPatrolLogic.prototype.getNearPoint = function (target) {
            var angle = Math.random() * 360; // * MathUtil.DEGREES_TO_RADIANS ;
            var x = Math.sin(angle) * this.keepMinRange + target.position.x;
            var z = Math.cos(angle) * this.keepMinRange + target.position.z;
            egret3d.Vector3D.HELP_0.x = x;
            egret3d.Vector3D.HELP_0.z = z;
            return egret3d.Vector3D.HELP_0;
        };
        ProPatrolLogic.prototype.tick = function (time, delay) {
            if (this.tickTime > this.tickCycle) {
                this.tickTime = 0;
                var nearActor = this.getNear();
                if (nearActor) {
                    if (nearActor.groupID != 1 && nearActor.groupID != this.performer.self.groupID) {
                        var len = nearActor.distance;
                        if (len < this.aiRadius) {
                            // can fllow
                            if (len <= this.attackRange && (len > this.keepMinRange - 16 * 2 && len < this.keepMinRange + 16 * 2)) {
                                this.nextNode = [this.performer.logicList["AttackLogic"]];
                                this.performer.targetList.push(nearActor);
                                this.performer.targetList = [nearActor];
                                this.complete = true;
                            }
                            else {
                                //保持距离
                                var v = this.getNearPoint(nearActor);
                                var moveLogic = this.performer.logicList["MoveLogic"];
                                moveLogic.move(v);
                                this.performer.targetList = [nearActor];
                                this.nextNode = [moveLogic];
                                this.complete = true;
                            }
                        }
                        else {
                            //继续他自己的行为
                            this.performer.targetList.length = 0;
                        }
                    }
                }
            }
            this.tickTime += delay;
        };
        return ProPatrolLogic;
    }(egret3d.LogicNode));
    egret3d.ProPatrolLogic = ProPatrolLogic;
    __reflect(ProPatrolLogic.prototype, "egret3d.ProPatrolLogic");
    var ProMoveLogic = (function (_super) {
        __extends(ProMoveLogic, _super);
        function ProMoveLogic() {
            var _this = _super.call(this) || this;
            _this.targetPos = new egret3d.Vector3D();
            _this.tickDelay = 16 * 10;
            _this.time = 0;
            _this.eventTime = -1;
            _this.isParallel = false;
            return _this;
        }
        ProMoveLogic.prototype.move = function (targetPos) {
            this.targetPos.copyFrom(targetPos);
            this.performer.self.actorMoveTo(this.targetPos.x, 0, this.targetPos.z);
        };
        ProMoveLogic.prototype.tick = function (time, delay) {
            if (this.time > this.tickDelay) {
                if (!this.performer.self.isMove) {
                    this.complete = true;
                    this.nextNode = [this.performer.logicList["PatrolLogic"]];
                    this.performer.self.actorTrunToDirection(this.targetPos.x, this.targetPos.z);
                }
                else
                    this.move(this.targetPos);
                this.time = 0;
            }
            this.time += delay;
        };
        return ProMoveLogic;
    }(egret3d.LogicNode));
    egret3d.ProMoveLogic = ProMoveLogic;
    __reflect(ProMoveLogic.prototype, "egret3d.ProMoveLogic");
    var ProHitLogic = (function (_super) {
        __extends(ProHitLogic, _super);
        function ProHitLogic() {
            var _this = _super.call(this) || this;
            _this.time = 0;
            _this.eventTime = -1;
            _this.isParallel = false;
            return _this;
        }
        ProHitLogic.prototype.tick = function (time, delay) {
            if (!this.complete) {
                this.tickOnce();
                this.complete = true;
            }
        };
        ProHitLogic.prototype.tickOnce = function () {
            //var effect = effectManager.getEffect("FX_Hit_01");
            var effect = egret3d.effectManager.getEffect("FX_Hit_03");
            var camera = egret3d.gameCameraManager.currentCamera;
            if (effect) {
                effect.play(1, true);
                this.performer.targetList[0].parent.addChild(effect);
                this.performer.targetList[0].position.subtract(camera.position, egret3d.Vector3D.HELP_0);
                egret3d.Vector3D.HELP_0.normalize();
                egret3d.Vector3D.HELP_0.scaleBy(100);
                effect.x = -egret3d.Vector3D.HELP_0.x + this.performer.targetList[0].x;
                effect.y = -egret3d.Vector3D.HELP_0.y + this.performer.targetList[0].y;
                effect.z = -egret3d.Vector3D.HELP_0.z + this.performer.targetList[0].z;
            }
        };
        return ProHitLogic;
    }(egret3d.LogicNode));
    egret3d.ProHitLogic = ProHitLogic;
    __reflect(ProHitLogic.prototype, "egret3d.ProHitLogic");
    var ProAttackLogic = (function (_super) {
        __extends(ProAttackLogic, _super);
        function ProAttackLogic() {
            var _this = _super.call(this) || this;
            _this.time = 2000;
            _this.eventTime = -1;
            _this.isParallel = false;
            return _this;
        }
        ProAttackLogic.prototype.tick = function (time, delay) {
            if (this.performer.targetList.length > 0) {
                this.player = this.performer.self.itemConfig;
                var target = this.performer.targetList[0];
                if (this.time > this.player.attack_speed * 2) {
                    var len = egret3d.Vector3D.distance(this.performer.self.position, target.position);
                    //还在攻击范围内
                    if (len < 280) {
                        egret3d.Vector3D.HELP_0.x = -(this.performer.self.x - target.position.x);
                        egret3d.Vector3D.HELP_0.z = -(this.performer.self.z - target.position.z);
                        egret3d.Vector3D.HELP_0.normalize();
                        this.performer.self.actorTrunToDirection(egret3d.Vector3D.HELP_0.x, egret3d.Vector3D.HELP_0.z);
                        // this.normalAttack();
                        var random = Math.floor(Math.random() * 5);
                        switch (random) {
                            case 0:
                                this.cast_skill1();
                                break;
                            case 1:
                                this.cast_skill2();
                                break;
                            case 2:
                                this.cast_skill3();
                                break;
                            case 3:
                                this.cast_skill4();
                                break;
                            case 4:
                                this.normalAttack();
                                break;
                        }
                        //uiManager.blood(target,1);
                        uiManager.blood(target, 1);
                    }
                    else {
                        this.complete = true;
                        this.nextNode.push(this.performer.logicList["PatrolLogic"]);
                    }
                    this.time = 0;
                }
            }
            this.time += delay;
        };
        //播放 普通攻击
        ProAttackLogic.prototype.normalAttack = function () {
            this.playAudio("player/Swish_Knife_06.wav");
            this.performer.self.changeState("Attack01", 1, true);
            //timemer.timing(650, () => this.activeHit());
        };
        //播放 第1个技能
        ProAttackLogic.prototype.cast_skill1 = function () {
            this.playAudio("player/Executor_chop.wav");
            this.performer.self.changeState("Skill01", 1, true);
            //timemer.timing(528, () => this.playSkill_effect("Fx_Skill1", 1));
            //timemer.timing(528, () => this.activeHit());
        };
        //播放 第2个技能
        ProAttackLogic.prototype.cast_skill2 = function () {
            this.performer.self.changeState("Skill02", 1, true);
            //  timemer.timing(4 * 33, () => this.playSkill_effect("Fx_Skill2_1", 1));
            //timemer.timing(4 * 33, () => this.activeHit());
            // timemer.timing(4 * 33, (n) => this.playAudio("player/Azrael_Normal_2_2.wav"));
            //   timemer.timing(9 * 33, () => this.playSkill_effect("Fx_Skill2_2", 1));
            //timemer.timing(9 * 33, () => this.activeHit());
            //   timemer.timing(9 * 33, (n) => this.playAudio("player/Azrael_Normal_2_1.wav"));
            //    timemer.timing(20 * 33, () => this.playSkill_effect("Fx_Skill2_3", 1));
            //timemer.timing(20 * 33, () => this.activeHit());
            //    timemer.timing(20 * 33, (n) => this.playAudio("player/Azrael_Skill_1_2.wav"));
        };
        //播放 第3个技能
        ProAttackLogic.prototype.cast_skill3 = function () {
            this.performer.self.changeState("Skill03", 1, true);
            this.playAudio("player/Executor_earthquake.wav");
            //     timemer.timing(9 * 33, () => this.playSkill_effect("Fx_Skill3_1", 1));
            //timemer.timing(9 * 33, (n) => this.playAudio("player/Executor_earthquake.wav?"));
            //timemer.timing(10 * 33, () => this.activeHit());
        };
        //播放 第4个技能
        ProAttackLogic.prototype.cast_skill4 = function () {
            this.performer.self.changeState("Skill04", 1, true);
            //      timemer.timing(7 * 33, () => this.playSkill_effect("Fx_Skill4", 1));
            //      timemer.timing(7 * 33, (n) => this.playAudio("player/attack02.wav"));
            //      timemer.timing(8 * 33, () => this.activeHit());
            //      timemer.timing(17 * 33, () => this.activeHit());
            //      timemer.timing(19 * 33, () => this.activeHit());
            //      timemer.timing(43 * 33, () => this.activeHit());
        };
        //----------------------------------------------------------------
        //播放 音效
        ProAttackLogic.prototype.playAudio = function (name) {
            audio.audioManager.play("resource/sound/" + name);
        };
        //播放 第一个技能动画特效
        ProAttackLogic.prototype.playSkill_effect = function (name, speed) {
            var effect = egret3d.effectManager.getEffect(name);
            if (effect) {
                effect.play(speed, true);
                effect.x = this.performer.self.x;
                effect.y = this.performer.self.y;
                effect.z = this.performer.self.z;
                effect.rotationY = this.performer.self.rotationY;
                this.performer.self.parent.addChild(effect);
            }
        };
        //播放 受伤
        ProAttackLogic.prototype.activeHit = function () {
            ////暂时挪出 受伤hit logic
            //this.playAudio("player/hit/hit_skill04.wav");
            ////this.immediatelyNodes.push(this.performer.logicList["ProHitLogic"]);
            //var effect = effectManager.getEffect("FX_Hit_01");
            //var camera: Camera3D = gameCameraManager.currentCamera;
            //if (effect) {
            //    effect.play(1, true);
            //    this.performer.targetList[0].parent.addChild(effect);
            //    this.performer.targetList[0].position.subtract(camera.position, Vector3D.HELP_0);
            //    Vector3D.HELP_0.normalize();
            //    Vector3D.HELP_0.scaleBy(100);
            //    effect.x = -Vector3D.HELP_0.x + this.performer.targetList[0].x;
            //    effect.y = -Vector3D.HELP_0.y + this.performer.targetList[0].y;
            //    effect.z = -Vector3D.HELP_0.z + this.performer.targetList[0].z;
            //}
        };
        return ProAttackLogic;
    }(egret3d.LogicNode));
    egret3d.ProAttackLogic = ProAttackLogic;
    __reflect(ProAttackLogic.prototype, "egret3d.ProAttackLogic");
    //逻辑执行者
    var ProLogicPerformer = (function (_super) {
        __extends(ProLogicPerformer, _super);
        function ProLogicPerformer() {
            var _this = _super.call(this) || this;
            _this._immediatelyNodes = [];
            return _this;
        }
        ProLogicPerformer.prototype.initConfig = function (item) {
        };
        ProLogicPerformer.prototype.addNode = function (node) {
            this.logicList[node.name] = node;
            node.performer = this;
        };
        ProLogicPerformer.prototype.startLogic = function (name) {
            if (this.logicList[name]) {
                this._parallelLogic.push(this.logicList[name]);
                this._run = true;
            }
        };
        ProLogicPerformer.prototype.tick = function (time, delay) {
            if (this._run) {
                for (var _i = 0, _a = this._parallelLogic; _i < _a.length; _i++) {
                    var node = _a[_i];
                    if (node.complete) {
                        //移除不需要执行的
                        var index = this._parallelLogic.indexOf(node);
                        this._parallelLogic.splice(index);
                        //插入要执行的
                        this.apendNext(node);
                    }
                    else
                        this.apendImmediately(node);
                }
                for (var _b = 0, _c = this._immediatelyNodes; _b < _c.length; _b++) {
                    var node = _c[_b];
                    if (!node.complete) {
                        this.apendImmediately(node);
                    }
                }
                for (var _d = 0, _e = this._parallelLogic; _d < _e.length; _d++) {
                    var node = _e[_d];
                    node.tick(time, delay);
                }
                for (var _f = 0, _g = this._immediatelyNodes; _f < _g.length; _f++) {
                    var node = _g[_f];
                    node.tick(time, delay);
                }
            }
        };
        ProLogicPerformer.prototype.apendNext = function (node) {
            for (var _i = 0, _a = node.nextNode; _i < _a.length; _i++) {
                var n = _a[_i];
                this._parallelLogic.push(n);
                n.complete = false;
            }
            node.nextNode.length = 0;
        };
        ProLogicPerformer.prototype.apendImmediately = function (node) {
            for (var _i = 0, _a = node.immediatelyNodes; _i < _a.length; _i++) {
                var n = _a[_i];
                this._immediatelyNodes.push(n);
                n.complete = false;
            }
            node.immediatelyNodes.length = 0;
        };
        return ProLogicPerformer;
    }(egret3d.LogicPerformer));
    egret3d.ProLogicPerformer = ProLogicPerformer;
    __reflect(ProLogicPerformer.prototype, "egret3d.ProLogicPerformer");
    var ProtagonistLogic = (function (_super) {
        __extends(ProtagonistLogic, _super);
        function ProtagonistLogic() {
            return _super.call(this) || this;
        }
        ProtagonistLogic.prototype.initConfig = function (item) {
            var patrol = new ProPatrolLogic();
            this.proAttackLogic = new ProAttackLogic();
            var move = new ProMoveLogic();
            var hit = new ProHitLogic();
            patrol.name = "PatrolLogic";
            this.proAttackLogic.name = "AttackLogic";
            move.name = "MoveLogic";
            hit.name = "ProHitLogic";
            this.addNode(patrol);
            this.addNode(this.proAttackLogic);
            this.addNode(move);
            this.addNode(hit);
        };
        ProtagonistLogic.prototype.startLogic = function (name) {
            _super.prototype.startLogic.call(this, name);
        };
        ProtagonistLogic.prototype.tick = function (time, delay) {
            _super.prototype.tick.call(this, time, delay);
        };
        return ProtagonistLogic;
    }(ProLogicPerformer));
    egret3d.ProtagonistLogic = ProtagonistLogic;
    __reflect(ProtagonistLogic.prototype, "egret3d.ProtagonistLogic");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ProtagonistLogic.js.map