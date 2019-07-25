var apiObj = {
    "apiUrlPrefix": "http://h5.thefair.net.cn",
    "fieldName": {
        "3123814823118871435": "city",
        "3123814823118871332": "content",
        "3123814823118871333": "from",
        "3123814823118871334": "wechatId",
        "3123814823118871335": "picUrl"
    },
    "fieldId": {},
    "getListData": function (callback) {
        var mailList = [];
        var debugdata = {
            "code": "0",
            "message": {"text": "", "action": "toast"},
            "result": {
                "total": 2,
                "list": {
                    "3123814823118878830": {
                        "feed_id": "3123814823118878830",
                        "avatar": "http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83epcHqhK0CN3ydUK6yuI0asBiciadfAeSkwA6IQqxasqgOlb2O3NNhzsmyBKIdqic0c8P46rOdB8icsopA\/0",
                        "nick": "Valar Morghulis",
                        "info_list": {
                            "3123814823118871435": {"id": "3123814823118871435", "type": "text", "title": "城市", "text": "aaa"},
                            "3123814823118871332": {"id": "3123814823118871332", "type": "textarea", "title": "填写告白故事", "text": "bbbbbbbbbb"},
                            "3123814823118871333": {"id": "3123814823118871333", "type": "number", "title": "From：（填写昵称）", "text": "cccc"},
                            "3123814823118871335": {"id": "3123814823118871335", "type": "img", "title": "上传照片", "text": "[]"}
                        }
                    },
                    "3123814823118879231": {
                        "feed_id": "3123814823118879231",
                        "avatar": "http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83epcHqhK0CN3ydUK6yuI0asBiciadfAeSkwA6IQqxasqgOlb2O3NNhzsmyBKIdqic0c8P46rOdB8icsopA\/0",
                        "nick": "Valar Morghulis",
                        "info_list": {
                            "3123814823118871435": {"id": "3123814823118871435", "type": "text", "title": "城市", "text": "iiopio"},
                            "3123814823118871332": {"id": "3123814823118871332", "type": "textarea", "title": "填写告白故事", "text": "hjerfjcs"},
                            "3123814823118871333": {"id": "3123814823118871333", "type": "number", "title": "From：（填写昵称）", "text": "fewef"},
                            "3123814823118871335": {
                                "id": "3123814823118871335",
                                "type": "img",
                                "title": "上传照片",
                                "text": "[\"http:\/\/image.thefair.net.cn\/activity\/collect\/ugc\/20171117\/981bd8ad380dca19b30cbed1f90d1a54.jpeg?x-oss-process=image\/auto-orient,1\/resize,w_750\/format,jpg\/interlace,1\/quality,q_80\"]"
                            }
                        }
                    }
                }
            }
        };

        var func = function (data) {
            if (data.code == 0) {
                var list = data.result.list;
                for (var n in list) {
                    var m = new Mail();
                    m.id = n.toString();
                    m.from = list[n].nick; // 昵称
                    m.headImgUrl = list[n].avatar; // 头像地址
                    for (var item in list[n].info_list) {
//                            console.log(item.toString());
                        m[apiObj.fieldName[item + ""]] = list[n].info_list[item].text;
                    }
                    mailList.push(m);
                }
            }

            callback(mailList);
            console.log(mailList);
        };

        if (DEBUG) {
            func(debugdata);
        } else {
            $("#loading").show();
            $.ajax({
                "url": this.apiUrlPrefix + "/activity/confess/get_confession_list",
                "dataType": "json",
                "success": func,
                "complete": function () {
                    $("#loading").hide();
                }
            });
        }
    },
    "saveMail": function (mail, callback) {
//            console.log(mail);


        if (DEBUG) {
            callback(true);
        } else {

            var dataInfo = {
                "form": []
            };
            for (var n in this.fieldId) {
                if (!mail[n.toString()] || mail[n.toString()] == null)
                    continue;
                var dataItem = {
                    "guide_id": this.fieldId[n],
                    "text": mail[n.toString()]
                };
                dataInfo.form.push(dataItem);
            }

            console.log(dataInfo);

            $("#loading").show();
            $.ajax({
                "url": this.apiUrlPrefix + "/activity/confess/create",
                "data": {
                    "content": JSON.stringify(dataInfo)
                },
                "dataType": "json",
                "success": function (data) {
                    if (data.code == 0)
                        callback(true);
                    else
                        callback(false);
                },
                "error": function () {
                    callback(false);
                },
                "complete": function () {
                    $("#loading").hide();
                }
            });
        }
    },
    "getMail": function (mail, callback) {
//            console.log(mail);
        if (DEBUG)
            callback(true);
        else
            $("#loading").show();
        $.ajax({
            "url": this.apiUrlPrefix + "/activity/confess/take",
            "data": {
                "feed_id": mail.id
            },
            "dataType": "json",
            "success": function (data) {
                if (data.code == 0)
                    callback(true);
                else
                    callback(false);
            },
            "error": function () {
                callback(false);
            },
            "complete": function () {
                $("#loading").hide();
            }
        });
    },
    uploadImg: function (callback) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                // 上传照片
                wx.uploadImage({
                    localId: '' + localIds,
                    isShowProgressTips: 1,
                    success: function (res) {
                        console.log(res.serverId);
                        $.ajax({
                            url: 'http://h1v.cn/WxCom/file/downloadFileToOSS.do',
                            data: {
                                serverId: res.serverId
                            },
                            "dataType": "json",
                            success: function (data) {
                                console.log(data);
                                if (data.code == 1) {
                                    console.log(data.url);
                                    callback(data.url);
                                } else {
//                                    alert();
                                }
                            }
                        });
                    }
                });
            }
        });
    }
};

for (var n in apiObj.fieldName) {
    apiObj.fieldId[apiObj.fieldName[n]] = n.toString();
}

window["apiObj"] = apiObj;