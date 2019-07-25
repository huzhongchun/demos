var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var egret3d;
(function (egret3d) {
    var Scene = (function () {
        function Scene(stage3d) {
            this.stage3d = stage3d;
            egret3d.Egret3DEngine.instance.useDevicePOLICY(0);
            egret3d.Egret3DEngine.instance.debug = false;
            egret3d.Egret3DPolicy.useAnimPoseInterpolation = true;
            egret3d.Egret3DPolicy.useAnimMixInterpolation = true;
            egret3d.Egret3DPolicy.useParticle = true;
            egret3d.Egret3DPolicy.useLowLoop = true;
            // 添加view
            this.view = new egret3d.View3D(0, 0, stage3d.width, stage3d.height);
            Scene.root = this.view;
            this.stage3d.addView3D(this.view);
            // 游戏逻辑类
            this._gameMain = new egret3d.GameMain();
        }
        Scene.prototype.createGameScene = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            egret3d.sceneManager.gameMain = this._gameMain;
                            egret3d.sceneManager.view = this.view;
                            egret3d.sceneManager.view.width = this.stage3d.width;
                            egret3d.sceneManager.view.height = this.stage3d.height;
                            egret3d.gameCameraManager.currentCamera = this.view.camera3D;
                            window.addEventListener("resize", function () { return _this.resize(); });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            return [4 /*yield*/, RES.loadConfig()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, RES.getResAsync("ui/gameUI.json")];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, RES.getResAsync("ui/bg.jpg")];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, RES.getResAsync("ui/ui.json")];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            e_1 = _a.sent();
                            console.error(e_1);
                            return [3 /*break*/, 7];
                        case 7:
                            this.initLoginView();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Scene.prototype.initLoginView = function () {
            var resources = [
                "ShadowPlane.png",
                "table/scene.json",
                "table/skills.json",
                "table/wave.json",
                "table/unit.json",
                "table/upgrade.json",
                "table/equip.json"
            ];
            var callback = function () {
                (egret3d.TableManager.instance = new egret3d.TableManager()).onInitialize(); //初始化配置表
                var login = new LoginPage();
                uiManager.showPage(login);
            };
            var loadingPage = new LoadingPage(resources, callback, this);
            uiManager.showPage(loadingPage);
            this.stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, function (e) {
                if (this._gameMain)
                    this._gameMain.update(e.time, e.delay);
            }, this);
        };
        Scene.prototype.resize = function () {
            var _this = this;
            setTimeout(function () {
                egret3d.sceneManager.view.width = _this.stage3d.width;
                egret3d.sceneManager.view.height = _this.stage3d.height;
            }, 301);
        };
        return Scene;
    }());
    egret3d.Scene = Scene;
    __reflect(Scene.prototype, "egret3d.Scene");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Scene.js.map