/*
 * @import : cropper.js
*/
(function () {
	var imgCropperTool = function(options){
        this.settings = $.extend({
            // strict: false,
            // responsive: false,
            // checkImageOrigin: false
            // modal: false,
            // guides: false,
            // highlight: false,
            // background: false,
            // autoCrop: false,
            // autoCropArea: 0.5,
            // dragCrop: false,
            // movable: false,
            // resizable: false,
            // rotatable: false,
            // zoomable: false,
            // touchDragZoom: false,
            mouseWheelZoom: false,
            // minCanvasWidth: 320,
            // minCanvasHeight: 180,
            // minCropBoxWidth: 160,
            // minCropBoxHeight: 90,
            // minContainerWidth: 320,
            // minContainerHeight: 180,
            minContainerWidth: 500,
            minContainerHeight: 500,
            // build: null,
            // built: null,
            // dragstart: null,
            // dragmove: null,
            // dragend: null,
            // zoomin: null,
            // zoomout: null,
            aspectRatio: 621/311, //限定裁剪的比列
            preview: '.img-preview',
            crop: function (data) {
                //console.log(data);
                //$dataX.val(Math.round(data.x));
                //$dataY.val(Math.round(data.y));
                //$dataHeight.val(Math.round(data.height));
                //$dataWidth.val(Math.round(data.width));
                //$dataRotate.val(Math.round(data.rotate));
            },

            imgSelector: $('.cropper-img-container .cropper-img-box>img'),
            //获取裁剪结果后的回调函数
            clipImgCallback: function(){},
            keyMoveImg: true,  //是否支持上、下、左、右按键移动图片位置
            startBulidCallback: function(){}, //canvas开始渲染图片的回调
            finishBulidCallback: function(){}, //canvas完成渲染图片的回调
            dragStartCallback: function(){}, //开始操作选择框的回调
            dragMoveCallback: function(){}, // 操作选择框的回调
            dragEndCallback: function(){}, //结束操作选择框的回调

        },options);

        this.$image = $(this.settings.imgSelector);
        this.init();
    }
    imgCropperTool.prototype = {
        constructor: 'imgCropperTool',
        base64Result: '',
        init: function(){
            this.initImgBoard();
        },
        initImgBoard:function(){
            var self = this,opt = this.settings;
            this.$image.on({
                //canvas开始渲染图片
                'build.cropper': function (e) {
                    //console.log(e.type);
                    opt.startBulidCallback.call(this);
                },
                //canvas完成图片渲染
                'built.cropper': function (e) {
                    //console.log(e.type);
                    opt.finishBulidCallback.call(this);
                },
                //开始拖拽
                'dragstart.cropper': function (e) {
                    //console.log(e.type, e.dragType);
                    opt.dragStartCallback.call(this);
                },
                //拖拽中
                'dragmove.cropper': function (e) {
                    //console.log(e.type, e.dragType);
                    //opt.dragMoveCallback.call(this);
                    if(e.dragType != 'all'){
                        e.preventDefault();
                    }
                },
                //停止拖拽
                'dragend.cropper': function (e) {
                    //console.log(e.type, e.dragType);
                    opt.dragEndCallback.call(this);
                },
                //放大
                'zoomin.cropper': function (e) {
                    //console.log(e.type);
                },
                //缩小
                'zoomout.cropper': function (e) {
                    //console.log(e.type);
                }
            }).cropper(opt);
            //支持上、下、左、右按键移动图片位置
            if(opt.keyMoveImg){
                $(document.body).on('keydown', function (e) {   
                    switch (e.which) {
                        case 37:
                            e.preventDefault();
                            self.moveImgFunc( -1, 0);
                            break;
                        case 38:
                            e.preventDefault();
                            self.moveImgFunc( 0, -1);
                            break;
                        case 39:
                            e.preventDefault();
                            self.moveImgFunc( 1, 0);
                            break;
                        case 40:
                            e.preventDefault();
                            self.moveImgFunc( 0, 1);
                            break;
                    }
                });
            }
        },
        //获取裁剪结果
        clipImgFunc: function(option,callback){
            var self = this,opt = this.settings;
            this.base64Result = this.$image.cropper('getCroppedCanvas', option).result.toDataURL();
            if(callback && typeof callback == 'function'){
                callback.call(this)
            }else if((typeof opt.clipImgCallback) == 'function'){
                opt.clipImgCallback.call(this);
            }
        },
        //移动图片的位置
        moveImgFunc: function(x,y,callback){
            var self = this,opt = this.settings;
            this.$image.cropper('move', x, y);
            if(callback && typeof callback == 'function'){
                callback.call(this)
            }else if((typeof opt.moveImgCallback) == 'function'){
                opt.moveImgCallback.call(this);
            }
        },
        //缩放图片
        zoomImgFunc: function(scale,callback){
            var self = this,opt = this.settings;
            this.$image.cropper('zoom', scale);
            if(callback && typeof callback == 'function'){
                callback.call(this)
            }else if((typeof opt.zoomImgCallback) == 'function'){
                opt.zoomImgCallback.call(this);
            }
        },
        //旋转图片
        rotateImgFunc: function(degree,callback){
            var self = this,opt = this.settings;
            this.$image.cropper('rotate', degree);
            if(callback && typeof callback == 'function'){
                callback.call(this)
            }else if((typeof opt.zoomImgCallback) == 'function'){
                opt.zoomImgCallback.call(this);
            }
        },
        //更新图片
        updateImgFunc: function(){

        }
    }

    window.imgCropperTool = imgCropperTool;
})();
