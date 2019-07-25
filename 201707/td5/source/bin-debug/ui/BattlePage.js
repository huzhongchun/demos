var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattlePage = (function (_super) {
    __extends(BattlePage, _super);
    function BattlePage() {
        var _this = _super.call(this) || this;
        _this._radio = .8;
        _this.hitCount = 0;
        _this.hitTime = 0;
        _this.bloodList = [];
        _this.hpBarList = [];
        var width = UIManager.gameWidth;
        var height = UIManager.gameHeight;
        _this.bloodLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.bloodLayer);
        _this.hpBarLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.hpBarLayer);
        var title = new egret.Bitmap();
        title.texture = RES.getRes("ui2/gameUI.json#scene_100000.png");
        title.x = (width - title.width) * .5;
        title.x = 0;
        title.y = 0;
        title.scaleX = title.scaleY = _this._radio;
        _this.addChild(title);
        var spriteBackTown = _this.spriteBackTown = new egret.Bitmap();
        spriteBackTown.texture = RES.getRes("ui2/gameUI.json#fh.png");
        spriteBackTown.x = width - spriteBackTown.width + 20;
        spriteBackTown.y = height - spriteBackTown.height - 100;
        spriteBackTown.scaleX = spriteBackTown.scaleY = 0.8;
        _this.addChild(spriteBackTown);
        var hitContainer = _this.hitContainer = new HitContainer();
        hitContainer.scaleX = hitContainer.scaleY = _this._radio;
        hitContainer.x = 20;
        hitContainer.y = height * 0.3;
        _this.addChild(hitContainer);
        _this.hitContainer.visible = false;
        var timeKeeper = _this.timeKeeper = new TimeKeeper();
        timeKeeper.x = width - timeKeeper.width / _this._radio - 80;
        timeKeeper.y = 7;
        timeKeeper.scaleX = timeKeeper.scaleY = _this._radio;
        _this.addChild(timeKeeper);
        _this.expBar = new ProcessBar("ui2/gameUI.json#hpbar_bg.png", "ui/gameUI.json#expbar.png");
        _this.expBar.height = 10;
        _this.expBar.width = 96 * 4;
        _this.expBar.x = (width - _this.expBar.width) / 2;
        _this.expBar.y = (height - _this.expBar.height);
        _this.addChild(_this.expBar);
        _this.skillBar = new SkillBar(96, 96);
        var playerItem = egret3d.logicManager.currentGameRoom.playerItem;
        //初始化玩家技能;
        _this.skillBar.addSkillButton(playerItem.skill_1_id, "skilla.png", egret3d.KeyCode.Key_Q);
        _this.skillBar.addSkillButton(playerItem.skill_2_id, "skillb.png", egret3d.KeyCode.Key_W);
        _this.skillBar.addSkillButton(playerItem.skill_3_id, "skillc.png", egret3d.KeyCode.Key_E);
        _this.skillBar.addSkillButton(playerItem.skill_4_id, "skilld.png", egret3d.KeyCode.Key_R);
        _this.skillBar.x = width * 0.5 - _this.skillBar.width * 0.5;
        _this.skillBar.y = height - _this.skillBar.height - 10;
        _this.addChild(_this.skillBar);
        spriteBackTown.touchEnabled = true;
        return _this;
    }
    BattlePage.prototype.onEnterPage = function () {
        this.spriteBackTown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    BattlePage.prototype.onLeavePage = function () {
        this.spriteBackTown.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        // remove hp bar
        for (var _i = 0, _a = this.hpBarList; _i < _a.length; _i++) {
            var hpBar = _a[_i];
            if (hpBar.hpBar.parent) {
                hpBar.hpBar.parent.removeChild(hpBar.hpBar);
            }
        }
        this.hpBarList.length = 0;
        this.timeKeeper.stop();
        this.timeKeeper.reset();
        this.hitContainer.clear();
    };
    BattlePage.prototype.onButtonClick = function (e) {
        if (e.target === this.spriteBackTown) {
            this.timeKeeper.stop();
            egret3d.logicManager.exit();
        }
    };
    BattlePage.prototype.blood = function (target, num) {
        var blood = new Blood();
        blood.createNumberView(num);
        blood.pos3D = target.position.clone();
        blood.pos3D.y += 200;
        this.bloodLayer.addChild(blood);
        blood.pos3DTo2DFun = egret3d.Scene.root.camera3D.object3DToScreenRay;
        blood.camera = egret3d.Scene.root.camera3D;
        var pt = egret3d.Scene.root.camera3D.object3DToScreenRay(blood.pos3D);
        var stage = this.bloodLayer.stage;
        if (stage) {
            blood.x = pt.x;
            blood.y = pt.y;
        }
        else {
            blood.x = -100;
            blood.y = -100;
        }
        this.bloodList.push(blood);
    };
    BattlePage.prototype.addHpBar = function (target, hpBar) {
        this.hpBarList.push({ target: target, hpBar: hpBar });
        this.hpBarLayer.addChild(hpBar);
        ;
        var pos = egret3d.Scene.root.camera3D.object3DToScreenRay(target.position);
        hpBar.x = pos.x;
        hpBar.y = pos.y;
    };
    BattlePage.prototype.update = function (time, delay) {
        for (var _i = 0, _a = this.bloodList; _i < _a.length; _i++) {
            var blood = _a[_i];
            if (blood.complete) {
                var index = this.bloodList.indexOf(blood);
                this.bloodList.splice(index, 1);
                this.bloodLayer.removeChild(blood);
            }
            else {
                blood.update(time, delay);
            }
        }
        for (var _b = 0, _c = this.hpBarList; _b < _c.length; _b++) {
            var hpBar = _c[_b];
            var pos = hpBar.target.position.clone();
            if (hpBar.target.groupID === 0)
                pos.y += 100;
            pos.y += 150;
            // 实时计算坐标很耗性能
            pos = egret3d.Scene.root.camera3D.object3DToScreenRay(pos);
            var stage = this.bloodLayer.stage;
            if (stage) {
                // 黑科技来处理坐标适配，这里应该有更好的方法
                // var p = stage.$screen["webTouchHandler"].getLocation({pageX: pos.x, pageY: pos.y, identifier: 0});
                hpBar.hpBar.x = pos.x - hpBar.hpBar.width / 2;
                hpBar.hpBar.y = pos.y;
            }
        }
    };
    return BattlePage;
}(egret.DisplayObjectContainer));
__reflect(BattlePage.prototype, "BattlePage");
//# sourceMappingURL=BattlePage.js.map