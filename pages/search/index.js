// pages/map/index.js
const app = getApp()
import __config from '../../etc/config'
var model = require('../../model/model.js')
var amapFile = require('../../utils/amap-wx.js');
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
    addresslist:'',
    tips: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    var key = __config.key;
    if (keywords !=''){
      var myAmapFun = new amapFile.AMapWX({ key: key });
      myAmapFun.getInputtips({
        keywords: keywords,
        location: '104.025652,30.630897',
        success: function (data) {
          if (data && data.tips) {
            that.setData({
              tips: data.tips
            });
          }
        }
      })
    }else{
      that.setData({
        tips: {}
      });
    }
    
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    app.HttpService.getOrderDate({ address: keywords })
      .then(data => {
        if (data.code == 1) {
          var param = {
            address: keywords,
            distribution_price: data.data.price,
            lat: data.data.geo[1],
            lng: data.data.geo[0],
            estimated_time: data.data.duration
          };
          app.globalData.single = param;
          wx.navigateTo({
            url: '/pages/index/duifang'
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var uid = wx.getStorageSync('uid');
    var params = {
      uid: uid,
      type: 1
    };
    app.HttpService.getUserAddress(params)
      .then(data => {
        if (data.code == 1) {
          var address = data.data[0];
          this.setData({
            addresslist: address
          })
        }
      })
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
  selectAddress:function(e){
    var data = e.currentTarget.dataset;
    app.HttpService.getOrderDate({ address: data.address })
      .then(data => {
        if (data.code == 1) {
          var param = {
            address: data.address,
            distribution_price: data.data.price,
            lat: data.data.geo[1],
            lng: data.data.geo[0],
            estimated_time: data.data.duration
          };
          app.globalData.single = param;
          wx.navigateTo({
            url: '/pages/index/duifang'
          })
        }
      })
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
      app.HttpService.getOrderDate({ region: param.county_id, address:param.address})
        .then(data => {
          if (data.code == 1) {
            param.distribution_price = data.data.info.distribution_price;
            param.lat = data.data.geo[1];
            param.lng = data.data.geo[0];
            param.estimated_time = data.data.estimated_time;
            app.globalData.single = param;
            wx.navigateTo({
              url: '/pages/index/duifang'
            })
          }
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
  }
})