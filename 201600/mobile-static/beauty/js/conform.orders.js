define(['view'], function(view){
    var html = ['<div id="conform-orders-wrapper">',
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
                                    '<span class="product-num-value fr"><%=num%></span>',
                                    '</span>',
                                '</div>',
                                '<div class="line"></div>',
                                '<div class="total-price">',
                                    '<span class="product-label">总价</span>',
                                    '<span class="fr total-price-value">¥<%=total_price%></span>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="pay-type">',
                        '<span class="zhi-fu-bao"></span>',
                        '<div class="zhi-fu-text"><div>支付宝支付</div><div class="zhi-fu-tuiijan">推荐支付宝用户使用</div></div>',
                    '</div>',
                    '<div class="bottom-fixed"><div class="submit-orders-btn">确认支付</div></div>',
                '</div>'
    ].join('');

    var context = null,
    submitFunction = function(){
        var platform = $.os.iphone 
        if($.os.iphone){
            platform = 'iphone';
        }else if($.os.android){
            platform = 'android';
        }else{
            platform = 'other';
        }

        var data = {
            phone: context.param.phone,
            city: window.citysEn[context.controller.getStoryItem('liren_city')],
            deal_id: context.param.deal_id,
            quantity: context.param.num,
            total_amount: context.param.total_price,
            platform: platform,
            title: context.param.title,
            image_url: context.param.image_url,
            deal_group_id: context.param.dealgroupid,
            categories: context.param.categories
        }

       // var data = {
       //     phone:context.param.phone,
       //     city:window.citysEn[context.controller.getStoryItem('liren_city')],
       //     deal_id: 2332069,
       //     quantity: 1,
       //     total_amount:0.01,
       //     platform:platform,
       //     title: context.param.title,
       //     image_url: context.param.image_url,
       //     dealgroupid: context.param.dealgroupid
       // }
        $.ajax({
            type:'get',
            dataType:'json',
            data: data,
            url:'/dp/pay',
            success: function(res){
                if(res.resultCode && res.resultCode > 1){
                    context.href(res.redirectURL);
                }else if(res.resultCode == 1){
                    dialog('<div class="dialog-alert">提交成功！</div>')
                }else{
                    dialog('<div class="dialog-alert">'+res.resultMsg+'</div>')
                }
                //self.forward('#module=beauty&action=conform_orders');
            },
            error: function(){

            }
        });

    },
    initCitys = function(callback){
        if(!window.citysEn){
             var getCityFlag = true,
             toChangeCity = function(obj){
                 window.citys = {};
                 window.citysEn = {};
                 for(var i in obj){
                     if(obj.hasOwnProperty(i)){
                        for(var z = 0; z < obj[i].length; z++){
                            window.citys[obj[i][z].city_name] = obj[i][z].districts;
                            window.citysEn[obj[i][z].city_name] = obj[i][z].enname;
                        }
                     }
                 }
             },
             getCitys = function( callback ){
                 if(getCityFlag){
                     getCityFlag = false;
                     $('#wrapper').loadding();
                     $.ajax({
                         type:'get',
                         dataType:'json',
                         url:'/dp/getCities',
                         success: function(res){
                             getCityFlag = true;
                             $('#wrapper').loadding('close');
                             if(res){
                                 toChangeCity(res);
                                 callback && callback.call(context);
                             }
                         },
                         error: function(){
                             getCityFlag = true;
                         }
                     });
                 }
             }
             getCitys(callback);
        }else{
            callback && callback.call(context);
        }
    },
    dialog = function(title){
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
                ok: '确定',
                cancel: '取消',
                successCallback:function(){
                    //$('.change-city').trigger('click');
                },
            });
        }
    }
    


    return Jumei.create(view,{
        onCreate: function(){
            var self = this;
            var data = {
                price: self.param.price,
                num: self.param.num,
                total_price: self.param.total_price,
                phone: self.param.phone,
                image_url: self.param.image_url,
                dealgroupid: self.param.dealgroupid,
                title: self.param.title
            }
            var tpl = Jumei.parseTpl(html,data);
            context = this;
            initCitys(function(){
                self.elem.html(tpl);
                $('#beauty_conform_orders .orders-title').subStr(35);
            });
        },
        setTitle: function(){
            this.title('确认订单');
        },
        onRefresh: function(){
            this.setTitle();
        },
        onEvent: function(){
            var self = this;
            this.events = {
                'click .submit-orders-btn': function (e) {
                    //location.href = "http://www.baidu.com";
                    Jumei.ja('dpevent','confirmorder');
                    submitFunction();
                },
            };
        },
        onClose: function(){

        }
    });
});
