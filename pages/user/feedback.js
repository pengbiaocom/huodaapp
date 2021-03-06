// pages/user/feedback.js
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
        title: "意见反馈"
      })
    } else {
      app.goLogin()
    }
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  inputs:function(e){
    var value = e.detail.value;
    this.setData({
      textValue: value
    });
  },
  showModal:function(){
    var uid = wx.getStorageSync('uid');
    var param = {
      uid:uid,
      content: this.data.textValue
    };

    if(param.content ==''){
      wx.showModal({
        title: '提示信息',
        content: "请输入反馈信息",
        showCancel: false
      })
    }else{
      console.log(param)
      app.HttpService.postAddFaq(param)
        .then(data => {
          if (data.code == 1) {
            this.setData({
              textValue: ''
            })
            wx.showModal({
              title: '提示信息',
              content: data.msg,
              showCancel: false,
              confirmColor: '#479de6',
              success: function (res) {
                wx.switchTab({
                  url: '/pages/user/index'
                })
              }
            })
          } else {
            wx.showModal({
              title: '提示信息',
              content: data.msg,
              showCancel: false,
              confirmColor: '#479de6',
              success: function (res) {

              }
            })
          }
        })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})