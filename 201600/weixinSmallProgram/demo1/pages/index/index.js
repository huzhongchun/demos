//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: "http://resource.thefair.net.cn/_assets/touch/book/images/2016_07/find_icon.png",
      nickName: "胡仲春"
    },
    button:{
      loading: false
    },
    "intraText":"这是写的第一个微信小程序demodemo，希望通过他能够更好地体验到微信小程序的特点，以便以后做出更好地体验的产品。",
    "navRedirect": false,
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toPickImages: function(){
    wx.navigateTo({
      url: "/pages/pick/image",
    });
  },
  alertText: function(){
    this.setData({
      text: "NO ZUO NO DIE!",
    })
  },
  ajax:function(){
    wx.request({
      url: '/',
      methodd: 'get',
      success:function(res){
        console.log(res);
      }
    })
  },
  onLoad: function () {
    console.log('onLoad');
    console.log(wx);
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })



    var common = require('../../utils/common.js');
    //var utils = common.localRequire();
    //console.log(utils);
  }
})
