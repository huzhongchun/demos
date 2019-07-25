/**
 * Created by huzhongchun on 16/8/4.
 */

/**
 *
 * 从数组中匹配出对应的文件路径
 **/
const glob = require('glob-plus');

var _ignoreFilesNameArray = ['.DS_Store'];
var _ignoreFilesPathArray = [];

function getMatchedFiles() {
    findMatchedFiles(0,function () {
        console.log('enf');
    });
}
function findMatchedFiles(n,callback) {
    var matchString = '', string = _ignoreFilesNameArray[n];
    console.log(n);
    //如果是有后缀的,则直接匹配文件名
    if(string.match(/\.\w+$/g)){
        matchString = '**/'+string+'**';
    }else{
        //没有后缀的则直接匹配文件夹下的所有文件
        if(string != '')
            matchString = '**/'+string+'/**';
        else
            matchString = '';
    }
    console.log(matchString);
    let plus = glob.plus(matchString, { ignore: 'node_modules/**' })
    plus.on('file', ({ name, stats, data }) => {
        //console.log(`Found file '${name}' with size ${stats.size}`);
        _ignoreFilesPathArray.push(name);
    });
    plus.on('end', () => {
        let index = n+1;
        if(index < _ignoreFilesNameArray.length)
            findMatchedFiles(index,callback);
        else{
            console.log(_ignoreFilesPathArray);
            if(callback)
                callback();
        }
    })
}

//getMatchedFiles();

//同步读文件
// var fs = require('fs'),recordsArray = [];
// recordsArray = fs.readFileSync('files-changed.js','utf8');
// console.log(recordsArray);

// var fs = require('fs'),recordsArray = [];
// fs.watch('./', (eventType, filename) => {
//     console.log('event type is: '+eventType);
//     console.log(filename+'\n');
// });


//var chokidar = require('chokidar');

// One-liner for current directory, ignores .dotfiles
//watcher = chokidar.watch('.', {ignored: /node_modules/});

// // Initialize watcher.
// var watcher = chokidar.watch('file, dir, glob, or array', {
//     ignored: /[\/\\]\./,
//     persistent: true
// });
//
// // Something to use when events are received.
// var log = console.log.bind(console);
// // Add event listeners.
// watcher
//     .on('add', path => log(`File ${path} has been added`))
//     .on('change', path => log(`File ${path} has been changed`))
//     .on('unlink', path => log(`File ${path} has been removed`));
//
// // More possible events.
// watcher
//     .on('addDir', path => log(`Directory ${path} has been added`))
//     .on('unlinkDir', path => log(`Directory ${path} has been removed`))
//     .on('error', error => log(`Watcher error: ${error}`))
//     .on('ready', () => log('Initial scan complete. Ready for changes'))
//     .on('raw', (event, path, details) => {
//         log('Raw event info:', event, path, details);
//     });
//
// // 'add', 'addDir' and 'change' events also receive stat() results as second
// // argument when available: http://nodejs.org/api/fs.html#fs_class_fs_stats
// watcher.on('all', (event,path, stats) => {
//     if (stats) console.log(`File ${path} changed size to ${stats.size}`);
// });



// var co = require('co');
// var OSS = require('ali-oss');
// var _bucketName = 'static-funkfox';
//
// var client = new OSS({
//     region: 'oss-cn-beijing',
//     accessKeyId: '16fwim4WFOBrDNZ7',
//     accessKeySecret: 'RDOnkeKmqaFwfogxTkEBh4zVAkt5HW',
//     bucket: 'static-funkfox'
// });
//
// co(function*() {
//     var result = yield client.listBuckets();
//     console.log(result);
// }).catch(function (err) {
//     console.log(err);
// });
//
// //function deleteSingleFile(objectKey,callback) {
//     co(function* () {
//         console.log(_bucketName);
//         var result = yield client.delete('touch/activity/windCoat222/images/1-02.jpg');
//         if(result.res.status == 200){
//             console.log('---------- '+objectKey+' ---------- 删除成功');
//         }else{
//             console.log('\n');
//             console.log('========== '+objectKey+' ========== 删除失败!');
//             console.log(result);
//             console.log('\n');
//         }
//         if(callback)
//             callback(result);
//     }).catch(function (err) {
//         console.log(err);
//     });
// //}

//deleteSingleFile('touch/activity/windCoat222/images/1-02.jpg');

