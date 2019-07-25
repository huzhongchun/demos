define(['view'], function(view){
    var test = '<div id="test-name">ceshiahaha</div>';
    return Jumei.create(view,{
        onCreate: function(){
            this.a = {test:'name',aaa:'test'}
            this.elem.html('我是测试test');
            this.elem.append(test);
        },
        onEvent: function(){
            this.events = {
                'click #test-name': function (e) {
                    // this.forward('list');
                    alert('test');
                },
                'click .icon_home': function () {
                    window.location = '../index.html';
                    } 
                };
        },
        onClose: function(){

        }
    });
});
