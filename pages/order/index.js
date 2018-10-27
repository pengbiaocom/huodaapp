// pages/order/index.js
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
      App.goLogin()
    }
    this.setData({
      navList: [
        {
          title: '全部',
          id: 'all',
        },
        {
          title: '进行中',
          id: 0,
        },
        {
          title: '完成单',
          id: 1,
        },
        {
          title: '取消单',
          id: 2,
        }
      ]
    })
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
  initData() {
    const order = this.data.order
    const params = order && order.params
    const status = params && params.status || 'all'
    const uid = wx.getStorageSync('token');
    this.setData({
      order: {
        items: [],
        params: {
          page: 1,
          limit: 10,
          status: status,
          uid: uid['user_id']
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