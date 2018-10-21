// pages/setting/index.js
var util = require('../../utils/util.js')
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryList: ['保密','男', '女'],
    countryIndex: 0,
    date: '1949-01-0',
    start:'1949-01-01',
    end:'',
    nickname:'玩E时代',
    address:'成都',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {

    } else {
      App.goLogin()
    }
    wx.setNavigationBarTitle({
      title: "个人信息"
    })
    var time = util.formatDate(new Date());
    this.setData({ end: time });

  },
  editNickname:function(){
    var value = this.data.nickname
    wx.navigateTo({
      url: '/pages/setting/edit?type=1&value='+value
    })
  },
  editAddress:function(){
    var value = this.data.address
    wx.navigateTo({
      url: '/pages/setting/edit?type=2&value=' + value
    })
  },
  changeCountry(e){
    this.setData({
      countryIndex: e.detail.value
    })
  },
  changeDate(e) {
    this.setData({ date: e.detail.value });
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