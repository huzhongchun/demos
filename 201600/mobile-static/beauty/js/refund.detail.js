define(['view'], function(view){
    var html = ['<div id="refund-detail-wrapper">',
                    '<div class="common-list refund-all-detail">',
                        '<div class="common-content">',
                             '<ul id="refund-struct-txt">',
                                 '<li><span class="refund-content-title">退款金额</span><span class="refund-maney-value">356</span></li>',
                                 '<li><span class="refund-content-title">数量</span><span>2</span></li>',
                                 '<li><span class="refund-content-title">团购券</span><span>3322323243434,232323232356</span></li>',
                                 '<li><span class="refund-content-title">退回账户</span><span>银行账户</span></li>',
                             '</ul>',
                        '</div>',
                    '</div>',
                    '<div class="common-list refund-product-desc">',
                        '<div class="common-header refund-product-title">退款流程<span class="refund-help">退款帮助</span></div>',
                        '<div class="common-content">',
                             '<ul>',
                                 '<li class="item-select">',
                                     '<span class="refund-product-num">1</span>',
                                     '<div class="refund-item">退款申请已受理</div>',
                                     '<div class="refund-item-txt">您的退款申请已经受理，点评将在1-2个工作日进行审核。</div>',
                                 '</li>',
                                 '<li>',
                                     '<span class="refund-product-num">2</span>',
                                     '<div class="refund-item">点评审核通过</div>',
                                     '<div class="refund-item-txt">您的退款申请已提交至微信。微信将在1个工作日内处理您的申请。</div>',
                                 '</li>',
                                 '<li>',
                                     '<span class="refund-product-num">3</span>',
                                     '<div class="refund-item">退款成功</div>',
                                     '<div class="refund-item-txt"><span>13.8</span>元退款已成功，预计在3-5个工作日内退至您的付款账户，请注意查收。</div>',
                                 '</li>',
                             '</ul>',
                        '</div>',
                    '</div>',
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
