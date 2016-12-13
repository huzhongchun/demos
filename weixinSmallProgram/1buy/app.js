//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
  },
  onShow: function () {
    //console.log('App Show');
  },
  onHide: function () {
    //console.log('App Hide')
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData:{
    userInfo:null,
    explosions: {
      "1111111":
        {
          product_id: 1111111,
          cover_img:'/images/index/5.jpg',
          desc: '商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容',
          price:1000,
          progressColor: '#09BB07',
          progressPercent: 0,
          status: 0, // -1：已结束；0：即将开始；1：正在进行；8：正在进行，但是即将完成；10：筹集完成，等待抽奖；
          total: 1000,
          needs: 1000,
          joins: 0,
          images:[
            '/images/index/10.jpg',
            '/images/index/11.jpg',
            '/images/index/12.jpg',
          ]
        },
      "1111112":
        {
          product_id: 1111112,
          cover_img:'/images/index/6.jpg',
          shortDesc: '商品描述，最好能保证两行的内容商品描述',
          price:1000,
          progressColor: '#09BB07',
          progressPercent: 50,
          status: 1, // -1：已结束；0：即将开始；1：正在进行；8：正在进行，但是即将完成；10：筹集完成，等待抽奖；
          total: 1000,
          needs: 1000,
          joins: 500,
          images:[
            '/images/index/10.jpg',
            '/images/index/11.jpg',
            '/images/index/12.jpg',
          ],
          desc: '商品描述'
        },
      "1111113":
        {
          product_id: 1111113,
          cover_img:'/images/index/7.jpg',
          shortDesc: '商品描述，最好能保证两行的内容商品描述',
          price:1000,
          progressColor: '#EA3232',
          progressPercent: 90,
          status: 8, // -1：已结束；0：即将开始；1：正在进行；8：正在进行，但是即将完成；10：筹集完成，等待抽奖；
          total: 1000,
          needs: 1000,
          joins: 900,
          images:[
            '/images/index/10.jpg',
            '/images/index/11.jpg',
            '/images/index/12.jpg',
          ]
        },
      "1111114":
        {
          product_id: 1111114,
          cover_img:'/images/index/8.jpg',
          shortDesc: '商品描述，最好能保证两行的内容商品描述',
          price:1000,
          progressColor: '#EA3232',
          progressPercent: 100,
          status: 10, // -1：已结束；0：即将开始；1：正在进行；8：正在进行，但是即将完成；10：筹集完成，等待抽奖；
          total: 1000,
          needs: 1000,
          joins: 100,
          images:[
            '/images/index/10.jpg',
            '/images/index/11.jpg',
            '/images/index/12.jpg',
          ]
        },
      "1111115":
        {
          product_id: 1111115,
          cover_img:'/images/index/9.jpg',
          shortDesc: '商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容商品描述，最好能保证两行的内容',
          price:1000,
          progressColor: '#888',
          progressPercent: 100,
          status: -1, // -1：已结束；0：即将开始；1：正在进行；8：正在进行，但是即将完成；10：筹集完成，等待抽奖；
          total: 1000,
          needs: 1000,
          joins: 1000,
          images:[
            '/images/index/10.jpg',
            '/images/index/11.jpg',
            '/images/index/12.jpg',
          ]
        },
    }
  }
})
