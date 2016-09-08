/**
 * Created by huzhongchun on 16/6/12.
 */

require(['widget/jsbridge'],function(jsb){
    var _month = null, _year = null, _selectedArray = [], _jsb = jsb, _block = false;
    var _collectionId = $('#collection_id').val();
    /**
     * 打开客户端toolbar
     */
    if(_jsb.toolbar){
        _jsb.toolbar.setShare('hidden');
    }

    /**
     * 初始化日历
     */
    function initCalendar(){
        if(_month < 0 || !_year){
            _month = (new Date()).getMonth()+1;
            _year = (new Date()).getFullYear();
        }
        ajaxGetTalkList();
        addEventListener();
    }

    /**
     * 渲染日历
     * @param len
     */
    function vendorCalendar(selectArray) {
        var selectArray = selectArray? selectArray : [];
        var len = getMonthTotalDays(_year,_month);
        if(len) {
            $('.calendar-box').html('');
            for (var i = 1; i <= len; i++) {
                var activeClass = '', href='';
                for(var j = 0;j <selectArray.length;j++){
                    if(selectArray[j].day == i){
                        activeClass = 'active';
                        href = selectArray[j].url;
                        break;
                    }
                }
                $('.calendar-box').append('<span class="day-item"><a class="day-numb '+activeClass+'" href="'+(href ? href :'javascript:void(0);')+'">'+i+'</a></span>');
            };
            var monthText = getMonthCnText(_month)+'月';
            $('.date-info .month').html(monthText);
            $('.date-info .year').html(_year);

            if(len >= 31){
                $('.calendar-box').addClass('long');
            }else{
                $('.calendar-box').removeClass('long');
            }
        }
    }

    /**
     * 获取中文的月份
     * @param month
     * @returns {*}
     */
    function getMonthCnText(month){
        month = month -1;
        switch(month){
            case 0 :
                return '一';
                break;
            case 1 :
                return '二';
                break;
            case 2 :
                return '三';
                break;
            case 3 :
                return '四';
                break;
            case 4 :
                return '五';
                break;
            case 5 :
                return '六';
                break;
            case 6 :
                return '七';
                break;
            case 7 :
                return '八';
                break;
            case 8 :
                return '九';
                break;
            case 9 :
                return '十';
                break;
            case 10 :
                return '十一';
                break;
            case 11 :
                return '十二';
                break;
        }
    }

    /**
     * 获取月份对应的总天数
     * @param year
     * @param month
     * @returns {*}
     */
    function getMonthTotalDays(year, month) {
        if(year && month >= 0){
            return (new Date(year,month,0)).getDate();
        }else{
            return null
        }
    }

    /**
     * 绑定事件
     */
    function addEventListener() {
        $('.calendar-area .prev-month-btn').on('click',function(){
            _month = _month - 1;
            if(_month < 0){
                _year--;
                _month = 11;
            }
            ajaxGetTalkList();
        });
        $('.calendar-area .next-month-btn').on('click',function(){
            _month = _month + 1;
            if(_month >= 12){
                _year++;
                _month = 0;
            }
            ajaxGetTalkList();
        });
    }

    function updateCalendar() {
        if(_month < 0 || !_year){
            _month = (new Date()).getMonth();
            _year = (new Date()).getFullYear();
        }
        var len = getMonthTotalDays(_year,_month);
        vendorCalendar(len);
    }
    initCalendar();

    function ajaxGetTalkList() {
        if(!_block) {
            _block = true; //加锁
            $.ajax({
                url: '/v1/collection/get_daily_collection_history_list',
                type: 'get',
                data: {year: _year, month: _month, collection_id: _collectionId},
                dataType: 'json',
                success: function (data) {
                    if (data.code == 0) {
                        _selectedArray = data.result.data;
                        vendorCalendar(_selectedArray);
                    } else {
                        alert(data.message.text);
                    }
                    _block = false; //解锁
                },
                error: function (e) {
                    alert(e.responseText);
                    _block = false; //解锁
                }
            });
        }


        // //测试数据,返回结果
        // var data = {
        //     code: 0,
        //     message: '',
        //     result: {
        //         data: [{ day: 2, url: 'http://www.baidu.com'},{ day: 21, url: 'http://www.baidu.com'},{ day: 15, url: 'http://www.baidu.com'}]
        //     }
        // };
        // _selectedArray = data.result.data;
        // vendorCalendar(_selectedArray);
    }

});