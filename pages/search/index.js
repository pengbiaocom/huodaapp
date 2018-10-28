// pages/map/index.js
const app = getApp()
import __config from '../../etc/config'
var model = require('../../model/model.js')
var item = {};
var t = 0;
var show = false;
var moveY = 200;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
    areaSelectedStr: '请选择区域',
    city_id: 0,
    province_id: 0,
    county_id: 0,
    address: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getAddress:function(e){
    var val = e.detail.value;
    this.setData({
      address: val
    });
  },
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
    that.animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "ease",
      delay: 0
    }
    )
    that.animation.translateY(200 + 'vh').step();
    that.setData({
      animation: that.animation.export(),
      m_show: show
    })
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
  },
  submitTap:function(){
    var param = {
      province_id: this.data.province_id,
      province: this.data.province,
      city_id: this.data.city_id,
      city: this.data.city,
      county_id: this.data.county_id,
      county: this.data.county,
      address: this.data.address
    };
    if(param.province_id==0 || param.city_id==0 || param.county_id==0){
      wx.showModal({
        title: '提示信息',
        content: '请选择区域',
        showCancel: false
      })
    }else if(param.address==''){
      wx.showModal({
        title: '提示信息',
        content: '请填写详细地址',
        showCancel: false
      })
    }else{
      app.globalData.single = param;
      wx.navigateTo({
        url: '/pages/index/duifang'
      })
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
    // this.search()
  },
  searchInput() {
    // this.search()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //请求数据
    model.updateAreaData(that, 0, e);
    that.animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "ease",
      delay: 0
    })
    that.animation.translateY(200 + 'vh').step();
    that.setData({
      animation: that.animation.export(),
      m_show: show,
      city_id: 0,
      province_id: 0,
      county_id: 0,
    })
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
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