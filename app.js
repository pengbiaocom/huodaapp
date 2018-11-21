//app.js
import polyfill from 'assets/plugins/polyfill'
import HttpService from 'helpers/HttpService'
import Config from 'etc/config'

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.updataApp()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  updataApp: function () {//版本更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) { // 请求完新版本信息的回调
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({// 新的版本下载失败
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      wx.showModal({// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  goIndex() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  goLogin() {
    wx.redirectTo({
      url: '/pages/login/index'
    })
  },
  editTabBar: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var index = _pagePath.lastIndexOf("\/");
    _pagePath = decodeURI(_pagePath.substring(0, index));
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath1 == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态  
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  globalData: {
    userInfo: null,
    single: [],
    single1: [],
    setwode:[],
    model_value:null,
    order_number:'',
    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "pagePath1": "/pages/index",
          "text": "首页",
          "iconPath": "/assets/images/iconfont-home.png",
          "selectedIconPath": "/assets/images/iconfont-home-active.png",
          "clas": "menu-item",
          "selectedColor": "#479de6",
          "active": true
        },
        {
          "pagePath": "/pages/message/index",
          "pagePath1": "/pages/message",
          "text": "消息",
          "iconPath": "/assets/images/iconfont-xiao.png",
          "selectedIconPath": "/assets/images/iconfont-xiao-active.png",
          "selectedColor": "#479de6",
          "clas": "menu-item",
          "active": false
        },
        {
          "pagePath": "/pages/user/index",
          "pagePath1": "/pages/user",
          "text": "我的",
          "iconPath": "/assets/images/iconfont-user.png",
          "selectedIconPath": "/assets/images/iconfont-user-active.png",
          "selectedColor": "#479de6",
          "clas": "menu-item",
          "active": false
        }
      ],
      "position": "bottom"
    }
  },
  HttpService: new HttpService,
  Config: Config,
})