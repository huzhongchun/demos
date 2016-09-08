/**
 * Created by huzhongchun on 16/8/31.
 */
var http = require('http');
var opt = {
    hostname: 'www.baidu.com',
    port: 80,
    path: '/',
    method: 'GET'
};

var req = http.request(opt,(res)=>{
    console.log('statusCode----'+res.statusCode);
    console.log('headers----'+JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data',function(chunk){
        //console.log(chunk);
    });
});

req.end();