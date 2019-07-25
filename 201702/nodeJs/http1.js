/**
 * Created by huzhongchun on 2017/3/8.
 */

let http1= require('http');

let server = http1.createServer(function(req,res){
    res.write('1');
    res.end('');
});

server.listen('3000');