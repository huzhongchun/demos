define(['view','text!demo/turntabletpl.html'], function(view, share){

    return Jumei.create(view,{
        onEvent: function(){
            this.events = {
            }
        },
        onCreate: function(){
            context = this;
            this.elem.html(share);
            this.demo();
            $('#back').show();
        },
        //demo的例子
        demo: function(){
            var turntableData = {
                '10': {
                    'area': [1,3],
                    'message': '满100减10元现金券'
                },
                '40': {
                    'area': [2,5],
                    'message': '满300减40元现金券'
                },
                '70': {
                    'area': [4,7],
                    'message': '满500减70元现金券'
                },
                '0': {
                    'area': [6],
                    'message': '很遗憾哦~'
                }
            }
            var turntableClass = Jumei.getModule('ui.turntable');
            var $pluginArea = new turntableClass({
                img: 'http://images.jumei.com/mobile/act/activities/2014_12/1219_queren/zhuanpan2.png',
                arrowImg:  'http://images.jumei.com/mobile/act/activities/2014_12/1219_queren/arrow.png',
                arrowHeight: 155,
                arrowWidth: 109,
                random: false,
                prizeArea: turntableData,
                element:'.dazhuanpan',
                success: function(data, rewardinfo) {
                    console.dir(data);
                    console.dir(rewardinfo);
                    console.dir(turntableData[data].message);
                }
            });
            $('#turntable .turntable-btn').on('click',function(e){
                $pluginArea.startRotate('0', 'zhong');
            });
            
            $('#turntable .change-btn').on('click',function(e){
                $('#turntable-text').toggleClass('height0');
            })
        },
        setTitle: function(){
            this.title('大转盘组件');
        }
    });
});