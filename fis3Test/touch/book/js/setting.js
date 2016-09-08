/**
 * Created by huzhongchun on 16/7/26.
 */
require(['book/js/public'],function(public){
    var _public = public;
    _public.setWxShareContent();

    window._public = _public;
    _public.settingDialog.init({
        autoShow: true,
    });

    
});