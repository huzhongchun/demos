var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var Vec2 = (function () {
        function Vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Object.defineProperty(Vec2.prototype, "lengthSquared", {
            get: function () {
                return this.x * this.x + this.y * this.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2.prototype, "length", {
            get: function () {
                return Math.sqrt(this.lengthSquared);
            },
            enumerable: true,
            configurable: true
        });
        Vec2.prototype.normalize = function (thickness) {
            if (thickness === void 0) { thickness = 1; }
            if (this.length != 0) {
                var invLength = thickness / this.length;
                this.x *= invLength;
                this.y *= invLength;
                return;
            }
        };
        Vec2.prototype.distance = function (vec) {
            var x = (this.x - vec.x);
            var y = (this.y - vec.y);
            return Math.sqrt(x * x + y * y);
        };
        Vec2.prototype.scaleBy = function (s) {
            this.x *= s;
            this.y *= s;
        };
        Vec2.prototype.subtract = function (a, target) {
            if (!target) {
                target = new Vec2();
            }
            target.x = this.x - a.x;
            target.y = this.y - a.y;
            return target;
        };
        Vec2.prototype.add = function (a, target) {
            if (!target) {
                target = new Vec2();
            }
            target.x = this.x + a.x;
            target.y = this.y + a.y;
            return target;
        };
        Vec2.prototype.copyFrom = function (src) {
            this.x = src.x;
            this.y = src.y;
        };
        return Vec2;
    }());
    egret3d.Vec2 = Vec2;
    __reflect(Vec2.prototype, "egret3d.Vec2");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Vec2.js.map