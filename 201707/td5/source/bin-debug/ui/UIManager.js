var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIManager = (function () {
    function UIManager(container) {
        this.container = container;
        UIManager.gameWidth = container.stage.stageWidth;
        UIManager.gameHeight = container.stage.stageHeight;
    }
    UIManager.prototype.showPage = function (page) {
        this.removePage();
        this.currentPage = page;
        this.container.addChild(page);
        if (page.onEnterPage) {
            page.onEnterPage();
        }
    };
    UIManager.prototype.removePage = function () {
        if (this.currentPage) {
            if (this.currentPage.onLeavePage) {
                this.currentPage.onLeavePage();
            }
            this.container.removeChild(this.currentPage);
            this.currentPage = null;
        }
    };
    UIManager.prototype.showBattle = function () {
        if (!this.battlePage) {
            this.battlePage = new BattlePage();
        }
        this.battlePage.onEnterPage();
        this.container.addChild(this.battlePage);
    };
    UIManager.prototype.updateBattle = function (time, delay) {
        if (!this.battlePage) {
            this.battlePage = new BattlePage();
        }
        this.battlePage.update(time, delay);
    };
    UIManager.prototype.blood = function (target, num) {
        if (!this.battlePage) {
            this.battlePage = new BattlePage();
        }
        this.battlePage.blood(target, num);
    };
    UIManager.prototype.addHpBar = function (target, hpBar) {
        if (!this.battlePage) {
            this.battlePage = new BattlePage();
        }
        this.battlePage.addHpBar(target, hpBar);
    };
    UIManager.prototype.startTimeKeeper = function () {
        if (!this.battlePage) {
            this.battlePage = new BattlePage();
        }
        this.battlePage.timeKeeper.start();
    };
    UIManager.prototype.stopTimeKeeper = function () {
        if (!this.battlePage) {
            this.battlePage = new BattlePage();
        }
        this.battlePage.timeKeeper.stop();
    };
    UIManager.prototype.hits = function () {
        if (!this.battlePage) {
            this.battlePage = new BattlePage();
        }
        this.battlePage.hitContainer.hits();
    };
    UIManager.prototype.updateExpBar = function (ratio) {
        if (!this.battlePage) {
            this.battlePage = new BattlePage();
        }
        this.battlePage.expBar.ratio = ratio;
    };
    UIManager.prototype.leaveBattle = function () {
        this.battlePage.onLeavePage();
        this.container.removeChild(this.battlePage);
    };
    UIManager.prototype.showEnding = function () {
        if (!this.endingPage) {
            this.endingPage = new EndingPage();
        }
        this.endingPage.x = (UIManager.gameWidth - this.endingPage.width) / 2;
        this.endingPage.y = (UIManager.gameHeight - this.endingPage.height) / 2;
        this.container.addChild(this.endingPage);
    };
    UIManager.prototype.leaveEnding = function () {
        this.container.removeChild(this.endingPage);
    };
    return UIManager;
}());
UIManager.gameWidth = 0;
UIManager.gameHeight = 0;
__reflect(UIManager.prototype, "UIManager");
var uiManager;
//# sourceMappingURL=UIManager.js.map