/**
 * Created by huzhongchun on 2017/2/24.
 */

/**
 * JSON对象的合并(只支持第一层级的覆盖合并)
 * @param parentObj
 * @param childObj
 * @returns {*}
 */
function extend(parentObj,childObj) {
    if(type(parentObj) == 'object' && type(childObj) == 'object'){
        for(var key in childObj){
            parentObj[key] = childObj[key];
        }
        return parentObj;
    }
    return obj;
}

/**
 * 变量类型判断
 * @param arg
 * @returns {string}
 */
function type(arg) {
    var typeofResult = typeof arg, result = 'undefined';
    switch(typeofResult){
        case 'undefined':
            result = 'undefined';
            break;
        case 'string':
            result = 'string';
            break;
        case 'object':
            if(arg === null){
                result = 'null';
            }else if(arg instanceof Array){
                result = 'array';
            }else{
                result = 'object';
            }
            break;
    }
    return result;
}