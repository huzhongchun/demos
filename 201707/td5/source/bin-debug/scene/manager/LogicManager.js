var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    var LogicManager = (function () {
        function LogicManager() {
            this.sceneID = 100000;
            this.cancelMove = false;
            this._localStorageData = {};
        }
        LogicManager.prototype.getLocalStorageItem = function (key) {
            try {
                return localStorage.getItem(key);
            }
            catch (e) {
                return this._localStorageData[key] || "";
            }
        };
        LogicManager.prototype.setLocalStorageItem = function (key, value) {
            try {
                localStorage.setItem(key, value);
            }
            catch (e) {
                this._localStorageData[key] = value;
            }
        };
        LogicManager.prototype.initGrassSqueeze = function () {
            var scene = RES.getRes("scene/scene_0/MapConfig.json");
        };
        LogicManager.prototype.startGameRoom = function () {
            this.currentGameRoom = new GameRoom();
            this.currentGameRoom.useMap(this.sceneID);
            var gameActor = this.currentGameRoom.addRole(100000, 0, true);
            gameActor.performer = gameActor.performer || new egret3d.ProtagonistLogic();
            gameActor.performer.self = gameActor;
            gameActor.performer.gameRoom = this.currentGameRoom;
            gameActor.performer.initConfig(null);
            gameActor.performer.startLogic("PatrolLogic");
            this.currentGameRoom.start();
        };
        LogicManager.prototype.start = function () {
            this.startGameRoom();
        };
        LogicManager.prototype.exit = function () {
            this.currentGameRoom.closeGameRoom();
            egret3d.sceneManager.leaveScene(egret3d.sceneManager.currentScene);
            // uiManager.removeBattleUI();
            // uiManager.removeAllHpBar();
            // skillManager.removeGUI();
            // uiManager.roomView.onEnterPage();
            uiManager.leaveBattle();
            uiManager.showPage(new RoomPage());
        };
        LogicManager.prototype.update = function (time, delay) {
            if (this.currentGameRoom)
                this.currentGameRoom.update(time, delay);
        };
        return LogicManager;
    }());
    egret3d.LogicManager = LogicManager;
    __reflect(LogicManager.prototype, "egret3d.LogicManager");
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            return _super.call(this) || this;
        }
        GameScene.prototype.initEffect = function () {
            this._lineFog = new egret3d.LineFogMethod();
            this._lineFog.fogFarDistance = 1400;
            this._lineFog.fogStartDistance = 3000;
            this._lineFog.fogColor = egret3d.Color.RGBAToColor(0.0, 192.0 / 255.0, 1.0, 1.0);
            this._lineFog.fogAlpha = 1.0;
            this.addFog(this);
        };
        GameScene.prototype.addFog = function (obj) {
            for (var s in obj.childs) {
                if (obj.childs[s] instanceof egret3d.Mesh) {
                    obj.childs[s].material.diffusePass.addMethod(this._lineFog);
                }
                else {
                    this.addFog(obj.childs[s]);
                }
            }
        };
        GameScene.prototype.initTerrainCollision = function (m) {
            this.terrainMesh = m;
            //this._terrainCollision = new TerrainCollision(this.terrainMesh);
        };
        GameScene.prototype.initNav = function (nav) {
            this._nav = nav;
        };
        GameScene.prototype.getTerrainHeight = function (x, z) {
            if (this._terrainCollision)
                return this._terrainCollision.getTerrainCollisionHeight(x, z);
            else
                return 0;
        };
        Object.defineProperty(GameScene.prototype, "nav", {
            get: function () {
                return this._nav;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameScene.prototype, "terrainCollision", {
            get: function () {
                return this._terrainCollision;
            },
            enumerable: true,
            configurable: true
        });
        return GameScene;
    }(egret3d.Scene3D));
    egret3d.GameScene = GameScene;
    __reflect(GameScene.prototype, "egret3d.GameScene");
    //游戏关卡控制;
    var GameLevel = (function () {
        function GameLevel() {
            this._monsterNum = [0, 0, 0, 0, 0];
            this._refreshMonsterTimer = 0;
            this._event3D = new egret3d.Event3D();
        }
        GameLevel.prototype.start = function (gameRoom) {
            var _this = this;
            this._gameRoom = gameRoom;
            this._sceneItem = gameRoom.sceneItem;
            this._waveItem = egret3d.TableManager.findWaveTableItem(this._sceneItem.wave_id);
            //创建塔对象;
            var v = egret3d.JSON_Util.getVector3D(this._sceneItem.host_point);
            this.host = gameRoom.addRole(this._sceneItem.host_unit_id, 0, false);
            this.host.jumpTo(v.x, v.z);
            clearTimeout(this._refreshMonsterTimer);
            this._refreshMonsterTimer = setTimeout(function () { return _this.onRefreshMonster(); }, this._sceneItem.start_wait);
        };
        //怪物刷新;
        GameLevel.prototype.onRefreshMonster = function () {
            var _this = this;
            var monsterIdArray = [
                this._waveItem.monsterA_id,
                this._waveItem.monsterB_id,
                this._waveItem.monsterC_id,
                this._waveItem.monsterD_id,
                this._waveItem.monsterE_id,
            ];
            var monsterNumArray = [
                this._waveItem.monsterA_num,
                this._waveItem.monsterB_num,
                this._waveItem.monsterC_num,
                this._waveItem.monsterD_num,
                this._waveItem.monsterE_num,
            ];
            var monsterPointArray = [
                this._gameRoom.sceneItem.monster_point_0,
                this._gameRoom.sceneItem.monster_point_1,
                this._gameRoom.sceneItem.monster_point_2,
                this._gameRoom.sceneItem.monster_point_3,
                this._gameRoom.sceneItem.monster_point_4,
            ];
            var v2 = egret3d.JSON_Util.getVector3D(this._gameRoom.sceneItem.host_point);
            for (var i = monsterIdArray.length - 1; i >= 0; i--) {
                if (monsterIdArray[i] > 0 && this._monsterNum[i] < monsterNumArray[i]) {
                    var v = egret3d.JSON_Util.getVector3D(monsterPointArray[i]);
                    var gameActor = this._gameRoom.addRole(monsterIdArray[i], 2, false);
                    gameActor.jumpTo(v.x, v.z);
                    //指定怪物AI;
                    gameActor.runAction(new egret3d.ActionRepeat(new egret3d.ActionSequence([new egret3d.ActionAttackTo(egret3d.JSON_Util.getVector3D(this._gameRoom.sceneItem.host_point)), new egret3d.ActionDelay(400)]), -1));
                    this._monsterNum[i]++;
                }
            }
            //当前波怪物是否已经刷完;
            if (this._monsterNum[0] >= this._waveItem.monsterA_num &&
                this._monsterNum[1] >= this._waveItem.monsterB_num &&
                this._monsterNum[2] >= this._waveItem.monsterC_num &&
                this._monsterNum[3] >= this._waveItem.monsterD_num &&
                this._monsterNum[4] >= this._waveItem.monsterE_num) {
                //是否还有下一波，如果有就更新下一波的配置，并且等待一段时间
                if (this._waveItem.next_wave > 0) {
                    if (this._waveItem = egret3d.TableManager.findWaveTableItem(this._waveItem.next_wave)) {
                        //清空出怪计数;
                        this._monsterNum[0] =
                            this._monsterNum[1] =
                                this._monsterNum[2] =
                                    this._monsterNum[3] =
                                        this._monsterNum[4] = 0;
                    }
                }
                else {
                    this._waveItem = null;
                }
                clearTimeout(this._refreshMonsterTimer);
                this._refreshMonsterTimer = setTimeout(function () { return _this.onCheckMonster(); }, 3000);
            }
            else {
                //每秒刷一只;
                clearTimeout(this._refreshMonsterTimer);
                this._refreshMonsterTimer = setTimeout(function () { return _this.onRefreshMonster(); }, 1000);
            }
        };
        GameLevel.prototype.onCheckMonster = function () {
            var _this = this;
            if (this.host.isDeath) {
                return;
            }
            if (this._gameRoom.getActorNumFromGroupID(2) <= 0) {
                if (this._waveItem) {
                    this.onRefreshMonster();
                }
                else {
                    //最后一波杀完了提示通关！;
                    egret3d.logicManager.setLocalStorageItem(this._sceneItem.next_scene_id.toString(), "false");
                    this._gameRoom.gameOver();
                }
            }
            else {
                clearTimeout(this._refreshMonsterTimer);
                this._refreshMonsterTimer = setTimeout(function () { return _this.onCheckMonster(); }, 3000);
            }
        };
        return GameLevel;
    }());
    egret3d.GameLevel = GameLevel;
    __reflect(GameLevel.prototype, "egret3d.GameLevel");
    var GameRoom = (function (_super) {
        __extends(GameRoom, _super);
        function GameRoom() {
            var _this = _super.call(this) || this;
            _this.monsterItem = [];
            _this.gPoint = new egret3d.Vector3D();
            _this.actorlist = [];
            _this._event3D = new egret3d.Event3D();
            _this.gameController = new GameController();
            //this._levelLogic = new LevelLogic();
            _this._gameLevel = new GameLevel();
            _this._mainActorIsDeath = false;
            _this.isGameOver = false;
            return _this;
        }
        GameRoom.prototype.start = function () {
            var point = egret3d.JSON_Util.getVector3D(this.sceneItem.player_point);
            this.setStartPosition(point.x, point.z);
            ////level
            ////生成怪物
            ////怪物移动到目标 & 检测可攻击目标  
            //this._levelLogic.initConfig(null);
            //this._levelLogic.gameRoom = this; 
            //this._levelLogic.startLogic("DelayLogic");
            this._gameLevel.start(this);
            this._mainActorIsDeath = false;
            // this._rebirthBut = new gui.UILabelButton();
            // this._rebirthBut.label = "复活";
            //  this._rebirthBut.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, function () {
            // this.resetRole(this.gameController.mainActor);
            // }, this);
            //sceneManager.view.addGUI(this._rebirthBut);
            this._crystalMesh = egret3d.sceneManager.currentScene.findObject3D("Crystal");
            this.isGameOver = false;
            // uiManager.startTimeKeeper();
            uiManager.startTimeKeeper();
        };
        GameRoom.prototype.closeGameRoom = function () {
            for (var _i = 0, _a = this.actorlist; _i < _a.length; _i++) {
                var r = _a[_i];
                this.removeRole(r);
            }
        };
        GameRoom.prototype.getActorNumFromGroupID = function (groupID) {
            var count = 0;
            for (var i = this.actorlist.length - 1; i >= 0; i--) {
                if (this.actorlist[i].groupID == groupID) {
                    count++;
                }
            }
            return count;
        };
        GameRoom.prototype.setStartPosition = function (x, z) {
            this.gameController.mainActor.jumpTo(x, z);
            egret3d.gameCameraManager.follow(this.gameController.mainActor);
        };
        GameRoom.prototype.addRole = function (id, group, isMain) {
            var item = egret3d.TableManager.findUnitTableItem(id);
            var role = egret3d.playerManager.getRole(item.asset_id);
            role = role ? role.clone() : null;
            var gameActor = new egret3d.GameActor();
            if (isMain) {
                this.playerItem = item;
                this.gameController.mainActor = gameActor;
            }
            gameActor.groupID = group;
            gameActor.gameRoom = this;
            gameActor.setRole(role, item);
            this.actorlist.push(gameActor);
            this.gameScene.addChild(gameActor);
            gameActor.onBeAdded();
            return gameActor;
        };
        GameRoom.prototype.resetRole = function (gameActor) {
            gameActor.rebirth();
            if (this.actorlist.indexOf(gameActor) < 0) {
                this.actorlist.push(gameActor);
                this.gameScene.addChild(gameActor);
                gameActor.onBeAdded();
            }
            if (gameActor == this.gameController.mainActor) {
                this._mainActorIsDeath = false;
            }
            return gameActor;
        };
        GameRoom.prototype.removeRole = function (gameActor) {
            var index = this.actorlist.indexOf(gameActor);
            if (index >= 0) {
                this.actorlist.splice(index, 1);
            }
            this.gameScene.removeChild(gameActor);
            gameActor.onBeRemove();
        };
        GameRoom.prototype.useMap = function (id) {
            this.sceneItem = egret3d.TableManager.findSceneTableItem(id);
            if (this.gameScene)
                egret3d.sceneManager.leaveScene(this.gameScene);
            egret3d.sceneManager.enterScene(this.sceneItem.asset_id);
            this.gameScene = egret3d.sceneManager.currentScene;
            if (this.gameScene.terrainMesh)
                this.gameScene.terrainMesh.addEventListener(egret3d.PickEvent3D.PICK_DOWN, this.pickMove, this);
        };
        GameRoom.prototype.pickMove = function (e) {
            console.log("walk");
            if (!this.gameController.mainActor.lockMove && !this.gameController.mainActor.isDeath && !egret3d.logicManager.cancelMove) {
                this.gPoint.copyFrom(e.pickResult.globalPosition);
                this.gameController.mainActor.runAction(new egret3d.ActionSequence([new egret3d.ActionMoveTo(this.gPoint), new egret3d.ActionAttackTo(this.gPoint)]));
            }
            egret3d.logicManager.cancelMove = false;
        };
        GameRoom.prototype.gameOver = function () {
            this.isGameOver = true;
            this._event3D.eventType = GameRoom.EVENT_GAME_OVER;
            this.dispatchEvent(this._event3D);
            // timemer.timing(1000, () => uiManager.showEndingView(), null);
            egret3d.timemer.timing(1000, function () { return uiManager.showEnding(); }, null);
        };
        GameRoom.prototype.update = function (time, delay) {
            if (this._gameLevel.host.isDeath && this._crystalMesh.visible) {
                var effect = egret3d.sceneManager.currentScene.findObject3D("Fx_TowerExplode_01");
                effect.play(1.0, true);
                effect.addEventListener(egret3d.AnimationEvent3D.COMPLETE, this.gameOver, this);
                this._crystalMesh.visible = false;
            }
            if (!this._mainActorIsDeath) {
                for (var _i = 0, _a = this.actorlist; _i < _a.length; _i++) {
                    var r = _a[_i];
                    if (r.x == undefined) {
                        r.y = 0; //sceneManager.currentScene.getTerrainHeight(r.x, r.z);
                    }
                    r.y = egret3d.sceneManager.currentScene.getTerrainHeight(r.x, r.z) + 10;
                    if (r.isDeath) {
                        var index = this.actorlist.indexOf(r);
                        if (index >= 0) {
                            this.actorlist.splice(index, 1);
                            r.onBeRemove();
                        }
                        if (r != this.gameController.mainActor) {
                            egret3d.timemer.timing(3000, this.removeRole, this, r);
                        }
                        else {
                            this._mainActorIsDeath = true;
                            this.gameOver();
                        }
                        //播放死亡音效;
                        if (r.itemConfig.death_sound.length > 0) {
                            r.playAudio(r.itemConfig.death_sound);
                        }
                    }
                }
            }
            egret3d.gameCameraManager.update(time, delay);
            //if (this._levelLogic)
            //    this._levelLogic.tick(time, delay);
        };
        return GameRoom;
    }(egret3d.EventDispatcher));
    //主角死亡事件;
    GameRoom.EVENT_MAIN_ACTOR_DEATH = "event_main_actor_death";
    //游戏结束;
    GameRoom.EVENT_GAME_OVER = "event_game_over";
    egret3d.GameRoom = GameRoom;
    __reflect(GameRoom.prototype, "egret3d.GameRoom");
    var GameController = (function () {
        function GameController() {
        }
        Object.defineProperty(GameController.prototype, "mainActor", {
            get: function () {
                return this._mainGameActor;
            },
            set: function (actor) {
                this._mainGameActor = actor;
            },
            enumerable: true,
            configurable: true
        });
        return GameController;
    }());
    egret3d.GameController = GameController;
    __reflect(GameController.prototype, "egret3d.GameController");
    egret3d.logicManager = new LogicManager();
})(egret3d || (egret3d = {}));
//# sourceMappingURL=LogicManager.js.map