(function() {
    window.requestAnimFrame = (function(){ 
        return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.msRequestAnimationFrame || 
        function(/* function */ callback, /* DOMElement */ element){ 
        window.setTimeout(callback, 1000 / 60); 
        }; 
    })(); 

    var energyBar = function(option) {
        this.staticBase = option.staticBase;
        this.wrapper = option.wrapper;
        this.heightAdd = option.heightAdd || 10;
        this.declineRate = option.declineRate || 10;
        this.success = option.success || function() {
        }
    };

    energyBar.prototype = {
        _height: 0,
        _timer: null,
        _create: function() {
            this._tpl = '<div id="flash-lightning-container"><div id="flash-lightning">'
                                + '<img class="flash-lightning-img" src="' + this.staticBase + 'image/widget/energy/energy_flash.png"/>'
                                + '<div class="flash-lamp"></div>'
                                + '<div class="energy-bg"></div>'
                                + '<div class="energy-name"></div>'
                        + '</div></div>'
                        + '<div class="energy-bottom">'
                             + '<img src="' + this.staticBase + 'image/widget/energy/girl.png" class="energy-bottom-girl"/>'
                             + '<div class="energy-btn-container"><div class="energy-btn-start"><div class="btn-battery"><div class="battery-image"></div><div class="battery-image"></div><div class="battery-image"></div><div class="battery-image"></div><div class="battery-image"></div></div></div></div>'
                             + '<span class="energy-txt">狂点按钮充能量</span>'
                        + '</div>';
            $(this.wrapper).html(this._tpl);
            this._decline();
            this._initEvent();
            this._showBar();
            this._initAnimateBtn();
        },
        _decline: function() {
            var self = this;
            self._timer = setInterval(function() {
                if ((self._height >= 1) && (self._height < 116)) {
                    self._height = self._height - 4;
                } else if (self._height >= 116) {
                    clearInterval(self._timer);
                    self.success();
                }

                //    self._showBar();
            }, 1000 / self.declineRate);
        },
        _showBar: function() {
            var self = this;
            var requestAnimFrame = window.requestAnimFrame;
            var $energyName = $('.energy-name');
            var $btnBattery = $('.btn-battery');
            var index = 116/5;
            function battery(){
                var num = Math.floor(self._height/index);
                var str = '';
                for(var i = 0; i< num; i++){
                    str += '<div class="battery-image"></div>';
                }
                $btnBattery.html(str);
            }
            
            function animate() {
                $energyName.height(self._height);
                requestAnimFrame(animate);
                battery();
            }
            animate();
        },
        _initAnimateBtn: function(){
            var $energyBtn = $('.energy-btn-start');
            this._btnTimer = setInterval(function(){
                $energyBtn.toggleClass('energy-btn-press');
            },100);
        },
        _initEvent: function() {
            var self = this;
            var $energyBtn = $('.energy-btn-start'),$flashLamp = $('.flash-lamp');
         //   $energyBtn.highlight('energy-btn-press');
            $energyBtn.on('tap', function(event) {
                $energyBtn.addClass('energy-btn-press');
                $flashLamp.toggleClass("flash-lamp-on");
                setTimeout(function(){$energyBtn.removeClass('energy-btn-press');},50);
                clearInterval(self._btnTimer);
                event.preventDefault()
                if (self._height < 116) {
                   // console.dir(self._height);
                    self._height = self._height + self.heightAdd;
                }
                //  self._showBar();
            });
        }
    };


    var old = $.fn.energyBar;

    $.fn.energyBar = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('energyBar')
            if (!data)
                $this.data('energyBar', (data = new energyBar(option)))

            data._create();
            if (typeof option == 'string')
                data[option].call($this)
        })
    }
    $.fn.energyBar.Constructor = energyBar;
    $.fn.energyBar.noConflict = function() {
        $.fn.energyBar = old
        return this
    }
})(Zepto);