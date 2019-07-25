var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var NavGrid = (function () {
        function NavGrid(gridWidth, gridHeight, gridRow, gridCol, datas) {
            //查找可移动路径;
            this._cector3DPool = [];
            this.STRAIGHT_COST = 1;
            this.DIAG_COST = Math.SQRT2;
            this._gridWidth = gridWidth;
            this._gridHeight = gridHeight;
            this._gridRow = gridRow;
            this._gridCol = gridCol;
            this._datas = datas;
            //            this._gridoffsetX = -(this._gridCol * this._gridWidth * 0.5 - this._gridWidth * 0.5);
            //            this._gridoffsetY = -(this._gridRow * this._gridHeight * 0.5 - this._gridHeight * 0.5);
            this._gridoffsetX = 0; // -(this._gridCol * this._gridWidth * 0.5 - this._gridWidth * 0.5);
            this._gridoffsetY = 0; // -(this._gridRow * this._gridHeight * 0.5 - this._gridHeight * 0.5);
        }
        Object.defineProperty(NavGrid.prototype, "gridWidth", {
            //网格宽度;
            get: function () {
                return this._gridWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavGrid.prototype, "gridHeight", {
            //网格高度;
            get: function () {
                return this._gridHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavGrid.prototype, "rowNum", {
            //网格行数;
            get: function () {
                return this._gridRow;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavGrid.prototype, "colNum", {
            //网格列数;
            get: function () {
                return this._gridCol;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavGrid.prototype, "datas", {
            //网格源数据;
            get: function () {
                return this._datas;
            },
            enumerable: true,
            configurable: true
        });
        //网格列索引转X坐标;
        NavGrid.prototype.gridXToX = function (gridX) {
            var value = gridX * this._gridWidth;
            value += this._gridoffsetX;
            value += this._gridWidth * 0.5;
            return value;
        };
        //网格行索引转Y坐标;
        NavGrid.prototype.gridYToY = function (gridY) {
            var value = (this._gridRow - gridY - 1) * this._gridHeight;
            value += this._gridoffsetY;
            value += this._gridHeight * 0.5;
            return value;
        };
        //X坐标转网格列索引;
        NavGrid.prototype.xToGridX = function (x) {
            var value = x;
            value -= this._gridoffsetX;
            value = Math.floor(value / this._gridWidth);
            return value;
        };
        //Y坐标转网格行索引;
        NavGrid.prototype.yToGridY = function (y) {
            var value = y;
            value -= this._gridoffsetY;
            value = this._gridRow - Math.floor(value / this._gridHeight) - 1;
            return value;
        };
        //设置用户数据(data is unsigned short.);
        NavGrid.prototype.setUserData = function (x, y, data) {
            var aStarNode = this._datas[y * this._gridCol + x];
            aStarNode.userData = (data << 1) | (aStarNode.userData & 0x01);
        };
        //是否存在单位对象;
        NavGrid.prototype.isExistsUnit = function (x, y) {
            return (this._datas[y * this._gridCol + x].userData >> 1) != 0;
        };
        //获取指定位置的用户数据;
        NavGrid.prototype.getUserData = function (x, y) {
            return this._datas[y * this._gridCol + x].userData >> 1;
        };
        //通过内存Buffer创建NavGrid对象;
        NavGrid.createNavGridFromBuffer = function (buffer) {
            var navGrid = null;
            var bytes = new egret3d.ByteArray(buffer);
            //读取标识符;
            var flag = bytes.readUnsignedInt();
            if (flag != 0x4E415647) {
                return null;
            }
            //读取版本号;
            var version = bytes.readUnsignedShort();
            switch (version) {
                case 1:
                    //读取网格宽度;
                    var gridWidth = bytes.readUnsignedByte();
                    //读取网格高度;
                    var gridHeight = bytes.readUnsignedByte();
                    //读取网格行数;
                    var gridRow = bytes.readUnsignedByte();
                    //读取网格列数;
                    var gridCol = bytes.readUnsignedByte();
                    //计算网格数据个数;
                    var nCount = gridRow * gridCol;
                    //网格数据8字节对齐;
                    nCount += (nCount % 8) ? (8 - (nCount % 8)) : 0;
                    var datas = new Array(nCount);
                    var nIndex = 0;
                    //读取网格数据字节数;
                    var byteCount = bytes.readUnsignedShort();
                    for (var i = 0; i < byteCount; i++) {
                        //读取字节数据;
                        var byte = bytes.readUnsignedByte();
                        //解出8个网格数据;
                        datas[nIndex] = new AStarNode(nIndex % gridCol, Math.floor(nIndex / gridCol));
                        datas[nIndex++].userData = (byte & 0x80) >> 7;
                        datas[nIndex] = new AStarNode(nIndex % gridCol, Math.floor(nIndex / gridCol));
                        datas[nIndex++].userData = (byte & 0x40) >> 6;
                        datas[nIndex] = new AStarNode(nIndex % gridCol, Math.floor(nIndex / gridCol));
                        datas[nIndex++].userData = (byte & 0x20) >> 5;
                        datas[nIndex] = new AStarNode(nIndex % gridCol, Math.floor(nIndex / gridCol));
                        datas[nIndex++].userData = (byte & 0x10) >> 4;
                        datas[nIndex] = new AStarNode(nIndex % gridCol, Math.floor(nIndex / gridCol));
                        datas[nIndex++].userData = (byte & 0x08) >> 3;
                        datas[nIndex] = new AStarNode(nIndex % gridCol, Math.floor(nIndex / gridCol));
                        datas[nIndex++].userData = (byte & 0x04) >> 2;
                        datas[nIndex] = new AStarNode(nIndex % gridCol, Math.floor(nIndex / gridCol));
                        datas[nIndex++].userData = (byte & 0x02) >> 1;
                        datas[nIndex] = new AStarNode(nIndex % gridCol, Math.floor(nIndex / gridCol));
                        datas[nIndex++].userData = (byte & 0x01);
                    }
                    //创建NavGrid对象;
                    navGrid = new NavGrid(gridWidth, gridHeight, gridRow, gridCol, datas);
                    break;
                default:
                    console.log("Unknown file version! version: " + version + ".");
                    return null;
            }
            return navGrid;
        };
        NavGrid.prototype.findNearbyNode = function (startNode, endNode) {
            var count = Math.max(Math.floor(this.rowNum / 2), Math.floor(this.colNum / 2));
            var test = new egret3d.Vec2();
            var node;
            for (var i = 1; i < count; i++) {
                //上边;
                test.x = endNode.x - i;
                test.y = endNode.y - i;
                for (var offset = 0; offset <= i * 2; offset++)
                    if ((node = this.getNode(test.x + offset, test.y)) && node.isPass) {
                        node.H = this.diagoal(node, endNode);
                        return node;
                    }
                //右边;
                test.x = endNode.x + i;
                test.y = endNode.y - i;
                for (var offset = 0; offset <= i * 2; offset++)
                    if ((node = this.getNode(test.x, test.y + offset)) && node.isPass) {
                        node.H = this.diagoal(node, endNode);
                        return node;
                    }
                //下边;
                test.x = endNode.x - i;
                test.y = endNode.y + i;
                for (var offset = 0; offset <= i * 2; offset++)
                    if ((node = this.getNode(test.x + offset, test.y)) && node.isPass) {
                        node.H = this.diagoal(node, endNode);
                        return node;
                    }
                //左边;
                test.x = endNode.x - i;
                test.y = endNode.y - i;
                for (var offset = 0; offset <= i * 2; offset++)
                    if ((node = this.getNode(test.x, test.y + offset)) && node.isPass) {
                        node.H = this.diagoal(node, endNode);
                        return node;
                    }
            }
            return null;
        };
        NavGrid.prototype.findPath = function (start, end, paths, nearby) {
            if (nearby === void 0) { nearby = true; }
            var self = this;
            //回收Vector3D对象;
            for (var i = paths.length - 1; i >= 0; i--) {
                self._cector3DPool.push(paths[i]);
            }
            paths.length = 0;
            var startNode = self.getNode(self.xToGridX(start.x), self.yToGridY(start.z));
            var endNode = self.getNode(self.xToGridX(end.x), self.yToGridY(end.z));
            if (true == nearby && false == endNode.isPass) {
                endNode = self.findNearbyNode(startNode, endNode);
                if (null == endNode) {
                    return false;
                }
            }
            if (self._findPath(startNode, endNode)) {
                var vector3D;
                for (var i = 0; i < self._path.length; i++) {
                    if (self._cector3DPool.length > 0) {
                        vector3D = self._cector3DPool.shift();
                        vector3D.x = self.gridXToX(self._path[i].x);
                        vector3D.y = 0;
                        vector3D.z = self.gridYToY(self._path[i].y);
                        paths.push(vector3D);
                    }
                    else {
                        paths.push(new egret3d.Vector3D(self.gridXToX(self._path[i].x), 0, self.gridYToY(self._path[i].y)));
                    }
                }
            }
            if (paths.length > 1)
                paths.shift(); //去除第一个自身的点
            return paths.length > 0;
        };
        NavGrid.prototype.isPass = function (x, y) {
            return this.getNode(x, y).isPass;
        };
        NavGrid.prototype._findPath = function (start, end) {
            this._openList = [];
            this._closeList = [];
            this._path = [];
            var node = start;
            node.G = 0;
            node.H = this.diagoal(node, end);
            node.F = node.G + node.H;
            while (node !== end) {
                var startX = Math.max(0, node.x - 1);
                var startY = Math.max(0, node.y - 1);
                var endX = Math.min(this.colNum - 1, node.x + 1);
                var endY = Math.min(this.rowNum - 1, node.y + 1);
                for (var i = startX; i <= endX; i++) {
                    for (var j = startY; j <= endY; j++) {
                        var testNode = this.getNode(i, j);
                        if (testNode === node || testNode.isPass === false) {
                            continue;
                            ;
                        }
                        var cost = this.STRAIGHT_COST;
                        if (!((node.x === testNode.x) || (node.y === testNode.y))) {
                            cost = this.DIAG_COST;
                        }
                        var g = node.G + cost;
                        var h = this.diagoal(testNode, end);
                        var f = g + h;
                        if (this.isOpen(testNode) || this.isClose(testNode)) {
                            if (f < testNode.F) {
                                testNode.F = f;
                                testNode.G = g;
                                testNode.H = h;
                                testNode.parent = node;
                            }
                        }
                        else {
                            testNode.F = f;
                            testNode.G = g;
                            testNode.H = h;
                            testNode.parent = node;
                            this._openList.push(testNode);
                        }
                    }
                }
                this._closeList.push(node);
                if (this._openList.length === 0) {
                    return false;
                }
                this._openList.sort(function (a, b) {
                    return a.F < b.F ? -1 : 1;
                });
                node = this._openList.shift();
            }
            node = end;
            this._path.unshift(node);
            while (node !== start) {
                node = node.parent;
                this._path.unshift(node);
            }
            return true;
        };
        NavGrid.prototype.getNode = function (x, y) {
            return this._datas[y * this.colNum + x];
        };
        NavGrid.prototype.isClose = function (node) {
            return this._closeList.indexOf(node) > -1;
        };
        NavGrid.prototype.isOpen = function (node) {
            return this._openList.indexOf(node) > -1;
        };
        NavGrid.prototype.diagoal = function (start, end) {
            var dx = Math.abs(start.x - end.x);
            var dy = Math.abs(start.y - end.y);
            var diag = Math.min(dx, dy);
            var straight = dx + dy;
            return this.DIAG_COST * diag + this.STRAIGHT_COST * (straight - 1 * diag);
        };
        return NavGrid;
    }());
    egret3d.NavGrid = NavGrid;
    __reflect(NavGrid.prototype, "egret3d.NavGrid");
    var AStarNode = (function () {
        function AStarNode(x, y) {
            this.x = x;
            this.y = y;
        }
        Object.defineProperty(AStarNode.prototype, "isPass", {
            get: function () {
                return 0 == this.userData;
            },
            enumerable: true,
            configurable: true
        });
        return AStarNode;
    }());
    egret3d.AStarNode = AStarNode;
    __reflect(AStarNode.prototype, "egret3d.AStarNode");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=NavGrid.js.map