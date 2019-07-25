var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingPage = (function (_super) {
    __extends(LoadingPage, _super);
    function LoadingPage(fileURLs, callbackFun, callbackObj) {
        var _this = _super.call(this) || this;
        _this.fileURLs = fileURLs;
        _this.callbackFun = callbackFun;
        _this.callbackObj = callbackObj;
        var bgImage = "ui/bg.jpg";
        _this.once(egret.Event.ADDED_TO_STAGE, function () {
            _this.onAdd(bgImage);
        }, _this);
        return _this;
    }
    LoadingPage.prototype.onAdd = function (bgImage) {
        var wid = this.stage.stageWidth;
        var hei = this.stage.stageHeight;
        if (bgImage) {
            var bg = new egret.Bitmap();
            bg.texture = RES.getRes(bgImage);
            // bg.width = wid * 2;
            // bg.height = hei;
            // bg.x = -Math.floor(wid / 2);
            this.addChild(bg);
        }
        this.totalProgress = new ProcessBar("ui/gameUI.json#hpbar_bg.png", "ui/gameUI.json#expbar.png");
        this.totalProgress.width = wid - 100;
        this.totalProgress.height = 10;
        this.totalProgress.ratio = 0;
        this.totalProgress.x = 50;
        this.totalProgress.y = (hei - this.totalProgress.height) * 0.5 - 10;
        this.addChild(this.totalProgress);
    };
    LoadingPage.prototype.onEnterPage = function () {
        var _this = this;
        this.fileURLs = this.fileURLs.map(function (item) { return item.replace("resource/", ""); });
        console.log(this.fileURLs);
        this._count = 0;
        this._total = this.fileURLs.length;
        Promise.all(this.fileURLs.map(function (item) { return RES.getResAsync(item, _this.onOnceComplete, _this); })).then(function () {
            _this.onTotalLoadComplete();
        });
    };
    LoadingPage.prototype.onLeavePage = function () {
        this._count = 0;
        this._total = 0;
        this.callbackFun = null;
        this.callbackObj = null;
    };
    LoadingPage.prototype.onOnceComplete = function () {
        this._count++;
        this.totalProgress.ratio = this._count / this._total;
    };
    LoadingPage.prototype.onTotalLoadComplete = function () {
        var _this = this;
        if (this.callbackFun) {
            //this._callbackFun.call(this._callbackObj, this._loader)
            var loader_1 = {
                getAsset: function (url) {
                    url = url.replace("resource/", "");
                    RES.profile();
                    var r = RES.getRes(url);
                    return r;
                }
            };
            setTimeout(function () { return _this.callbackFun.call(_this.callbackObj, loader_1); }, 100);
        }
    };
    return LoadingPage;
}(egret.DisplayObjectContainer));
__reflect(LoadingPage.prototype, "LoadingPage");
//# sourceMappingURL=LoadingPage.js.map