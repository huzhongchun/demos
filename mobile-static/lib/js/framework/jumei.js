/**
 * @name Jumei seed module
 * @singleton
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
    var agent = navigator.userAgent;
    if ((agent.indexOf('iPhone') > -1 || (agent.indexOf('iPad') > -1)) && Jumei.checkPlatformWap) {
        window.location.href = 'jmweb://' + fuc + '?' + parm + '=' + val;
    } else {
        var fuc = "JMWebViewAndroid." + fuc + "(val)";
        fuc = eval(fuc);
    }
}


var Jumei = (function(window, scale) {
    var global = this,
            slice = Array.prototype.slice,
            objectPrototype = Object.prototype,
            toString = objectPrototype.toString,
            document = window.document,
            J = {
                version: '0.0.1',
                global: global,
                /**
                 * isBoolean 如果为boolean类型返回true，否则返回false
                 * @param {Object} 
                 * @return {Boolean}
                 */
                isBoolean: function(value) {
                    return typeof value === 'boolean';
                },
                /**
                 * isNumber 如果为Number类型返回true，否则返回false
                 * @param {Object} 
                 * @return {Boolean}
                 */
                isNumber: function(value) {
                    return typeof value === 'number' && isFinite(value);
                },
                /**
                 * isString 如果为String类型返回true，否则返回false
                 * @param {Object} 
                 * @return {Boolean}
                 */
                isString: function(value) {
                    return typeof value === 'string';
                },
                /**
                 * isArray 如果为数组返回true，否则false
                 * @return {Boolean}
                 */
                isArray: ('isArray' in Array) ? Array.isArray : function(value) {
                    return toString.call(value) === '[object Array]';
                },
                /**
                 * isElement 如果为Element类型返回true，否则返回false
                 * @param {Object} 
                 * @return {Boolean}
                 */
                isElement: function(value) {
                    return value ? value.nodeType === 1 : false;
                },
                /**
                 * isFunction 如果为函数返回true，否则false
                 * @param {Object} value The value to test
                 * @return {Boolean}
                 */
                isFunction: (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') ? function(value) {
                    return toString.call(value) === '[object Function]';
                } : function(value) {
                    return typeof value === 'function';
                },
                /**
                 * isObject 如果为对象返回true，否则false
                 * @return {Boolean}
                 */
                isObject: (toString.call(null) === '[object Object]') ?
                        function(value) {
                            return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
                        } :
                        function(value) {
                            return toString.call(value) === '[object Object]';
                        },
                isPainObject: function(item) {
                    if (typeof item === "object" && item !== null) {
                        var a = Object.getPrototypeOf(item);
                        return a === Object.prototype || a === null;
                    }
                    return false;
                },
                /**
                 * makeArray 返回数组
                 * @return {Boolean}
                 */
                makeArray: function(likeArr) {
                    return slice.call(likeArr);
                },
                /**
                 * mix 多对象合并，是否覆盖如果最后一个参数为true，则覆盖。否则不覆盖。
                 * @param {Object} value The value to test
                 * @return {Boolean}
                 */
                mix: function(target, source) {
                    var args = J.makeArray(arguments),
                            i = 1,
                            argsLen = args.length,
                            isCover = J.isBoolean(args[argsLen - 1]),
                            key;

                    if (isCover === true) {
                        args.pop();
                    }

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
                /**
                 * ready 监听dom ready
                 * @param {Function} callback
                 */
                ready: function(callback) {
                    try {
                        if (/complete|loaded|interactive/.test(document.readyState))
                            callback.call($)
                        else
                            document.addEventListener('DOMContentLoaded', function() {
                                callback.call($)
                            }, false);
                    } catch (e) {
                        J.log(e);
                    }
                },
                /**
                 * cache 缓存函数
                 * @return {Object} 
                 */
                cache: (function() {
                    var data = {},
                            id = 0,
                            ikey = '_gid';    // internal key.
                    return function(obj, key, val) {
                        var dkey = obj[ ikey ] || (obj[ ikey ] = ++id),
                                store = data[ dkey ] || (data[ dkey ] = {});
                        val !== undefined && (store[ key ] = val);
                        val === null && delete store[ key ];
                        return store[ key ];
                    };
                })(),
                /**
                 * log 打印log
                 * @return {Object} 
                 */
                log: function(e, level) {
                    var stack = e.stack,
                            stackarr = stack.match(/http:.*\s/),
                            url,
                            line;
                    level = level || 1;
                    if (stackarr) {
                        url = stackarr[0].replace(/(:\d+)?:\d+/gi, "");
                        line = stackarr[0].match(/:(\d+):/);
                        line = line[1];
                    }
                    msg = e.message;
                    var _jaq = _jaq || [];
                    _jaq.push(['_errorEvent', msg, url, line, level]);

                },
                scale: scale,
                getScale: function() {
                    return J.scale;
                },
                setScale: function(scale) {
                    J.scale = scale;
                }

            };
    return J;

})(window, (function() {


    var scale = 1,
            $wrapper = document.getElementById('wrapper'),
            $body = document.getElementsByTagName('body')[0],
            windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
            deviceAgent = navigator.userAgent.toLowerCase();
    try {
        if (deviceAgent.match(/(iphone|ipod|android|windows\s*phone|symbianos)/)) {
            if (window.localStorage && window.localStorage.getItem('jumei_scale_jumei')) {
                scale = window.localStorage.getItem('jumei_scale_jumei');
            } else {
                scale = parseFloat(windowWidth / 320);
                if ($(window).height() > $(window).width()) {
                    window.localStorage && window.localStorage.setItem('jumei_scale_jumei', scale);
                } else {
                    $(window).on('ortchange', function() {        //当转屏的时候触发
                        if ($(window).height() > $(window).width()) {
                            windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
                            scale = parseFloat(windowWidth / 320);
                            $wrapper.style.zoom = scale;
                            $body.style.display = 'block';
                            window.localStorage && window.localStorage.setItem('jumei_scale_jumei', scale);
                        }
                    });
                }
            }

            //微信2.3版本的处理
            if (deviceAgent.match(/android\s*2.3/) && deviceAgent.match(/micromessenger/)) {
                scale = 1;
            }
            if ($wrapper) {
                $wrapper.style.zoom = scale;
                $body.style.display = 'block';
            }

        } else {
            $(window).resize(function() {
                windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
                scale = parseFloat(windowWidth / 320);
                if ($wrapper) {
                    $wrapper.style.zoom = scale;
                    $body.style.display = 'block';
                }
            });
            if ($wrapper) {
                scale = parseFloat(windowWidth / 320);
                $wrapper.style.zoom = scale;
                $body.style.display = 'block';
            }
        }
    } catch (e) {
        windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        scale = parseFloat(windowWidth / 320);
        if ($wrapper) {
            $wrapper.style.zoom = scale;
            $body.style.display = 'block';
        }
    }
    return scale;
})());



(function(J) {

    var fixDescriptor = function(item, definition, prop) {
        if (J.isPainObject(item)) {
            if (!('enumerable') in item) {
                item.enumerable = true;
            }
        } else {
            item = definition[prop] = {
                value: item,
                enumerable: true,
                writable: true
            };
        }

        return item;
    };

    var funNames = Object.getOwnPropertyNames(Function);
    J.mix(J, {
        create: function(superclass, definition) {
            try {
                //如果传的对象是一个的话，那就继承Object
                if (arguments.length === 1) {
                    definition = superclass;
                    superclass = Object;
                }

                if (typeof superclass !== "function") {
                    throw new Error("继承类必须是function");
                }

                var _super = superclass.prototype;
                var statics = definition.statics;
                delete definition.statics;
                //重新调整定义类
                Object.keys(definition).forEach(function(prop) {
                    var item = fixDescriptor(definition[prop], definition, prop);
                    if (J.isFunction(item.value) && J.isFunction(_super[prop])) {

                        var __super = function() {
                            return _super[prop].apply(this, arguments);
                        };

                        var __superApply = function(args) {
                            return _super[prop].apply(this, args);
                        };

                        var fn = item.value;
                        item.value = function() {
                            var t1 = this._super;
                            var t2 = this._superApply;
                            this._super = __super;
                            this._superApply = __superApply;
                            var ret = fn.apply(this, arguments);
                            this._super = t1;
                            this._superApply = t2;
                            return ret;
                        };
                    }
                });


                var Base = function() {
                    this.init.apply(this, arguments);
                };

                Base.prototype = Object.create(_super, definition);
                Base.prototype.constructor = Base;
                //确保一定存在init
                if (J.isFunction(Base.prototype.init) === false) {
                    Base.prototype.init = function() {
                        superclass.apply(this, arguments);
                    };
                }

                if (Object !== superclass) {
                    Object.getOwnPropertyNames(superclass).forEach(function(name) {
                        if (funNames.indexOf(name) === -1) {
                            Object.defineProperty(Base, name, Object.getOwnPropertyDescriptor(superclass, name) || {});

                        }
                    });


                }

                if (J.isPainObject(statics)) {
                    Object.keys(statics).forEach(function(name) {
                        if (funNames.indexOf(name) === -1) {
                            Object.defineProperty(Base, name, fixDescriptor(statics[name], statics, name));
                        }
                    });
                }
            } catch (e) {
                J.log(e);
            }
            return  Object.freeze ? Object.freeze(Base) : Base;

        }
    });

})(Jumei);



(function(J) {

    J.mix(J, {
        module: {},
        addModule: function(moduleName, value) {
            if (moduleName && typeof moduleName === 'string') {
                J.register(moduleName, value);
            }
        },
        use: function(moduleName, callback, arg) {
            var moduleObj = J.getModule(moduleName);
            if (moduleObj)
                moduleObj.call(moduleObj, moduleObj, J.global, arg);
            if (callback)
                J.ready(function() {
                    callback.call(moduleObj, moduleObj, J.global, arg);
                });
        },
        register: function(ns, value) {

            if (!ns || !ns.length) {
                return null;
            }

            var levels = ns.split(".");
            var nsobj = J.module;
            var returnObj = null;

            for (var i = 0; i < levels.length; ++i) {
                nsobj[levels[i]] = nsobj[levels[i]] || {};
                if (i == (levels.length - 1)) {
                    nsobj[levels[i]] = value;
                }
                returnObj = nsobj;
                nsobj = nsobj[levels[i]];
            }

            return returnObj;

        },
        getModule: function(ns) {
            if (!ns || !ns.length) {
                return null;
            }
            try {
                return eval('Jumei.module.' + ns);
            } catch (e) {
                J.log(e);
            }
        },
        /**
         * @desc 获取单例
         */
        getInstance: function(obj, arg) {
            if (J.cache(obj, 'instance')) {
                J.cache(obj, 'instance').constructor(arg);
                return J.cache(obj, 'instance');
            } else {
                var objInstance = new obj(arg);
                J.cache(obj, 'instance', objInstance);
                return objInstance;
            }
        }
    });

})(Jumei);




(function(J, $) {

    var emptyFn = function() {
    },
            slice = Array.prototype.slice,
            widgetBase = J.create({
                statics: {
                    name: 'widgetBase'
                },
                init: function() {
                    this.options = {};
                    this.element = {};
                },
                _setElement: function(element) {
                    this.element = element;
                },
                _getElement: function() {
                    return this.element;
                },
                _setOption: function(options) {
                    J.mix(this.options, options, true);
                },
                _getOption: function() {
                    return this.options;
                },
                _factory: function(method, args) {
                    try {
                        this[method].apply(this, args);
                    } catch (e) {
                        J.log(e);
                    }
                },
                _destroy: emptyFn,
                _create: emptyFn,
                _init: emptyFn
            });


    J.mix(J, {
        parseTpl: function(str, data) {
            var tmpl = 'var __p=[];' + 'with(obj||{}){__p.push(\'' +
                    str.replace(/\\/g, '\\\\')
                    .replace(/'/g, '\\\'')
                    .replace(/<%=([\s\S]+?)%>/g, function(match, code) {
                        return '\',' + code.replace(/\\'/, '\'') + ',\'';
                    })
                    .replace(/<%([\s\S]+?)%>/g, function(match, code) {
                        return '\');' + code.replace(/\\'/, '\'')
                                .replace(/[\r\n\t]/g, ' ') + '__p.push(\'';
                    })
                    .replace(/\r/g, '\\r')
                    .replace(/\n/g, '\\n')
                    .replace(/\t/g, '\\t') +
                    '\');}return __p.join("");',
                    /* jsbint evil:true */
                    func = new Function('obj', tmpl);
            return data ? func(data) : func;
        },
        widget: function(uiName, obj, protos) {
            var protoClass;

            if (protos && J.isFunction(protos)) {
                protoClass = J.create(protos, obj);
            } else {
                protoClass = J.create(widgetBase, obj);
            }

            J.addModule(uiName, protoClass);
            J.zeptoFn(uiName, protoClass);
        },
        zeptoFn: function(uiName, protoClass) {

            var key = uiName.substring(0, 1).toLowerCase() + uiName.substring(1),
                    old = $.fn[ key ];

            if (key.indexOf('ui.') > -1) {
                key = key.replace('ui.', '');
            }

            $.fn[ key ] = function(opts) {
                var args = slice.call(arguments, 1),
                        method = typeof opts === 'string' && opts,
                        ret,
                        obj;
                $.each(this, function(i, el) {
                    // 从缓存中取，没有则创建一个
                    if ($(this).data(key)) {
                        obj = $(this).data(key);
                        obj._setOption(opts);
                        obj.element = this;
                        obj._create(opts);
                    } else {
                        obj = new protoClass(opts);
                        obj.element = this;
                        obj._setOption(opts);
                        obj._init(opts);
                        obj._create(opts);
                        $(this).data(key, obj);
                    }

                    // 取实例
                    if (method === 'this') {
                        ret = obj;
                        return false;    // 断开each循环
                    } else if (method) {
                        // 当取的方法不存在时，抛出错误信息
                        obj._factory(method, args);

                        // 断定它是getter性质的方法，所以需要断开each循环，把结果返回
                        if (ret !== undefined && ret !== obj) {
                            return false;
                        }
                        // ret为obj时为无效值，为了不影响后面的返回
                        ret = undefined;
                    }
                });
                return ret !== undefined ? ret : this;
            };
            $.fn[ key ].noConflict = function() {
                $.fn[ key ] = old;
                return this;
            };
        }

    });

})(Jumei, $);


//(function() {
//
//    //扩展数组
//    Array.prototype.indexOf = function (e) {
//        for (var i = 0, j; j = this[i]; i++) {
//            if (j == e) {
//                return i;
//            }
//        }
//        return -1;
//    }
//    Array.prototype.lastIndexOf = function (e) {
//        for (var i = this.length - 1, j; j = this[i]; i--) {
//            if (j == e) {
//                return i;
//            }
//        }
//        return -1;
//    };
//    Array.prototype.remove = function (dx) {
//        if (isNaN(dx) || dx > this.length) {
//            return false;
//        }
//        for (var i = 0, n = 0; i < this.length; i++) {
//            if (this[i] != this[dx]) {
//                this[n++] = this[i];
//            }
//        }
//        this.length -= 1
//    };
//    Array.prototype.getIndex = function (val) {
//        for (var i = 0, n = 0; i < this.length; i++) {
//            if (this[i] == val) {
//                return i;
//            }
//        }
//
//    };
//
//})();


window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


(function(J, $) {

    J.mix(J, {
        setCookie: function(name, value, expires, path, domain, secure) {
            //name value expires path为必选参数
            var today = new Date();
            today.setTime(today.getTime());
            if (expires) {
                expires = expires * 1000 * 60 * 60 * 24;
            }
            var expires_date = new Date(today.getTime() + (expires));
            document.cookie = name + "=" + escape(value) +
                    ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
                    ((path) ? ";path=" + path : "") +
                    ((domain) ? ";domain=" + domain : "") +
                    ((secure) ? ";secure" : "");
        },
        getCookie: function(check_name) {
            var a_all_cookies = document.cookie.split(';');
            var a_temp_cookie = '';
            var cookie_name = '';
            var cookie_value = '';
            var b_cookie_found = false;
            for (var i = 0; i < a_all_cookies.length; i++) {
                a_temp_cookie = a_all_cookies[i].split('=');
                cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
                if (cookie_name == check_name) {
                    b_cookie_found = true;
                    if (a_temp_cookie.length > 1) {
                        cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
                    }
                    return cookie_value;
                    break;
                }
                a_temp_cookie = null;
                cookie_name = '';
            }
            if (!b_cookie_found)
            {
                return null;
            }
        },
        changeScheme: function(className, myattr) {
            //classname为需要替换urlscheme的dom类
            myattr = typeof myattr !== 'undefined' ? myattr : 'href';
            var self = this;
            for (var i = 0; i < $(className).length; i++) {
                var scheme = $($(className)[i]).attr(myattr);
                $($(className)[i]).attr(myattr, self.jumeimall2http(scheme));
            }
        },
        jumeimall2http: function(scheme) {
            //为触屏版追中增加location.search
            var search = location.search;
            search = search.replace('?', '');

            //scheme为jumeimall
            var nameList = ['label', 'partnerid', 'hash_id', 'hashid', 'brandid', 'productid'];
            var name = '';
            var httpUrl = '';
            for (i = 0; i < nameList.length; i++) {
                if (scheme.indexOf(nameList[i]) != -1) {
                    name = nameList[i];
                    break;
                }
            }
            var reg = new RegExp('\\?' + name + '=(.*)\\b');
            var id = scheme.match(reg) ? scheme.match(reg)[1] : '';
            var schemeUrl = scheme.split(id)[0];
            var urlMap = {
                'jumeimall://page/pop/list?partnerid=': 'http://m.jumei.com/i/MobileWap/pop_list?t_lang=touch&partner_id=',
                'jumeimall://page/deallist?label=': 'http://m.jumei.com/i/mobilewap/activity_view?type=deal&t_lang=touch&label=',
                'jumeimall://page/malllist?label=': 'http://m.jumei.com/i/mobilewap/activity_view/?type=mall&t_lang=touch&label=',
                'jumeimall://page/detail?hashid=': 'http://m.jumei.com/i/MobileWap/deal_view?hash_id=',
                'jumeimall://page/detail?productid=': 'http://m.jumei.com/i/MobileWap/mall_view?product_id=',
                'jumeimall://page/mall/flagship?brandid=': 'http://m.jumei.com/products/'
            }
            //'jumeimall://page/mall/filter?brandid=': 'http://m.jumei.com/i/mobilewap/activity_view/?type=mall&t_lang=touch&label=',
            if (urlMap[schemeUrl]) {
                httpUrl = urlMap[schemeUrl] + id;
                //触屏版加追踪 即为
                if (search != '') {
                    if (httpUrl.indexOf('?') > -1) {
                        httpUrl = httpUrl + '&' + search;
                    } else {
                        httpUrl = httpUrl + '?' + search;
                    }
                }

            } else {
                httpUrl = 'http://s.m.jumei.com/pages/941';
            }
            if (schemeUrl == 'jumeimall://page/mall/flagship?brandid=') {
                httpUrl = urlMap[schemeUrl] + id + '-0-0.html?type=2';
            }
            if (this.checkPlatformWap()) {
                return httpUrl;
            } else {
                return scheme;
            }
        },
        getQueryString: function(url, name) {
            //获取url中的参数
            var reg = new RegExp(name + '=([^&#]+)\\b');
            var r = url.match(reg);
            if (r != null) {
                return  unescape(r[1]);
            } else {
                return null;
            }
        },
        checkPlatformWap: function() {
            //判断当前页面是否为触屏版进入
            if(/jumei/i.test(navigator.userAgent)){
                return false;
            }else{
                var platform = this.getQueryString(window.location.href, 'platform');
                if (platform == 'wap')
                    return true;
                else
                    return false;
            }
        },
        addWap: function(classNames) {
            if (this.checkPlatformWap()) {
                var search = location.search;
                $(classNames).each(function() {
                    var hrefs = $(this).attr('href');
                    if (hrefs.indexOf('?') > -1) {
                        hrefs = hrefs.replace('?', search + '&');
                    } else {
                        if (hrefs.indexOf('#') > -1) {
                            hrefs = hrefs.replace('#', search + '#');
                        } else {
                            hrefs = hrefs + search;
                        }
                    }
                    $(this).attr('href', hrefs);
                });
            }
        },
        os: function() {
            if (this.checkPlatformWap() === true) {
                return 'wap';
            }
            var platform = navigator.userAgent.toLowerCase();
            if (/android/g.test(platform)) {
                return 'android';
            } else if (/(iphone|ipod|ipad)/g.test(platform)) {
                return 'iphone';
            } else {
                return 'qita';
            }
        },
        ja: function() {
            var ga = ["_trackEvent"], args = [];
            if (arguments.length > 0) {
                if (arguments && Jumei.isArray(arguments[0])) {
                    args = arguments[0];
                } else {
                    args = arguments;
                }
                for (var i = 0; i < args.length; i++) {
                    if (i < 3) {
                        if (i == 0) {
//                            var hrefs = location.href;
//                            hrefs = hrefs.replace(/http:\/\/.*?\//,'');
                            var platform = this.os();
                            ga.push(args[i] + '_' + platform);
                        } else {
                            ga.push(args[i]);
                        }
                    } else {
                        Jumei.log('ga 多余参数' + arguments[i]);
                    }
                }
                window._gaq = window._gaq || [];
                window._jaq = window._jaq || [];
                window._hmt = window._hmt || [];
                window._gaq.push(ga);
                window._jaq.push(ga);
                window._hmt.push(ga);
            }

        }
    });

})(Jumei, $, $(function() {
    //聚美统计
    //设置项目id需要在页面里添加,为了区分不同项目的统计
    //window._jaq.push(['_setPid','jumei']);

    // window._jaq = window._jaq || [];
    // (function(){
    //     var ja = document.createElement('script'); ja.type = 'text/javascript'; 
    //     ja.setAttribute('async','async');
    //     ja.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.jumei.com/lib/js/src/utils/ja.js';
    //     var s = document.getElementsByTagName('body')[0]; s.appendChild(ja);
    // })();
    //ga
    window._gaq = window._gaq || [];
    window._gaq.push(['_setAccount', 'UA-10208510-2']);
    window._gaq.push(['_trackPageview']);
    (function() {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.setAttribute('async', 'async');
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('body')[0];
        s.appendChild(ga);
    })();
    //baidu
    window._hmt = window._hmt || [];
    (function() {
        var baidu_tongji = document.createElement('script');
        baidu_tongji.type = 'text/javascript';
        baidu_tongji.async = 'async';
        baidu_tongji.setAttribute('async', 'async');
        baidu_tongji.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'hm.baidu.com/h.js?40044f6f6b2e91544dd4fe0b50a04cef';
        var s = document.getElementsByTagName('body')[0];
        s.appendChild(baidu_tongji);
    })();
}));




(function(J) {
    /**
     * 静态文件资源路径
     */

    J.mix(J, {static: 'http://images.jumei.com/mobile/act'});

})(Jumei);
