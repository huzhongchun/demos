var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var PlayerManager = (function () {
        function PlayerManager() {
        }
        PlayerManager.prototype.getRole = function (assetesID) {
            var mapURL = "anim/" + assetesID + ".e3dPack";
            var role = RES.getRes(mapURL);
            return role;
        };
        return PlayerManager;
    }());
    egret3d.PlayerManager = PlayerManager;
    __reflect(PlayerManager.prototype, "egret3d.PlayerManager");
    egret3d.playerManager = new PlayerManager();
})(egret3d || (egret3d = {}));
//# sourceMappingURL=PlayerManager.js.map