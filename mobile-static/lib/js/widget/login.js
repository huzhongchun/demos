var login = (function() {
    var flag = true;
    function _toLogin(callbackName) {
        callbackName = callbackName ? callbackName: '';
        var deviceAgent = navigator.userAgent.toLowerCase();
        if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
            alert('亲，您还没有登录哦～');
            window.location.href = "jumeimall://page/login?platform=iphone&callback="+callbackName;
        } else {
            alert('亲，您还没有登录哦，请到我的聚美去登录吧！');
        }
    }
    function _isLogin(callback) {
        if(flag){
            flag = false;
            $.ajax({
                type: 'get',
                url: 'http://m.jumei.com/i/MobileWap/is_login',
                    dataType: 'jsonp',
                jsonp: "callback",
                async: false,
                success: function(data) {
                    flag = true;
                    data = $.parseJSON(data);
                    var is_login = data.result;
                    if (!is_login) {
                        callback(0);
                    } else {
                        var uid = data.data.uid;
                        callback(uid);
                    }
                },
                error: function(e) {
                    alert("网络不给力，过会儿试试～");
                    flag = true;
                }
            })
        }
    }
    var loginFlag = true;
    return {
        isLogin: _isLogin,
        toLogin: _toLogin,
        loginFlag: loginFlag
    };
}());
