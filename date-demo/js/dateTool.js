/*
* @file: dateTool 日期选择插件
* @require: moment.js  
* 绿色为当前日期，蓝色为选中的日期
*/
(function(){
    $.jsonClone = function(json){
      return JSON.parse(JSON.stringify(json))
    }
    var dateTool = function(element,options){
        this.settings = $.extend({
            maxDate : '',   //可选的时间日期上限，格式：YYYY-MM-DD
            minDate : '',   //可选的时间日期下限，格式：YYYY-MM-DD
            chooseDate: '', //默认选中的日期
            tips: '', 
            submitBtnTxt: '确定',
            rangeDateGap: 0, //选择时间段的间隔天数
            submitCallback: function(){},  //确定按钮的点击 回调函数
            autoClose: false,  //选择日期后是否自动关闭
            deviation:{  //相对于element的位置的偏移量
                top: 20,
                left: 20,
            },
            //上月同期 、上周同期的结束时间，格式：YYYY-MM-DD
            samePickStartTime: '',  
        },options);
        this.element = element;
        this.boxTpl = '<div class="model-date-area">'+
                        '<div class="model-range-date-box">'+
                            '<div class="range-date">'+
                                '<span class="range-start-date"></span>'+
                                '<span class="range-separate">--</span>'+
                                '<span class="range-end-date"></span>'+
                            '</div>'+
                            '<span class="range-gap-day"></span>'+
                        '</div>'+
                        '<div class="model-func-box">'+
                            '<span class="same-last-month">上月同期</span>'+
                            '<span class="same-last-week">上周同期</span>'+
                        '</div>'+
                        '<div class="model-date-change-box">'+
                            '<div class="change-pre-btn">&lt;</div>'+
                            '<div class="title-date"><span class="year"></span>.<span class="month"></span></div>'+
                            '<div class="change-next-btn">&gt;</div>'+
                        '</div>'+
                        '<div class="date-list-box">'+
                            '<table>'+
                                '<thead>'+
                                    '<tr>'+
                                        '<td>日</td>'+
                                        '<td>一</td>'+
                                        '<td>二</td>'+
                                        '<td>三</td>'+
                                        '<td>四</td>'+
                                        '<td>五</td>'+
                                        '<td>六</td>'+
                                    '</tr>'+
                                '</thead>'+
                                '<tbody></tbody>'+
                            '</table>'+
                        '</div>'+
                        '<div class="model-submit-area">'+
                            '<span class="model-tips"></span>'+
                            '<span class="model-submit-btn"></span>'+
                        '</div>'+
                    '</div>';
        this.init();
    }
    dateTool.prototype = {
        constructor: 'dateTool',
        init: function(){
            var self = this,opt = this.settings;
            $('body').append(this.boxTpl);
            if(window.datePickerCount )
                window.datePickerCount++;
            else
                window.datePickerCount = 1;
            $($('.model-date-area')[datePickerCount-1]).attr('id','datepicker-area-'+window.datePickerCount);
            self.model = $('#'+'datepicker-area-'+window.datePickerCount);
            if(opt.chooseDate && opt.minDate && (new Date(opt.chooseDate).getTime() < (new Date(opt.minDate)))){
                alert('默认选中的时间不能小于设置的最小时间');
                return;
            }
            if(opt.chooseDate && opt.maxDate && (new Date(opt.chooseDate).getTime() > (new Date(opt.maxDate)))){
                alert('默认选中时间不能大于设置的最大时间');
                return;
            }
            var selectedGMTdate = opt.chooseDate ? new Date(opt.chooseDate) : new Date();
            //当前显示面板展示的年、月，默认是初始化时候的年、月
            self.selectedDateObj = {
                GMTdate: selectedGMTdate,
                month: self.addZero(selectedGMTdate.getMonth()+1),
                year: selectedGMTdate.getFullYear(),
                date: selectedGMTdate.getDate(),
            }
            //初始化选中的日期
            if(opt.chooseDate){
                self.chooseDateObj = $.jsonClone(self.selectedDateObj);
            }
            //初始化的时候的当前日期
            var curGMTdate = new Date();
            self.curDateObj = {
                GMTdate: curGMTdate,
                date: curGMTdate.getDate(),
                month: self.addZero(curGMTdate.getMonth()+1),
                year: curGMTdate.getFullYear()
            }
            //最大日期限制
            if(opt.maxDate){
                var maxGMTdate = new Date(opt.maxDate);
                self.maxDateObj = {
                    GMTdate: maxGMTdate,
                    date: maxGMTdate.getDate(),
                    month: self.addZero(maxGMTdate.getMonth()+1),
                    year: maxGMTdate.getFullYear()
                }
            }
            //最小日期限制
            if(opt.minDate){
                var minGMTdate = new Date(opt.minDate);
                self.minDateObj = {
                    GMTdate: minGMTdate,
                    date: minGMTdate.getDate(),
                    month: self.addZero(minGMTdate.getMonth()+1),
                    year: minGMTdate.getFullYear()
                }
            }
            
            this.updateDate();
            this.initEvent();
            this.dateRangePick(opt.rangeDateGap);
            $(self.model).find('.model-tips').html(opt.tips);
            $(self.model).find('.model-submit-btn').html(opt.submitBtnTxt);
        },
        initEvent: function(){
            var self = this,opt = this.settings;
            $(self.element).on('click',function(){
                $(this).toggleClass('show-model');
                if($(this).hasClass('show-model'))
                    self.showModel();
                else
                    self.hideModel();
            })
            
            $(self.model).find('.change-pre-btn').on('click',function(){
                self.changeDate(self.selectedDateObj.year,self.selectedDateObj.month,'sub');
            })
            $(self.model).find('.change-next-btn').on('click',function(){
                self.changeDate(self.selectedDateObj.year,self.selectedDateObj.month,'add');
            })
            $(self.model).find('.date-list-box').on('click','.ui-default-days',function(){
                if($(this).hasClass('ui-disabled-days'))
                    return false;
                $(self.model).find('.choose-date').removeClass('choose-date');
                $(self.model).find(this).addClass('choose-date');
                var chooseDate = $(this).find('.date-numb').html();
                var chooseGMTDate = new Date(self.selectedDateObj.year+'-'+self.selectedDateObj.month+'-'+chooseDate);
                //选择的日期，如果没有设置选中的日期，则只有选择之后才有值
                self.chooseDateObj = {
                    GMTdate: chooseGMTDate,
                    date: chooseGMTDate.getDate(),
                    month: self.addZero(chooseGMTDate.getMonth()+1),
                    year: chooseGMTDate.getFullYear()
                }
                self.dateRangePick(opt.rangeDateGap);

            })
            $(self.model).find('.model-submit-btn').on('click',function(){
                if(opt.submitCallback)
                    opt.submitCallback.call(self);
                if(opt.autoClose){
                    self.hideModel();
                }
            })

            //上周同期
            $(self.model).find('.same-last-week').on('click',function(){
                self.toSameLastWeek(opt.samePickStartTime);
            })
            //上月同期
            $(self.model).find('.same-last-month').on('click',function(){
                self.toSameLastMonth(opt.samePickStartTime);
            })
        },
        updateDate: function(){
            //获取本月1日是周几
            var self = this,opt = this.settings;
            self.selectedMonthFirstDay = (new Date(self.selectedDateObj.year+'-'+self.selectedDateObj.month+'-01')).getDay();
            self.selectedTotalDays = self.getMonthTotalDays(self.selectedDateObj.year,self.selectedDateObj.month);
            this.initHtml(self.selectedMonthFirstDay,self.selectedTotalDays);
            $(self.model).find('.title-date .year').html(self.selectedDateObj.year);
            $(self.model).find('.title-date .month').html(self.selectedDateObj.month);
        },
        //获取一个月里总的天数
        getMonthTotalDays: function(year,month){
            var D = new Date(year,month,0); 
            return D.getDate();
        },
        initHtml: function(startDay,total){
            var self = this,opt = this.settings,startIndex = startDay % 7 + 1;
            var $box = $(self.model).find('.date-list-box tbody').html('');
            var tr = '',tds = '' ,tpl = '';
            //总行数
            var totalRow = ((total+startIndex - 1) % 7) == 0 ? parseInt((total+startIndex - 1) / 7):parseInt((total+startIndex - 1) / 7)+1;
            var max = totalRow * 7;
            for (var i = 1,k=1; i <= max; i++) {
                if(i < startIndex )
                    tds += '<td class="ui-pre-days"></td>';
                else if(i >= (total+startIndex))
                    tds += '<td class="ui-next-days"></td>';
                else{
                    if(k <= total){
                        var curClass = self.isCurDate(k) ? 'cur-date': '';
                        var chooseClass = self.isChooseDate(k) ? 'choose-date': '';
                        var overDisabledClass = self.isLargerMaxDate(k) ? 'ui-disabled-days': '';
                        var lessDisabledClass = self.isLessMinDate(k) ? 'ui-disabled-days': '';
                        tds += '<td class="ui-default-days '+curClass+' '+chooseClass+' '+overDisabledClass+' '+lessDisabledClass+'"><span class="date-numb">'+k+'</span></td>';
                        k++;
                    }
                }
                if(i % 7 == 0){
                    tpl = '<tr></tr>';
                    var tr = $(tpl).append(tds);
                    $box.append(tr);
                    tds = '';
                }

            };
        },
        //是否在当日期
        isCurDate: function(date){
            var self = this,opt = this.settings;
            if(self.selectedDateObj.month == self.curDateObj.month && self.selectedDateObj.year == self.curDateObj.year &&  self.curDateObj.date == date )
                return true;
            return false;
        },
        //是否是选择的日期
        isChooseDate: function(date){
            var self = this,opt = this.settings;
            if(self.chooseDateObj && self.selectedDateObj.month == self.chooseDateObj.month && self.selectedDateObj.year == self.chooseDateObj.year &&  self.chooseDateObj.date == date )
                return true;
            return false;
        },
        //是否超过最大的日期限制
        isLargerMaxDate: function(date){
            var self = this,opt = this.settings;
            if(opt.maxDate && self.selectedDateObj.month == self.maxDateObj.month && self.selectedDateObj.year == self.maxDateObj.year &&  self.maxDateObj.date < date )
                return true;
            return false;
        },
        //是否小于最小的日期限制
        isLessMinDate: function(date){
            var self = this,opt = this.settings;
            if(opt.minDate && self.selectedDateObj.month == self.minDateObj.month && self.selectedDateObj.year == self.minDateObj.year &&  self.minDateObj.date > date )
                return true;
            return false;
        },
        changeDate: function(year,month,method){
            var self = this,opt = this.settings;
            switch(method){
                case 'add':
                    month = parseInt(month) + 1;
                    if(month > 12){
                        month = 1;
                        year = year +1;
                    }
                    break;
                case 'sub':
                    month = parseInt(month) - 1;
                    if(month <= 0){
                        month = 12;
                        year = year -1;
                    }
                    break;
            }
            month = self.addZero(month);

            if((year >= self.maxDateObj.year && month > self.maxDateObj.month) || (year <= self.minDateObj.year && month < self.minDateObj.month) ){
                return false;
            }
            
            self.selectedDateObj.month = month;
            self.selectedDateObj.year = year;
            self.updateDate();
        },
        
        //计算间隔的时段，默认点击的是时段的结束时间，返回时段的开始时间
        dateRangePick: function(gap){
            var self = this,opt = this.settings;
            if(!moment || !gap){
                $(self.model).find('.model-range-date-box').hide();
                $(self.model).find('.model-func-box').hide();
                return;
            }
            if(self.chooseDateObj)
                var selectedDateString = self.chooseDateObj.year+'-'+self.chooseDateObj.month+'-'+self.chooseDateObj.date;
            else
                var selectedDateString = self.curDateObj.year+'-'+self.curDateObj.month+'-'+self.curDateObj.date;
            var GMTdate = new Date(moment(selectedDateString,'YYYY-MM-DD').subtract(gap,'days').format('YYYY-MM-DD'));
            self.dateRangeStartObj = {
                GMTdate: GMTdate,
                date: GMTdate.getDate(),
                month: self.addZero(GMTdate.getMonth() + 1),
                year: GMTdate.getFullYear()
            }

            $(self.model).find('.range-start-date').html(self.dateRangeStartObj.year+'.'+self.dateRangeStartObj.month+'.'+self.addZero(self.dateRangeStartObj.date));
            if(self.chooseDateObj){
                $(self.model).find('.range-end-date').html(self.chooseDateObj.year+'.'+self.chooseDateObj.month+'.'+self.addZero(self.chooseDateObj.date));
            }
            else{
                $(self.model).find('.range-end-date').html(self.curDateObj.year+'.'+self.curDateObj.month+'.'+self.addZero(self.curDateObj.date));
            }
            $(self.model).find('.range-gap-day').html(gap+'(天)')
                
        },
        //小于9的数字前面加0
        addZero: function(numb){
            numb < 10 ? numb = '0'+numb : numb;
            return numb;
        },
        hideModel: function(){
            var self = this,opt = this.settings;
            $(self.element).removeClass('show-model');
            self.model.hide();
        },
        showModel: function(){
            var self = this,opt = this.settings;
            self.getElementPosition();
            var top = self.elementInfo.OT;
            var left = self.elementInfo.OL;

            if(opt.deviation && opt.deviation.top){
                top = self.elementInfo.OT + opt.deviation.top;
            }
            if(opt.deviation && opt.deviation.left){
                left = self.elementInfo.OL + opt.deviation.left;
            }
            $(self.model).css({
                top: top+'px',
                left: left+'px'
            })
            self.model.show();
        },
        getWindowInfo: function(){
            var self = this,opt = this.settings;
             //可视区域的信息
            self.windowInfo = {
                W: document.documentElement.clientWidth,
                H: document.documentElement.clientWidth,
                ST: $(window).scrollTop(), 
                SL: $(window).scrollLeft(), 
            }
        },
        getElementPosition: function(){
            var self = this,opt = this.settings;
            self.elementInfo = {
                W: $(self.element).width(),
                H: $(self.element).height(),
                OT: $(self.element).offset().top,
                OL: $(self.element).offset().left
            }
        },
        setRangeDateGap: function(val){
            var self = this,opt = this.settings;
            opt.rangeDateGap = val;
        },
        _setDate: function(GMTdate,type){
            var self = this,opt = this.settings;
            self.selectedDateObj.month = self.addZero(GMTdate.getMonth()+1);
            self.selectedDateObj.year = GMTdate.getFullYear();
            self.selectedDateObj.date = GMTdate.getDate();
            self._setChooseDate(GMTdate);
            if(type == 'week')
                self.dateRangePick(7);
            else
                self.dateRangePick(30);

            self.updateDate();
        },
        _setChooseDate: function(GMTdate){
            var self = this,opt = this.settings;
            self.chooseDateObj = {
                GMTdate: GMTdate,
                date: GMTdate.getDate(),
                month: self.addZero(GMTdate.getMonth()+1),
                year: GMTdate.getFullYear()
            }
        },
        //上周同期，rangeDateGap必须是7天，
        toSameLastWeek: function(GMTdate){
            var self = this,opt = this.settings;
            var GMTdate = GMTdate ? GMTdate : new Date(moment().subtract(7,'d').format('YYYY-MM-DD'));
            self._setDate(GMTdate,'week');
        },  
        //上月同期，rangeDateGap必须是30天，
        toSameLastMonth: function(GMTdate){
            var self = this,opt = this.settings;
            var GMTdate =  GMTdate ? GMTdate : new Date(moment().format('YYYY-MM-DD'));
            self._setDate(GMTdate,'month');
        },
        setSamePickStartTime: function(dateString){
            //dateString的格式为： ‘YYYY-MM-DD’
            var self = this,opt = this.settings;
            opt.samePickStartTime = dateString;
        }
    }

    $.fn.dateTool = function(options){
        new dateTool(this,options);
    }
    window.dateTool = dateTool;
})(window,$)