"user strict";
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();


var items = [],timeLoop = null,timeLoop2 = null,isRefused = false;
function getFunc(numb){
	let _numb = numb;
	let link = 'http://chuansong.me/account/thefair?start='+numb;
	  	superagent.get(link)
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
				$('.question_link').each(function (idx, element) {
				let $element = $(element);
					items.push({
					    title: $element.html(),
					    href: $element.attr('href')
					});
				});
                console.log($('.question_link').length);
				if($('.question_link').length < 12){
                    clearInterval(timeLoop);
                    clearInterval(timeLoop2);
					sendResult();
				}
	    	});
    	_numb +=12;
		console.log(_numb);
		if(!isRefused){
			timeLoop = setTimeout(function(){
				getFunc(_numb);
			},2000);
		}
		
}

function sendResult(){
	app.get('/', function (req, res, next) {
		  	res.send(items);
		});
}

getFunc(576);

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});