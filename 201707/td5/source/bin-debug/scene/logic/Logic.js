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
    var DamageTools = (function () {
        function DamageTools() {
            this.gameDefenseFactor = 0.06;
        }
        //判定暴击
        DamageTools.prototype.preCrit = function (skillsItem, selfActor) {
            var isCrit = false;
            selfActor.detailActorData.crit = selfActor.actorData.crit + skillsItem.crit;
            selfActor.detailActorData.isCrit = Math.random() > (1 - selfActor.detailActorData.crit);
            return selfActor.detailActorData.isCrit;
        };
        DamageTools.prototype.calculateDamage = function (skillsItem, selfActor, targetActors) {
            var DEF;
            var ATT;
            for (var _i = 0, targetActors_1 = targetActors; _i < targetActors_1.length; _i++) {
                var target = targetActors_1[_i];
                if (target.actorData.defense > 0) {
                    DEF = 1.0 - (target.actorData.defense * this.gameDefenseFactor) / ((target.actorData.defense * this.gameDefenseFactor) + 1);
                }
                else {
                    DEF = (1.0 - 2 - Math.pow((1 - this.gameDefenseFactor), target.actorData.defense));
                }
                ATT = (1.0 + selfActor.detailActorData.critDamage) * ((skillsItem.attack_ad + skillsItem.attack_ap + selfActor.actorData.attack) * DEF);
                ATT = Math.ceil(ATT);
                //记录下要扣除的值
                //self
                selfActor.detailActorData.mp = skillsItem.mp;
                //target
                target.detailActorData.hp = ATT;
                target.actorData.hp = target.actorData.hp - ATT;
            }
        };
        return DamageTools;
    }());
    egret3d.DamageTools = DamageTools;
    __reflect(DamageTools.prototype, "egret3d.DamageTools");
    egret3d.damageTools = new DamageTools();
    //逻辑样式节点
    var LogicNode = (function () {
        function LogicNode() {
            this.eventTime = 0;
            //是否并行
            this.isParallel = false;
            this.nextNode = [];
            this.immediatelyNodes = [];
            this.complete = false;
        }
        //public start() {
        //}
        LogicNode.prototype.tick = function (time, delay) {
        };
        LogicNode.prototype.decision = function () {
            // to add decision next
        };
        return LogicNode;
    }());
    egret3d.LogicNode = LogicNode;
    __reflect(LogicNode.prototype, "egret3d.LogicNode");
    var DelayLogic = (function (_super) {
        __extends(DelayLogic, _super);
        function DelayLogic() {
            var _this = _super.call(this) || this;
            _this.delayTime = 0;
            _this.eventTime = 0;
            _this.isParallel = false;
            return _this;
        }
        DelayLogic.prototype.tick = function (time, delay) {
            this.delayTime -= delay;
            if (this.delayTime < 0) {
                this.complete = true;
                this.nextNode = [this.performer.logicList["StartGameLogic"]];
            }
        };
        DelayLogic.prototype.decision = function () {
            // to add decision next
        };
        return DelayLogic;
    }(LogicNode));
    egret3d.DelayLogic = DelayLogic;
    __reflect(DelayLogic.prototype, "egret3d.DelayLogic");
    var StartGameLogic = (function (_super) {
        __extends(StartGameLogic, _super);
        function StartGameLogic() {
            var _this = _super.call(this) || this;
            _this.eventTime = 0;
            _this.isParallel = false;
            return _this;
        }
        StartGameLogic.prototype.tick = function (time, delay) {
            this.complete = true;
            this.nextNode = [this.performer.logicList["MobLogic"]];
        };
        StartGameLogic.prototype.decision = function () {
            // to add decision next
        };
        return StartGameLogic;
    }(LogicNode));
    egret3d.StartGameLogic = StartGameLogic;
    __reflect(StartGameLogic.prototype, "egret3d.StartGameLogic");
    var MobLogic = (function (_super) {
        __extends(MobLogic, _super);
        function MobLogic() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.nextWave = 100000;
            _this.time = 0;
            _this.mobDelayTime = 1000;
            _this.monstCount = 0;
            _this.gameTime = 0;
            return _this;
            //出怪逻辑在LogicManager.ts -> GameLevel;
            //constructor() {
            //    super();
            //    this.eventTime = -1;
            //    this.isParallel = false;
            //}
            //public tick(time: number, delay: number) {
            //    var waveItem: WaveItem = TableManager.findWaveTableItem(this.nextWave);
            //    waveItem.monsterA_num = 1;
            //    if (this.monstCount<waveItem.monsterA_num){
            //        if (this.time > this.mobDelayTime) {
            //            this.time = 0;
            //            //刷一个怪
            //            var v = JSON_Util.getVector3D(this.performer.gameRoom.sceneItem.monster_point_0);
            //            var v2 = JSON_Util.getVector3D(this.performer.gameRoom.sceneItem.host_point);
            //            var gameActor: GameActor = this.performer.gameRoom.addRole(waveItem.monsterA_id, 2,false);
            //            gameActor.jumpTo(v.x, v.z);
            //            v2.x = Math.random() * 300 - 150 + v2.x;
            //            v2.z = Math.random() * 300 - 150 + v2.z;
            //            //gameActor.actorMoveTo(v2.x, 0, v2.z);
            //            gameActor.performer = gameActor.performer || new MonsterLogic();
            //            gameActor.performer.self = gameActor;
            //            gameActor.performer.gameRoom = this.performer.gameRoom;
            //            gameActor.performer.initConfig(null);
            //            gameActor.performer.startLogic("PatrolLogic");
            //            //指定怪物AI;
            //            gameActor.runAction(new ActionRepeat(new ActionSequence([new ActionAttackTo(JSON_Util.getVector3D(this.performer.gameRoom.sceneItem.host_point)), new ActionDelay(400)]), -1) );
            //            this.monstCount++;
            //        }
            //    }
            //    else {
            //        this.monstCount = 0;
            //        this.time = 0;
            //        this.nextWave = waveItem.next_wave;
            //        this.nextNode = [];
            //        this.complete = true;
            //    }
            //    this.time += delay;
            //    this.gameTime += delay;
            //}
        }
        return MobLogic;
    }(LogicNode));
    egret3d.MobLogic = MobLogic;
    __reflect(MobLogic.prototype, "egret3d.MobLogic");
    var PatrolLogic = (function (_super) {
        __extends(PatrolLogic, _super);
        function PatrolLogic() {
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
        PatrolLogic.prototype.getNear = function () {
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
        PatrolLogic.prototype.getNearPoint = function (target) {
            var angle = Math.random() * 360; // * MathUtil.DEGREES_TO_RADIANS ;
            var x = Math.sin(angle) * this.keepMinRange + target.position.x;
            var z = Math.cos(angle) * this.keepMinRange + target.position.z;
            egret3d.Vector3D.HELP_0.x = x;
            egret3d.Vector3D.HELP_0.z = z;
            return egret3d.Vector3D.HELP_0;
        };
        PatrolLogic.prototype.tick = function (time, delay) {
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
        return PatrolLogic;
    }(LogicNode));
    egret3d.PatrolLogic = PatrolLogic;
    __reflect(PatrolLogic.prototype, "egret3d.PatrolLogic");
    var MoveLogic = (function (_super) {
        __extends(MoveLogic, _super);
        function MoveLogic() {
            var _this = _super.call(this) || this;
            _this.targetPos = new egret3d.Vector3D();
            _this.tickDelay = 16 * 10;
            _this.time = 0;
            _this.eventTime = -1;
            _this.isParallel = false;
            return _this;
        }
        MoveLogic.prototype.move = function (targetPos) {
            this.targetPos.copyFrom(targetPos);
            this.performer.self.actorMoveTo(this.targetPos.x, 0, this.targetPos.z);
        };
        MoveLogic.prototype.tick = function (time, delay) {
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
        return MoveLogic;
    }(LogicNode));
    egret3d.MoveLogic = MoveLogic;
    __reflect(MoveLogic.prototype, "egret3d.MoveLogic");
    var AttackLogic = (function (_super) {
        __extends(AttackLogic, _super);
        function AttackLogic() {
            var _this = _super.call(this) || this;
            _this.time = 0;
            _this.eventTime = -1;
            _this.isParallel = false;
            return _this;
        }
        AttackLogic.prototype.tick = function (time, delay) {
            if (this.performer.targetList.length > 0) {
                this.player = this.performer.self.itemConfig;
                var target = this.performer.targetList[0];
                if (this.time > this.player.attack_speed * 5) {
                    var len = egret3d.Vector3D.distance(this.performer.self.position, target.position);
                    //还在攻击范围内
                    if (len < 280) {
                        egret3d.Vector3D.HELP_0.x = -(this.performer.self.x - target.position.x);
                        egret3d.Vector3D.HELP_0.z = -(this.performer.self.z - target.position.z);
                        egret3d.Vector3D.HELP_0.normalize();
                        this.performer.self.actorTrunToDirection(egret3d.Vector3D.HELP_0.x, egret3d.Vector3D.HELP_0.z);
                        this.performer.self.changeState("Attack01", 1, true);
                        //uiManager.blood(target,1);
                        uiManager.blood(target, 1);
                    }
                    else {
                        this.complete = true;
                        this.nextNode = [this.performer.logicList["PatrolLogic"]];
                    }
                    this.time = 0;
                }
            }
            this.time += delay;
        };
        return AttackLogic;
    }(LogicNode));
    egret3d.AttackLogic = AttackLogic;
    __reflect(AttackLogic.prototype, "egret3d.AttackLogic");
    //逻辑执行者
    var LogicPerformer = (function () {
        function LogicPerformer() {
            this.targetList = [];
            this.logicList = {};
            //protected _queueLogics: LogicNode[] = [] ;
            this._parallelLogic = [];
            this._run = false;
        }
        LogicPerformer.prototype.initConfig = function (item) {
        };
        LogicPerformer.prototype.addNode = function (node) {
            this.logicList[node.name] = node;
            node.performer = this;
        };
        LogicPerformer.prototype.startLogic = function (name) {
            if (this.logicList[name]) {
                this._parallelLogic.push(this.logicList[name]);
                this._run = true;
            }
        };
        LogicPerformer.prototype.tick = function (time, delay) {
            if (this._run) {
                for (var _i = 0, _a = this._parallelLogic; _i < _a.length; _i++) {
                    var node = _a[_i];
                    node.tick(time, delay);
                }
                for (var _b = 0, _c = this._parallelLogic; _b < _c.length; _b++) {
                    var node = _c[_b];
                    if (!node.complete) {
                        node.tick(time, delay);
                    }
                    else {
                        //移除不需要执行的
                        var index = this._parallelLogic.indexOf(node);
                        this._parallelLogic.splice(index);
                        //插入要执行的
                        this.apendNext(node);
                    }
                }
            }
        };
        LogicPerformer.prototype.apendNext = function (node) {
            for (var _i = 0, _a = node.nextNode; _i < _a.length; _i++) {
                var n = _a[_i];
                this._parallelLogic.push(n);
                n.complete = false;
            }
            node.nextNode.length = 0;
        };
        return LogicPerformer;
    }());
    egret3d.LogicPerformer = LogicPerformer;
    __reflect(LogicPerformer.prototype, "egret3d.LogicPerformer");
    //关卡逻辑
    var LevelLogic = (function (_super) {
        __extends(LevelLogic, _super);
        function LevelLogic() {
            return _super.call(this) || this;
        }
        LevelLogic.prototype.initConfig = function (item) {
            var delayLogic = new DelayLogic();
            delayLogic.delayTime = 6000;
            var start = new StartGameLogic();
            var mob = new MobLogic();
            delayLogic.name = "DelayLogic";
            start.name = "StartGameLogic";
            mob.name = "MobLogic";
            this.addNode(delayLogic);
            this.addNode(start);
            this.addNode(mob);
        };
        LevelLogic.prototype.startLogic = function (name) {
            _super.prototype.startLogic.call(this, name);
        };
        LevelLogic.prototype.tick = function (time, delay) {
            _super.prototype.tick.call(this, time, delay);
        };
        return LevelLogic;
    }(LogicPerformer));
    egret3d.LevelLogic = LevelLogic;
    __reflect(LevelLogic.prototype, "egret3d.LevelLogic");
    //怪物执行逻辑
    var MonsterLogic = (function (_super) {
        __extends(MonsterLogic, _super);
        function MonsterLogic() {
            return _super.call(this) || this;
        }
        MonsterLogic.prototype.initConfig = function (item) {
            var patrol = new PatrolLogic();
            var attack = new AttackLogic();
            var move = new MoveLogic();
            patrol.name = "PatrolLogic";
            attack.name = "AttackLogic";
            move.name = "MoveLogic";
            this.addNode(patrol);
            this.addNode(attack);
            this.addNode(move);
        };
        MonsterLogic.prototype.startLogic = function (name) {
            _super.prototype.startLogic.call(this, name);
        };
        MonsterLogic.prototype.tick = function (time, delay) {
            _super.prototype.tick.call(this, time, delay);
        };
        return MonsterLogic;
    }(LogicPerformer));
    egret3d.MonsterLogic = MonsterLogic;
    __reflect(MonsterLogic.prototype, "egret3d.MonsterLogic");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Logic.js.map