var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
        return _this;
    }
    LoginPage.prototype.onAdd = function () {
        var wid = UIManager.gameWidth;
        var hei = UIManager.gameHeight;
        var bgImage = new egret.Bitmap();
        bgImage.texture = RES.getRes("ui/bg.jpg");
        // bgImage.width = wid * 2;
        // bgImage.height = hei;
        // bgImage.x = -Math.floor(wid / 2);
        this.addChild(bgImage);
        var gameName = new egret.Bitmap();
        gameName.texture = RES.getRes("ui/ui.json#logo");
        gameName.x = wid * 0.5 - gameName.width * 0.5;
        gameName.y = hei * 0.5 - gameName.height * 0.5 - gameName.height;
        this.addChild(gameName);
        var newGameBut = this.enterGameButton = new egret.Bitmap();
        newGameBut.texture = RES.getRes("ui/ui.json#menu");
        newGameBut.x = wid * 0.5 - newGameBut.width * 0.5;
        newGameBut.y = gameName.y + gameName.height + 220;
        this.addChild(newGameBut);
        var powerByEgret3D = new egret.Bitmap();
        powerByEgret3D.texture = RES.getRes("ui/gameUI.json#powerByEgert3D.png");
        powerByEgret3D.x = bgImage.width - powerByEgret3D.width;
        powerByEgret3D.y = this.stage.stageHeight - powerByEgret3D.height;
        this.addChild(powerByEgret3D);
        this.enterGameButton.touchEnabled = true;
        this.enterGameButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    LoginPage.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.enterGameButton:
                var room = new RoomPage();
                uiManager.showPage(room);
                break;
        }
    };
    return LoginPage;
}(egret.DisplayObjectContainer));
__reflect(LoginPage.prototype, "LoginPage");
//# sourceMappingURL=LoginPage.js.map