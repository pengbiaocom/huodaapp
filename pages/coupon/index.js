// pages/coupon/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {

    } else {
      App.goLogin()
    }
  },
  clearInput() {
    this.setData({
      inputVal: ''
    })
  },
  inputTyping(e) {
    this.setData({
      inputVal: e.detail.value
    })
    this.search()
  },
  searchInput() {
    this.search()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  search:function(){

  },
  onPullDownRefresh() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.search()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})