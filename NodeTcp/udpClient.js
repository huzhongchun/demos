/**
 * Created by huzhongchun on 16/8/24.
 */
let dgram = require('dgram');

let message = new Buffer('发送的数据');
let client = dgram.createSocket('udp4');

client.send(message,0,message.length,12345,'localhost',function(err,bytes){
    console.log(bytes);
    client.close();
});