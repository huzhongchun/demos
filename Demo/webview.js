
/**
 * @name Jumei
 * @单例
 */


/*
 * JMWebView 为webview方法的封装
 */

var JMWebView = {
    _Bounce: false,
    //设置回弹效果
    set bounce(bounce) {
        calldevice('setWebViewBounce', 'bounce', bounce);
        this._Bounce = bounce;
    },
    get bounce() {
        return this._Bounce;
    }
};
JMWebView.toolbar = {
    _Status: 'hidden',
    _Color: 'ffffff',
    _Share: 'hidden',
    _Content: 'shareContent',
    //设置底部工具栏状态
    set status(status) {
        calldevice('setToolbarStatus', 'toolbarstatus', status);
        this._Status = status;
    },
    get status() {
        return this._Status;
    },
    //设置工具栏颜色
    set color(color) {
        this._Color = color;
        calldevice('setToolbarColor', 'toolbarcolor', color);
    },
    get color() {
        return this._Color;
    },
    //设置标题栏分享按钮
    set share(status) {
        calldevice('setToolbarShare', 'toolbarshare', status);
        this._Status = status;
    },
    get share() {
        return this._Status;
    },
    //设置标题栏分享文案
    set shareContent(content) {
        calldevice('setShareContent', 'shareContent', content);
        this._Content = content;
    },
    get shareContent() {
        return this._Content;
    }
};
JMWebView.title = {
    _Status: 'hidden',
    _Text: 'title',
    _Color: 'ffffff',
    //设置标题栏状态
    set status(status) {
        calldevice('setTitlebarStatus', 'titlebarstatus', status);
        this._Status = status;
    },
    get status() {
        return this._Status;
    },
    //设置标题栏文本
    set text(text) {
        this._Text = text;
        calldevice('setTitleText', 'titletext', text);
    },
    get text() {
        return this._Text;
    },
    //设置标题栏颜色
    set color(color) {
        this._Color = color;
        calldevice('setTitleColor', 'titlecolor', color);
    },
    get color() {
        return this._Color;
    }
};
JMWebView.spinner = {
    _Status: 'hidden',
    //设置spinner状态
    set status(status) {
        calldevice('setSpinnerStatus', 'spinnerstatus', status);
        this._Status = status;
    },
    get status() {
        return this._Status;
    }
};
JMWebView.topbar = {
    _Status: 'show',
    //设置spinner状态
    set status(status) {
        calldevice('setTopbarStatus', 'topbarstatus', status);
        this._Status = status;
    },
    get status() {
        return this._Status;
    }
};
JMWebView.close = function() {
    var agent = navigator.userAgent;
    if ((agent.indexOf('iPhone') > -1 || (agent.indexOf('iPad') > -1)) && Jumei.checkPlatformWap) {
        window.location.href = 'jmweb://closeWebView';
    } else {
        JMWebViewAndroid.closeWebView();
    }
}
function calldevice(fuc, parm, val) {
    try {
        var agent = navigator.userAgent;
        if ((agent.indexOf('iPhone') > -1 || (agent.indexOf('iPad') > -1)) && Jumei.checkPlatformWap) {
            window.location.href = 'jmweb://' + fuc + '?' + parm + '=' + val;
        } else {
            var fuc = "JMWebViewAndroid." + fuc + "(val)";
            fuc = eval(fuc);
        }
    } catch (e) {

    }
}



/*

    引用
    设置属性： JMWebView.toolbar.color = '#FF000',
    调用方法： JMWebView.close();关闭webview；
*/
