/**
 * Created by huzhongchun on 16/6/20.
 */

require(['book/js/public'],function(public){
    var _public = public;
    _public.setWxShareContent();


    /**
     * 隐私设置
     */
    _public.settingDialog.init({
        autoShow: false,
    });

    var _savedData = $('.setting-btn').data() ? $('.setting-btn').data() : {};
    var _setData = {
        'wechat': {
            status: _savedData.status ? _savedData.status : 'no',
            id: _savedData.wechat
        },
        'sms': {
            status: _savedData.sms_status ? _savedData.sms_status : 'no',
        }
    }
    $('.setting-btn').on('click',function (e) {
        e.preventDefault();
        //如果未登录,需要登录
        if(_savedData.is_login !=1){
            location.href = '/book/user/login';
            return false;
        }
        _public.settingDialog.show(_setData);
    });
    $('.set-dialog-bg').on('click',function () {
        _public.settingDialog.hide();
    });
});