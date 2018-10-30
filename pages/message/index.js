// pages/message/index.js

const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messagelist: {
      items: [],
      params: {
        page: 1,
        limit: 10
      },
      paginate: {},

    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var messagelist = {
      items: [],
      params: {
        page: 1,
        limit: 10
      },
      paginate: {},
    }
    this.setData({
      messagelist: messagelist
    })
    this.getMessage();
  },
  getMessage() {
    const messagelist = this.data.messagelist
    var params = messagelist.params
    App.HttpService.getMessage(params)
      .then(data => {
      
        if (data.code == 1) {
          if (data.data.list === undefined || data.data.list.length == 0) {
            wx.showToast({
              title: '没有更多数据了！'
            })
          } else {
            // data.data.forEach(function (value, index, array) {
            //   value.cover = App.renderImage(value.cover)
            // });
            messagelist.items = [...messagelist.items, ...data.data.list]
            messagelist.paginate = data.data.paginate
            messagelist.params.limit = data.data.paginate.limit
            console.log(messagelist)
            this.setData({
              messagelist: messagelist,
              'prompt.hidden': messagelist.items.length,
            })
          }
        }
        this.setData({
          hidden: true
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    const messagelist = {
      items: [],
      params: {
        page: 1,
        limit: 10,
      },
      paginate: {}
    }

    this.setData({
      messagelist: messagelist,
      hidden: false
    })
    this.getMessage()
  },
  toupper() {
    const messagelist = {
      items: [],
      params: {
        page: 1,
        limit: 10,
      },
      paginate: {}
    }
    this.setData({
      messagelist: messagelist,
      hidden: false
    })
    this.getMessage()
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.lower()
  },
  lower() {
    if (this.data.messagelist.paginate.page == this.data.messagelist.params.page) {
      wx.showToast({
        title: '没有更多数据了！'
      })
      return
    }
    this.setData({
      "messagelist.params.page": this.data.messagelist.paginate.page,
      hidden: false
    })
    this.getMessage()
  }
  
})