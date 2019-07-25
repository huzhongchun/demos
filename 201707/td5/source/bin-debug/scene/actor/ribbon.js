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
    var Ribbon = (function (_super) {
        __extends(Ribbon, _super);
        function Ribbon(material, points, count, segment) {
            if (count === void 0) { count = 10; }
            if (segment === void 0) { segment = 2; }
            var _this = this;
            var h = points.length > 2 ? Math.floor(points.length / 2) + 1 : 1;
            var ge = new egret3d.PlaneGeometry(0, 0, count, h, 1, 1, egret3d.Vector3D.Y_AXIS);
            if (material === null) {
                material = new egret3d.TextureMaterial();
            }
            _this = _super.call(this, ge, material) || this;
            _this.segmentRibbon = segment;
            _this.material.ambientColor = 0;
            _this._segmentH = ge.segmentsH;
            _this._segmentW = ge.segmentsW;
            //this.material.diffuseColor = 0xc6c6c6;
            //this.material.blendMode = egret3d.BlendMode.ADD;
            _this.material.blendMode = egret3d.BlendMode.SOFT_ADD;
            _this.material.ambientColor = 0xffffffff;
            //this.material.blendMode = egret3d.BlendMode.ADD;
            _this.material.bothside = true;
            _this._vecs = points;
            _this._autoUpdate = true;
            _this.initVertex();
            _this._temp_v0 = new egret3d.Vector3D();
            _this._temp_v1 = new egret3d.Vector3D();
            return _this;
        }
        Object.defineProperty(Ribbon.prototype, "autoUpdate", {
            set: function (value) {
                this._autoUpdate = value;
            },
            enumerable: true,
            configurable: true
        });
        //获取此对象的平面几何体
        //        private get planeGeometry(): egret3d.PlaneGeometry {
        //            this._getPlaneGeometryRunCount++;
        //            return <egret3d.PlaneGeometry>this.geometry;
        //        }
        Ribbon.prototype.updateVertices = function () {
            var ge = this.geometry;
            this.showNewTrail();
            ge.upload(egret3d.Egret3DCanvas.context3DProxy);
        };
        Ribbon.prototype.showNewTrail = function () {
            //var segment: number = 2;
            var last_new = [];
            var planeGeometrySegmentsW = this._segmentW + 1;
            var vecsLen = this._vecs.length;
            for (var i = 0; i < vecsLen; i++) {
                last_new.push(this._vecs[i].globalPosition);
            }
            var begin = this.getVerticeDataByCol(0);
            var jp3;
            for (var i = 0; i < this.segmentRibbon; i++) {
                var last = [];
                for (var j = 0; j < vecsLen; j++) {
                    jp3 = j * 3;
                    this._temp_v0.x = begin[jp3];
                    this._temp_v0.y = begin[jp3 + 1];
                    this._temp_v0.z = begin[jp3 + 2];
                    this._temp_v1.slerp(this._temp_v0, last_new[j], (i + 1) / this.segmentRibbon);
                    //this._temp_v1.copyFrom(last_new[j]);
                    last.push(this._temp_v1.x);
                    last.push(this._temp_v1.y);
                    last.push(this._temp_v1.z);
                }
                var temp;
                for (var k = 0; k < planeGeometrySegmentsW; k++) {
                    temp = this.getVerticeDataByCol(k);
                    this.setVerticesDataByCol(k, last);
                    last = temp;
                }
            }
        };
        Ribbon.prototype.update = function (time, delay, camera) {
            if (this._autoUpdate) {
                var time2 = new Date().getTime();
                this.updateVertices();
                console.log("更新刀光顶点耗时: ", new Date().getTime() - time2);
            }
            _super.prototype.update.call(this, time, delay, camera);
        };
        //设置某一列顶点坐标 pos数组的长度要和顶点数对应 顶点数为 (segmentsH + 1)
        Ribbon.prototype.setVerticesDataByCol = function (col, pos) {
            var indexArray = this.geometry.indexArray;
            var va = this.geometry.vertexArray;
            var vertexAttLength = this.geometry.vertexAttLength;
            var indexArrayValue; //indexArray中的值
            var attIndex; //vertexAttLength索引 === indexArrayValue * vertexAttLength
            var colAndColSub1 = col + col - 1;
            if (colAndColSub1 < 0)
                colAndColSub1 = 0;
            if (col === 0) {
                indexArrayValue = indexArray[0];
            }
            else {
                indexArrayValue = indexArray[col * 3 + (col - 1) * 3 + 1];
            }
            attIndex = indexArrayValue * vertexAttLength;
            va[attIndex] = pos[0];
            va[attIndex + 1] = pos[1];
            va[attIndex + 2] = pos[2];
            var panelGeometrySegmentsWDouble = this._segmentW + this._segmentW;
            var panelGeometrySegmentsH = this._segmentH;
            var iAnd1P3; //===iAnd1 * 3
            for (var i = 0; i < panelGeometrySegmentsH; i++) {
                indexArrayValue = indexArray[(i * panelGeometrySegmentsWDouble + colAndColSub1) * 3 + 2];
                attIndex = indexArrayValue * vertexAttLength;
                iAnd1P3 = (i + 1) * 3;
                va[attIndex] = pos[iAnd1P3];
                va[attIndex + 1] = pos[iAnd1P3 + 1];
                va[attIndex + 2] = pos[iAnd1P3 + 2];
            }
        };
        Ribbon.prototype.getVerticeDataByCol = function (col) {
            var temp = [];
            var indexArray = this.geometry.indexArray;
            var va = this.geometry.vertexArray;
            var vertexAttLength = this.geometry.vertexAttLength;
            var indexArrayValue; //indexArray中的值
            var attIndex; //vertexAttLength索引 === indexArrayValue * vertexAttLength
            var colAndColSub1 = col + col - 1;
            if (colAndColSub1 < 0)
                colAndColSub1 = 0;
            if (col === 0) {
                indexArrayValue = indexArray[0];
            }
            else {
                indexArrayValue = indexArray[col * 3 + (col - 1) * 3 + 1];
            }
            attIndex = indexArrayValue * vertexAttLength;
            temp = temp.concat([va[attIndex], va[attIndex + 1], va[attIndex + 2]]);
            var panelGeometrySegmentsWDouble = this._segmentW + this._segmentW; // this.planeGeometry.segmentsW;
            var panelGeometrySegmentsH = this._segmentH; //this.planeGeometry.segmentsH;
            for (var i = 0; i < panelGeometrySegmentsH; i++) {
                indexArrayValue = indexArray[(i * panelGeometrySegmentsWDouble + colAndColSub1) * 3 + 2];
                attIndex = indexArrayValue * vertexAttLength;
                temp = temp.concat([va[attIndex], va[attIndex + 1], va[attIndex + 2]]);
            }
            return temp;
        };
        Ribbon.prototype.initVertex = function () {
            //初始化所有点
            var temp = [];
            for (var i = 0; i < this._vecs.length; i++) {
                temp.push(this._vecs[i].globalPosition.x);
                temp.push(this._vecs[i].globalPosition.y);
                temp.push(this._vecs[i].globalPosition.z);
            }
            var panelGeometrySegmentsW = this._segmentW; //this.planeGeometry.segmentsW + 1;
            for (var i = 0; i < panelGeometrySegmentsW; i++) {
                this.setVerticesDataByCol(i, temp);
            }
            this.geometry.upload(egret3d.Egret3DCanvas.context3DProxy);
        };
        return Ribbon;
    }(egret3d.Mesh));
    egret3d.Ribbon = Ribbon;
    __reflect(Ribbon.prototype, "egret3d.Ribbon");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=ribbon.js.map