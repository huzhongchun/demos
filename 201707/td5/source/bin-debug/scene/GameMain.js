var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var GameMain = (function () {
        function GameMain() {
        }
        GameMain.prototype.start = function () {
            egret3d.logicManager.start();
            egret3d.effectManager.start();
        };
        GameMain.prototype.update = function (time, delay) {
            if (egret3d.sceneManager.currentScene) {
                egret3d.logicManager.update(time, delay);
                // uiManager.update(time, delay);
                uiManager.updateBattle(time, delay);
                egret3d.effectManager.update(time, delay);
            }
        };
        GameMain.prototype.onResize = function () {
            // skillManager.onResize();
            // uiManager.onResize();
        };
        return GameMain;
    }());
    egret3d.GameMain = GameMain;
    __reflect(GameMain.prototype, "egret3d.GameMain");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=GameMain.js.map