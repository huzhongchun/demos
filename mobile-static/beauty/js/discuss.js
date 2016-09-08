define(['view'], function(view){
    var html = ['<div id="discuss-wrapper">',
                    '<div id="discuss-title">共有18个消费评价</div>',
                    '<div id="discuss-content">',
                        '<ul>',
                            '<li>',
                                '<div class="discuss-txt-title">',
                                    '<span class="discuss-user">某**某</span>',
                                    '<span class="discuss-time">2014-09-01</span>',
                                    '<span class="discuss-type">很好</span>',
                                '</div>',
                                '<div class="discuss-txt">阿打算发斯蒂芬阿斯顿发斯蒂芬</div>',
                            '</li>',
                            '<li>',
                                '<div class="discuss-txt-title">',
                                    '<span class="discuss-user">某**某</span>',
                                    '<span class="discuss-time">2014-09-01</span>',
                                    '<span class="discuss-type">很好</span>',
                                '</div>',
                                '<div class="discuss-txt">阿打算发斯蒂芬阿斯顿发斯蒂芬</div>',
                            '</li>',
                            '<li>',
                                '<div class="discuss-txt-title">',
                                    '<span class="discuss-user">某**某</span>',
                                    '<span class="discuss-time">2014-09-01</span>',
                                    '<span class="discuss-type">很好</span>',
                                '</div>',
                                '<div class="discuss-txt">阿打算发斯蒂芬阿斯顿发斯蒂芬</div>',
                            '</li>',
                            '<li>',
                                '<div class="discuss-txt-title">',
                                    '<span class="discuss-user">某**某</span>',
                                    '<span class="discuss-time">2014-09-01</span>',
                                    '<span class="discuss-type">很好</span>',
                                '</div>',
                                '<div class="discuss-txt">阿打算发斯蒂芬阿斯顿发斯蒂芬</div>',
                            '</li>',
                            '<li>',
                                '<div class="discuss-txt-title">',
                                    '<span class="discuss-user">某**某</span>',
                                    '<span class="discuss-time">2014-09-01</span>',
                                    '<span class="discuss-type">很好</span>',
                                '</div>',
                                '<div class="discuss-txt">阿打算发斯蒂芬阿斯顿发斯蒂芬</div>',
                            '</li>',
                            '<li>',
                                '<div class="discuss-txt-title">',
                                    '<span class="discuss-user">某**某</span>',
                                    '<span class="discuss-time">2014-09-01</span>',
                                    '<span class="discuss-type">很好</span>',
                                '</div>',
                                '<div class="discuss-txt">阿打算发斯蒂芬阿斯顿发斯蒂芬</div>',
                            '</li>',
                        '</ul>',
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
                    self.forward('#module=beauty&action=buy_success');
                }
            };
        },
        onClose: function(){

        }
    });
});
