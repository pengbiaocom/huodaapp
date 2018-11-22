// pages/index/duifang.js
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
      iconPath:"../../assets/images/iconfont-addr.png",
      latitude: 30.558384,
      longitude: 103.950323,
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
        address: single.address,
        distribution_price: single.distribution_price,
      });
      if (single.lat != undefined && single.lng != undefined){
        var markers = [{
          iconPath: "../../assets/images/iconfont-addr.png",
          latitude: single.lat,
          longitude: single.lng,
          width: 30,
          height: 30
        }];
        that.setData({
          markers: markers
        });
      }
      if (single.estimated_time !=undefined){
        that.setData({
          estimated_time: single.estimated_time
        });
      }
      if (single.user_name !=''){
        that.setData({
          user_name: single.user_name,
          user_tel: single.user_tel,
        });
      }
    }else{
      var single1 = app.globalData.single1;
      if (single1 != ''){
        that.setData({
          address: single1.address,
          user_name: single1.user_name,
          user_tel: single1.user_name
        });
      }else{
        var uid = wx.getStorageSync('uid');
        var order_number = app.globalData.order_number
        var params = {
          uid: uid,
          type: 0,
          order_number: order_number
        };
        app.HttpService.getUserAddress(params)
          .then(data => {
            if (data.code == 1) {
              var address = data.data[0];
              that.setData({
                address: address.get_address,
                user_name: address.get_username,
                user_tel: address.get_phone,
                estimated_time: address.estimate_time,
                distribution_price: address.order_total_price
              });
              var markers = [{
                iconPath: "../../assets/images/iconfont-addr.png",
                latitude: address.lat,
                longitude: address.lng,
                width: 30,
                height: 30
              }];
              console.log(markers)
              that.setData({
                markers: markers
              });
            }
          })
      }
      
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
      address: this.data.address,
      user_name:this.data.user_name,
      user_tel:this.data.user_tel,
      distribution_price: this.data.distribution_price,
      estimated_time: this.data.estimated_time,
      lat: this.data.markers[0].latitude,
      lng: this.data.markers[0].longitude
    };
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var myphone = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    if (param.address=='') {
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
    }else{
      if (myreg.test(param.user_tel) || myphone.test(param.user_tel)) {
        app.globalData.single1 = param;
        app.globalData.single = '';
        wx.switchTab({
          url: '/pages/index/index'
        })
      } else {
        wx.showModal({
          title: '提示信息',
          content: '请输入正确的联系方式',
          showCancel: false
        })
      }
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