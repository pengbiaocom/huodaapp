// pages/user/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    items: [
      {
        icon: '../../assets/images/order.png',
        text: '我的订单',
        path: '/pages/order/index'
      },
      {
        icon: '../../assets/images/wenti.png',
        text: '常见问题',
        path: '/pages/user/problem'
      },
      {
        icon: '../../assets/images/fankui.png',
        text: '意见反馈',
        path: '/pages/user/feedback'
      },
      {
        icon: '../../assets/images/about.png',
        text: '关于我们',
        path: '/pages/user/about'
      }
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {
      this.getUserInfo()
    } else {
      app.goLogin()
    }
    wx.setNavigationBarTitle({
      title: "我的"
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },
  goSetting(){
    wx.navigateTo({
      url: '/pages/setting/index'
    })
  },
  navigateTo(e) {
    const index = e.currentTarget.dataset.index
    const path = e.currentTarget.dataset.path
    wx.navigateTo({
      url: path
    })
  },
  getUserInfo() {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    }) 
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})