/**
 * Created by huzhongchun on 2017/4/11.
 */
let server = require('./server');
let router = require('./router');
let requestHandles = require('./requestHandles');

let handles = {};

console.log(process.argv[2]);

handles['/'] = requestHandles.start;
handles['/start'] = requestHandles.start;
handles['/upload'] = requestHandles.upload;
server.start(router.route,handles);