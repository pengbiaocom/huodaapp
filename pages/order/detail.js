// pages/order/detail.js
const app = getApp()
var wxpay = require('../../utils/pay.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    order: {
      item: {},
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {
      this.setData({
        id: options.id
        // id:39
      })
    } else {
      app.goLogin()
    }
    wx.setNavigationBarTitle({
      title: "订单详细"
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderDetail(this.data.id)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.getOrderDetail(this.data.id)
  },
  getOrderDetail(id) {
    var param = {
      id:id
    };
    app.HttpService.getOrderDetail(param)
      .then(data => {
        console.log(data)
        if (data.code == 0) {
          this.setData({
            'order.item': data.data
          })
        }
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      })
  },
  isTui:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要取消订单吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          var param = {
            id: that.data.id
          };
          app.HttpService.getIsTui(param)
            .then(data => {
              if (data.code == 0) {
                wx.showModal({
                  title: '提示信息',
                  content: "取消成功",
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
                    wx.switchTab({
                      url: '/pages/user/index'
                    })
                  }
                })
              }
            })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: that.data.order.item.order_number,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  toPayTap: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var money = e.currentTarget.dataset.money;
    wxpay.wxpay(app, money, orderId, "/pages/order/index");
  },
  toIndex: function (e) {
    var orderId = e.currentTarget.dataset.id;
    app.globalData.order_number = orderId;
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})