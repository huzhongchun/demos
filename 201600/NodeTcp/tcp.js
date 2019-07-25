/**
 * Created by huzhongchun on 16/8/24.
 */

let net = require('net');
let log4 = require('log4js');

var logger = log4.getLogger('tcp');

let service = net.createServer(function(socket){
    //新的连接
    socket.on('data',function(data){
        logger.trace(data);
        socket.write('你好');
    });
    socket.on('end',function(){
       logger.error('连接中断!');
    });
    socket.write('欢迎访问!\n');
}); 

service.listen(1234,function(){
   logger.trace('service start! \n');
});