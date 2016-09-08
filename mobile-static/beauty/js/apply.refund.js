define(['view'], function(view){
    var html = ['<div id="submit-orders-wrapper">',
                    '<div class="orders-list-content">',
                        '<div class="submit-orders-list">',
                            '<div class="orders-title">',
                                 '<div>Mooring生活馆美甲套餐1次</div>',
                                 '<div class="refund-titl-detail">该订单剩余<span>2</span>张可用团购券，请选择退回数量</div>',
                            '</div>',
                            '<div class="orders-detail">',
                                '<div class="product-num">',
                                    '<span class="product-label">数量</span>',
                                    '<span class="product-num-control fr">',
                                        '<span class="sub-num"></span>',
                                        '<input type="text" value="1"/>',
                                        '<span class="add-num"></span>',
                                    '</span>',
                                '</div>',
                                '<div class="line"></div>',
                                '<div class="total-price">',
                                    '<span class="product-label">可退金额</span>',
                                    '<span class="fr total-price-value">¥198</span>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="common-list refund-fangshi">',
                        '<div class="common-header">退款方式</div>',
                        '<div class="common-content refund-content-txt">',
                            '<div class="refund-struct-title">原路退回</div>',
                            '<div class="refund-struct">3-10个工作日完成,暂不收手续费</div>',
                        '</div>',
                    '</div>',
                    '<div class="bottom-fixed"><div class="submit-orders-btn">申请退款</div></div>',
                '</div>'
    ].join('');

    return Jumei.create(view,{
        onCreate: function(){
            this.elem.html(html);
        },
        onEvent: function(){
            var self = this;
            this.events = {
                'click .submit-orders-btn': function (e) {
                    self.forward('#module=beauty&action=conform_orders');
                }
            }
        },
        onClose: function(){

        }
    });
});
