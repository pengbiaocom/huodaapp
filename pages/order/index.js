// pages/order/index.js
const app = getApp()
var wxpay = require('../../utils/pay.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    navList: [],
    order: {},
    prompt: {
      hidden: !0,
      icon: '../../assets/images/empty.png',
      title: '您还没有相关的订单',
      text: '可以去看看有哪些想买的',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {

    } else {
      app.goLogin()
    }
    this.setData({
      navList: [
        {
          title: '全部',
          id: 'all',
        },
        {
          title: '待支付',
          id: 0,
        },
        {
          title: '进行中',
          id: 1,
        },
        {
          title: '完成单',
          id: 2,
        },
        {
          title: '取消单',
          id: -1,
        }
      ]
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initData()
    this.getOrderList()
  },
  initData() {
    const order = this.data.order
    const params = order && order.params
    const status = params && params.status || 'all'
    var uid = wx.getStorageSync('uid')
    this.setData({
      order: {
        items: [],
        params: {
          page: 1,
          limit: 10,
          status: status,
          uid: uid
        },
        paginate: {}
      }
    })
  },
  onTapTag(e) {
    const status = e.currentTarget.dataset.cate
    const index = e.currentTarget.dataset.index
    this.initData()
    this.setData({
      activeIndex: index,
      'order.params.status': status,
    })
    this.getOrderList()
  },
  getOrderList() {
    const order = this.data.order
    const params = order.params

    app.HttpService.getOrderList(params)
      .then(data => {
        if (data.code == 0) {
          order.items = [...order.items, ...data.data]
          order.paginate = data.paginate
          order.params.limit = data.paginate.limit
          this.setData({
            order: order,
            'prompt.hidden': order.items.length,
          })
        } else {
          this.setData({
            'order.paginate.page': 1,
            'order.params.page': 1,
            'prompt.hidden': order.items.length,
          })
        }
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      })
  },
  lower() {
    if (this.data.order.items.length) {
      if (this.data.order.paginate.page == this.data.order.params.page) {
        wx.showToast({
          title: '没有更多数据了！'
        })
        return
      }
      this.setData({
        "order.params.page": this.data.order.paginate.page
      })
      this.getOrderList()
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.getOrderList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.lower()
  },
  toPayTap: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var money = e.currentTarget.dataset.money;
    wxpay.wxpay(app, money, orderId, "/pages/order/index");
  },
  toIndex:function(){
    wx.navigateTo({
      url: '/pages/index/index'
    })
  }
})