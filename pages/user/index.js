// pages/user/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    items: [
      {
        icon: '../../assets/images/iconfont-order.png',
        text: '我的订单',
        path: '/pages/order/index'
      },
      {
        icon: '../../assets/images/iconfont-order.png',
        text: '常见问题',
        path: '/pages/user/problem'
      },
      {
        icon: '../../assets/images/iconfont-order.png',
        text: '意见反馈',
        path: '/pages/user/feedback'
      },
      {
        icon: '../../assets/images/iconfont-order.png',
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
      App.goLogin()
    }
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})