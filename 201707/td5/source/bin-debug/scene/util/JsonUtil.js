var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var JSON_Util = (function () {
        function JSON_Util() {
        }
        JSON_Util.getVector3D = function (str) {
            var tmp = str.split(",");
            var tmpV = new egret3d.Vector3D();
            if (tmp) {
                switch (tmp.length) {
                    case 1:
                        tmpV.x = Number(tmp[0]);
                        break;
                    case 2:
                        tmpV.x = Number(tmp[0]);
                        tmpV.y = Number(tmp[1]);
                        break;
                    case 3:
                        tmpV.x = Number(tmp[0]);
                        tmpV.y = Number(tmp[1]);
                        tmpV.z = Number(tmp[2]);
                        break;
                }
            }
            return tmpV;
        };
        return JSON_Util;
    }());
    egret3d.JSON_Util = JSON_Util;
    __reflect(JSON_Util.prototype, "egret3d.JSON_Util");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=JsonUtil.js.map