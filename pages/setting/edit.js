// pages/setting/edit.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {

    } else {
      App.goLogin()
    }
    if(options.type != undefined){
      if(options.type==1){
        wx.setNavigationBarTitle({
          title: "昵称"
        })
      }else{
        wx.setNavigationBarTitle({
          title: "所在地"
        })
      }
    }

    if(options.value != undefined){
      this.setData({
        value: options.value
      })
    }
    
  },
  inputs: function (e) {
    var value = e.detail.value;
    this.setData({
      value: value
    });
  },
  toSubmit:function(){
    wx.navigateTo({
      url: '/pages/setting/index?type=1&value=' + this.data.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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