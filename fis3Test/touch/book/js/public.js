/**
 * Created by huzhongchun on 16/7/19.
 */
define(function (require) {
    /**
     * 设置微信的分享内容,为空则为默认内容
     * @param options
     * @returns {wxShareObject}
     */
    function setWxShareContent(options){
        var wxShare = require('widget/wxShare');
        var shareSetting = $.extend({
            title: '新世相图书馆',
            desc: '3000人和我一起找到的办法 ，怎么能保证治好你不读书的绝症？',
            image: 'http://resource.bj.taooo.cc/thefair/library/images/share_icon_2.png',
            link: location.origin+'/book/home/index',
        },options);
        var share = new wxShare({
            //分享给朋友
            shareAppMessageTitle: shareSetting.title,
            shareAppMessageDesc: shareSetting.desc,
            shareAppMessageLink: shareSetting.link,
            shareAppMessageImgUrl: shareSetting.image,
            shareAppMessageSuccessCallback: function(){},
            shareAppMessageCancelCallback: function(){},
            // 分享到朋友圈
            shareTimelineTitle: shareSetting.desc,
            shareTimelineLink: shareSetting.link,
            shareTimelineImgUrl: shareSetting.image,
            shareTimelineSuccessCallback: function(){},
            shareTimelineCancelCallback: function(){},
        });

        return share;
    }

    /**
     * loading
     * @type {{init: loading.init, show: loading.show, hide: loading.hide}}
     */
    var loading = {
        init: function () {
            var loadingBg = $('.public-loading-bg');
            if(loadingBg && loadingBg.length == 0){
                $('body').append('<div class="public-loading-bg"></div>');
            }
            var loadingBox  = $('.public-loading-box');
            if( loadingBox && loadingBox.length == 0){
                $('#scale-wrapper').append('<div class="public-loading-box"></div>');
            }
            return this;
        },
        show: function(){
            $('.public-loading-bg').show();
            $('.public-loading-box').show();
        },
        hide: function(){
            $('.public-loading-bg').hide();
            $('.public-loading-box').hide();
        }
    };

    /**
     * 初始化评论的评分
     */
    function initCommentStars() {
        $('.star-list').each(function(){
            var starsNumb = $(this).data().stars;
            var childStars = $(this).find('.star-icon');
            var idHalf = false;
            var g = Math.round(starsNumb);
            if(g > starsNumb){
                dHalf = false;
            }else if(g < starsNumb){
                g++;
                idHalf = true;
            }else if(g == starsNumb){
                dHalf = false;
            }
            //正好4.5
            if(starsNumb * 10 % 10 == 5){
                idHalf = true;
            }
            for (var i = 0; i < g; i++) {
                if(idHalf && i == g -1){
                    $(childStars[i]).addClass('half');
                }else{
                    $(childStars[i]).addClass('active');
                }
            }
        });
    }

    /**
     * 隐私设置的弹窗
     * @type {{init: settingDialog.init}}
     */
    var settingDialog = {
        init: function(options){
            var _this = this;
            this.settings = $.extend({
                autoShow: false,
                content: '',
                height: ''
            },options);
            var opt = this.settings;
            opt.autoShow ? $('.set-dialog-bg').addClass('auto-show') : '';
            $('.set-dialog-bg').on('touchmove',function (e) {
                e.preventDefault();
            });
            //实际渲染出来的高度
            var venderH = $('.set-dialog-container').height();
            var winH = $(window).height();
            if(venderH > winH){
                venderH = winH;
            }
            $('.set-dialog-container').css({
                height: (opt.height ? opt.height+'px' : venderH+'px'),
                overflow: venderH >= winH ? 'scroll':'hidden'
            });
            if(opt.autoShow)
                _this._setDialogContainerTransform(0,0,0);
            else
                _this._setDialogContainerTransform(0,venderH+20+'px',0);

            _this.initEvent();
        },
        initEvent: function(){
            $('.set-dialog-container').on('click','.radio-label',function () {
                var parent = $(this).parent('.radio-select-box');
                parent.find('.selected').removeClass('selected');
                $(this).addClass('selected');

                if($(this).find('input').attr('name') == 'wechat'){
                    var wechatSet = $('input[name="wechat"]:checked').val();
                    if(wechatSet == 'yes'){
                        $('.sms-setting').hide();
                        $('.wechat-input-setting').show();
                    }else{
                        $('.sms-setting').show();
                        $('.wechat-input-setting').hide();
                    }
                }
            });

            $('.set-dialog-container .submit-btn').on('click',function () {
                var wechatSet = $('input[name="wechat"]:checked').val();
                var smsSet = $('input[name="sms"]:checked').val();
                if(wechatSet == 'yes'){
                    var wechat = $('.wechat-input').val().trim();
                    if(!wechat){
                        alert('请填写微信号');
                        return false;
                    }
                    //如果统一微信,则默认统一短信接收
                    smsSet = '';
                }

                $.ajax({
                    url: '/book/user/set_user_setting',
                    type: 'post',
                    data: {status: wechatSet ,wechat : wechat, sms_status : smsSet},
                    dataType : 'json',
                    success: function (data) {
                        if(data.code == 0){
                            alert('设置成功!');
                            location.reload();
                        }else{
                            alert(data.message.text);
                        }
                    },
                    error: function (e) {
                        var errorObj = JSON.parse(e.responseText);
                        alert(errorObj.message.text);
                    }
                })

            });
        },
        show: function (data) {
            var _this = this;
            $('.set-dialog-bg').show();
            _this._setDialogContainerTransform(0,0,0);

            if(data && data.wechat && data.wechat.status) {
                var status = data.wechat.status == 'yes' ? 'yes' : 'no';
                $('input[name="sms"]').removeAttr('checked');
                $('.wechat-setting .selected').removeClass('selected');
                $('.wechat-setting input[value="' + status + '"]').attr('checked','checked').parents('.radio-label').addClass('selected');
                if(data.wechat.status == 'no'){
                    $('.sms-setting').show();
                    $('.wechat-input-setting').hide();
                }else{
                    $('.sms-setting').hide();
                    $('.wechat-input-setting').show();
                }
            }
            if(data && data.sms && data.sms.status){
                var status = data.sms.status == 'yes' ? 'yes' : 'no';
                $('input[name="sms"]').removeAttr('checked');
                $('.sms-setting .selected').removeClass('selected');
                $('.sms-setting input[value="' + status + '"]').attr('checked','checked').parents('.radio-label').addClass('selected');
            }
            if(data  && data.wechat && data.wechat.id){
                $('.set-dialog-container .wechat-input').val(data.wechat.id)
            }

        },
        hide: function () {
            var _this = this;
            var h = $('.set-dialog-container').height();
            $('.set-dialog-bg').hide();
            _this._setDialogContainerTransform(0,h+20,0);
        },
        _setDialogContainerTransform: function (x,y,z) {
            var _x = x ? x :0;
            var _y = y ? y :0;
            var _z = z ? z :0;
            $('.set-dialog-container').css({
                'transform': 'translate3d('+_x+'px,'+_y+'px,'+_z+'px)',
                '-moz-transform': 'translate3d('+_x+'px,'+_y+'px,'+_z+'px)',
                '-webkit-transform': 'translate3d('+_x+'px,'+_y+'px,'+_z+'px)'
            });
        }
    };

    return {
        setWxShareContent: setWxShareContent,
        loading: loading,
        initCommentStars: initCommentStars,
        settingDialog: settingDialog
    }
});