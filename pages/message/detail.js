// pages/message/detail.js
var WxParse = require('../../wxParse/wxParse.js');
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messagelist: {
      item: {}
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
      // id:1
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDetail(this.data.id) 
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.getDetail(this.data.id)
  },
  getDetail(id) {
    var that = this;
    App.HttpService.getMessageDetail({ id: id})
      .then(data => {
        console.log(data)
        if (data.code == 1) {
          var article = data.data.post_content;
          WxParse.wxParse('article', 'html', article, that, 5);
          this.setData({
            'messagelist.item': data.data
          })
        }
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }

})