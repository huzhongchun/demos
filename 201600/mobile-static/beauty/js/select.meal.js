define(['view'], function(view){
    var html = ['<div id="select-meal-wrapper">',
                    '<ul>',
                        '<li><span class="meal-list-title">套餐1产品名称</span><span class="meal-list-price">¥2323</span></li>',
                        '<li><span class="meal-list-title">套餐1产品名称</span><span class="meal-list-price">¥32323</span></li>',
                        '<li><span class="meal-list-title">套餐1产品名称</span><span class="meal-list-price">¥333</span></li>',
                        '<li><span class="meal-list-title">套餐1产品名称</span><span class="meal-list-price">¥3323</span></li>',
                    '</ul>',
                '</div>'
    ].join('');

    var context = null,
    getDealId = function(){
        $.ajax({
            type:'get',
            dataType:'json',
            data: data,
            url:'/dp/pay',
            success: function(res){

            },
            error: function(){

            }
        });

    };
    


    return Jumei.create(view,{
        onCreate: function(){
            var self = this;
            var data = {
                price: self.param.deal_id,
                num: self.param.price,
            }
            var tpl = Jumei.parseTpl(html,data);
            context = this;
            self.elem.html(tpl);
        },
        onEvent: function(){
            var self = this;
            this.events = {
                'click .submit-orders-btn': function (e) {
                    //location.href = "http://www.baidu.com";
                    submitFunction();
                },
                'click .zhi-fu-text': function(){
                    self.forward('#module=beauty&action=submit_orders');
                }
            };
        },
        onClose: function(){

        }
    });
});
