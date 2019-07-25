/**
* Created by huzhongchun on 16/8/4.
* 文件改动监测程序
*/

var fs = require('fs');
var glob = require("glob-plus");
var watch = require('node-watch');

var _watchPath = '';  //process.argv为此服务启动时传入的参数
var _recordsArray = [], _changedRecordsArray = [];
var _intervalLoop = null; //时间监测;
var _ignoreFilesNameArray = ['files-changed.js','.DS_Store','node_modules','_assets'];
var _ignoreFilesPathArray = [];
var _recordFilePath = './files-changed.js';

/**
 * 获取运行参数
 * 如果没有传入,则默认当前文件夹下
 */
_watchPath = process.argv[1] ? process.argv[1] : './';


/**
 * 启动监测程序,把监测到改变了的文件路劲写入记录文件
 *
 * _changedRecordsArray记录更改的文件,当记录的数量>=10个的时候,写入记录文件,以减少写入操作
 * _intervalLoop 辅助监测写入文件,如果更改记录没有达到100次, 辅助监测程序会在20秒之后把记录存入记录文件
 */
function startWatchProgram() {
    watch('./', function (filename) {
        consoleLog('Changed Filename',filename);
        //var data = fs.readFileSync(_recordFilePath,'utf8');
        //data.concat(_changedRecordsArray);
        updateIntervalLoop();
        if (!repeatCheck(filename,_changedRecordsArray) && !ignoreCheck(filename,_changedRecordsArray)) {
            _changedRecordsArray.push(filename);
        }
        if (_changedRecordsArray.length >= 100) {
            updateRecordFile(_changedRecordsArray);
        }
    });
}


/**
 * 重复检测,避免重复记录
 * @param string
 * @returns {boolean}
 */
function repeatCheck(string,data) {
    var result = false;
    for(var  i= 0;i < data.length;i++){
        if(data[i] == string){
            result = true;
            break;
        }
    }
    return result;
}


/**
 * 监测是否是忽略的文件
 * 使用 == 绝对匹配
 * @param string
 * @returns {*}
 */
function ignoreCheck(string,data) {
    var result = false;
    for(var  i= 0;i < data.length;i++){
        if(data[i] == string){
            result = true;
            break;
        }
    }
    return result;
}


/**
 * 更新辅助监测程序
 */
function updateIntervalLoop() {
    clearInterval(_intervalLoop);
    _intervalLoop = setTimeout(function () {
        if(_changedRecordsArray.length > 0){
            console.log('辅助监测程序');
            updateRecordFile(_changedRecordsArray);
        }
    },20000);
}


/**
 * 更新记录
 * @param recordsArray
 */
function updateRecordFile(recordsArray) {
    var _recordsArray = recordsArray;
    readRecordFile(_recordFilePath,'utf8',function (data) {
        //consoleLog('更新记录前读取的数据:',data);
        var diffArray = [];
        for(var i = 0;i < _recordsArray.length;i++){
            for(var j = 0;j <data.length;j++ ){
                if(_recordsArray[i] && _recordsArray[i] == data[j]){
                    _recordsArray.splice(i,1);
                }
            }
        }
        diffArray = _recordsArray;
        consoleLog('匹配到的新的记录:',diffArray);
        //把不同的记录写入文件
        if(diffArray.length >0) {
            writeRecordFile('\n'+diffArray.join('\n') , _recordFilePath, '', function () {
                //写入成功后,清空内存中记录的数组数据
                _changedRecordsArray = [];
            });
        }
    });
}


/**
 * 修改记录写入文件,如果没有文件会自动创建
 * @param record
 * @param recordFilePath
 * @param mode
 * @param callback
 */
function writeRecordFile(record,recordFilePath,mode,callback) {
    var _mode = mode ? mode :'utf8';
    fs.appendFile(recordFilePath, record,'utf8', function(err){
        if (err) {
            console.log('记录写入文件失败!!!!!!!!!!');
            console.log(err);
        }
        console.log(new Date() + '\n记录已经成功写入记录文件!!!!!!!!!!!');
        if(callback){
            callback();
        }
    });
}


/**
 * 读出记录文件的数据,处理成json或者array
 * 第一行默认是注释,数据从第二行开始,用"\n"分割
 * @param recordFilePath
 * @param mode
 */
function readRecordFile(recordFilePath,mode,callback) {
    var _mode = mode ? mode :'utf8';
    fs.readFile(recordFilePath,_mode, function(err, data){
        if (err) console.log(err);
        var recordsArray = data.split('\n');
        _recordsArray = recordsArray;
        if(callback)
            callback(recordsArray);
    });
}


/**
 * 检查文件是否存在如果不存在则新建一个.
 * @param filePath
 */
function checkFileExists(filePath) {
    fs.exists(filePath, function(exists){
        if(!exists){
            fs.mkdir(filePath,function () {
                console.log('Mkdir success!');
            });
        }
    });
}


/**
 * 获取忽略的文件
 * @param callback
 */
function getIgnoreFiles(callback) {
    findIgnoreFiles(0,function () {
        if(callback)
            callback();
    });
}


/**
 * 递归获取忽略的文件的路径
 * @param n
 * @param callback
 */
function findIgnoreFiles(n,callback) {
    var matchString = '', string = _ignoreFilesNameArray[n];
    //如果是有后缀的,则直接匹配文件名
    if(string.match(/\.\w+$/g)){
        matchString = '**/'+string+'**';
    }else{
        //没有后缀的则直接匹配文件夹下的所有文件
        matchString = string+'/**';
    }
    let plus = glob.plus(matchString, { ignore: 'node_modules/**' })
    plus.on('file', ({ name, stats, data }) => {
        _ignoreFilesPathArray.push(name);
    });
    plus.on('end', () => {
        let index = n+1;
        if(index < _ignoreFilesNameArray.length)
            findIgnoreFiles(index,callback);
        else{
            //consoleLog('忽略的文件',_ignoreFilesPathArray);
            if(callback)
                callback();
        }
    })
}


/**
 * 启动程序,保证所有忽略文件都已经找到之后,再启动监测程序;
 */
getIgnoreFiles(startWatchProgram);


/**
 * log格式化打印
 * @param title
 * @param conent
 */
function consoleLog(title,content) {
    var content = content ? content : '暂无';
    console.log('=================================>');
    console.log('----------- '+title+' -----------')
    console.log(content);
    console.log('<=================================');
    console.log('\n');
}


