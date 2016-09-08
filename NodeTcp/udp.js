/**
 * Created by huzhongchun on 16/8/24.
 */
let dgram = require('dgram');

let server = dgram.createSocket('udp4');

server.on('message',function(msg,rinfo){
    console.log('server got: '+msg+'form '+rinfo.address+':'+rinfo.port);
});
server.on('listening',function(){
   var address =server.address();
    console.log('server listening '+address.address+':'+address.port);
});

server.bind(12345);