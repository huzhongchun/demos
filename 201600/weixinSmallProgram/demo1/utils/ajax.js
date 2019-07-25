
/**
 * ajax
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