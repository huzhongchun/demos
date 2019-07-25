var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CDButton1 = (function (_super) {
    __extends(CDButton1, _super);
    function CDButton1(downICO, upICO, maskICO, buttonWidth, buttonHeight) {
        var _this = _super.call(this) || this;
        _this.cdTime = 1000;
        _this.currTime = 0;
        _this.width = buttonWidth;
        _this.height = buttonHeight;
        var bgButton = new egret.Bitmap();
        bgButton.texture = RES.getRes("ui/gameUI.json#" + upICO);
        // TODO down
        bgButton.width = buttonWidth;
        bgButton.height = buttonHeight;
        _this.addChild(bgButton);
        var maskTexture = _this.maskTexture = new egret.Shape();
        maskTexture.graphics.beginFill(0x000000, 0.75);
        maskTexture.graphics.drawRect(0, 0, buttonWidth, buttonHeight);
        maskTexture.graphics.endFill();
        // maskTexture.texture = RES.getRes("ui/gameUI.json#" + maskICO);
        // maskTexture.alpha = 0.75;
        maskTexture.width = buttonWidth;
        maskTexture.height = buttonHeight;
        maskTexture.mask = _this.maskRect = new egret.Rectangle(0, 0, buttonWidth, buttonHeight);
        _this.addChild(maskTexture);
        var topBox = new egret.Bitmap();
        topBox.texture = RES.getRes("ui/gameUI.json#SkillBox.png");
        topBox.width = buttonWidth;
        topBox.height = buttonHeight;
        _this.addChild(topBox);
        _this.touchEnabled = true;
        _this.clearTime();
        return _this;
    }
    CDButton1.prototype.bindKeyboard = function (bindKeyboard) {
        //
    };
    CDButton1.prototype.unbindKeyboard = function () {
        //
    };
    CDButton1.prototype.canUse = function () {
        return !this.maskTexture.visible;
    };
    CDButton1.prototype.startTime = function (time) {
        var _this = this;
        this.currTime = 0;
        this.cdTime = time;
        this.maskTexture.visible = true;
        TweenLite.to(this.maskRect, this.cdTime / 1000, {
            y: this.height,
            onUpdate: function () {
                _this.maskRect.height = _this.height - _this.maskRect.y;
                _this.maskTexture.mask = _this.maskRect;
            },
            onComplete: function () {
                _this.maskTexture.visible = false;
                _this.clearTime();
            }
        });
    };
    CDButton1.prototype.clearTime = function () {
        this.currTime = 0;
        this.maskRect.x = 0;
        this.maskRect.y = 0;
        this.maskRect.width = this.width;
        this.maskRect.height = this.height;
        this.maskTexture.mask = this.maskRect;
        if (this.maskTexture.visible) {
            this.maskTexture.visible = false;
        }
    };
    return CDButton1;
}(egret.Sprite));
__reflect(CDButton1.prototype, "CDButton1");
var SkillBar = (function (_super) {
    __extends(SkillBar, _super);
    function SkillBar(skillButtonWidth, skillButtonHeight) {
        if (skillButtonWidth === void 0) { skillButtonWidth = 64; }
        if (skillButtonHeight === void 0) { skillButtonHeight = 64; }
        var _this = _super.call(this) || this;
        _this.skillsId = [];
        _this.skillsButton = [];
        _this.skillButtonWidth = 64;
        _this.skillButtonHeight = 64;
        _this.skillButtonWidth = skillButtonWidth;
        _this.skillButtonHeight = skillButtonHeight;
        return _this;
    }
    SkillBar.prototype.addSkillButton = function (skillsId, icon, bindKeyboard) {
        if (bindKeyboard === void 0) { bindKeyboard = 0; }
        var cdButton = new CDButton1(icon, icon, icon, this.skillButtonWidth, this.skillButtonHeight);
        if (bindKeyboard > 0) {
            cdButton.bindKeyboard(bindKeyboard);
        }
        this.skillsId.push(skillsId);
        this.skillsButton.push(cdButton);
        cdButton.x = this.skillButtonWidth * (this.skillsButton.length - 1);
        this.addChild(cdButton);
        this.width = this.skillButtonWidth * this.skillsButton.length;
        cdButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        return cdButton;
    };
    SkillBar.prototype.onClick = function (e) {
        console.log("skill");
        egret3d.logicManager.cancelMove = true;
        var index = this.skillsButton.indexOf(e.target);
        var cdButton = this.skillsButton[index];
        if (!cdButton.canUse()) {
            //console.log("cd 冷却中");
            return;
        }
        new egret3d.ProtagonistLogic();
        var actor = egret3d.logicManager.currentGameRoom.gameController.mainActor;
        var perform = actor.performer;
        var enemyActors = [];
        actor.findNearEnemy(enemyActors);
        if (enemyActors.length > 0 && !actor.lockSkills) {
            //查找离主角最近的敌对单位;
            enemyActors.sort(function (a, b) {
                return egret3d.Vector3D.distance(actor.position, a.position) < egret3d.Vector3D.distance(actor.position, b.position) ? -1 : 1;
            });
            switch (index) {
                case 0:
                    //perform.proAttackLogic.cast_skill1();
                    //perform.proAttackLogic.normalAttack();
                    actor.runAction(new egret3d.ActionSequence([
                        new egret3d.ActionAttackTarget(enemyActors[0], actor.itemConfig.skill_1_id),
                        new egret3d.ActionRepeat(new egret3d.ActionAttackTarget(enemyActors[0], actor.itemConfig.skill_0_id), -1)
                    ]));
                    this.skillsButton[index].startTime(egret3d.TableManager.findSkillsTableItem(actor.itemConfig.skill_1_id).cd_time);
                    break;
                case 1:
                    actor.runAction(new egret3d.ActionSequence([
                        new egret3d.ActionAttackTarget(enemyActors[0], actor.itemConfig.skill_2_id),
                        new egret3d.ActionRepeat(new egret3d.ActionAttackTarget(enemyActors[0], actor.itemConfig.skill_0_id), -1)
                    ]));
                    this.skillsButton[index].startTime(egret3d.TableManager.findSkillsTableItem(actor.itemConfig.skill_2_id).cd_time);
                    break;
                case 2:
                    //perform.proAttackLogic.cast_skill3();
                    actor.runAction(new egret3d.ActionSequence([
                        new egret3d.ActionAttackTarget(enemyActors[0], actor.itemConfig.skill_3_id),
                        new egret3d.ActionRepeat(new egret3d.ActionAttackTarget(enemyActors[0], actor.itemConfig.skill_0_id), -1)
                    ]));
                    this.skillsButton[index].startTime(egret3d.TableManager.findSkillsTableItem(actor.itemConfig.skill_3_id).cd_time);
                    break;
                case 3:
                    //perform.proAttackLogic.cast_skill4();
                    actor.runAction(new egret3d.ActionSequence([
                        new egret3d.ActionAttackTarget(enemyActors[0], actor.itemConfig.skill_4_id),
                        new egret3d.ActionRepeat(new egret3d.ActionAttackTarget(enemyActors[0], actor.itemConfig.skill_0_id), -1)
                    ]));
                    this.skillsButton[index].startTime(egret3d.TableManager.findSkillsTableItem(actor.itemConfig.skill_4_id).cd_time);
                    break;
            }
        }
    };
    return SkillBar;
}(egret.Sprite));
__reflect(SkillBar.prototype, "SkillBar");
//# sourceMappingURL=SkillBar.js.map