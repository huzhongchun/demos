var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        var promisify = function (loader, url) {
            return new Promise(function (reslove, reject) {
                loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, function () {
                    reslove(loader.data);
                }, _this);
                loader.load("resource/" + url);
            });
        };
        RES.processor.map("unit", {
            onLoadStart: function (host, resource) { return __awaiter(_this, void 0, void 0, function () {
                var loader;
                return __generator(this, function (_a) {
                    loader = new egret3d.UnitLoader();
                    return [2 /*return*/, promisify(loader, resource.url)];
                });
            }); },
            onRemoveStart: function (host, resource) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve()];
            }); }); }
        });
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function () {
        if (egret.Capabilities.isMobile) {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        }
        else {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        uiManager = new UIManager(this);
        var stage3d = new egret3d.Stage3D(this.stage);
        egret.setRendererContext(stage3d);
        var scene = new egret3d.Scene(stage3d);
        scene.createGameScene();
    };
    return Main;
}(egret.DisplayObjectContainer));
Main = __decorate([
    RES.mapConfig("config.json", function () { return "resource"; }, function (path) {
        var ext = path.substr(path.lastIndexOf(".") + 1);
        var type = "";
        if (path == "config.json") {
            type = "json";
        }
        else {
            if (path.indexOf("ui/") >= 0) {
                var ext_1 = path.substr(path.lastIndexOf(".") + 1);
                var typeMap = {
                    "jpg": "image",
                    "png": "image",
                    "webp": "image",
                    "json": "json",
                    "fnt": "font",
                    "pvr": "pvr",
                    "mp3": "sound"
                };
                type = typeMap[ext_1];
                if (type == "json") {
                    if (path.indexOf("png") < 0) {
                        type = "sheet";
                    }
                    else if (path.indexOf("movieclip") >= 0) {
                        type = "movieclip";
                    }
                    ;
                }
            }
            else {
                type = "unit";
            }
        }
        return type;
    })
], Main);
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map