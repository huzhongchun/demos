/**
 * 获取配置
 */
var config = require('../config/config.js');

var $ = {
  config: config
};


/**
 * 对原生对象的扩展
 */
(function(){
  Array.prototype.each = function(callback){
    for (i = 0; i < this.length; i++)
          callback.call(this, i,this[i]);
  }
})();

/**
 * 基本数据类型判断
 */
(function($){
  var typeArray = ["Boolean","Number","String","Function","Array","Date","RegExp","Object","Error"],class2type = {};
  typeArray.each(function(index,name){
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  });

  function type(obj) {
      return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isObject(obj)     { return type(obj) == "object" }
  function isArray(value) { return value instanceof Array }
  function isString(value) { return typeof value === 'string';}
  function isBoolean(value) { return typeof value === 'boolean';}


  $['commonBaseDataTypeCheck'] = {
    isFunction: isFunction,
    isObject: isObject,
    isArray: isArray,
    isString: isString,
    isBoolean: isBoolean
  }
})($);


(function($){
  /**
   * json克隆
   */
  function jsonClone(json){ return JSON.parse(JSON.stringify(json)) }

  /**
   * 11位手机号格式检查
   * @param mobile
   * @returns {boolean}
   */
  function mobileFormatCheck(mobile) {
      var mobileRegExp = new RegExp(/^1[3|4|5|7|8]\d{9}$/);
      return mobileRegExp.test(mobile);
  }

  /**
   * require函数封装，支持批量加载模块
   * @param modules {Array | String} 模块名数组或者模块名
   * @returns {object}
   */

  function localRequire(modules){
    var returnObj = {};
    var commonPaths = config.commonBasePaths;
    if(isArray(modules)){
      for(var i = 0;i < modules.length;i++){
        returnObj[modules[i]] = commonPaths[modules[i]] ? require(commonPaths[modules[i]]) : '';
      }
      return returnObj
    }else if(isString(modules)){
      return commonPaths[modules] ? require(commonPaths[modules]) : '';
    }
  }
})($);

module.exports = $;