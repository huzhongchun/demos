var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EndingPage = (function (_super) {
    __extends(EndingPage, _super);
    function EndingPage() {
        var _this = _super.call(this) || this;
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("ui/gameUI.json#endingPanel.png");
        _this.addChild(bg);
        var leaveBtn = new egret.Bitmap();
        leaveBtn.texture = RES.getRes("ui/gameUI.json#leaveBtnUp.png");
        leaveBtn.x = 319;
        leaveBtn.y = 367;
        _this.addChild(leaveBtn);
        leaveBtn.touchEnabled = true;
        leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            egret3d.logicManager.exit();
            uiManager.leaveEnding();
        }, _this);
        return _this;
    }
    return EndingPage;
}(egret.DisplayObjectContainer));
__reflect(EndingPage.prototype, "EndingPage");
//# sourceMappingURL=EndingPage.js.map