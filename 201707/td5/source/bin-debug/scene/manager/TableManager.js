var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var TableManager = (function () {
        function TableManager() {
            TableManager.instance = this;
        }
        TableManager.prototype.getConfig = function (tableName) {
            return DictionaryTable.buildDictionaryTableFromJsonData(RES.getRes(tableName), "id");
        };
        TableManager.prototype.onInitialize = function () {
            this._upgradeTable = this.getConfig("table/upgrade.json");
            this._unitTable = this.getConfig("table/unit.json");
            this._waveTable = this.getConfig("table/wave.json");
            this._sceneTable = this.getConfig("table/scene.json");
            this._equipTable = this.getConfig("table/equip.json");
            this._skillsTable = this.getConfig("table/skills.json");
            return true;
        };
        TableManager.findUpgradeTableItem = function (key) {
            return TableManager.instance._upgradeTable.findTableItem(key);
        };
        TableManager.findUnitTableItem = function (key) {
            return TableManager.instance._unitTable.findTableItem(key);
        };
        TableManager.findWaveTableItem = function (key) {
            return TableManager.instance._waveTable.findTableItem(key);
        };
        TableManager.findSceneTableItem = function (key) {
            return TableManager.instance._sceneTable.findTableItem(key);
        };
        TableManager.findEquipTableItem = function (key) {
            return TableManager.instance._equipTable.findTableItem(key);
        };
        TableManager.findSkillsTableItem = function (key) {
            return TableManager.instance._skillsTable.findTableItem(key);
        };
        TableManager.getSceneTableItemKeys = function () {
            return TableManager.instance._sceneTable.getAllKeys();
        };
        return TableManager;
    }());
    egret3d.TableManager = TableManager;
    __reflect(TableManager.prototype, "egret3d.TableManager");
    var DictionaryTable = (function () {
        function DictionaryTable() {
            this._tables = {};
        }
        DictionaryTable.prototype.findTableItem = function (keyValue /*, ...keyValues: any[]*/) {
            return this._tables[keyValue];
        };
        DictionaryTable.prototype.getAllKeys = function () {
            var keys = [];
            for (var id in this._tables) {
                keys.push(id);
            }
            return keys;
        };
        DictionaryTable.buildDictionaryTableFromJsonData = function (json, keyName) {
            var dictionary = new DictionaryTable();
            var node = null;
            for (var i = 0; i < json.root.length; i++) {
                node = json.root[i];
                dictionary._tables[node[keyName]] = node;
            }
            return dictionary;
        };
        return DictionaryTable;
    }());
    egret3d.DictionaryTable = DictionaryTable;
    __reflect(DictionaryTable.prototype, "egret3d.DictionaryTable");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=TableManager.js.map