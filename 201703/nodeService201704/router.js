/**
 * Created by huzhongchun on 2017/4/11.
 */
function route(handles,pathName){
    let handle = handles[pathName];
    if(typeof handle === 'function'){
        handles[pathName]();
    }else{
        console.log("No request handler found for " + pathName);
    }
}

exports.route = route;