/**
 * Created by huzhongchun on 2017/2/28.
 */
(function(window){
    var spriteObj = function (options) {
        var opt = extend({
            'name': 'sprite',
            'top': 0,
            'left': 10,
            'width': 30,
            'height': 30,
            'velocityX': 0,
            'velocityY': 0,
            'visible': true,
            'animating': false,
            'behaviors': [],
            'painter': null
        },options);
        this.name = opt.name;
        this.top = opt.top;
        this.left = opt.left;
        this.width = opt.width;
        this.height = opt.height;
        this.velocityX = opt.velocityX;
        this.velocityY = opt.velocityY;
        this.visible = opt.visible;
        this.animating = opt.animating;
        this.behaviors = opt.behaviors;
        this.painter = opt.painter;
    };

    spriteObj.prototype = {
        'constructor': spriteObj,
        'paint': function (context) {
            if(this.painter && this.visible == true){
                this.painter.paint(this,context);
            }
        },
        'update': function (context,time) {
            for (var i=0;i<this.behaviors.length;i++){
                this.behaviors[i].execute(this,context,time);
            }
        }
    };

    window.spriteObj = spriteObj;
})(window);