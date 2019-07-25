"user strict";
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();


// UTF-8编码 转成中文
var UTFTranslate = {
    Change:function(pValue){
        return pValue.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"&#x$2;")});
    },
    ReChange:function(pValue){
        return unescape(pValue.replace(/&#x/g,'%u').replace(/\\u/g,'%u').replace(/;/g,''));
    }
};


var items = [],timeLoop = null,timeLoop2 = null,isRefused = false;
function getFunc(numb){
	let _numb = numb;
	let link = 'http://cd.lianjia.com/ershoufang/tianfuxinqu/ie2lc2lc3sf1l2l3ba60ea100bp60ep120/';
	  	superagent.get(link)
            .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
            .set('Accept-Encoding', 'gzip, deflate, sdch')
            .set('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4')
            .set('Cache-Control', 'max-age=0')
            .set('Connection', 'keep-alive')
            .set('Cookie', 'lianjia_uuid=3c8e6ebf-3a25-43b9-add8-49a78661bcd6; gr_user_id=7bfde8d4-1b96-4655-9428-c45086901971; _jzqy=1.1480413883.1480413883.1.jzqsr=baidu|jzqct=%E9%93%BE%E5%AE%B6.-; _jzqa=1.3032003565307056600.1469524544.1486476178.1486551924.3; lianjia_token=2.00789b544301c650d169367d72041794fe; _jzqx=1.1486476178.1488635704.2.jzqsr=google%2Eco%2Ejp|jzqct=/.jzqsr=cd%2Elianjia%2Ecom|jzqct=/; all-lj=a861b873ac6b29c6817f75aa3a912370; Hm_lvt_efa595b768cc9dc7d7f9823368e795f1=1488190851,1488633142,1488880777; Hm_lpvt_efa595b768cc9dc7d7f9823368e795f1=1488880777; select_city=510100; gr_session_id_a1a50f141657a94e=6d6fb501-172e-453c-8d70-8b4bb511f917; Hm_lvt_660aa6a6cb0f1e8dd21b9a17f866726d=1488633153,1488635916,1488635943,1488878295; Hm_lpvt_660aa6a6cb0f1e8dd21b9a17f866726d=1489056288; _smt_uid=57972a40.3ff71c62; _jzqa=1.3032003565307056600.1469524544.1486551924.1489056289.4; _jzqc=1; _jzqckmp=1; CNZZDATA1253492306=2025473026-1480409185-http%253A%252F%252Fbj.lianjia.com%252F%7C1489051491; CNZZDATA1254525948=845247883-1480412073-http%253A%252F%252Fbj.lianjia.com%252F%7C1489053193; CNZZDATA1255633284=714922313-1480410202-http%253A%252F%252Fbj.lianjia.com%252F%7C1489052433; CNZZDATA1255604082=733879134-1480409553-http%253A%252F%252Fbj.lianjia.com%252F%7C1489051257; _qzja=1.2102347759.1480413887117.1488878295884.1489056288676.1488881915726.1489056288676.0.0.0.91.10; _qzjb=1.1489056288676.1.0.0.0; _qzjc=1; _qzjto=1.1.0; _jzqb=1.1.10.1489056289.1; _gat=1; _gat_past=1; _gat_global=1; _gat_new_global=1; _ga=GA1.2.1609561386.1469524544; _gat_dianpu_agent=1; lianjia_ssid=6cf7a6d0-add8-4001-97f6-e6126c988947')
            .set('Host', 'cd.lianjia.com')
            .set('Upgrade-Insecure-Requests', 1)
            .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36')
	    	.end(function (err, sres) {
				if (err) {
					isRefused = true;
					sendResult();
                    /** 10秒之后重启 **/
                    timeLoop2 =setTimeout(function () {
                        isRefused = false;
                        getFunc(_numb);
                    },10000);
					return console.dir(err);
				}
				let $ = cheerio.load(sres.text);
                //console.log($.html());
				$('.sellListContent li').each(function (idx, element) {
                    var _this = this;
                    var houseDetail = {};
                    var houseInfo = $(_this).find('.houseInfo').text();
                    var infoArr = houseInfo.split('|');
                    houseDetail['name'] = infoArr[0];  //楼盘名
                    houseDetail['layout'] = infoArr[1]; //户型
                    houseDetail['measure'] = infoArr[2];  //面积
                    houseDetail['orientation'] = infoArr[3];  //朝向
                    houseDetail['renovation'] = infoArr[4];  //装修
                    houseDetail['elevator'] = infoArr[5];  //电梯

                    var floorInfo = $(_this).find('.positionInfo').text();
                    var positionInfo = $(_this).find('.positionInfo>a').text();
                    houseDetail['floor'] = floorInfo;  //楼层
                    houseDetail['position'] = positionInfo;  //位置

                    houseDetail['unitPrice'] = $(_this).find('.unitPrice>span').text();  //单价
                    houseDetail['totalPrice'] = $(_this).find('.totalPrice>span').text()+'万';  //总价


                    items.push(houseDetail);
				});
                sendResult();
	    	});
		//console.log(_numb);
		/*if(!isRefused){
			timeLoop = setTimeout(function(){
				getFunc(_numb);
			},2000);
		}*/
		
}

function sendResult(){
	app.get('/', function (req, res, next) {
            console.log(items);

         var trTpl = '';
            for(var  i = 0;i < items.length;i++){
                var item = items[i];
                var tdTpl = '';
                for(var key in item){
                    tdTpl += '<td>'+item[key]+'</td>';
                }
                trTpl += '<tr>' +tdTpl+'</tr>';
            }

        var htmlTpl = '<html>' +
                '<head>' +
                '<style> table{border-color: #ccc} td{padding: 5px 10px;}</style>'+
            '</head>'+
            '<body>' +
            '<table border="1">' +
            '<thead>' +
                '<tr>' +
            '<td>小区名</td>' +
            '<td>户型</td>' +
            '<td>面积</td>' +
            '<td>朝向</td>' +
            '<td>装修</td>' +
            '<td>电梯</td>' +
            '<td>楼层</td>' +
            '<td>位置</td>' +
            '<td>单价</td>' +
            '<td>总价</td>' +
                '</tr>' +
            '</thead>' +
                '<tbody>' +
            trTpl+
            '</tbody>'+
            '</table>' +
            '</body></html>';

        res.send(htmlTpl);
		});
}

getFunc(0);

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});