const App = getApp()

Page({
	data: {
		logged: !1,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
  onLoad() {

  },
  onShow() {
    var that = this;
    const token = wx.getStorageSync('token')
    that.setData({
      logged: !!token
    })
    token && setTimeout(that.goIndex, 1500)
  },
  goIndex() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  getUserInfoAction(res) {
    let that = this;
    if (res.detail.userInfo){
      //用户按了允许授权按钮
      const encryptedData = res.detail.encryptedData;
      const iv = res.detail.iv;
      wx.login({
        success: function (data) {
          if (data.code) {
            const params = {
              "code": data.code,
              "encrypted_data": encryptedData,
              "iv": iv,
              "raw_data": res.detail.rawData,
              "signature": res.detail.signature
            }
            console.log(params)
            App.HttpService.wechatSignIn(params)
              .then(row => {
                console.log(row)
                if (row.code == 1) {
                  wx.setStorageSync("token", row.data.token);
                  wx.setStorageSync("uid",row.data.user.id);
                  if (wx.getStorageSync("token")) {
                    that.goIndex();
                  }
                } else {
                  wx.showModal({
                    title: '友情提示',
                    content: row.msg,
                    showCancel: false
                  })
                }
              }).catch(e => {
                console.log(e)
              })
          } else {
            wx.showModal({
              title: '友情提示',
              content: "登录失败",
              showCancel: false
            })
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }else{
      //用户按了拒绝按钮
      App.WxService.showModal({
        title: '友情提示',
        content: '请授权公开信息,登录小程序',
        showCancel: !1,
      })
    }
  },
	showModal() {
		App.WxService.showModal({
        title: '友情提示', 
        content: '获取用户登录状态失败，请重新登录', 
        showCancel: !1, 
    })
	},
})