//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    banners:[
      {
        src:'/images/index/banner_1.jpg',
        url: '',
      },
      {
        src:'/images/index/banner_2.jpg',
        url: '',
      },
      {
        src:'/images/index/banner_3.jpg',
        url: '',
      },
      {
        src:'/images/index/banner_4.jpg',
        url: '',
      },
    ],
    navBars:[
      {
        icon: '/images/index/sp_2_active.png',
        title: '中奖记录',
        url:'',
        tips:0
      },
      {
        icon: '/images/index/sp_3_active.png',
        title: '我的余额',
        url:'',
        tips:0
      },
      {
        icon: '/images/index/sp_5_active.png',
        title: '活动规则',
        url:'',
        tips:2
      },
      {
        icon: '/images/index/sp_6_active.png',
        title: '物流查询',
        url:'',
        tips:2
      }
    ],
    explosions: [
      {
        product_id: 1111111,
        cover_img:'/images/index/emoji.gif',
        desc: '商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容',
        price:1000,
        progressColor: '#09BB07',
        progressPercent: 0,
        status: 0, // -1：已结束；0：即将开始；1：正在进行；8：正在进行，但是即将完成；10：筹集完成，等待抽奖；
        total: 1000,
        needs: 1000,
        joins: 0
      },
      
      {
        product_id: 1111112,
        cover_img:'/images/index/6.jpg',
        desc: '商品描述，最好能保证两行的内容商品描述',
        price:1000,
        progressColor: '#09BB07',
        progressPercent: 50,
        status: 1, // -1：已结束；0：即将开始；1：正在进行；8：正在进行，但是即将完成；10：筹集完成，等待抽奖；
        total: 1000,
        needs: 1000,
        joins: 500
      },
      {
        product_id: 1111113,
        cover_img:'/images/index/7.jpg',
        desc: '商品描述，最好能保证两行的内容商品描述',
        price:1000,
        progressColor: '#EA3232',
        progressPercent: 90,
        status: 8, // -1：已结束；0：即将开始；1：正在进行；8：正在进行，但是即将完成；10：筹集完成，等待抽奖；
        total: 1000,
        needs: 1000,
        joins: 900
      },
      {
        product_id: 1111114,
        cover_img:'/images/index/8.jpg',
        desc: '商品描述，最好能保证两行的内容商品描述',
        price:1000,
        progressColor: '#EA3232',
        progressPercent: 100,
        status: 10, // -1：已结束；0：即将开始；1：正在进行；8：正在进行，但是即将完成；10：筹集完成，等待抽奖；
        total: 1000,
        needs: 1000,
        joins: 100
      },
      {
        product_id: 1111115,
        cover_img:'/images/index/9.jpg',
        desc: '商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容',
        price:1000,
        progressColor: '#888',
        progressPercent: 100,
        status: -1, // -1：已结束；0：即将开始；1：正在进行；8：正在进行，但是即将完成；10：筹集完成，等待抽奖；
        total: 1000,
        needs: 1000,
        joins: 1000
      },
    ]
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
    app['product_id']=1111;
    console.log(app);
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



    //var common = require('../../utils/common.js');
   //console.log(common.localRequire('util'));
  }
})
