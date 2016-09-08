$(function() {
    var detail = Jumei.addModule('detail', {
        init: function() {
            this.initSlider();
            this.initEvent();
            this.initFixed();
            this.initImage();
            this.openByApp();
        },
        initImage: function() {
            $('.lazy-image').imglazyload();
        },
        initSlider: function() {
            var slider = Jumei.getModule('ui.slider');
            if($('#product-image-ul li').length > 1){
                new slider({
                    id: '#product-image-ul',
                });
            }
        },
        initEvent: function() {
            $('.start-buy').click(function() {
                Jumei.ja('weidian','weixin','startbuy');
                var attr = $(this).find('a').attr('jump');
                var sku = $('.attr-list-select').attr('sku');
                var stoct = $('.attr-list-select').attr('stoct');
                var status = $('#status').val();
                if (status === 'soldout') {
                    alert('亲，您来晚了，该商品已经售完！');
                    return false;
                } else if (status === 'expired') {
                    alert('亲，您来晚了，该商品已过期！');
                    return false;
                } else if (status === 'offshelf') {
                    alert('亲，您来晚了，该商品已下架！');
                    return false;
                }
                if (sku === undefined || $.trim(sku) === '') {
                    alert('sku不能为空,请您选择！');
                    $(window).scrollTo(350);
                    $('.product-attr-container').addClass('attr-container-select');
                    setTimeout(function() {
                        $('.product-attr-container').removeClass('attr-container-select');
                    }, 1000);
                } else if (stoct == '0' || stoct === '' || stoct === undefined) {
                    alert('亲，此商品已经售完!');
                } else {
                    location.href = attr + '&sku=' + sku;
                }
            });
            //属性选择
            $('.attr-list span').click(function() {
                if (!$(this).hasClass('attr-list-disable')) {
                    $('.attr-list-select').removeClass('attr-list-select');
                    $(this).addClass('attr-list-select');
                }
            });
            //收藏

            $('.header-btn span').highlight('collect-select');
            $('.collection-btn').click(function() {
                $('#shouchang').show();
            });
            $('#shouchang').click(function() {
                Jumei.ja('weidian','weixin','shouchang');
                $('#shouchang').hide();
            });
            $('.product-xinxi').on('click', function() {
                var $ul = $(this).find('ul');
                if ($(this).hasClass('product-attr-show')) {
                    $ul.hide();
                    $(this).removeClass('product-attr-show');
                } else {
                    $ul.show();
                    $(this).addClass('product-attr-show');
                }
            });
            
            $('.header-btn a').tap(function(){
                Jumei.ja('weidian','weixin','jinrudianup');
            });
            $('#jinru-weidian').tap(function(){
                Jumei.ja('weidian','weixin','jinrudianpudown');
            });
            $('#start-weidian').tap(function(){
                Jumei.ja('weidian','weixin','zenyangkaidian');
            });
            $('.goods-row-two-items').tap(function(){
                Jumei.ja('weidian','weixin','zenyangkaidian');
            });
        },
        initFixed: function() {
            var nav_sign = 1;
            $(window).scroll(function() {
                var top = $(window).scrollTop();
                if (top > 300) {
                    if (nav_sign === 1) {
                        setTimeout(function() {
                            $('.fix-btn').removeClass('fixedhide');
                            nav_sign = 0;
                        }, 100);
                    }
                } else {
                    if (nav_sign === 0) {
                        setTimeout(function() {
                            $('.fix-btn').addClass('fixedhide');
                            nav_sign = 1;
                        }, 100);
                    }
                }

            });
        },
        openByApp: function (argument) {
            var str = Jumei.getQueryString(location.href,'can_buy');
            if(str == 'false'){
                $('#header,.order-fix,.start-buy,.fix-btn,.product-tag,.baokuan,.comein-weidian').hide();
                $('#weixin-detail').css('padding-bottom','40px');
            }
        }
    });
    detail.init();
});
