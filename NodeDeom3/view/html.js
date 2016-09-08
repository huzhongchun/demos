/**
 * Created by huzhongchun on 16/8/10.
 */

function makePageHtml(options,contentString){
    let _contentString = contentString ? contentString : '';
    return '<!DOCTYPE html><html>'+setHead(options)+setBody(contentString,options.scriptLinksArray)+'</html>';
}

function setHead(options) {
    let opt = options;
    let title = opt.title ? opt.title : '';
    let titleTpl = '<title>'+title+'</title>';
    let stylesArray = opt.stylesArray, stylesTpl = '';
    if(stylesArray instanceof Array ) {
        for (let i = 0; i < stylesArray.length; i++) {
            stylesTpl += '<link rel="stylesheet" href="' + stylesArray[i] + '">';
        }
    }
    let keyWordsTpl = '';
    if(opt.keywords){
        keyWordsTpl = '<meta content="'+opt.keywords+'" name="keywords" />'
    }
    let shortcutIconTpl = '';
    if(opt.shortcut){
        shortcutIconTpl = '<link rel="shortcut icon" href="'+opt.shortcut+'" type="image/x-icon">'
    }
    let descriptionTpl = '';
    if(opt.description){
        descriptionTpl = '<meta content="'+opt.description+'" name="description" />'
    }
    let headTpl = '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+titleTpl+shortcutIconTpl+keyWordsTpl+descriptionTpl+stylesTpl+'</head>';
    return headTpl;
}

function setBody(contentString,scriptLinksArray) {
    let scriptsTpl = '';
    if(scriptLinksArray instanceof  Array && scriptLinksArray.length > 0){
        scriptsTpl += '<script type="text/javascript" src="'+scriptLinksArray[i]+'"></script>';
    }
    console.log('<body>'+contentString+scriptsTpl+'</body>');
    return '<body>'+contentString+scriptsTpl+'</body>';
}

module.exports = {
    makePageHtml: makePageHtml
}