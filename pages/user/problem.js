// pages/user/problem.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 新用户如何让登录
    showView: false,
    //挪车二维码如何领取
    showViews: false,
    // 挪车服务如何领取
    show_tab3: false,
    // 次卡如何办理
    show_tab4: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('token')) {
      wx.setNavigationBarTitle({
        title: "常见问题"
      })
      // 新用户如何让登录
      showView: (options.showView == "true" ? true : false);
      //挪车二维码如何领取
      showViews: (options.showViews == "true" ? true : false);
      // 挪车服务如何领取
      show_tab3: (options.show_tab3 == "true" ? true : false);
      // 次卡如何办理
      show_tab4: (options.show_tab4 == "true" ? true : false);
    } else {
      App.goLogin()
    }
    
  },
  // 新用户如何让登录
  onChangeShowState: function () {
    var that = this;
    that.setData({
      // 1
      showView: (!that.data.showView),
      // 2
      showViews: false,
      // 3
      show_tab3: false,
      // 4
      show_tab4: false
    })
  },
  //挪车二维码如何领取
  btn_show: function () {
    var that = this;
    that.setData({
      // 2
      showViews: (!that.data.showViews),
      // 1
      showView: false,
      // 3
      show_tab3: false,
      // 4
      show_tab4: false
    })
  },
  // 挪车服务如何领取
  show_tab3: function () {
    var that = this;
    that.setData({
      // 3
      show_tab3: (!that.data.show_tab3),
      // 2
      showViews: false,
      // 1
      showView: false,
      // 4
      show_tab4: false
    })
  },
  // 次卡如何办理
  show_tab4: function () {
    var that = this;
    that.setData({
      // 4
      show_tab4: (!that.data.show_tab4),
      // 3
      show_tab3: false,
      // 2
      showViews: false,
      // 1
      showView: false,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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