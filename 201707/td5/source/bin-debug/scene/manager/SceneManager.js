var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var SceneManager = (function () {
        function SceneManager() {
            this._currentMap = 0;
        }
        Object.defineProperty(SceneManager.prototype, "view", {
            get: function () {
                return this._view;
            },
            set: function (v) {
                this._view = v;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.enterScene = function (assetesID) {
            var mapURL = "scene/" + assetesID + "/Scene.e3dPack";
            this._currentScene = new egret3d.GameScene();
            var tmp = RES.getRes(mapURL);
            this._currentScene.addChild(tmp);
            this._currentScene.initEffect();
            var nav = egret3d.NavGrid.createNavGridFromBuffer(RES.getRes("scene/" + assetesID + "/NavGrid.nav"));
            var terrain = tmp.findObject3D("TerrainCollider");
            if (terrain) {
                terrain.pickType = egret3d.PickType.PositionPick;
                terrain.enablePick = true;
                terrain.canPick = true;
                this._currentScene.initTerrainCollision(terrain);
            }
            if (nav) {
                this._currentScene.initNav(nav);
            }
            this._view.scene = this._currentScene;
            //let a = new Mesh(new PlaneGeometry(3000,3000));
            //this._currentScene.addChild(a);
            //a.z = 3000;
            //a.x = 0;
            //a.y = 50;
            function buildGrid() {
                var vertexs = [];
                var wireframe;
                //                var gridoffsetX: number = -(nav.colNum * nav.gridWidth * 0.5 - nav.gridWidth * 0.5);
                //                var gridoffsetY: number = -(nav.rowNum * nav.gridHeight * 0.5 - nav.gridHeight * 0.5);
                var gridoffsetX = 0;
                var gridoffsetY = 0;
                var terrain1 = tmp.findObject3D("Terrain");
                //                wireframe.x = terrain1.x;
                //                wireframe.z = terrain1.z;
                for (var y = 0; y < nav.rowNum; y++) {
                    for (var x = 0; x < nav.colNum; x++) {
                        var lineX = gridoffsetX + x * nav.gridWidth;
                        var lineY = gridoffsetY + y * nav.gridHeight;
                        if (nav.datas[(nav.rowNum - y - 1) * nav.colNum + x].isPass) {
                            vertexs.push(lineX, 0, lineY, 1, 0, 0, 1, lineX + nav.gridWidth, 0, lineY, 1, 0, 0, 1, lineX + nav.gridWidth, 0, lineY, 1, 0, 0, 1, lineX + nav.gridWidth, 0, lineY + nav.gridHeight, 1, 0, 0, 1, lineX + nav.gridWidth, 0, lineY + nav.gridHeight, 1, 0, 0, 1, lineX, 0, lineY + nav.gridHeight, 1, 0, 0, 1, lineX, 0, lineY + nav.gridHeight, 1, 0, 0, 1, lineX, 0, lineY, 1, 0, 0, 1);
                        }
                        else {
                            vertexs.push(lineX, 0, lineY, 0, 1, 0, 1, lineX + nav.gridWidth, 0, lineY, 0, 1, 0, 1, lineX + nav.gridWidth, 0, lineY, 0, 1, 0, 1, lineX + nav.gridWidth, 0, lineY + nav.gridHeight, 0, 1, 0, 1, lineX + nav.gridWidth, 0, lineY + nav.gridHeight, 0, 1, 0, 1, lineX, 0, lineY + nav.gridHeight, 0, 1, 0, 1, lineX, 0, lineY + nav.gridHeight, 0, 1, 0, 1, lineX, 0, lineY, 0, 1, 0, 1);
                        }
                        if (vertexs.length >= 458640) {
                            wireframe = new egret3d.Wireframe();
                            wireframe.fromVertexsEx(vertexs, egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_COLOR);
                            wireframe.material.diffuseColor = 0xffffff;
                            wireframe.y = 2;
                            this._currentScene.addChild(wireframe);
                            //                            wireframe.x = terrain1.x;
                            //                            wireframe.z = terrain1.z;
                            vertexs.length = 0;
                        }
                    }
                }
                if (vertexs.length > 0) {
                    wireframe = new egret3d.Wireframe();
                    wireframe.fromVertexsEx(vertexs, egret3d.VertexFormat.VF_POSITION | egret3d.VertexFormat.VF_COLOR);
                    wireframe.material.diffuseColor = 0xffffff;
                    wireframe.y = 2;
                    vertexs.length = 0;
                    this._currentScene.addChild(wireframe);
                }
                //                var terrain1: egret3d.Terrain = <egret3d.Terrain>tmp.findObject3D("Terrain");
                //                wireframe.x = terrain1.x;
                //                wireframe.z = terrain1.z;
                // let a = new Mesh(new SphereGeometry(120));
                // this._currentScene.addChild(a);
                // a.x = 0;
                // a.y = 50;
                // a.z = 3000;
                //this._currentScene.addChild(new Mesh(new SphereGeometry(120)));
            }
            //添加测试网格
            // buildGrid.call(this);
        };
        SceneManager.prototype.leaveScene = function (gameScene) {
            this.view.scene = new egret3d.Scene3D();
            this._currentScene = null;
        };
        Object.defineProperty(SceneManager.prototype, "currentScene", {
            get: function () {
                return this._currentScene;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.changeScene = function (sceneID) {
            var _this = this;
            egret3d.logicManager.sceneID = sceneID;
            var self = this;
            var sceneItem = egret3d.TableManager.findSceneTableItem(sceneID);
            if (!sceneItem) {
                console.log(sceneID + " is no exist ");
            }
            var waveItem = egret3d.TableManager.findWaveTableItem(sceneItem.wave_id);
            var unitItem;
            var skillsItem;
            var filesURL = [];
            //场景资源
            filesURL.push("scene/" + sceneItem.asset_id + "/Scene.e3dPack");
            filesURL.push("scene/" + sceneItem.asset_id + "/NavGrid.nav");
            var array = ["A", "B", "C", "D"];
            //怪物资源
            for (var k = 0; k < array.length; k++) {
                if (waveItem) {
                    var monster_id = waveItem["monster" + array[k] + "_id"];
                    if (monster_id > 0) {
                        //动作
                        unitItem = egret3d.TableManager.findUnitTableItem(monster_id);
                        if (unitItem) {
                            filesURL.push("anim/" + unitItem.asset_id + ".e3dPack");
                        }
                        //特效
                        this.getSkillsURL(unitItem, filesURL);
                    }
                }
            }
            //角色资源
            //unitItem = TableManager.findUnitTableItem(logicManager.currentGameRoom.gameController.mainActor.itemConfig.id);   
            unitItem = egret3d.TableManager.findUnitTableItem(100000);
            //动作
            filesURL.push("anim/" + unitItem.asset_id + ".e3dPack");
            //特效
            this.getSkillsURL(unitItem, filesURL);
            filesURL.push("effects/skill/FX_Hit_01.e3dPack", "effects/skill/FX_Hit_02.e3dPack", "effects/skill/FX_Hit_03.e3dPack", "effects/skill/Fx_Levelup_01.e3dPack");
            var loading = new LoadingPage(filesURL, function () {
                _this.gameMain.start();
                uiManager.removePage();
                uiManager.showBattle();
            }, this);
            uiManager.showPage(loading);
        };
        SceneManager.prototype.getSkillsURL = function (unitItem, array) {
            if (unitItem) {
                var skillsItem;
                for (var i = 0; i < 5; i++) {
                    var skillID = unitItem["skill_" + i.toString() + "_id"];
                    if (skillID > 0) {
                        skillsItem = egret3d.TableManager.findSkillsTableItem(skillID);
                        var url;
                        if (skillsItem && skillsItem.effect_play_name.length > 0) {
                            var tmp = skillsItem.effect_play_name.split(',');
                            for (var j = 0; j < tmp.length; j++) {
                                url = egret3d.effectManager.splitUrl(tmp[j]);
                                array.push(url);
                            }
                        }
                    }
                }
            }
        };
        return SceneManager;
    }());
    egret3d.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "egret3d.SceneManager");
    egret3d.sceneManager = new SceneManager();
})(egret3d || (egret3d = {}));
//# sourceMappingURL=SceneManager.js.map