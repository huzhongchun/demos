define(['view'], function(view){
    var html = ['<div id="submit-orders-wrapper">',
                    '<div class="orders-list-content">',
                        '<div class="submit-orders-list">',
                            '<div class="orders-title"><%=title%></div>',
                            '<div class="orders-detail">',
                                '<div class="product-price">',
                                    '<span class="product-label">单价</span>',
                                    '<span class="product-price-value fr">¥<%=price%></span>',
                                '</div>',
                                '<div class="line"></div>',
                                '<div class="product-num">',
                                    '<span class="product-label">数量</span>',
                                    '<span class="product-num-control fr">',
                                        '<span class="sub-num"></span>',
                                        '<input type="text" id="quantity" readonly="readonly" value="1"/>',
                                        '<span class="add-num"></span>',
                                    '</span>',
                                '</div>',
                                '<div class="line"></div>',
                                '<div class="total-price">',
                                    '<span class="product-label">总价</span>',
                                    '<span class="fr total-price-value">¥<span><%=price%></span></span>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="orders-user-info">',
                        '<div class="user-info-list">',
                            '<span class="user-info-label">手机号</span>',
                            '<input type="tell" class="user-phone" placeholder="填写手机号码"/>',
                            '<span class="get-code">获取验证码</span>',
                        '</div>',
                        '<div class="line"></div>',
                        '<div class="user-info-list">',
                            '<span class="user-info-label">验证码</span>',
                            '<input type="tell" class="user-ok-code" placeholder="填写短信验证码"/>',
                        '</div>',
                    '</div>',
                    '<div class="orders-tag">',
                        '<% if(required != "1"){ %>',
                        '<span class="mian-yu-yue">免预约</span>',
                        '<% } %>',
                        '<span class="wei-xiao-fei">未消费退款</span>',
                        '<span class="guo-qi">过期自动退款</span>',
                    '</div>',
                    '<div class="bottom-fixed" style="position:absolute;bottom:0px;"><div class="submit-orders-btn">提交订单</div></div>',
                '</div>',
    ].join('');



    
    var context = null,
    dialog = function(title){
        window.scrollTo(0,0);
        if(context.hasCurrentView()){ 
            $('#wrapper').dialog({
               //默认弹出框宽度
               width: 260,
               height: 200,
               //传进来显示的html
               content: title,
               //弹出框title
               title: "", //弹出框的title
               //显示一个按钮还是两个
               type: 1,
               init: function(){
               },
               //按钮文字
               ok: '我知道了',
               cancel: '取消',
               successCallback:function(){
                   //$('.change-city').trigger('click');
                   $('#header').css('position','fixed !important');
                   window.scrollTo(0,0);
               },
           });
        }
    },
    validatePhone = function(){
        var phone = $('.user-phone').val();
        if(phone == ''){
            dialog('<div class="dialog-alert">请输入手机号码！</div>')
            return false;
        }else if (!/^\d{11}$/g.test(phone)) {
            dialog('<div class="dialog-alert">请输入正确的手机号码！</div>')
            return false;
        }else{
            return true;
        }
    },
    getCode = function(_this){
        var phone = $('.user-phone').val();
        $.ajax({
            type:'get',
            dataType:'json',
            data: {phone:phone},
            url:'/dp/sendCaptcha',
            success: function(res){
                if(res.status == 1){
                    dialog('<div class="dialog-alert">短信验证码已发送到您的手机，<br/>请稍侯...</div>');
                    countDown(_this);
                }else{
                    dialog('<div class="dialog-alert">'+res.message+'</div>');
                }
            },
            error: function(){

            }
        });
    },
    timer = null,
    countDown = function(_this){
        var num = 60;
        clearInterval(timer);
        timer = setInterval(function(){
            --num;
            $(_this).html(num+'s后重发');
            if(num<0){
                clearInterval(timer);
                $(_this).html('获取验证码');
            }
        },1000);
    },
    confirmCode = function(callback){
        var phone = $('.user-phone').val();
        var code = $('.user-ok-code').val().trim();
        if(code == ''){
            dialog('<div class="dialog-alert">请输入正确的验证码！</div>');
            return;
        }
        $.ajax({
            type:'get',
            dataType:'json',
            data: {phone:phone,code:code},
            url:'/dp/checkCaptcha',
            success: function(res){
                if(res.status == 1){
                    callback && callback.call(context);
                }else{
                     dialog('<div class="dialog-alert">短信验证码错误！</div>')
                }
            },
            error: function(){

            }
        });
    }



    return Jumei.create(view,{

        onCreate: function(){
            var self = this;
            var data = {
                price: self.param.price,
                title: self.param.title,
                required: self.param.required
            }
            var tpl = Jumei.parseTpl(html,data);
            context = this;
            self.elem.html(tpl);
            $('#beauty_submit_orders .orders-title').subStr(35);
            $('.user-phone').blur(function(){
                //window.scrollTo(0,0);
            });
            //fix input bug
            $('.user-phone').focus(function(){
                $('#header').css('position','absolute !important');
            });
            $('.user-ok-code').focus(function(){
                $('#header').css('position','absolute !important');
            })
            $('#back').on('tap',function(){
                $('#header').css('position','fixed !important');
            });
            $('#home').on('tap',function(){
                $('#header').css('position','fixed !important');
            });
            $('#submit-orders-wrapper').css({'height':context.height+'px','position':'relative'});
            
        },
        setTitle: function(){
            this.title('提交订单');
        },
        onRefresh: function(){
            this.setTitle();
        },
        onEvent: function(){
            var self = this;
            this.events = {
               // 'click .submit-orders-btn': function (e) {
               //     self.forward('#module=beauty&action=conform_orders');
               // },
                'click .add-num': function(){
                        var num = $('#quantity').val();
                        var total = 0;
                        if(context.param.limit > 0){
                            num = parseInt(num) + 1;
                            if(num > context.param.limit){
                                return;
                            }
                        }else{
                            num = parseInt(num) + 1;
                        }
                        $('#quantity').val(num);
                        $('.sub-num').addClass('sub-num-select');
                        if(/\d*\.\d*/.test(self.param.price)){
                            total = (num * self.param.price).toFixed(2);
                        }else{
                            total = num * self.param.price;
                        }
                        $('.total-price-value span').html(total);
                },
                'click .sub-num': function(){
                    var num = $('#quantity').val();
                    var total = 0;
                    if(num > 1){
                        num = parseInt(num) - 1;
                        $('#quantity').val(num);
                        if(/\d*\.\d*/.test(self.param.price)){
                            total = (num * self.param.price).toFixed(2);
                        }else{
                            total = num * self.param.price;
                        }
                        $('.total-price-value span').html(total);
                        if(num <= 1){
                             $(this).removeClass('sub-num-select');
                        }
                    }
                },
                'click .submit-orders-btn': function(){
                    if(validatePhone()){
                        confirmCode(function(){
                            $('#header').css('position','fixed !important');
                            self.forward('#module=beauty&action=conform_orders&deal_id='+self.param.deal_id+'&categories='+context.param.categories+'&price='+self.param.price+'&total_price='+ $('.total-price-value span').html()+'&phone='+$('.user-phone').val()+'&num='+$('#quantity').val()+'&title='+ context.param.title+'&image_url=' + context.param.image_url+'&dealgroupid=' + context.param.dealgroupid);
                        });
                    }
                    Jumei.ja('dpevent','submitorder');
                },
                'click .get-code': function(){
                    if(validatePhone()){
                        getCode(this);
                    }
                },
                'change #quantity': function(){
                    var num = $(this).val();
                    $('.total-price-value span').html(num * self.param.price);
                    if(num <= 1){
                        $('.sub-num').removeClass('sub-num-select');
                    }else{
                        $('.sub-num').addClass('sub-num-select');
                    }
                }

            }
        },
        onClose: function(){

        },
        onRefresh: function(){
            clearInterval(timer);
            $('.get-code').html('获取验证码');
        }
    });
});
