$(function() {
        var baokuan = {
            init:function(){
                this.isIpadFunc();
                this.addEventListenerFunc();
                this.scrollChangeTabFunc();
            },
            addEventListenerFunc:function(){
                var self = this;
                self.order = 1;
                var tab = $('.tab-item');
                $('.img-lazy').imglazyload();
                tab.on('click',function(){
                    $('.selected').removeClass('selected');
                    $(this).addClass('selected');
                    self._fireScrollFunc($(this).attr('data-id'))
                });
                $('.module-items').on('click',function(){
                    Jumei.ja('baokuan','click','guanggaowei_'+$(this).attr('data-hashid'));
                })
                $('body').refresh({
                    callback:function(){
                        var _this = this;
                        $.ajax({
                            url:'/mobile/hot/ajaxGetHistory?page='+(++self.order),
                            type:'get',
                            dataType:'json',
                            success: function(data){
                                var tpl = '';
                                if(data.length > 0){
                                    for (var i = 0; i < data.length; i++) {
                                        var temp = data[i];
                                        tpl += '<a class="module-items fl" href="jumeimall://page/alldetail?itemid='+temp.hash_id+'&type='+temp.type+'" data-hashid="'+temp.hash_id+'">'+
                                                        '<div class="product-img-container">'+
                                                            '<img class="img-lazy product-img" src="'+temp.image[1]+'">'+
                                                            '<div class="tap-btn tab-btn-detail"></div>'+
                                                        '</div>'+
                                                    '</a>'
                                    };
                                    $('.history-boxs').append(tpl);
                                    _this.changeFlag();
                                }
                            },
                            error:function(){
                                alert("您的网络似乎有问题！");
                                _this.changeFlag();
                            },
                        })
                    }
                })
            },
            isIpadFunc:function(){
                var self = this;
                $('body').append('<div id="ipad-wrapper"></div>');
                if(navigator.userAgent.toLowerCase().indexOf('ipad') > -1){
                    var tempContent = $('.content').clone();
                    $('#ipad-wrapper').append(tempContent);
                    $('#ipad-wrapper').show();
                }
                else{
                    $('#wrapper').show();
                }
            },
            _slideUpFunc:function(height, old){
                if (height < old) {
                    for (var i = 500; i >= 0; i -= 5) {
                        (function() {
                            var pos = i;
                            setTimeout(function() {
                                if (pos <= 0) {
                                    window.scrollTo(0, height);
                                } else {
                                    window.scrollTo(0, old - (pos / 500 * (old - height)));
                                }
                            }, (pos));
                        })();
                    }
                } else {
                    for (var i = 0; i <= 500; i += 5) {
                        (function() {
                            var pos = i;
                            setTimeout(function() {
                                window.scrollTo(0, old + (pos / 500 * (height - old)));
                            }, (pos));
                        })();
                    }
                }
            },
            _fireScrollFunc : function(hashStr) {
                var self = this;
                var top = self._offsetFunc($('#' + hashStr)[0]).top;
                top = (top - 51) * Jumei.scale;
                var scrollHeight = $(window).scrollTop() * Jumei.scale;
                self._slideUpFunc(top, scrollHeight);
            },
            _offsetFunc : function(elem) {
                var left = 0,
                        top = 0,
                        _this = elem;
                while (_this.offsetParent) {
                    left += _this.offsetLeft;
                    top += _this.offsetTop;
                    _this = _this.offsetParent;
                }
                return {
                    "left": left,
                    "top": top
                }
            },
            scrollChangeTabFunc:function(){
                var self = this;
                //间隔点
                var interval_1 = self._offsetFunc($('#hrefid0')[0]).top;
                var interval_2 = self._offsetFunc($('#hrefid1')[0]).top;
                var interval_3 = self._offsetFunc($('#hrefid2')[0]).top;
                $(window).scroll(function(){
                    var curScroll = $(window).scrollTop();
                    if(curScroll <= interval_2){
                        $('.selected').removeClass('selected');
                        $($('.tab-item ')[0]).addClass('selected');
                    }
                    else if(curScroll > interval_2 && curScroll <= interval_3){
                        $('.selected').removeClass('selected');
                        $($('.tab-item ')[1]).addClass('selected');
                    }
                    if(curScroll > interval_3){
                        $('.selected').removeClass('selected');
                        $($('.tab-item ')[2]).addClass('selected');
                    }
                })
            }
        }
        baokuan.init();
    });