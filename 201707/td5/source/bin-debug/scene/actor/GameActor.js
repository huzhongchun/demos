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
    var ActorData = (function () {
        function ActorData() {
            //力量
            this.strength = 0;
            //敏捷
            this.agility = 0;
            //智力
            this.intelligence = 0;
            //生命值;
            this.hp = 0;
            //最大生命值;
            this.max_hp = 0;
            //法术值;
            this.mp = 0;
            this.max_mp = 0;
            //攻击力
            this.attack = 0;
            //防御
            this.defense = 0;
            //暴击率
            this.crit = 0;
            //经验值;
            this.exp = 0;
            //等级;
            this.level = 1;
            //是否暴击
            this.isCrit = false;
            //暴击伤害
            this.critDamage = 0;
            //攻击速度
            this.attack_speed = 0;
            //攻击范围
            this.attack_range = 0;
            //移动速度
            this.moveSpeed = 0;
            //生命回复速度
            this.healingRate = 0;
            //蓝回复速度
            this.manarate = 0;
        }
        ActorData.prototype.initData = function (data) {
            this.data = data;
            this.strength = data.strength;
            this.agility = data.agility;
            this.intelligence = data.intelligence;
            //this.attack_speed = data.attack_speed;
            //this.attack_range = data.attack_range;
            //this.moveSpeed = data.moveSpeed;
            //this.hp = data.hp; 
            //this.max_hp = data.hp;
            //this.mp = data.mp; 
            //this.attack = data.attack; 
            //this.crit = data.crit;
            //this.critDamage = data.critDamage;
            //this.defense = data.defense;
            this.exp = 0;
            this.level = data.level;
            this.update();
            this.hp = this.max_hp;
        };
        //升级 升三维，改变三维
        //三维影响攻击，速度，血量等
        ActorData.prototype.update = function () {
            var self = this;
            //力量：
            //每点增加25点最大生命值
            //每点增加0.05的生命恢复速度
            //每点增加1的攻击力（力量英雄）
            self.max_hp = self.strength * 25;
            self.healingRate = self.strength * 0.05;
            if (self.data.primettribute == "strength")
                self.attack = self.strength;
            //敏捷：
            //每点增加0.3的护甲
            //每点增加0.02的攻击速度
            //每点增加1的攻击力（敏捷英雄）
            self.defense = self.agility * 0.3;
            self.attack_speed = self.data.attack_speed + self.agility * 0.1 * 0.1;
            self.critDamage = self.agility * 0.02;
            self.crit = self.agility * 0.11;
            self.moveSpeed = self.data.moveSpeed + self.moveSpeed * 0.3;
            //this.actorData.moveSpeed = this.upgradeConfig.moveSpeed;
            if (self.data.primettribute == "agility")
                self.attack = self.agility;
            //智力：
            //每点增加15点最大魔法值
            //每点增加0.05的魔法恢复速度
            //每点增加1的攻击力（智力英雄）
            self.max_mp = self.intelligence * 15;
            self.manarate = self.intelligence * 0.05;
            if (self.data.primettribute == "intelligence")
                self.attack = self.intelligence;
            self.hp = self.max_hp; //this.upgradeConfig.hp - (this.actorData.max_hp - this.actorData.hp);
            self.mp = self.max_mp;
            //this.actorData.attack = this.upgradeConfig.attack;
            //this.actorData.defense = this.upgradeConfig.defense;
            //this.actorData.crit = this.upgradeConfig.crit;
            //this.actorData.attack_speed = this.upgradeConfig.attack_speed;
            //this.actorData.moveSpeed = this.upgradeConfig.moveSpeed;
        };
        return ActorData;
    }());
    egret3d.ActorData = ActorData;
    __reflect(ActorData.prototype, "egret3d.ActorData");
    var StateStruct = (function () {
        function StateStruct() {
            this.animCount = 0;
        }
        return StateStruct;
    }());
    egret3d.StateStruct = StateStruct;
    __reflect(StateStruct.prototype, "egret3d.StateStruct");
    var GameActor = (function (_super) {
        __extends(GameActor, _super);
        function GameActor() {
            var _this = _super.call(this) || this;
            _this.animMoveSpeed = 1.0;
            _this.animLock = false;
            _this.lookObj = new egret3d.Object3D;
            _this.groupID = 0; // 0是自己，1是中立，2是敌人
            _this.distance = 0;
            _this.useLookJoint = false;
            //state ******************************************************************
            //state ******************************************************************
            _this.states = {};
            _this.actorId = ++GameActor._globalCount;
            _this.actorData = new ActorData();
            _this.detailActorData = new ActorData();
            _this.lockMove = false;
            _this.lockSkills = false;
            var texture = RES.getRes("ShadowPlane.png");
            _this.shadow = new egret3d.Mesh(new egret3d.PlaneGeometry(150, 150, 1, 1), new egret3d.TextureMaterial(texture));
            _this.shadow.tag.name = "decal";
            _this.addChild(_this.shadow);
            _this.shadow.y = 10;
            _this.shadow.material.blendMode = egret3d.BlendMode.ALPHA;
            _this.shadow.material.alpha = 0.7;
            _this._hpRestoreTime = 1000;
            return _this;
            //this.lights = new LightGroup();
            ////var dir: DirectLight = new DirectLight(new Vector3D(0.0, -1.0, 0.5));
            //var dir: DirectLight = sceneManager.currentScene.findObject3D("_Directionallight") as DirectLight;
            //this.lights.addLight(dir);
        }
        //被添加到了场景中;
        GameActor.prototype.onBeAdded = function () {
            this._titleView.visible = true;
            this.lockMove = false;
        };
        //从场景中移除了;
        GameActor.prototype.onBeRemove = function () {
            this._titleView.visible = false;
            if (egret3d.sceneManager.currentScene) {
                var nav = egret3d.sceneManager.currentScene.nav;
                if (nav.getUserData(nav.xToGridX(this.x), nav.yToGridY(this.z)) == this.actorId) {
                    nav.setUserData(nav.xToGridX(this.x), nav.yToGridY(this.z), 0);
                }
            }
        };
        //复活;
        GameActor.prototype.rebirth = function () {
            this.runAction(null);
            this.actorData.hp = this.actorData.max_hp;
            this.detailActorData.hp = this.detailActorData.max_hp;
            this.role.skeletonAnimation.play("Idle");
            this.updateActorData();
        };
        GameActor.prototype.getNumbers = function (s) {
            var tmp = s.split(",");
            var tmp2 = [];
            for (var i = 0; i < tmp.length; i++) {
                tmp2.push(Number(tmp[i]));
            }
            return tmp2;
        };
        GameActor.prototype.initConfig = function () {
            //获取 技能
            //var att = TableManager.findSkillsTableItem(this.itemConfig.skill_0_id);
            //var skil_0: SkillsItem = TableManager.findSkillsTableItem(this.itemConfig.skill_1_id);
            //var skil_1: SkillsItem = TableManager.findSkillsTableItem(this.itemConfig.skill_2_id);
            //var skil_2: SkillsItem = TableManager.findSkillsTableItem(this.itemConfig.skill_3_id);
            //var skil_3: SkillsItem = TableManager.findSkillsTableItem(this.itemConfig.skill_4_id);
            var skillArray = [
                egret3d.TableManager.findSkillsTableItem(this.itemConfig.skill_0_id),
                egret3d.TableManager.findSkillsTableItem(this.itemConfig.skill_1_id),
                egret3d.TableManager.findSkillsTableItem(this.itemConfig.skill_2_id),
                egret3d.TableManager.findSkillsTableItem(this.itemConfig.skill_3_id),
                egret3d.TableManager.findSkillsTableItem(this.itemConfig.skill_4_id),
            ];
            for (var i = 0; i < skillArray.length; i++) {
                var att = skillArray[i];
                if (att) {
                    var stateStruct = new StateStruct();
                    stateStruct.id = att.id;
                    stateStruct.animStates = att.animation_name.split(",");
                    stateStruct.reset = true;
                    stateStruct.speed = att.speed;
                    stateStruct.effects = att.effect_play_name == "" ? [] : att.effect_play_name.split(",");
                    stateStruct.effectTimes = this.getNumbers(att.effect_play_delay);
                    stateStruct.audios = att.sound_name == "" ? [] : att.sound_name.split(",");
                    stateStruct.audioTimes = this.getNumbers(att.sound_play_delay);
                    this.states[stateStruct.id] = stateStruct;
                }
            }
            //创建cast state
        };
        GameActor.prototype.cast = function (skill, isCrit) {
            var castState = this.castState;
            castState = this.states[skill];
            if (castState) {
                //切换动作
                if (castState.animCount + 1 >= castState.animStates.length)
                    castState.animCount = 0;
                else
                    castState.animCount++;
                this.changeState(castState.animStates[castState.animCount], castState.speed * this.actorData.attack_speed >= 1 ? castState.speed * this.actorData.attack_speed : 1, castState.reset);
                for (var i = 0; i < castState.effects.length; i++) {
                    var id = i;
                    //特效节奏
                    egret3d.timemer.timing(castState.effectTimes[i], this.playSkill_effect, this, castState, id);
                }
                for (var i = 0; i < castState.audios.length; i++) {
                    //特效节奏
                    egret3d.timemer.timing(castState.audioTimes[i], this.playAudio, this, castState.audios[i]);
                }
            }
        };
        GameActor.prototype.hit = function (effectName) {
            var self = this;
            if (self.itemConfig.hit_effect_bone.length <= 0) {
                return;
            }
            var effect = egret3d.effectManager.getEffect(effectName);
            if (effect) {
                var camera = egret3d.gameCameraManager.currentCamera;
                effect.play(1, true);
                self.parent.addChild(effect);
                self.position.subtract(camera.position, egret3d.Vector3D.HELP_0);
                egret3d.Vector3D.HELP_0.normalize();
                egret3d.Vector3D.HELP_0.scaleBy(100);
                effect.x = -egret3d.Vector3D.HELP_0.x + self.x + self.lookObj.x;
                effect.y = -egret3d.Vector3D.HELP_0.y + self.y + self.lookObj.y;
                effect.z = -egret3d.Vector3D.HELP_0.z + self.z + self.lookObj.z;
            }
        };
        GameActor.prototype.playAudio = function (name) {
            audio.audioManager.play("resource/sound/" + name);
        };
        //播放 第一个技能动画特效
        GameActor.prototype.playSkill_effect = function (state, id) {
            var name = state.effects[id];
            var effect = egret3d.effectManager.getEffect(name);
            if (effect) {
                effect.play(state.speed, true);
                effect.x = this.performer.self.x;
                effect.y = this.performer.self.y;
                effect.z = this.performer.self.z;
                effect.rotationY = this.performer.self.rotationY;
                this.performer.self.parent.addChild(effect);
            }
        };
        GameActor.prototype.playEffect = function (name, speed) {
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
        //要注意 差量的正负值，正值颜色是否要变，负值是否要变
        GameActor.prototype.updateActorData = function () {
            var change = false;
            //记录扣除了多少的值
            var subHP = this.detailActorData.hp;
            var subMP = this.detailActorData.mp;
            //记录扣除了多少的值
            //更新显示
            if (subHP != 0) {
                this._hpBar.ratio = this.actorData.hp / this.actorData.max_hp;
                if (subHP > 0) {
                    //uiManager.blood(this, subHP);
                    uiManager.blood(this, subHP);
                    change = true;
                }
            }
            if (subMP) {
                // this._hpBar.ratio = this.actorData.hp / this.itemConfig.hp;
                change = true;
            }
            return change;
        };
        Object.defineProperty(GameActor.prototype, "isDeath", {
            //state ******************************************************************
            //state ******************************************************************
            get: function () {
                return this.actorData.hp <= 0;
            },
            enumerable: true,
            configurable: true
        });
        GameActor.prototype.start = function () {
        };
        GameActor.prototype.setRole = function (role, item) {
            this.lockSkills = false;
            this.itemConfig = item;
            this.upgradeConfig = item.upgrade_id > 0 ? egret3d.TableManager.findUpgradeTableItem(item.upgrade_id) : null;
            this.initConfig();
            this.actorData.initData(item);
            this.detailActorData.initData(item);
            this.name = item.name;
            this.moveSpeed = this.actorData.moveSpeed;
            this._hpRestoreTime = 1000;
            if (role) {
                this.role = role;
                this.addChild(this.role);
                for (var p in role.avatar) {
                    role.avatar[p].lightGroup = this.lights;
                    role.avatar[p].scaleX = role.avatar[p].scaleY = role.avatar[p].scaleZ = item.scale_ratio;
                }
                this.role.skeletonAnimation.play("Idle");
                //this._lookJoint = this.role.skeletonAnimation.state.gpuSkeletonPose.jointsDictionary["Bip01 Spine"];
                this.lookJoint = this.role.skeletonAnimation.state.gpuSkeletonPose.jointsDictionary[item.hit_effect_bone];
                if (this.lookJoint) {
                    this.role.skeletonAnimation.addEventListener(egret3d.AnimationEvent3D.COMPLETE, this.animComplete, this);
                }
            }
            // this._titleView = new DisplayObject();
            // this._hpBar = new egret3d.gui.UIProgressBar();
            // this._hpBar.width = 80;
            // this._hpBar.height = 8;
            // if (this.groupID === 0) {
            // this._hpBar.setStyle("bar", "hpbar_pet.png");
            // } else {
            // this._hpBar.setStyle("bar", "hpbar_jun.png");
            // }
            // this._hpBar.setStyle("background", "hpbar_bg.png");
            // this._titleView.addChild(this._hpBar);
            // this._lvNameText = new gui.UITextField();
            //            this._lvNameText.text = this.actorData.
            // this._lvNameText.textColor = 0xffffffff;
            // this._lvNameText.text = "lv: " + this.actorData.level + " "+  this.itemConfig.name;
            // this._lvNameText.width = 100;
            // this._lvNameText.height = 20;
            // this._lvNameText.y = -this._lvNameText.height - 5;
            // this._titleView.addChild(this._lvNameText);
            // uiManager.addHpBar(this, this._titleView);
            this._titleView = new egret.Sprite();
            if (this.groupID === 0) {
                this._hpBar = new ProcessBar("ui/gameUI.json#hpbar_bg.png", "ui/gameUI.json#hpbar_pet.png");
            }
            else {
                this._hpBar = new ProcessBar("ui/gameUI.json#hpbar_bg.png", "ui/gameUI.json#hpbar_jun.png");
            }
            this._hpBar.width = 80;
            this._hpBar.height = 8;
            this._titleView.addChild(this._hpBar);
            this._lvNameText = new egret.TextField();
            this._lvNameText.textColor = 0xffffff;
            this._lvNameText.text = "lv: " + this.actorData.level + " " + this.itemConfig.name;
            this._lvNameText.width = 100;
            this._lvNameText.height = 20;
            this._lvNameText.size = 20;
            this._lvNameText.y = -this._lvNameText.height - 5;
            this._titleView.addChild(this._lvNameText);
            uiManager.addHpBar(this, this._titleView);
            this.updateActorData();
            //if (this == this.gameRoom.gameController.mainActor) {
            //    var Dummy001: Object3D = new Object3D();
            //    var Dummy002: Object3D = new Object3D();
            //    role.skeletonAnimation.bindToJointPose("Dummy001", Dummy001);
            //    role.skeletonAnimation.bindToJointPose("Dummy002", Dummy002);
            //    var ribbon: Ribbon = new Ribbon(null, [Dummy001, Dummy002]);
            //    role.addChild(ribbon);
            //}
        };
        GameActor.prototype.addExp = function (exp) {
            while (this.upgradeConfig && exp > 0) {
                this.actorData.exp += exp;
                if (this.actorData.exp < this.upgradeConfig.upgrade_exp) {
                    break;
                }
                exp = this.actorData.exp - this.upgradeConfig.upgrade_exp;
                this.actorData.exp = 0;
                ++this.actorData.level;
                this.playEffect("Fx_Levelup_01", 1.0);
                this._lvNameText.text = "lv: " + this.actorData.level + " " + this.itemConfig.name;
                //变更属性;
                //this.actorData.hp = this.upgradeConfig.hp - (this.actorData.max_hp - this.actorData.hp);
                //this.actorData.max_hp = this.upgradeConfig.hp;
                //this.actorData.mp = this.upgradeConfig.mp;
                //this.actorData.attack = this.upgradeConfig.attack;
                //this.actorData.defense = this.upgradeConfig.defense;
                //this.actorData.crit = this.upgradeConfig.crit;
                //this.actorData.critDamage = this.upgradeConfig.critDamage;
                //this.actorData.attack_speed = this.upgradeConfig.attack_speed;
                //this.actorData.moveSpeed = this.upgradeConfig.moveSpeed;
                this.actorData.strength = this.upgradeConfig.strength;
                this.actorData.agility = this.upgradeConfig.agility;
                this.actorData.intelligence = this.upgradeConfig.intelligence;
                this.actorData.update();
                this.upgradeConfig = this.upgradeConfig.next_id > 0 ? egret3d.TableManager.findUpgradeTableItem(this.upgradeConfig.next_id) : null;
            }
            if (this.upgradeConfig) {
                // uiManager.updateExpBar(this.actorData.exp / this.upgradeConfig.upgrade_exp);
                uiManager.updateExpBar(this.actorData.exp / this.upgradeConfig.upgrade_exp);
            }
            else {
                //满级直接设满
                // uiManager.updateExpBar(1);
                uiManager.updateExpBar(1);
            }
        };
        GameActor.prototype.animComplete = function (e) {
            this.animLock = false;
        };
        GameActor.prototype.changeState = function (stateName, speed, reset, useLookJoint) {
            if (speed === void 0) { speed = 1.0; }
            if (reset === void 0) { reset = false; }
            if (useLookJoint === void 0) { useLookJoint = false; }
            this.useLookJoint = useLookJoint;
            if (this.role) {
                this.role.skeletonAnimation.play(stateName, speed, reset);
            }
            if (reset) {
                this.animLock = true;
            }
        };
        GameActor.prototype.update = function (time, delay, camera) {
            if (this.gameRoom.isGameOver) {
                if (!this.isDeath) {
                    this.changeState("Idle", 1.0, false);
                }
                return;
            }
            if (this.isDeath) {
                this.changeState("Death", 1.0, false);
                return;
            }
            else if (!this.animLock) {
                if (this.isMove) {
                    this.changeState("Run", 1.0, false);
                }
                else {
                    this.changeState("Idle", 1.0, false);
                }
            }
            if (this.lookJoint) {
                this.lookJoint.copyTo(this.lookObj);
                this.lookObj.x = -this.lookObj.x;
                this.lookObj.z = -this.lookObj.z;
            }
            //if (this.performer) {
            //    this.performer.tick( time,delay );
            //}
            if (this._action && !this.isDeath) {
                if (this == this.gameRoom.gameController.mainActor) {
                    this._hpRestoreTime -= delay;
                    if (this._hpRestoreTime <= 0) {
                        this._hpRestoreTime += 1000;
                        this.actorData.hp += Math.min(this.actorData.healingRate, this.actorData.max_hp - this.actorData.hp);
                        this._hpBar.ratio = this.actorData.hp / this.actorData.max_hp;
                    }
                }
                this._action.onTick(this, time, delay);
                if (this._action.onIsComplete(this)) {
                    this._action = null;
                }
            }
            _super.prototype.update.call(this, time, delay, camera);
        };
        GameActor.prototype.runAction = function (action) {
            if (!action) {
                this._action = null;
            }
            else if (action.onIsActivate(this)) {
                this._action = action;
            }
        };
        GameActor.prototype.findNearEnemy = function (outArray, range) {
            if (range === void 0) { range = -1; }
            outArray.length = 0;
            range = range <= 0 ? this.itemConfig.attack_range : range;
            for (var _i = 0, _a = this.gameRoom.actorlist; _i < _a.length; _i++) {
                var actor = _a[_i];
                if (actor.isDeath) {
                    continue;
                }
                if (this != actor && actor.groupID != this.groupID) {
                    var len = egret3d.Vector3D.distance(this.position, actor.position);
                    if (len < range) {
                        outArray.push(actor);
                    }
                }
            }
            return outArray;
        };
        return GameActor;
    }(Actor));
    GameActor._globalCount = 0;
    egret3d.GameActor = GameActor;
    __reflect(GameActor.prototype, "egret3d.GameActor");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=GameActor.js.map