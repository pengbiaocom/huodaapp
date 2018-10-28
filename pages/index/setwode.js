// pages/index/setwode.js
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
    m_show: show,
    prompt: {
      hidden: 0,
      icon: '../../assets/images/empty.png',
      title: '暂无常用地址'
    },
    areaSelectedStr: '请选择区域',
    city_id: 0,
    province_id: 0,
    county_id: 0,
    address:"",
    user_name:"",
    user_tel:"",
    types:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {
      wx.setNavigationBarTitle({
        title: "发件人信息"
      })
    } else {
      app.goLogin()
    }
    
  },
  setAddr(){
    wx.navigateTo({
      url: '/pages/search/index'
    })
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  submitForm(e) {
    var params = e.detail.value
    console.log(params)
    
    if(params.address==''){
      wx.showModal({
        title: '提示信息',
        content: '请填写详细地址',
        showCancel: false
      })
    }else if(params.user_name=='' || params.user_tel==''){
      wx.showModal({
        title: '提示信息',
        content: '请填写发件人姓名和电话',
        showCancel: false
      })
    }else{
      app.globalData.setwode = params;
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  
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