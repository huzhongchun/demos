                   (function($) {
    $.fn.beatBee = function(options) {
        var me = this;
        var defaults = {
            number: 8, //蜜蜂的数量
            speed: 150, //蜜蜂出现的速度
            show: 350, //每个蜜蜂展示的时间
            successNum: 5, //游戏成功需要打死的蜜蜂数
            success: function() {

            }						//回调函数
        };
        var opts = $.extend(defaults, options);
        opts.show = opts.show + 500;

        var bees = [];				//记录蜜蜂的数组
        var dieBee = 0;				//标记已死亡蜜蜂数量
        var honeycombs = [];		//记录蜜蜂洞的数组
        var gameHtml =
                '<div class="bee-game-area">' +
                '<div class="bee-game-score-box">' +
                '<span class="bee-game-score-finish">0</span>' +
                '<span class="bee-game-score-goal">/10</span>' +
                '</div>' +
                '<div style="clear:both;">' + '</div>' +
                '</div><div class="z301 bee-hack"></div>';
        var honeycombHtml =
                '<div class="honeycomb">' +
                '<div class="honeycomb-bg">' +
                '</div>' +
                '<div class="honeycomb-bottom">' +
                '</div>' +
                '<div class="bee">' +
                '</div>' +
                '</div>';

        //生成游戏主界面
        $(me).html(gameHtml);
        for (var i = 0; i < opts.number; i++) {
            var honeycombEl = $(honeycombHtml);
            $('.bee-game-area').prepend(honeycombEl);
            var bee = $(honeycombEl).find('.bee');
            if (i < 4) {
                honeycombEl.addClass('z301');
            } else {
                honeycombEl.addClass('z300');
            }
            bees.push(bee);
            honeycombs.push(honeycombEl);
        };




        // $('.bee').each(function(){
        //     this.addEventListener('webkitTransitionEnd', function() {
        //         var transForm = $(this).css('-webkit-transform');
        //         var reg = /\-?[0-9]+\.?[0-9]*/g;
        //         var arr = transForm.match(reg);
        //         if(arr[5]==60){
        //             $(this).removeClass('active');
        //         }
        //     });
        // });

        var activeBeeArr = [];
        //设置计时器，定期创建蜜蜂
        var creatBee = setInterval(function() {

            activeBeeArr = [];
            bees.forEach(function(v) {
                if (!v.hasClass('active')) {
                    activeBeeArr.push(v);
            }
            });


            var hole = Math.floor(0 + Math.random() * (activeBeeArr.length));
            var activeBee = activeBeeArr[hole];
            if(activeBee){
                var $activeBee = $(activeBee[0]);
            $activeBee.removeClass('die');
            $activeBee.addClass('active');
            $activeBee.addClass('up');
            setTimeout(function() {
                $activeBee.removeClass('up');
                setTimeout(function(){
                  $activeBee.removeClass('active');
                },500)
            }, opts.show);
         }

        }, opts.speed);




        //添加蜜蜂的点击事件
        $('.honeycomb').on('tap', function() {
            var me = $(this).find('.bee');
            if (!$(me).hasClass('die')) {
              var transForm = $(me).css('-webkit-transform');
              var reg = /\-?[0-9]+\.?[0-9]*/g;
              var arr = transForm.match(reg);
                if (arr[5] < -10) {
                  $(me)[0].style.webkitTransform = transForm;
                  $(me).addClass('die');
                  setTimeout(function() {
                      $(me)[0].style.removeProperty('-webkit-transform');
                      $(me).removeClass('up');
                      setTimeout(function(){
                        $(me).removeClass('active');
                      },500)
                    }, 300);

                  dieBee++;
                  $('.bee-game-score-finish').html(dieBee);
              }
              if (dieBee > 9) {
                  setTimeout(function() {
                      opts.success();
                      $('.bee').remove();
                      clearInterval(creatBee);
                  }, 100);
              }
           }

        });
    }
}
)(Zepto);