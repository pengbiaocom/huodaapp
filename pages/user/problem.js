// pages/user/problem.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problemlist: {
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
    if (wx.getStorageSync('token')) {
     
    } else {
      app.goLogin()
    }
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var problemlist = {
      items: [],
      params: {
        page: 1,
        limit: 10
      },
      paginate: {},
    }
    this.setData({
      problemlist: problemlist
    })
    this.getProblem();
  },
  getProblem:function(){
    const problemlist = this.data.problemlist
    var params = problemlist.params
    app.HttpService.getProblem(params)
      .then(data => {

        if (data.code == 1) {
          if (data.data.list === undefined || data.data.list.length == 0) {
            wx.showToast({
              title: '没有更多数据了！'
            })
          } else {
            problemlist.items = [...problemlist.items, ...data.data.list]
            problemlist.paginate = data.data.paginate
            problemlist.params.limit = data.data.paginate.limit
            console.log(problemlist)
            this.setData({
              problemlist: problemlist,
              'prompt.hidden': problemlist.items.length,
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
    const problemlist = {
      items: [],
      params: {
        page: 1,
        limit: 10,
      },
      paginate: {}
    }

    this.setData({
      problemlist: problemlist,
      hidden: false
    })
    this.getProblem()
  },
  toupper() {
    const problemlist = {
      items: [],
      params: {
        page: 1,
        limit: 10,
      },
      paginate: {}
    }
    this.setData({
      problemlist: problemlist,
      hidden: false
    })
    this.getProblem()
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
    if (this.data.problemlist.paginate.page == this.data.problemlist.params.page) {
      wx.showToast({
        title: '没有更多数据了！'
      })
      return
    }
    this.setData({
      "problemlist.params.page": this.data.problemlist.paginate.page,
      hidden: false
    })
    this.getProblem()
  }
})