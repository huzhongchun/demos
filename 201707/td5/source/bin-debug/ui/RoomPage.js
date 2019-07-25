var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoomPage = (function (_super) {
    __extends(RoomPage, _super);
    function RoomPage() {
        var _this = _super.call(this) || this;
        _this.mapItem = [];
        var wid = UIManager.gameWidth;
        var hei = UIManager.gameHeight;
        var bgImage = new egret.Bitmap();
        bgImage.texture = RES.getRes("ui/bg.jpg");
        // bgImage.width = wid * 2;
        // bgImage.height = hei;
        // bgImage.x = -Math.floor(bgImage.width / 3);
        _this.addChild(bgImage);
        var titleImage = new egret.Bitmap();
        titleImage.texture = RES.getRes("ui/ui.json#title");
        titleImage.x = wid * 0.5 - titleImage.width * 0.5;
        titleImage.y = 100;
        _this.addChild(titleImage);
        // let titleImage1 = new egret.Bitmap();
        // titleImage1.texture = RES.getRes("ui/gameUI.json#levelname.png");
        // titleImage1.x = wid * 0.5 - titleImage1.width * 0.5;
        // titleImage1.y = 0;
        // this.addChild(titleImage1);
        // let backBut = this.backBut = new egret.Bitmap();
        // backBut.texture = RES.getRes("ui/gameUI.json#back.png");
        // backBut.x = 10;
        // backBut.y = 10;
        // this.addChild(backBut);
        var keys = egret3d.TableManager.getSceneTableItemKeys();
        var len = keys.length;
        egret3d.logicManager.setLocalStorageItem(keys[0], "false");
        //Test;
        var disX = 40;
        var disY = 280;
        for (var i = 0; i < len; i++) {
            var mapItem = new MapItem1("pic" + (i + 1) + "", Math.min(i + 1, 4), egret3d.logicManager.getLocalStorageItem(keys[i]) != "false");
            mapItem.sceneID = parseInt(keys[i]);
            mapItem.x = disX + Math.floor(i % 2) * (310);
            mapItem.y = disY + Math.floor(i / 2) * (230);
            _this.addChild(mapItem);
            _this.mapItem.push(mapItem);
            mapItem.touchEnabled = true;
        }
        return _this;
        // this.backBut.touchEnabled = true;
    }
    RoomPage.prototype.onEnterPage = function () {
        // this.backBut.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        var keys = egret3d.TableManager.getSceneTableItemKeys();
        var len = this.mapItem.length;
        for (var i = 0; i < len; i++) {
            this.mapItem[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this.mapItem[i].lock = egret3d.logicManager.getLocalStorageItem(keys[i]) != "false";
        }
    };
    RoomPage.prototype.onLeavePage = function () {
        // this.backBut.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        for (var i = 0, l = this.mapItem.length; i < l; i++) {
            this.mapItem[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
    };
    RoomPage.prototype.onButtonClick = function (e) {
        if (e.target === this.backBut) {
            uiManager.showPage(new LoginPage());
        }
        else {
            for (var i = 0, l = this.mapItem.length; i < l; i++) {
                if (e.target === this.mapItem[i]) {
                    if (this.mapItem[i].lock === false) {
                        uiManager.removePage();
                        egret3d.sceneManager.changeScene(this.mapItem[i].sceneID);
                    }
                }
            }
        }
    };
    return RoomPage;
}(egret.DisplayObjectContainer));
__reflect(RoomPage.prototype, "RoomPage");
var MapItem1 = (function (_super) {
    __extends(MapItem1, _super);
    function MapItem1(image, level, lock) {
        var _this = _super.call(this) || this;
        _this.sceneID = 100000;
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("ui/ui.json#" + image);
        _this.addChild(bg);
        bg.x = 10;
        bg.y = 10;
        var frame = new egret.Bitmap();
        frame.texture = RES.getRes("ui/ui.json#bk");
        _this.addChild(frame);
        _this.lock = lock;
        if (level > 0) {
            var startArray = [];
            for (var i = 0; i < level; i++) {
                var start = new egret.Bitmap();
                start.texture = RES.getRes("ui/ui.json#star");
                start.anchorOffsetX = start.width / 2;
                start.x = frame.width / 2 - (level - 1) / 2 * (start.width + 2) + i * (start.width + 2);
                start.y = 0;
                startArray.push(start);
            }
            startArray.reverse();
            for (var i = 0; i < startArray.length; i++) {
                _this.addChild(startArray[i]);
            }
        }
        _this.width = bg.width;
        return _this;
    }
    Object.defineProperty(MapItem1.prototype, "lock", {
        get: function () {
            return this._lock && this._lock.visible;
        },
        set: function (value) {
            if (!this.lock) {
                this._lock = new egret.Bitmap();
                this._lock.texture = RES.getRes("ui/ui.json#suo");
                this._lock.x = this.width * 0.5 - this._lock.width * 0.5;
                this._lock.y = this.height * 0.5 - this._lock.height * 0.5;
                this.addChild(this._lock);
            }
            this._lock.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    return MapItem1;
}(egret.DisplayObjectContainer));
__reflect(MapItem1.prototype, "MapItem1");
//# sourceMappingURL=RoomPage.js.map