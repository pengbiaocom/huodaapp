function wxpay(app, money, orderId, redirectUrl) {
  let remark = "在线充值";
  let nextAction = {};
  if (orderId != 0) {
    remark = "支付订单 ：" + orderId;
  }
  var uid = wx.getStorageSync('uid') // 用户登录 token
  var postData = {
    uid: uid,
    money: money,
    remark: remark,
    payName: "在线支付",
    order_number: orderId
  };
  
  app.HttpService.postPayment(postData)
    .then(data=>{
      
      if(data.code==1){
        // 发起支付
        wx.requestPayment({
          appId: data.data.appId,
          timeStamp: data.data.timeStamp.toString(),
          nonceStr: data.data.nonceStr,
          package: data.data.package,
          signType: data.data.signType,
          paySign: data.data.paySign,
          fail: function (aaa) {
          },
          success: function () {
            wx.showToast({ title: '支付成功' })
            wx.navigateTo({
              url: redirectUrl
            });
          }
        })
      }else{
        wx.showModal({
          title: '错误提示',
          content: data.msg,
          showCancel: false
        })
      }
    })
}

module.exports = {
  wxpay: wxpay
}
