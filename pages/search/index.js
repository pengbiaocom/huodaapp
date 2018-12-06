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
    tips: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "地址搜索"
    })
  },
  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    var key = __config.key;
    if (keywords !=''){
      var myAmapFun = new amapFile.AMapWX({ key: key });
      myAmapFun.getInputtips({
        keywords: keywords,
        city:'510100',
        citylimit:true,
        success: function (data) {
          if (data && data.tips) {
            console.log(data.tips)
            that.setData({
              tips: data.tips
            });
          }
        }
      })
    }else{
      that.setData({
        tips: []
      });
    }
    that.setData({
      inputVal: keywords
    })
  },
  bindSearch: function (e) {
    var keywords = e.currentTarget.dataset.keywords;
    var district = e.currentTarget.dataset.district;
    var location = e.currentTarget.dataset.location;
    if (location == undefined) location = "";
    app.HttpService.getOrderDate({ address: district + keywords, location: location })
      .then(data => {
        if (data.code == 1) {
          var param = {
            address: keywords,
            distribution_price: data.data.price,
            lat: data.data.geo[1],
            lng: data.data.geo[0],
            estimated_time: data.data.duration,
            user_name:'',
            user_tel:''
          };
          console.log(param)
          app.globalData.single = param;
          wx.navigateTo({
            url: '/pages/index/duifang'
          })
        }else{
          wx.showModal({
            title: '提示信息',
            content: '请输入正确地址',
            showCancel: false
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
    var select_data = e.currentTarget.dataset;
    app.HttpService.getOrderDate({ address: select_data.address, location:"" })
      .then(data => {
        if (data.code == 1) {
          var param = {
            address: select_data.address,
            distribution_price: data.data.price,
            lat: select_data.lat,
            lng: select_data.lng,
            estimated_time: data.data.duration,
            user_name: select_data.username,
            user_tel: select_data.usertel,
          };
          app.globalData.single = param;
          wx.navigateTo({
            url: '/pages/index/duifang'
          })
        }
      })
  },
  clearInput() {
    this.setData({
      inputVal: '',
      tips:[]
    })
  },
  inputTyping(e) {
    this.setData({
      inputVal: e.detail.value
    })
    // this.search()
  },
  searchInput() {
    var keywords = this.data.inputVal;
    app.HttpService.getOrderDate({ address: keywords, location: "" })
      .then(data => {
        if (data.code == 1) {
          var param = {
            address: keywords,
            distribution_price: data.data.price,
            lat: data.data.geo[1],
            lng: data.data.geo[0],
            estimated_time: data.data.duration,
            user_name: '',
            user_tel: ''
          };
          app.globalData.single = param;
          wx.navigateTo({
            url: '/pages/index/duifang'
          })
        } else {
          wx.showModal({
            title: '提示信息',
            content: '请输入正确地址',
            showCancel: false
          })
        }
      })
  }
})