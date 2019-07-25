
var Controller = Jumei.create({
    init: function(option){
        this._direction= 'left',
        this._emptyElement= null,
        this._module= null,
        this._action= null,
        this._baseUrl= location.protocol +'//'+ location.host,
        this._hasPushState= !!(window.history && window.history.pushState),
        this._url= '',
        this._hash='',
        this._param= null,
        this._hashStack = [];
        this._uuid = this.getStoryItem('mvc_uuid')?this.getStoryItem('mvc_uuid'):0 ;
        this.view = {};
        this.name = '';
        Jumei.mix(this, option, true);
        this._supportLocalStorage = !!window.localStorage;
        this.buildEvent();
        this.defaultAction();
        this.lookNum = 0;
        this.viewObj = {}; 
    },
    getUuid: function(){
        var uuid = ++this._uuid;
        this.setStoryItem('mvc_uuid',uuid)
        return uuid;
    },
    pushStack: function(hash){
        this._hashStack.push(hash);
    },
    popStack: function(){
        return this._hashStack.pop();
    },
    unshiftStack: function(url){
        return this._hashStack.unshift(url);
    },
    getLastStack: function(){
        var len = this._hashStack.length;
        return this._hashStack[len-2];
    },
    getLocalStory: function(key){
        if(this._supportLocalStorage){
            return window.localStorage.getItem(key);
        }
    },
    setLocalStroy: function(key, value){
        if(this._supportLocalStorage){
            try {
                window.localStorage.setItem(key , value);
            } catch(e) {
                var noop = function() {};
                window.localStorage.__proto__ = {
                    setItem: noop,
                    getItem: noop,
                    removeItem: noop,
                    clear: noop
                };
            }
        }
    },
    getStoryItem: function(key){
        //return localStorage.getItem(key);
        return Jumei.getCookie(key);
    },
    setStoryItem: function(key , value){
        Jumei.setCookie(key, value, 365, '/');
        // 檢測是否正常
        //try {
        //    localStorage.setItem(key , value);
        //} catch(e) {
        //    var noop = function() {};
        //    localStorage.__proto__ = {
        //        setItem: noop,
        //        getItem: noop,
        //        removeItem: noop,
        //        clear: noop
        //    };
        //}
    },
    defaultAction: function(){
        this.pushStack(location.href);
        if(location.hash != ""){
            this.showView();
        }
        this.heightHeader();
        this.headShow();
        this.bindHeader();
        //this.pushHistory();
    },
    heightHeader: function(){
        var $header = $('#header');
        if($.os.iphone){
            var userAgent = navigator.userAgent;
            var match = userAgent.match(/.*OS\s*(\d)/);
            if(match[1] && match[1]>6){
                $header.css('padding-top','20px');
                $('#container').css('padding-top','60px');
            }else{
                $header.css('padding-top','0px');
                $('#container').css('padding-top','40px');
            }
        }else{
            $header.css('padding-top','0px');
            $('#container').css('padding-top','40px');
        }
        $header.height(40);
    },
    bindHeader: function(){
        var self = this;
        $('#home').on('tap', function(){
            self.forward('#module='+self._module+'&action=index');
        });
        $('#back').on('tap', function(){
            if(self._action && self._action == 'index'){
                JMWebView.close();
                return false;
            };
            history.go(-1);
        });
    },
    buildEvent: function(){
        var self = this;
        if (this._hasPushState) {
            $(window).bind('popstate', function(e){
                   $('#container-dialog').remove();
                   if(self.getLastStack() == location.href){
                       self.historyShowView('right');
                   }else{
                       self.historyShowView('left');
                   }
                   self.headShow();
            });
        } else {
            $(window).bind('hashchange', function(e){
                if(self._flag == true){
                   self._direction = 'left';
                   self._flag = false;
                   self.showView();
                }else{
                   $('#container-dialog').remove();
                   if(self.getLastStack() == location.href){
                       self.historyShowView('right');
                   }else{
                       self.historyShowView('left');
                   }
                }
                self.headShow();
            });
        }
    },
    pushHistory: function (){
        //var href = window.location.href;
        //默认action主要是以index为准
//        if(this._action == 'index'){
//            history.pushState('', {}, href);
//        }
        this.ja();
    },
    parseHashUrl: function(){
        var pureHash = null,
            pairs = null,
            parts = null,
            pair = null,
            require = {};
            
        this.hash = decodeURIComponent(location.hash).replace(/\?.*/,'');
        if(this.hash != null){
            pureHash = this.hash.substr(1);
            pairs = pureHash.split('&');
            for(var i = 0; i < pairs.length; i++){
                pair = pairs[i];
                parts = pair.split('=');
                if(parts.length>1){
                    require[parts[0]] = decodeURIComponent(parts[1]);
                }
            }
        }
        this['_action'] = require['action'] || 'index';
        this['_module'] = require['module'];
        delete require['action'];
        delete require['module'];
        this['_param'] = require;
    },
    getHashUrl: function(obj){
        var param = '',
        num = 0;
        for(var i in obj){
            if(num == 0){
                param +=  i + '=' + obj[i]
            }else{
                param +=  '&'+ i + '=' + obj[i];
            }
            ++num;
        }
        return param;
    },
    getUrl: function(){
        var url = '';
        url += this._baseUrl ? this._baseUrl : ''; 
        url += this._module && this._module != undefined ? '/' + this._module: '';
        url += this._action && this._action != undefined ? '/' + this._action: '';
        url += this._param && this._param != ''? '?' + this.getHashUrl(this._param) : '';
        return url;
    },
    historyShowView: function(direct){
        if(location.hash){
            this.parseHashUrl();
            var url = this._module+'_'+this._action;
            var newView = this.view[url];
            var self = this;
            if(newView){
                var $oldView = $('.current');
                var oldView =  $oldView[0];
                $oldView.removeClass('current');
                $(newView).addClass('current');
                if(oldView == newView){
                    return;
                }else{
                    if(direct == 'left'){
                        self.pushStack(location.href);
                        self._direction = 'left';
                    }else{
                        self.popStack();
                        self._direction = 'right';
                    }
                    this.switchView(oldView, newView);
                    self.viewObj[url].onRefresh();
                }
            }else{
                this._direction = 'right';
                self.popStack();
                self.unshiftStack(location.href);
                var oldView = $('.current')[0];
                $(oldView).removeClass('current');
                $('#wrapper').loadding();
                this.view[url] = $('<div class="current" id="' + url + '"><div class="main"></div></div>')[0];
                $('#container').append(self.view[url]);
                this.switchView(oldView,this.view[url]);
                this.loadView(function(){
                });
            }
            this.ja();
        }
    },
    headShow: function(){
        if(this._action == 'index'){
            $('#home').hide();
        }else{
            $('#home').show();
        }
    },
    showView: function(){
        this._direction = 'left';
        this.parseHashUrl();
        this.headShow();
        var url = this._module+'_'+this._action
        var newView = this.view[url];
        var self = this;
        if(newView){
            var $oldView = $('.current');
            var oldView =  $oldView[0];
            $oldView.removeClass('current');
            $(newView).addClass('current');
            if(oldView == newView){
                return;
            }else{
                $(newView).html('');
                $('#wrapper').loadding();
                this.switchView(oldView, newView);
                this.loadView(function(){
                });
            }
        }else{
            if($('#container').children().length <= 0){
                this.view[url] = $('<div class="current" id="' + url + '"><div class="main"></div></div>')[0];
                $('#container').append(self.view[url]);
                $('#wrapper').loadding();
                this.loadView(function(){
                });
            }else{
                var oldView = $('.current')[0];
                $(oldView).removeClass('current');
                $('#wrapper').loadding();
                this.view[url] = $('<div class="current" id="' + url + '"><div class="main"></div></div>')[0];
                $('#container').append(self.view[url]);
                this.switchView(oldView,this.view[url]);
                this.loadView(function(){
                });
            }
        }
    },
    loadView: function(callback){
        var url = '',self = this;
        url = this._module+'_'+this._action;
        $('#wrapper').loadding();
        requirejs([this._module+'/'+this._action], function(view){
            $('#wrapper').loadding('close');
            self.viewObj[url] = new view();
            self.viewObj[url] && self.viewObj[url].initialize(self);
            self._direction = 'left';
            callback.call(self);
        });
    },
    getUniqueHash: function(hash){
        return hash +'?'+ this.getUuid();
    },
    back: function(){
        var self = this;
        self._direction = 'right';
        self._flag = false;
        self.historyShowView();
    },
    forward: function(hashUrl){
        var hash = '',self = this,
        url = location.href;
        url = url.replace(/\#.*|\?.*/,'');
        hash = this.getUniqueHash(hashUrl);
        if(this._hasPushState){
            history.pushState('', {}, url + hash);
            self.pushStack(location.href);
            self.showView();
       }else{
            location.hash = hash;
            self.pushStack(location.href);
            self._flag = true;
       }
       this.headShow();
       this.ja();
    },
    ja: function(){
        this.parseHashUrl();
        Jumei.ja(this.name+'page', this._module+'/'+this._action);
    },
    loadJs : function(url, callback) {
        var self = this,
            script = document.createElement("script"),
            statechange = script.onreadystatechange ? "onreadystatechange" : "onload";
        script.async = "async";
        script[statechange] = function() {
            if (!script.onreadystatechange || /loaded|complete/i.test(script.readyState)) {
                callback.call(self);
            }
        };
        script.onerror = function() {
            script.onload = script.onreadystatechange = script.onerror = null;
            head.removeChild(script);
        };
        script.src = url;
        head.insertBefore(script, head.firstChild);
    },
    createElement: function(){
        if(this._emptyElement == null){
           this._emptyElement = document.createElement('div');
        }
        return this._emptyElement.cloneNode(true);
    },
    switchView: function(container, new_container){
        var transitionEnd = function(e){
            $(this).attr('style', '');
            this.removeEventListener('webkitTransitionEnd', transitionEnd, false);
            if($(this).attr('page-id')=='old-container'){
                $(this).hide();
            }
        },
        $container = $(container),
        content = container.parentNode,
        $new_container = $(new_container);
        $container.show();
        container.addEventListener('webkitTransitionEnd', transitionEnd, false);
        $container.attr("page-id", "old-container");
        $new_container.attr({"page-id": "container"});
        new_container.addEventListener("webkitTransitionEnd", transitionEnd, false);
        if(this._direction=='left'){
            $new_container.attr("style", "display:block;-webkit-transform: translate3d(100%, 0, 0);");
            var timer = setTimeout(function(){
            $container.attr("style", "display:block;-webkit-transition: all 0.3s ease-in-out; -webkit-transform: translate3d(-100%,0,0)");
            $new_container.attr("style", "display:block;-webkit-transition: all 0.3s ease-in-out; -webkit-transform: translate3d(0,0,0)");
            clearTimeout(timer);
            timer = null;
            },0)
        }else{
            $new_container.attr("style", "display:block;-webkit-transform: translate3d(-100%, 0, 0)");
            setTimeout(function(){
            $container.attr("style", "display:block;-webkit-transition: all 0.3s ease-in-out;-webkit-transform: translate3d(100%,0,0)");
            $new_container.attr("style", "display:block;-webkit-transition: all 0.3s ease-in-out; -webkit-transform: translate3d(0,0,0)");
            clearTimeout(timer);
            timer = null;
            },0)
        }
    },
    getContentContainer: function(){
        var container = $("#container")[0];
        if(!container){
            container = this.createElement();
            $(container).attr(container, "id", "container");
            $(container).attr(container, "class", "container");
            var content = $("#wrapper");
            content.appendChild(container);
        }
        return container;
    }
});
