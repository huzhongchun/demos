//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    curProductId:0,
    banners:[]
  },
  onLoad: function (options) {
    this.setData({
      'curProductId':options.product_id
    });
    var itemInfo = app.globalData.explosions[this.data.curProductId];
    this.setData({
      'banners': itemInfo.images
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
