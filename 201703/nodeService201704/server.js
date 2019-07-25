/**
 * Created by huzhongchun on 2017/4/11.
 */

let http = require('http');
let url = require('url');



function start(route,handles) {
    function onRrequest(request,response){
        let pathName = url.parse(request.url).pathname;
        route(handles,pathName);

        response.writeHead(200,{'Content-Type': 'text/plain'});
        response.write('Hello word');
        response.end();
    }
    http.createServer(onRrequest).listen(3301);
    console.log('\n Server has started . \n');
}

exports.start = start;
