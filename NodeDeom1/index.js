"user strict";
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();


var items = [],timeLoop = null,timeLoop2 = null,isRefused = false;
function getFunc(numb){
	let _numb = numb;
	let link = 'http://chuansong.me/account/thefair?start='+numb;
        link = 'http://s.weibo.com/weibo/勇士&page=1';
	  	superagent.get(link)
            .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
            .set('Accept-Encoding', 'gzip, deflate, sdch')
            .set('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4')
            .set('Cache-Control', 'max-age=0')
            .set('Connection', 'keep-alive')
            .set('Cookie', 'SINAGLOBAL=1807702352071.7383.1464144527371; _s_tentry=www.liaoxuefeng.com; Apache=4328326661576.3784.1483514291835; ULV=1483514291916:18:1:1:4328326661576.3784.1483514291835:1482302086029; UOR=www.cnblogs.com,widget.weibo.com,www.liaoxuefeng.com; login_sid_t=705f3e9af9e128a3c3bfcef1f66237b7; SWB=usrmdinst_14; WBtopGlobal_register_version=c689c52160d0ea3b; SCF=AtdoenvybNSBnWd9Q-WEHK9aQpiBm-QjFtiqQDQWttMeWmnRVUpHUM_uyoMMe_TNwKOzlP8PpJVfqpu3_pjjRng.; SUB=_2A251aynDDeRxGedG6FcY8SvLwj-IHXVWARwLrDV8PUNbmtANLXejkW9XnDTqJdfYgky5rMbC0xXsojMcRA..; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWuyW-0nhZqFJTdQfRaN94y5JpX5KzhUgL.Fo2Re0-4eK-N1Ke2dJLoIpRLxK-L1KzL1K-LxK-L1KzL1K-LxK-L1KnL12-peoet; SUHB=09P81AmPylrtqS; ALF=1515228435; SSOLoginState=1483692435')
            .set('Host', 's.weibo.com')
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
                console.log($.html());
				$('script').each(function (idx, element) {
                    if(idx == 20){
                        console.log($(element).html());
                    }
                    // let $element = $(element);
                    //     items.push({
                    //         title: $element.html(),
                    //         href: $element.attr('href')
                    //     });
				});
				if($('.question_link').length < 12){
                    clearInterval(timeLoop);
                    clearInterval(timeLoop2);
					//sendResult();
				}
	    	});
    	_numb +=12;
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
		  	res.send(items);
		});
}

getFunc(0);

// app.listen(3000, function () {
//   console.log('app is listening at port 3000');
// });