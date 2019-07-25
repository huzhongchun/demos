var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var AnimNode = (function () {
        function AnimNode() {
        }
        return AnimNode;
    }());
    __reflect(AnimNode.prototype, "AnimNode");
    var GameCameraManager = (function () {
        function GameCameraManager() {
            this._ctl = new ThirdCameraController();
        }
        GameCameraManager.prototype.playCameraAnim = function (cameraConfig) {
        };
        Object.defineProperty(GameCameraManager.prototype, "currentCamera", {
            get: function () {
                return this._camera;
            },
            set: function (camera) {
                this._camera = camera;
                this._ctl.camera = camera;
            },
            enumerable: true,
            configurable: true
        });
        GameCameraManager.prototype.follow = function (target) {
            this._ctl.lookAt(target);
        };
        GameCameraManager.prototype.update = function (time, delay) {
            this._ctl.update(time, delay);
        };
        return GameCameraManager;
    }());
    egret3d.GameCameraManager = GameCameraManager;
    __reflect(GameCameraManager.prototype, "egret3d.GameCameraManager");
    var ThirdCameraController = (function () {
        function ThirdCameraController() {
            this._height = 400;
            this._tiltAngle = 60;
            this._offsetZ = 0;
            this.height = 1000;
            this.tiltAngle = 50;
        }
        Object.defineProperty(ThirdCameraController.prototype, "camera", {
            set: function (camera) {
                this._camera = camera;
            },
            enumerable: true,
            configurable: true
        });
        ThirdCameraController.prototype.lookAt = function (target) {
            this._target = target;
        };
        Object.defineProperty(ThirdCameraController.prototype, "height", {
            set: function (v) {
                this._height = v;
                this.notifeUpdate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ThirdCameraController.prototype, "tiltAngle", {
            set: function (v) {
                this._tiltAngle = v;
                this.notifeUpdate();
            },
            enumerable: true,
            configurable: true
        });
        ThirdCameraController.prototype.update = function (time, delay) {
            if (this._target) {
                this._camera.rotationX = this._tiltAngle;
                this._camera.x = this._target.x;
                this._camera.y = this._target.y + this._height;
                this._camera.z = this._target.z - this._offsetZ;
            }
        };
        ThirdCameraController.prototype.notifeUpdate = function () {
            this._offsetZ = this._height / Math.tan(this._tiltAngle * egret3d.MathUtil.DEGREES_TO_RADIANS);
        };
        return ThirdCameraController;
    }());
    __reflect(ThirdCameraController.prototype, "ThirdCameraController");
    egret3d.gameCameraManager = new GameCameraManager();
})(egret3d || (egret3d = {}));
//# sourceMappingURL=CameraManager.js.map