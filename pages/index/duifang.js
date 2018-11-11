// pages/index/duifang.js
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
    city:'',
    province_id: 0,
    province:'',
    county:'',
    county_id: 0,
    address: "",
    user_name: "",
    user_tel: "",
    estimated_time:0,
    distribution_price:'',
    types: 2,
    markers: [{
      iconPath: "../../assets/images/iconfont-addr.png",
      id: 0,
      latitude: 30.572903,
      longitude: 103.916931,
      width: 30,
      height: 30
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {
      wx.setNavigationBarTitle({
        title: "收件人信息"
      })
    } else {
      app.goLogin()
    }
    
  },
  onShow:function(){
    this.initData();
  },
  initData(){
    var that = this;
    var single = app.globalData.single;
    if (single != '') {
      that.setData({
        city_id: single.city_id,
        city: single.city,
        province_id: single.province_id,
        province: single.province,
        county: single.county,
        county_id: single.county_id,
        address: single.address,
        distribution_price: single.distribution_price,
      });
      if (single.lat != undefined && single.lng != undefined){
        that.setData({
          "markers.latitude": single.lat,
          "markers.longitude": single.lng,
        });
      }
      if (single.estimated_time !=undefined){
        that.setData({
          estimated_time: single.estimated_time
        });
      }
    }else{
      var uid = wx.getStorageSync('uid');
      var params = {
        uid: uid,
        type: 0
      };
      app.HttpService.getUserAddress(params)
        .then(data => {
          if (data.code == 1) {
            var address = data.data[0];
            app.HttpService.getOrderDate({ region: address.county_id, address: address.get_address })
              .then(data => {
                if (data.code == 1) {
                  var lat = data.data.geo[1];
                  var lng = data.data.geo[0];
                  if (lat != undefined && lng != undefined) {
                    that.setData({
                      "markers.latitude": lat,
                      "markers.longitude": lng,
                    });
                  }
                }
              })
            that.setData({
              city_id: address.get_region_tow,
              city: address.city,
              province_id: address.get_region_one,
              province: address.province,
              county: address.county,
              county_id: address.get_region_three,
              address: address.get_address,
              user_name: address.get_username,
              user_tel: address.get_phone,
              estimated_time: address.estimate_time,
              distribution_price: address.order_total_price
            });
          }
        })
    }
  },
  setAddr() {
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  getUserName: function (e) {
    var val = e.detail.value;
    this.setData({
      user_name: val
    });
  },
  getPhone: function (e) {
    var val = e.detail.value;
    this.setData({
      user_tel: val
    });
  },
  submitForm(e) {
    var param = {
      province_id: this.data.province_id,
      province: this.data.province,
      city_id: this.data.city_id,
      city: this.data.city,
      county_id: this.data.county_id,
      county: this.data.county,
      address: this.data.address,
      user_name:this.data.user_name,
      user_tel:this.data.user_tel,
      distribution_price: this.data.distribution_price,
      estimated_time: this.data.estimated_time,
      lat: this.data.markers.latitude,
      lng: this.data.markers.longitude
    };
    if (param.province_id == 0 || param.city_id == 0 || param.county_id == 0 || param.address=='') {
      wx.showModal({
        title: '提示信息',
        content: '请选择地址',
        showCancel: false
      })
    } else if (param.user_name == '' || param.user_tel=='') {
      wx.showModal({
        title: '提示信息',
        content: '请填写收件人姓名和电话',
        showCancel: false
      })
    } else {
      app.globalData.single = param;
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})