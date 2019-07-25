/**
 * Created by huzhongchun on 2017/3/9.
 */

var express = require('express');

var app = express();

app.get('/',function(req,res){
    res.send('hhhha');
});

var server = app.listen(3000);