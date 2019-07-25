/**
 * @file refresh组件
 * @import zepto.js jumei.js
 * 加载  $("body").refresh(callback,function(){
 *          this.changeFlag();//请求成功
 *      });
 */

Jumei.widget('ui.refresh', {
    init: function() {
        this.options = {
            callback: function(){},
            flag:true,
        };
    },
    _create: function() {
        var self = this;
        $(window).on('scroll', function(){
            if(self.options.flag){
                if($(window).scrollTop() > ($('#wrapper').height()-$(window).height()-10)){
                    self.options.flag = false;
                    self.options.callback.call(self);
                }
            }
        });
    },
    changeFlag: function(){
        var self = this;
        self.options.flag = true;
    }
});
