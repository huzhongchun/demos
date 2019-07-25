var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var EffectManager = (function () {
        function EffectManager() {
            this._effectCount = 0;
            this._effectNames = [];
            this._busyEffects = new egret3d.DoubleArray();
            this._freeEffects = new egret3d.DoubleArray();
            this._orignalEffects = {};
            this._uploadStatus = -1;
            this._preEffects = {};
            this._recycleTime = {
                "Fx_Skill1": 1200,
                "Fx_Skill2_1": 1200,
                "Fx_Skill2_2": 1200,
                "Fx_Skill2_3": 1500,
                "Fx_Skill3_1": 2000,
                "Fx_Skill4": 2500,
                "FX_Hit_01": 500,
                "FX_Hit_02": 500,
                "FX_Hit_03": 500,
                "Fx_Levelup_01": 2000
            };
            this._prepareCount = {
                "Fx_Skill1": 1,
                "Fx_Skill2_1": 1,
                "Fx_Skill2_2": 1,
                "Fx_Skill2_3": 1,
                "Fx_Skill3_1": 1,
                "Fx_Skill4": 1,
                "FX_Hit_01": 2,
                "FX_Hit_02": 2,
                "FX_Hit_03": 2,
                "Fx_Levelup_01": 1
            };
        }
        EffectManager.prototype.start = function () {
            this.preUpload();
            this.prepareEffects();
        };
        EffectManager.prototype.splitUrl = function (name) {
            var url = "effects/skill/" + name + ".e3dPack";
            return url;
        };
        EffectManager.prototype.getEffect = function (name) {
            if (this._effectNames.indexOf(name) == -1) {
                this._effectNames.push(name);
                this._effectCount++;
            }
            //取出一个特效，如果回收池不够用，新建一个特效组
            var freeEffects = this._freeEffects.getValueByKey(name);
            var effect;
            if (freeEffects && freeEffects.length > 0) {
                effect = freeEffects.shift();
            }
            else {
                effect = this._orignalEffects[name];
                if (effect == null) {
                    var url = this.splitUrl(name);
                    effect = RES.getRes(url);
                    this._orignalEffects[name] = effect;
                }
                else {
                    effect = effect.deepClone();
                    effect.isOriginal = false;
                }
                if (effect == null) {
                    //console.log("该特效没有被加载过： " + name);
                    return null;
                }
            }
            //放入一个在用的特效放入正在使用的队列中
            var busyEffects = this._busyEffects.getValueByKey(name);
            if (busyEffects == null) {
                busyEffects = [];
                this._busyEffects.put(name, busyEffects);
            }
            busyEffects.push(effect);
            effect.liveTime = 0;
            return effect;
        };
        EffectManager.prototype.recycleEffect = function (name, effect) {
            effect.stop();
            if (effect.parent) {
                effect.parent.removeChild(effect);
                effect.x = effect.y = effect.z = 0;
            }
            effect.liveTime = -1;
            //将该特效放入到free列表中
            var freeEffects = this._freeEffects.getValueByKey(name);
            if (freeEffects == null) {
                freeEffects = [];
                this._freeEffects.put(name, freeEffects);
            }
            freeEffects.push(effect);
            //从原先的使用队列中移除
            var busyEffects = this._busyEffects.getValueByKey(name);
            if (busyEffects) {
                var index = busyEffects.indexOf(effect);
                if (index >= 0) {
                    busyEffects.splice(index, 1);
                }
            }
        };
        EffectManager.prototype.recycleAllEffect = function () {
            var name;
            var count = 0;
            var effect;
            for (var i = 0; i < this._effectCount; i++) {
                name = this._effectNames[i];
                var busyEffects = this._busyEffects.getValueByKey(name);
                if (busyEffects == null)
                    continue;
                for (var j = busyEffects.length - 1; j >= 0; j--) {
                    effect = busyEffects[j];
                    this.recycleEffect(name, effect);
                }
            }
        };
        EffectManager.prototype.update = function (time, delay) {
            var MaxLiveTime = 3 * 1000;
            var name;
            var count = 0;
            var effect;
            var busyCount = 0;
            var recycled = false;
            for (var i = 0; i < this._effectCount; i++) {
                name = this._effectNames[i];
                var busyEffects = this._busyEffects.getValueByKey(name);
                var recycleTime = this._recycleTime[name] || MaxLiveTime;
                for (var j = busyEffects.length - 1; j >= 0; j--) {
                    effect = busyEffects[j];
                    effect.liveTime += delay * effect.speed;
                    if (effect.liveTime >= recycleTime) {
                        this.recycleEffect(name, effect);
                        recycled = true;
                    }
                    else {
                        busyCount++;
                    }
                }
            }
            if (recycled) {
            }
            if (this._uploadStatus >= 0) {
                if (this._uploadStatus >= 1) {
                    this.removePreUpload();
                }
                else {
                    //console.log("预渲染特[" + this._uploadStatus + "]");
                    this._uploadStatus++;
                }
            }
        };
        EffectManager.prototype.preUpload = function () {
            this._uploadStatus = 0;
            var names = [
                "Fx_Skill1",
                "Fx_Skill2_1",
                "Fx_Skill2_2",
                "Fx_Skill2_3",
                "Fx_Skill3_1",
                "Fx_Skill4",
                "FX_Hit_01",
                "FX_Hit_02",
                "FX_Hit_03",
                "Fx_Levelup_01",
            ];
            var name;
            var effect;
            var pos = new egret3d.Vector3D(2300, 10, 1400);
            for (var i = 0, count = names.length; i < count; i++) {
                name = names[i];
                effect = this.getEffect(name);
                if (effect) {
                    this._preEffects[name] = effect;
                    effect.position = pos;
                    egret3d.sceneManager.currentScene.addChild(effect);
                }
            }
        };
        EffectManager.prototype.removePreUpload = function () {
            var name;
            var effect;
            for (name in this._preEffects) {
                effect = this._preEffects[name];
                this.recycleEffect(name, effect);
            }
            this._preEffects = {};
            this._uploadStatus = -1;
        };
        EffectManager.prototype.prepareEffects = function () {
            var names = [
                "Fx_Skill1",
                "Fx_Skill2_1",
                "Fx_Skill2_2",
                "Fx_Skill2_3",
                "Fx_Skill3_1",
                "Fx_Skill4",
                "FX_Hit_01",
                "FX_Hit_02",
                "FX_Hit_03",
                "Fx_Levelup_01",
            ];
            var name;
            //for (var i: number = 0, count: number = names.length; i < count; i++) {
            //    name = names[i];
            //    for (var j: number = 0, eCount:number = <number>(this._prepareCount[name]) - 1; j < eCount; j++) {
            //        this.getEffect(name);
            //    }
            //}
        };
        return EffectManager;
    }());
    egret3d.EffectManager = EffectManager;
    __reflect(EffectManager.prototype, "egret3d.EffectManager");
    egret3d.effectManager = new EffectManager();
})(egret3d || (egret3d = {}));
//# sourceMappingURL=EffectManager.js.map