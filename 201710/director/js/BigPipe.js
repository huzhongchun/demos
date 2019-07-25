/**
 * Created by huzhongchun on 16/6/16.
 * TF.ajax
 * BigPipe
 */

(function(window){
    var scriptTypeRE = /^(?:text|application)\/javascript/i,
        xmlTypeRE = /^(?:text|application)\/xml/i,
        jsonType = 'application/json',
        htmlType = 'text/html',
        blankRE = /^\s*$/;

    /**
     *
     * @param mime
     * @returns {*|string|string}
     */
    function parseContentType(mime) {
        if (mime) mime = mime.split(';', 2)[0]
        return mime && ( mime == htmlType ? 'html' :
                mime == jsonType ? 'json' :
                    scriptTypeRE.test(mime) ? 'script' :
                    xmlTypeRE.test(mime) && 'xml' ) || 'text'
    }

    /**
     *
     * @param obj
     * @returns {boolean}
     */
    function isObject(obj)     { return typeof obj == "object" }

    /**
     *
     * @param obj
     * @returns {boolean}
     */
    function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && obj.__proto__ == Object.prototype
    }

    /**
     *
     * @param func
     * @returns {boolean}
     */
    function isFunction(func) {
        return typeof func == "function"
    }
    /**
     *
     * @param target
     * @param source
     * @param deep
     */
    function extend(target, source, deep) {
        for (key in source)
            if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                    target[key] = {}
                if (isArray(source[key]) && !isArray(target[key]))
                    target[key] = []
                extend(target[key], source[key], deep)
            }
            else if (source[key] !== undefined) target[key] = source[key]
    }

    /**
     * 给url增加参数
     * @param url
     * @param query
     * @returns {string}
     */
    function appendQuery(url, query) {
        return (url + '&' + query).replace(/[&?]{1,2}/, '?');
    }

    /**
     * 把对象转成urlstring字符串
     * 只处理第一层,如果第二层也是json对象的话直接JSON.stringify(value)
     * @param obj
     * @returns {string}
     */
    function paramObjString(obj){
        var params = [];
        if(isObject(obj)){
            for(var key in obj){
                var value = obj[key];
                if(isObject(value)){
                    value = JSON.stringify(value);
                }
                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            }
        }
        return params.join('&').replace(/%20/g, '+');
    }
    /**
     * 梳理ajax里的data和url
     * @param options
     */
    function serializeData(options) {
        if (options.processData && options.data && typeof(options.data) == "object")
            options.data = paramObjString(options.data);
        if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
            options.url = appendQuery(options.url, options.data);
        return options;
    }


    /**
     * TF
     */
    (function (window) {
        var jsonpID= 0,
            scriptID = 0,
            scriptIDArray= [];
        window.TF = {
            extend : function(target){
                var deep, args = [];
                for(var key in arguments){
                    args.push(arguments[key]);
                }
                if (typeof target == 'boolean') {
                    deep = target;
                    target = args.shift()
                }
                args.forEach(function(arg){ extend(target, arg, deep) });
                return target
            },
            ajaxSetting: {},
            loadCache:{}, /** 避免jsonp未成功之前连续请求 **/
            xhr: function(){
                return new XMLHttpRequest();
            },
            setAjaxSetting : function(options){
                /**
                 * processData : 是否需要处理data
                 */
                var opt = this.extend({
                    url: options.url,
                    type: options.type || 'GET',
                    dataType: options.dataType || 'json',
                    async: options.async == undefined ? true : options.async,
                    data: options.data || null,
                    beforeSend: options.beforeSend || null,
                    success: options.success || null,
                    error: options.error || null,
                    processData: options.processData == undefined ? true : options.processData,
                    requestHeaders: {},
                    // MIME types mapping
                    accepts: {
                        script: 'text/javascript, application/javascript',
                        json:   'application/json',
                        xml:    'application/xml, text/xml',
                        html:   'text/html',
                        text:   'text/plain'
                    },
                },options);
                return serializeData(opt);
            },
            ajax: function(options){
                var _settings = this.setAjaxSetting(options),_this = this;
                if(_settings.dataType.toLowerCase() == 'jsonp'){
                    _settings.url = appendQuery(_settings.url, '__callback=?');
                    _this.ajaxJSONP(_settings);
                    return false;
                }
                var _xhr = this.xhr();
                var mime = _settings.accepts[_settings.dataType],
                    baseHeaders = { };
                if (mime) {
                    baseHeaders['Accept'] = mime;
                    if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
                    _xhr.overrideMimeType && _xhr.overrideMimeType(mime)
                }
                if (_settings.contentType || (_settings.contentType !== false && _settings.data && _settings.type.toUpperCase() != 'GET'))
                    baseHeaders['Content-Type'] = (_settings.contentType || 'application/x-www-form-urlencoded');
                _settings.headers = this.extend(baseHeaders, _settings.requestHeaders || {});
                _xhr.onreadystatechange = function(){
                    if(_xhr.readyState == 4) {


                        if ((_xhr.status >= 200 && _xhr.status < 300) || _xhr.status == 304 ) {
                            _settings.dataType = _settings.dataType || parseContentType(_xhr.getResponseHeader('content-type'));
                            var result = _xhr.responseText, error = null;
                            try {
                                // http://perfectionkills.com/global-eval-what-are-the-options/
                                if (_settings.dataType == 'script')
                                    (1,eval)(result);  //直接执行返回的js
                                else if (_settings.dataType == 'xml')
                                    result = _xhr.responseXML;
                                else if (_settings.dataType == 'json')
                                    result = blankRE.test(result) ? null : _this.parseJSON(result);
                            } catch (e) {
                                error = e
                            }

                            if (error) _this.ajaxError(error, 'parsererror', _xhr, _settings)
                            else _this.ajaxSuccess(result, _xhr, _settings)
                        } else {
                            _this.ajaxError(null, _xhr, _settings)
                        }
                    }
                };

                /**
                 * async 参数指示请求使用应该异步地执行。如果这个参数是 false，请求是同步的，
                 * 后续对 send() 的调用将阻塞，直到响应完全接收。
                 * 如果这个参数是 true 或省略，请求是异步的，且通常需要一个 onreadystatechange 事件句柄。
                 */
                _xhr.open(_settings.type,_settings.url,_settings.async); //true, 表示异步,不阻塞程序的执行;
                //设置请求头
                for(var key in baseHeaders){
                    _xhr.setRequestHeader(key,baseHeaders[key]);
                }
                _xhr.setRequestHeader('X_TAOO_HEADER','TAOO,0.5,0.5'); //必须在调用了open() 之后，在调用 send() 之前。
                _xhr.send(_settings.data ? _settings.data : null);

                return _xhr;
            },
            ajaxSuccess: function(data, xhr, settings){
                var _success = settings.success;
                if(isFunction(_success)){
                    _success.call(this,data, xhr, settings);
                }
            },
            ajaxError: function(error, xhr, settings){
                var _error = settings.error;
                if(isFunction(_error)){
                    _error.call(error, xhr, settings);
                }
            },
            ajaxJSONP: function(options){
                var _this = this;
                if (!('type' in options))
                    return _thsi.ajax(options);
                if(_this.loadCache[options.url]){
                    return;
                }else{
                    _this.loadCache[options.url] = options.url;
                }
                var callbackName = 'jsonp' + (++jsonpID),
                    script = document.createElement('script');
                script.setAttribute('id','script'+(++scriptID));
                scriptIDArray[callbackName] = scriptID;

                var cleanup = function() {
                        clearTimeout(abortTimeout);
                        var node = document.getElementById('script'+scriptIDArray[callbackName]);
                        node.parentNode.removeChild(node);
                        delete window[callbackName];
                        delete  scriptIDArray[callbackName];
                    },
                    abort = function(type){
                        cleanup();
                        // In case of manual abort or timeout, keep an empty function as callback
                        // so that the SCRIPT tag that eventually loads won't result in an error.
                        if (!type || type == 'timeout')
                            window[callbackName] = function () {};
                        _this.ajaxError({status: type || 'abort'}, xhr, options)
                    },
                    xhr = { abort: abort }, abortTimeout;
                window[callbackName] = function(data){
                    cleanup();
                    _this.ajaxSuccess(data, xhr, options);
                };

                script.onerror = function() { abort('error') };

                script.src = options.url.replace(/=\?/, '=' + callbackName);
                document.getElementsByTagName('head')[0].appendChild(script);

                if (options.timeout > 0)
                    abortTimeout = setTimeout(function(){
                        abort('timeout')
                    }, options.timeout);

                //return xhr
            },
            getScript: function (url,callback) {
                var _this = this;
                _this.ajax({
                    url: url,
                    type: 'get',
                    dataType: 'script',
                    success: function (data) {
                        if(isFunction(callback))
                            callback(data);
                    }
                })
            },
            getJson: function (url,callback) {
                var _this = this;
                _this.ajax({
                    url: url,
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        if(isFunction(callback))
                            callback(data);
                    }
                })
            },
            appendChild: function (id, html) {
                if(id){
                    var dom = document.getElementById(id);
                    if(dom){
                        var _innerHtml = dom.innerHTML;
                        dom.innerHTML = _innerHtml+html;
                        return dom;
                    }
                    return false;
                }
                return false;
            }
        };
    })(window);

    /**
     * BigPipe
     */
    (function(window) {
        window.BigPipe = {
            /**
             * check the id
             *
             * @param {object}
             *            json.pid
             */
            argsCheck : function(json) {
                if (!json.pid) {
                    throw 'nodeId is necessary';
                    return;
                }
            },
            /**
             * get node by id
             *
             * @param {string}
             *            id
             * @return {html object} html node
             */
            g : function(id) {
                if (typeof id === 'string') {
                    return document.getElementById(id);
                } else {
                    return id;
                }
            },
            /**
             * check the type of broswer
             */
            IE : function() {
                return /msie/i.test(navigator.userAgent);
            },
            getStyle : function(node, property) {
                var cssList;
                try {
                    cssList = document.defaultView.getComputedStyle(node, null);
                } catch (e) {
                    cssList = node.currentStyle;
                }
                return node.style[property] || cssList[property];
            },
            /**
             * load css
             *
             * @param {object}
             *            css href, load_ID, oncomplete
             * @param {string}
             *            css href
             * @param {string}
             *            load_ID
             * @param {function}
             *            onCssComplete
             */
            cssLoader : function(json) {
                // insert css
                var len = json.css.length;
                json.onCssComplete = json.onCssComplete ? json.onCssComplete
                    : function() {
                };
                if (len < 1) {
                    json.onCssComplete();
                } else {
                    for ( var i = 0; i < len; i++) {
                        var link = document.createElement('link');
                        link.setAttribute('rel', 'stylesheet');
                        link.setAttribute('type', 'text/css');
                        link.setAttribute('charset', 'utf-8');
                        link.setAttribute('href', json.css[i]);
                        document.getElementsByTagName('head')[0].appendChild(link);

                        var div = document.createElement("div");
                        div.id = json.load_ID;
                        div.style.display = "none";
                        div.style.width = "40px";
                        document.body.appendChild(div);
                    }
                    var timer = setInterval(function() {
                        if (parseInt(BigPipe.getStyle(BigPipe.g(json.load_ID),
                                "width")) == 40) {
                            clearInterval(timer);
                            json.onCssComplete();
                            document.body.removeChild(div);
                        }

                    }, 50);
                }

            },
            /**
             * load js
             *
             * @param {string}
             *            js
             */
            jsLoader : function(json) {
                var len = json.js.length,_this = this;
                json.onJsComplete = json.onJsComplete ? json.onJsComplete : function() {};
                if (len < 1) {
                    json.onJsComplete();
                } else {
                    for ( var i = 0; i < len; i++) {
                        var callback = null;
                        if (i == len - 1) { // 判断最后一个js文件是否已经加载完
                            callback = function (script) {
                                json.onJsComplete();
                                console.log('Last script has loaded!');
                            }
                        }
                        _this.loadScript(json.js[i],callback);
                    }

                }
            },
            loadScript: function(scriptUrl,callback,error){
                var _this = this;
                var script = document.createElement("script");
                script.setAttribute("charset", "utf-8");
                if (_this.IE()) {
                    script["onreadystatechange"] = function() {
                        if (script.readyState.toLowerCase() == "loaded" || script.readyState .toLowerCase() == "complete") {
                            isFunction(callback) && callback.call(this);
                        }
                    }
                } else {
                    script.onload = function() {
                        console.log(callback);
                        isFunction(callback) && callback.call(this);
                    }
                }
                script.onerror = function() {
                    isFunction(error) && error.call(this);
                }
                script.setAttribute("src", scriptUrl);
                document.getElementsByTagName("head")[0].appendChild(script);
            },
            ajaxPipeLoader : function(pl_object) {
                if(typeof(pl_object.url) == "undefined"){
                    return false;
                }

                var url = pl_object.url.replace(/#.*$/, "");
                if(url.indexOf("?") != -1) {
                    url += "&__aj=1";
                } else {
                    url += "?__aj=1";
                }
                /**
                 * 处理pl数组
                 * pl属性{pid:pl对应的id,did:pl填充的div，默认为pid,loading：pl加载时目标div是否增加加载状态，默认为true，或者传入loading所调用的function}
                 * 单个pl：直接传入pl对象
                 * 多个pl：多个pl对象的数组
                 */
                var pid_array 	= [];
                var did_array 	= [];
                var load_array	= [];

                if(pl_object.pl instanceof Array){
                    for(var k in pl_object.pl){
                        var tmp_pl = pl_object.pl[k];
                        if(typeof(tmp_pl.pid) == "undefined"){
                            return false;
                        }
                        if(typeof(tmp_pl.did) == "undefined"){
                            tmp_pl.did = null;
                        }
                        if(typeof(tmp_pl.loading) == "function"){
                            tmp_pl.loading;
                        }else if(typeof(tmp_pl.loading) == "undefined" || !isNaN(tmp_pl.loading)){
                            tmp_pl.loading = 1;
                        }
                        pid_array[k] = tmp_pl.pid;
                        did_array[k] = tmp_pl.did;
                        if(tmp_pl.loading == 1){
                            if(tmp_pl.did == null){
                                BigPipe.autoLoading(tmp_pl.pid);
                            }else{
                                BigPipe.autoLoading(tmp_pl.did);
                            }
                        }
                    }
                }else if(typeof(pl_object.pl) == "object"){
                    if(typeof(pl_object.pl.pid) == "undefined"){
                        return false;
                    }
                    if(typeof(pl_object.pl.did) == "undefined"){
                        pl_object.pl.did = null;
                    }
                    if(typeof(pl_object.pl.loading) == "function"){
                        pl_object.pl.loading;
                    }else if(typeof(pl_object.pl.loading) == "undefined" && typeof(pl_object.pl.callback) == "undefined"){
                        pl_object.pl.loading = 1;
                    }
                    pid_array[0] = pl_object.pl.pid;
                    did_array[0] = pl_object.pl.did;
                    if(pl_object.pl.loading == 1){
                        if(pl_object.pl.did == null){
                            BigPipe.autoLoading(pl_object.pl.pid);
                        }else{
                            BigPipe.autoLoading(pl_object.pl.did);
                        }
                    }
                }else{
                    return false;
                }

                if(pid_array.length == did_array.length){
                    url += "&__pl="+encodeURIComponent(pid_array.join("|"));
                    url += "&__d="+encodeURIComponent(did_array.join("|"));
                }

                if(typeof(pl_object.callback) != "undefined"){
                    if(typeof(pl_object.callback) == "function"){
                        url += "&__no_cb=1";
                    }else{
                        url += "&__cb="+encodeURIComponent(pl_object.callback);
                    }

                }else{
                    url += "&__cb=BigPipe.onPageletArrive";
                }
                url += "&__t=" + new Date().getTime();

                if(typeof(pl_object.callback) == "function"){
                    TF.getJson(url, function( data ) {
                        pl_object.callback(data);
                    });
                }else{
                    TF.getScript(url);
                }
            },
            autoLoading: function(id, delay){
                var div = BigPipe.g(id),
                    loadingTpl = '<div class="bigpipe-loading-box"><img src="http://resource.thefair.net.cn/_assets/touch/thefair/images/loading.gif" title="http://resource.thefair.net.cn/_assets/touch/thefair/images/loading.gif"></div>';
                if(div != null && typeof(div.innerHTML) != "undefined"){
                    if(typeof(delay) == "undefined"){
                        div.innerHTML = loadingTpl;
                    }else{
                        eval("BigPipe_loadingHandle_"+id+" = setTimeout(function(){div.innerHTML = loadingTpl;}, "+delay+");");
                    }
                }
            },
            onPageletArrive : function(json) {
                var arriveTime = new Date().getTime();
                BigPipe.argsCheck(json);
                var cssJson = {
                    css : json.css,
                    load_ID : json.pid + "css",
                    onCssComplete : function() {
                        // load css first;
                        if (typeof(json.content) != "undefined") {
                            eval("typeof(BigPipe_loadingHandle_"+json.pid+") !='undefined' && clearTimeout(BigPipe_loadingHandle_"+json.pid+");");
                            //TF.appendChild(json.pid,json.content);
                            document.getElementById(json.pid) ? document.getElementById(json.pid).innerHTML =json.content : '';
                        }
                    }
                };
                BigPipe.cssLoader(cssJson);

                var jsJson = {
                    js : json.js,
                    onJsComplete : function() {
                        BigPipe.pageletLog(json.pid+':'+arriveTime);
                    }
                };
                BigPipe.jsLoader(jsJson);
            },
            pageletLog : function(msg) {
                if (!/msie/i.test(navigator.userAgent)){
                    //console.log(msg + '-' +new Date().getTime() + '----complete');
                }
            }
        };
    })(window);


})(window);



