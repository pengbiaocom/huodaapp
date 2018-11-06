// pages/index/duo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {
      wx.setNavigationBarTitle({
        title: "物品信息"
      })
    } else {
      app.goLogin()
    }

  },

  inputs: function (e) {
    var value = e.detail.value;
    this.setData({
      textValue: value
    });
  },
  showModal: function () {
    if (this.data.textValue == ''){
      wx.showModal({
        title: '提示信息',
        content: '请填写物品信息',
        showCancel: false
      })
    }else{
      app.globalData.model_value = this.data.textValue;
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
    
  },
})