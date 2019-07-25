// "user strict";
// var express = require('express');
// var cheerio = require('cheerio');
// var superagent = require('superagent');
// var events = require("events");
// var handleHtml = require('./view/html.js');
//
// var emitter = new events.EventEmitter()
// var app = express();
//
//
// var items = [],timeLoop = null,timeLoop2 = null,isRefused = false, _loginCookie = '';
// /**
//  * 获取登录信息
//  * @param numb
//  */
// var loginAccount = {
//     username: '1024849064@qq.com',
//     password: 'hu8729862',
//     verify: '',
//     redirect: 'http://www.zealer.com/',
//     YII_CSRF_TOKEN: 'b1c63798c59cd432f09047879d5c47e4a20d5e35',
//     remember: 0
// }
// function getLoginInfo(numb){
// 	let _numb = numb;
// 	let link = 'http://www.zealer.com/login/login';
// 	  	superagent.post(link)
//             .set('X-Requested-With', 'XMLHttpRequest')
//             .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
//             .set('Connection','keep-alive')
//             .set('Cookie','z_q1=duqlagm3n7s0svbcgmott8fep4; YII_CSRF_TOKEN=b1c63798c59cd432f09047879d5c47e4a20d5e35; Hm_lvt_93a776aa5a5632380561feba017dd90f=1470796056; Hm_lpvt_93a776aa5a5632380561feba017dd90f=1470797115; _ga=GA1.2.1721274260.1470796057')
//             .set('Host','www.zealer.com')
//             .set('Origin','http://www.zealer.com')
//             .send(loginAccount)
// 	    	.end(function (err, res) {
// 				if (err) {
//                     //console.log(err);
// 					isRefused = true;
// 					// sendResult();
//                     // /** 10秒之后重启 **/
//                     // timeLoop2 =setTimeout(function () {
//                      //    isRefused = false;
//                      //    getFunc(_numb);
//                     // },10000);
// 					// return console.dir(err);
// 				}
//                 _loginCookie = res.header['set-cookie']
//                 console.log(_loginCookie);
//                 emitter.emit("setCookie", _loginCookie)
// 	    	});
//
// }
//
// /**
//  * 监听setCookie事件
//  */
// emitter.on("setCookie", function () {
//     console.log('setCookie');
//     superagent.get('http://www.zealer.com/personal')
//         .set('cookie',_loginCookie)
//         .end(function (err, res){
//             if(err)
//                 console.log(err);
//             //if(res)
//                 //console.log(res);
//             //let $ = cheerio.load(res.text);
//             // $('title').html('胡仲春');
//             // $('body').append('<script src="index.js"></script>');
//
//             let html = handleHtml.makePageHtml({title: 'hehe'},'<h3>hahah</h3>');
//             console.log(html);
//             sendResult(html);
//         })
// });
//
// function sendResult(items){
// 	app.get('/', function (req, res, next) {
// 		  	res.send(items);
// 		});
// }
//
// app.listen(3000, function () {
//   console.log('app is listening at port 3000');
// });
//
//
//
// getLoginInfo();

var log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'console',
        filename: 'default.log',
        layout: {
            pattern: '[%r] [%p][%c] - %m%n'
        }
    }]
})
var logger = log4js.getLogger('test');
logger.trace('time',new Date());
logger.debug('time',new Date());
logger.info('time',new Date());
logger.warn('time',new Date());
logger.error('time',new Date());
logger.fatal('time',new Date());
logger.mark('time',new Date());
