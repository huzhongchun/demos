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
    //攻击指定目标的行为;
    var ActionAttackTarget = (function (_super) {
        __extends(ActionAttackTarget, _super);
        function ActionAttackTarget(attackTarget, skillsId) {
            var _this = _super.call(this) || this;
            _this._state = 0;
            _this._delayTime = 300;
            _this._complete = false;
            _this._attackTarget = attackTarget;
            _this._actionMoveTo = null;
            _this._skillTable = egret3d.TableManager.findSkillsTableItem(skillsId);
            return _this;
        }
        //重置行为对象;
        ActionAttackTarget.prototype.onResetAction = function (self) {
            this._state = 0;
            this._delayTime = 300;
            this._complete = false;
        };
        //是否激活;
        ActionAttackTarget.prototype.onIsActivate = function (self) {
            return this._skillTable && !this._attackTarget.isDeath;
        };
        //逻辑Tick;
        ActionAttackTarget.prototype.onTick = function (self, time, delay) {
            this._delayTime -= delay;
            switch (this._state) {
                case 0:
                    if (egret3d.Vector3D.distance(this._attackTarget.position, self.position) > this._skillTable.range) {
                        if (!this._actionMoveTo) {
                            this._actionMoveTo = new egret3d.ActionMoveTo(this._attackTarget.position);
                            this._actionMoveTo.onIsActivate(self);
                        }
                        //没有进入施法攻击范围，朝目标移动;
                        this._actionMoveTo.onTick(self, time, delay);
                        if (this._delayTime <= 0 || this._actionMoveTo.onIsComplete(self)) {
                            this._delayTime = 300;
                            this._actionMoveTo.resetTargetPoint(this._attackTarget.position);
                            this._actionMoveTo.onResetAction(self);
                        }
                    }
                    else {
                        //进入前摇状态;
                        this._state = 1;
                        this._delayTime = this._skillTable.use_attack_speed ? this._skillTable.start_time * (1.0 / self.actorData.attack_speed) : this._skillTable.start_time;
                        self.isMove = false;
                        self.actorTrunToDirection(this._attackTarget.position.x - self.position.x, this._attackTarget.position.z - self.position.z);
                        var isCrit = egret3d.damageTools.preCrit(this._skillTable, self);
                        //进行状态切换, 攻击动作，攻击特效，攻击音效
                        self.cast(this._skillTable.id, isCrit);
                    }
                    break;
                case 1:
                    if (this._delayTime <= 0) {
                        this._state = 2; //进入定身;
                        this._delayTime = this._skillTable.use_attack_speed ? this._skillTable.lock_time * (1.0 / self.actorData.attack_speed) : this._skillTable.lock_time;
                        //标记GameActor不可移动;
                        self.lockMove = true;
                        self.lockSkills = this._skillTable.id != self.itemConfig.skill_0_id;
                        self.actorData.mp -= this._skillTable.mp;
                        //------开始计算技能;
                        var attackTargets = [];
                        switch (this._skillTable.attack_type) {
                            default:
                                attackTargets.push(this._attackTarget);
                                break;
                            case 1:
                                self.findNearEnemy(attackTargets, this._skillTable.attack_range);
                                break;
                        }
                        for (var z = attackTargets.length - 1; z >= 0; z--) {
                            var target = attackTargets[z];
                            var oldDeathStae = target.isDeath;
                            if (!oldDeathStae) {
                                //计算 数值状态
                                egret3d.damageTools.calculateDamage(this._skillTable, self, attackTargets);
                                //更新差量,显示需要先的数据
                                //self.updateActorData();
                                var hit = target.updateActorData();
                                if (hit) {
                                    target.hit(this._skillTable.hit_effect_name);
                                }
                                if (target.isDeath) {
                                    target.changeState("Death", 1.0, true);
                                }
                                else if (target != self.gameRoom.gameController.mainActor) {
                                    target.changeState("Hit", 1.0, true);
                                }
                                if (self == self.gameRoom.gameController.mainActor) {
                                    // uiManager.hits();
                                    uiManager.hits();
                                }
                                if (self == self.gameRoom.gameController.mainActor && target.isDeath) {
                                    self.addExp(target.itemConfig.exp);
                                }
                            }
                        }
                    }
                    self.actorTrunToDirection(this._attackTarget.position.x - self.position.x, this._attackTarget.position.z - self.position.z);
                    break;
                case 2:
                    if (this._delayTime <= 0) {
                        this._state = 3; //进入后摇;
                        this._delayTime = this._skillTable.use_attack_speed ? this._skillTable.end_time * (1.0 / self.actorData.attack_speed) : this._skillTable.end_time;
                        //解除GameActor不可移动;
                        self.lockMove = false;
                    }
                    break;
                case 3:
                    if (this._delayTime <= 0) {
                        self.lockSkills = false;
                        if (this._skillTable.trigger_skills_id > 0) {
                            //触发下一段技能;
                            this._state = 1;
                            this._skillTable = egret3d.TableManager.findSkillsTableItem(this._skillTable.trigger_skills_id);
                            this._delayTime = this._skillTable.use_attack_speed ? this._skillTable.start_time * (1.0 / self.actorData.attack_speed) : this._skillTable.start_time;
                        }
                        else {
                            this._complete = true;
                        }
                    }
                    self.actorTrunToDirection(this._attackTarget.position.x - self.position.x, this._attackTarget.position.z - self.position.z);
                    break;
            }
        };
        //是否完成;
        ActionAttackTarget.prototype.onIsComplete = function (self) {
            return this._complete;
        };
        ActionAttackTarget.prototype.playSkill_effect = function (self, name, speed) {
            var effect = egret3d.effectManager.getEffect(name);
            if (effect) {
                effect.play(speed, true);
                effect.x = self.x;
                effect.y = self.y;
                effect.z = self.z;
                effect.rotationY = self.rotationY;
                self.parent.addChild(effect);
            }
        };
        return ActionAttackTarget;
    }(egret3d.ActionNode));
    egret3d.ActionAttackTarget = ActionAttackTarget;
    __reflect(ActionAttackTarget.prototype, "egret3d.ActionAttackTarget");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ActionAttackTarget.js.map