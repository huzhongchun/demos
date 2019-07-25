/**
 * Created by huzhongchun on 2017/3/12.
 */


var http = require('http');

http.createServer(function(req,res){
    res.send(process);
}).listen(30001);