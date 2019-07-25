var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *	辅助数学函数
 */
var EMathEx = (function () {
    function EMathEx() {
    }
    // 规范化角度 [-180, 180]
    EMathEx.normalizeAngle = function (a) {
        while (a > 180)
            a -= 360;
        while (a < -180)
            a += 360;
        return a;
    };
    //
    EMathEx.fNormalizeAngle = function (a) {
        while (a > 180)
            a -= 360;
        while (a < -180)
            a += 360;
        return a;
    };
    // 弧度转换为角度
    EMathEx.radianToAngle = function (radian) {
        return radian * 180 / Math.PI;
    };
    // Return the sign (-1, 0, 1) of the given number;
    EMathEx.sign = function (n) {
        if (n == 0)
            return 0;
        return n / Math.abs(n);
    };
    return EMathEx;
}());
__reflect(EMathEx.prototype, "EMathEx");
//# sourceMappingURL=MathEx.js.map