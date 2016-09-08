(function(win){
    var toString = Object.prototype.toString,
    slice = Array.prototype.slice,
    config = {
        //错误搜集
        errorUrl : 'http://f.m.jumeird.com/error/',
            //性能搜集
            perforUrl: 'http://f.m.jumeird.com/nature/',
                //页面浏览
                pageUrl : 'http://f.m.jumeird.com/info/',
                    //页面事件
                    eventUrl : 'http://f.m.jumeird.com/event/',
                        //采样率 百分比
                        samplingRate: 100 
    },
    bindFunc = function(o){
        return function(method, func){
            o[method] = function(){
                return func.apply(o, arguments);
            };
            return func;
        };
    },
    mix = function(target, source){
        var args = makeArray(arguments),
        i = 1,
        argsLen = args.length,
        isCover = isBoolean(args[argsLen - 1]),
        key;

        if (isCover === true)
            args.pop();

        if (argsLen === 1) {
            return target;
        }

        while (source = args[i]) {
            for (key in source) {
                if (isCover || !(key in target)) {
                    target[key] = source[key];
                }
            }
            i++;
        }
        return target;
    },
    req = function(url){
        var img = new Image(1,1);
        img.onload = img.onerror = function(){
            img=null;
        }
        img.src = url;
    },
    jsonpId = 0,
    reqScript = function(url){
        var script = document.createElement('script'),
            head = document.getElementsByTagName('head')[0];
            callbackName = 'jsonp' + (++jsonpId),
            cleanup = function() {
                head.removeChild(script)
                delete window[callbackName]
            };
        script.src = url.replace(/\?/, '?callback=' + callbackName +'&')
        head.appendChild(script);
        window[callbackName] = function(data){
            cleanup();
        }
        script.onerror = function() {
            cleanup();
        }
        script.onload = function(){
            cleanup()
        };
    },
    isBoolean = function(value){
        return typeof value === 'boolean'; 
    },
    isArray = ('isArray' in Array) ? Array.isArray : function(value) {
        return toString.call(value) === '[object Array]';
    },
    makeArray = function(arg){
        return slice.apply(arg);
    }
    parseToString = function(obj){
        var str = '';
        for(i in obj){
            if(obj.hasOwnProperty(i)){
                if(str == ''){
                    str+= i+'='+enCode(obj[i]); 
                }else{
                    str+= '&'+i+'='+enCode(obj[i]); 
                }
            }
        };
        return str;
    },
    trim = function(str){
        if(!str || "" == str){
            return "";
        }
        for(; str.charAt(0).length > 0 && ' \n\r\t'.indexOf(str.charAt(0)) > -1;){
            str = str.substring(1);
        }
        for(; str.charAt(str.length - 1).length > 0 && ' \n\r\t'.indexOf(str.charAt(str.length - 1)) > -1;){
            str = str.substring(0, str.length - 1);
        }
        return str;
    },
    getCookie =  function(check_name) {
        var allCookies = document.cookie.split(';');
        var tempCookie = '';
        var cookieName = '';
        var cookieValue = '';
        var cookieFound = false;
        for (var i = 0; i < allCookies.length; i++) {
            tempCookie = allCookies[i].split('=');
            cookieName = tempCookie[0].replace(/^\s+|\s+$/g, '');
            if (cookieName == check_name) {
                cookieFound = true;
                if (tempCookie.length > 1) {
                    cookieValue = unescape(tempCookie[1].replace(/^\s+|\s+$/g, ''));
                }
                return cookieValue;
                break;
            }
            tempCookie = null;
            cookieName = '';
        }
        if (!cookieFound)
            {
                return null;
            }
    },
    setCookie =  function(name, value, expires, path, domain, secure) {
        //name value expires path为必选参数
        var today = new Date();
        today.setTime(today.getTime());
        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        var expiresDate = new Date(today.getTime() + (expires));
        document.cookie = name + '=' + escape(value) +
            ((expires) ? ';expires=' + expiresDate.toGMTString() : '') +
                ((path) ? ';path=' + path : '') +
                    ((domain) ? ';domain=' + domain : '') +
                        ((secure) ? ';secure' : '');
    },
    enCode = function(url){
        return  encodeURIComponent(url);
    },
    deCode = function(url){
        return decodeURIComponent(url);
    },
    isEmpty = function(str){
        return ((undefined == str) || ('-' == str) || ('' == str));
    },
    getRand = function(proArr) {
        var result = '';
        //概率数组的总概率精度
        var proSum = 0;
        for (var i in proArr) {
            proSum += proArr[i];
        }
        for (var j in proArr) {
            var randNum = Math.random() * proSum;
            if (randNum <= proArr[j]) {
                result = j;
                break;
            } else {
                proSum -= proArr[j];
            }
        }
        return result;
    },
    os = function(){
        if(getCookie('platform') === 'wap'){
            return 'wap';
        }
        var platform = navigator.userAgent.toLowerCase();
        if(/android/g.test(platform)){
            return 'android';
        }else if(/(iphone|ipod|ipad)/g.test(platform)){
            return 'iphone';
        }else{
            return 'qita';
        }
    };


    var uuid = (function(){
        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');  
        var uuid = function (len, radix) {  
            var chars = CHARS, uuid = [], i;  
            radix = radix || chars.length;  

            if (len) {  
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];  
            } else {  
                var r;  
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';  
                uuid[14] = '4';  
                for (i = 0; i < 36; i++) {  
                    if (!uuid[i]) {  
                        r = 0 | Math.random()*16;  
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];  
                    }  
                }  
            }  
            return uuid.join('');  
        };  
        var uuidFast = function() {  
            var chars = CHARS, uuid = new Array(36), rnd=0, r;  
            for (var i = 0; i < 36; i++) {  
                if (i==8 || i==13 ||  i==18 || i==23) {  
                    uuid[i] = '-';  
                } else if (i==14) {  
                    uuid[i] = '4';  
                } else {  
                    if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;  
                        r = rnd & 0xf;  
                    rnd = rnd >> 4;  
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];  
                }  
            }  
            return uuid.join('');  
        };  

        var uuidCompact = function() {  
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);  
                return v.toString(16);  
            });  
        };  

        return {
            uuid:uuid,
            uuidFast:uuidFast,
            uuidCompact:uuidCompact
        };

    })();


    var hash = {
        checkHash : function(o){
            var result = false,
            code = 0,
            i,
            _char;
            if(!isEmpty(o)){
                result = true;
                for(i = 0; i < o.length; i++){
                    _char = o.charAt(i);
                    code += '.' == _char ? 1 : 0;
                    result = result && code <= 1 && (0 == i && '-' == _char || '.0123456789'.indexOf(_char) > -1);
                }
            }
            return result;
        },
        hash: function(str){
            var hash = 1,
            charCode = 0,
            idx;
            if(!isEmpty(str)){
                hash = 0;
                for(idx = str.length - 1; idx >= 0; idx--){
                    charCode = str.charCodeAt(idx);
                    hash = (hash << 6&268435455) + charCode+(charCode << 14);
                    charCode = hash&266338304;
                    hash = charCode != 0 ? hash ^ charCode>>21 : hash;
                }
            }
            return hash;
        },
        random: function(){
            return Math.round(Math.random() * 2147483647);
        },
    }


    var client = {
        uuid:'',
        getUuid: function(){
            return this.uuid;
        },
        setUuid: function(uid){
            this.uuid = uid;
        },
        getPid: function(){
            var _pid = getCookie('_pid');
            return _pid ? _pid : '';
        },
        getDid: function(){
            var _did = getCookie('_did');
            return _did ? _did : '';
        },
        getUid: function(){
            var uid = getCookie('uid');
            return uid ? uid : '' ;
        },
        initUuid: function(){
            var _utmb = getCookie('_jmuuid') || '';  
            //_utmb值为空时，调用Math.uuidFast  
            if(_utmb==null||_utmb=='undefined'||_utmb==''){  
                _utmb = uuid.uuidFast()+'-'+ (new Date).getTime();  
                setCookie('_jmuuid', _utmb, 730, '/');  
            }  
            this.setUuid(_utmb);
        },
        getClientId: function(){
            return Math.random() ^ client.hashClientInfo() & 2147483647;
        },
        hashClientInfo: function(){
            var historyLength = window.history.length;
            var navigatorStr = navigator.appName + navigator.version + window.language + navigator.platform + navigator.userAgent + window.javaEnabled + window.screen + window.colorDepth + (document.cookie ? document.cookie : '') + (document.referrer ? document.referrer : '');
            for(var len = navigatorStr.length; historyLength > 0; ){
                navigatorStr += historyLength-- ^ len++;
            }
            return hash.hash(navigatorStr);
        }
    }

    var infoFunction = {
        errorBaseInfo: function(){
            var params = {};
            params.jmuuid = client.getUuid();
            params.did = client.getDid();
            params.uid = client.getUid();
            params.sn = window.screen.width+'*'+window.screen.height; 
            params.ua = navigator.userAgent? (navigator.userAgent).toLowerCase() : '';
            params.url = document.URL || '';
            params.ref = document.referrer || '';
            params.la = navigator.language ? (navigator.language).toLowerCase() : '';
            return params;
        },
        performance: function(){
            var perf = window.performance ? (window.performance) : (window.webkitPerformance ? window.webkitPerformance : window.msPerformance ),
            timing = perf.timing,
            params = {};
            if( perf && timing ){
                params.red = timing['redirectEnd'] - timing['redirectStart'];
                params.dns = timing['domainLookupEnd'] - timing['domainLookupStart']; 
                params.tcp = timing['connectEnd'] - timing['connectStart']; 
                params.req = timing['responseStart'] - timing['requestStart'];
                params.res = timing['responseEnd'] - timing['responseStart'];
                params.dom = timing['domContentLoadedEventEnd'] - timing['domLoading'];
            }
            return params;
        },
        analysisBaseInfo: function(){
            var params = {};
            params.jmuuid = client.getUuid();
            params.did = client.getDid();
            params.uid = client.getUid();
            params.p = document.URL || '';
            params.pid = client.getPid();
            params.os = os();
            return params;
        },
    }

    var startRate = (function (){
        var trueRate = config.samplingRate,
        falseRate = 100 - config.samplingRate,
        res = getRand({'true': trueRate,'false': falseRate})
        if(res === 'true'){
            return true;
        }else{
            return false;
        }
    })();

    var jaqFactory = function(){ 
        var self = this,

        //触发事件搜集
        bind = bindFunc(self); self.trackEvent = bind('_trackEvent', function(action, label, value){
            var baseInfo = infoFunction.analysisBaseInfo(),
            params = {},
            obj = '',
            url = '';
            params.id = action ? action : '';
            params.r = label ? label : '' ;
            params.data = value ? value : '';
            obj = mix(params, baseInfo);
            url = parseToString(params);
            req(config.eventUrl+'?'+url);
        });

        //浏览页面搜集
        self.pageEvent = bind('_pageEvent', function(){
            var baseInfo = infoFunction.analysisBaseInfo(),
            params = {},
            obj = {},
            url = '';
            params.f_p = document.referrer || '';
            obj = mix(baseInfo,params);
            url = parseToString(obj);
            req(config.pageUrl+'?'+url);
        });

        //触发性能搜集
        self.pageEvent = bind('_perforEvent', function(){
            if(startRate){
                var baseInfo = infoFunction.errorBaseInfo(),
                performance = infoFunction.performance(),
                obj = mix(baseInfo, performance),
                url = parseToString(obj);
                req(config.perforUrl+'?'+url);
            }
        });

        //触发错误信息
        self.errorEvent = bind('_errorEvent', function(msg, url, line, level){
            if(startRate){
                var baseInfo = infoFunction.errorBaseInfo(),
                params = {},
                url = '',
                obj = {};
                params.msg = msg;
                params.fl = url;
                params.le = line;
                params.lv = level;
                obj = mix(params, baseInfo);
                url = parseToString(obj);
                req(config.errorUrl+'?'+url);
            }
        });

        //设置项目id 
        self.setPid = bind('_setPid', function(value){
            setCookie('pid', value, 730, '/');
        });
    }


    var _jaqClass = function(){
        var self = this;
        self.push = function(arr){
            try{
                for(var _arg = arguments,len = _arg.length, i = 0; i < len; i++){
                    if(typeof _arg[i] === 'function'){
                        _arg[i]();
                    }else{
                        var name = '',
                        o = _arg[i][0],
                        func = o,
                        idx = o.lastIndexOf('.');
                        if(idx > 0){
                            name = o[_substring](0, idx);
                            func = o[_substring](idx + 1);
                        }
                        var oTracker = jaqFactoryObj; 
                        oTracker[func].apply(oTracker, _arg[i].slice(1));
                    }
                }
            }catch(e){
               // console.dir(e);
            }
        } 
    }


    var  jaqFactoryObj = new jaqFactory();
    //生成uuid
    client.initUuid();
    //收集
    var initArr = null;
    if(win._jaq && isArray(win._jaq)){
        initArr = _jaq;   
    }
    win['_jaq'] = new _jaqClass();
    if(initArr && isArray(initArr)){
        for(var j = 0, len = initArr.length; j < len; j++ ){
            _jaq.push(initArr[j]);
        }  
    }
    window._jaq.push(['_pageEvent']);
    window._jaq.push(['_perforEvent'])
})(window); 
