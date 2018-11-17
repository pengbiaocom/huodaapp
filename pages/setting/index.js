// pages/setting/index.js
var util = require('../../utils/util.js')
const app = getApp()
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
    mobile:'',
    user_name:'',
    hiddenmodalput: true,
    user_mobile:'',
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      user_mobile: ""
    });
  },
  //确认
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  getPhone:function(e){
    var val = e.detail.value;
    this.setData({
      user_mobile: val,
      mobile:val
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {

    } else {
      app.goLogin()
    }
    wx.setNavigationBarTitle({
      title: "个人信息"
    })
    var time = util.formatDate(new Date());
    this.setData({ end: time });
    if (options.type != undefined){
      if (options.type == 1) {
        if (options.value != undefined) {
          console.log(options.value);
          this.setData({
            user_name: options.value
          })
        }
      }
    }
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var uid = wx.getStorageSync('uid')
    app.HttpService.postUserInfo({ id: uid })
      .then(data => {
        if (data.code == 1) {
          var mphone = data.data.mobile.substring(0, 3) + '****' + data.data.mobile.substring(7);
          this.setData({
            nickname: data.data.user_nickname,
            countryIndex: data.data.sex,
            mobile: mphone,
            user_mobile: data.data.mobile
          })
          if (data.data.birthday !=0){
            this.setData({
              date: data.data.birthday
            })
          }
        } else {
          wx.showModal({
            title: '提示信息',
            content: data.msg,
            showCancel: false
          })
        }
      })
  },
  toSubmit:function(){
    var uid = wx.getStorageSync('uid')
    var param = {
      id: uid,
      user_nickname: this.data.nickname,
      sex: this.data.countryIndex,
      birthday:this.data.date,
      mobile: this.data.user_mobile
    };
    if (param.user_nickname ==''){
      wx.showModal({
        title: '提示信息',
        content: "请输入昵称",
        showCancel: false
      })
    }
    app.HttpService.postUpdateUser(param)
      .then(data => {
        if (data.code == 1) {
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
            showCancel: false
          })
        }
      })
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