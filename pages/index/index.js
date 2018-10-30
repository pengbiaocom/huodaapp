//index.js
//获取应用实例
var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp()
var t = 0;
var show = false;
var moveY = 200;
Page({
  data: {
    setwode:null,
    duifang:null,
    quyuText: '请填写发件人地址',
    quyuAddress: '请完善信息',
    quyuText1:'请填写收件人地址',
    quyuAddress1:'请完善信息',
    m_show2: show,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    multiArray: [],
    multiIndex: 0,
    texts: "至少5个字",
    min: 5,//最少字数
    max: 20, //最多字数
    textValue:'',
    estimated_time: 10,
    distribution_price: 30,
  },
  onLoad: function (option) {
    if (wx.getStorageSync('token')) {
      // app.editTabBar();
    } else {
      app.goLogin()
    }
  },
  onShow:function(){
    this.getData();
  },
  //字数限制  
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: "至少5个字"
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len, //当前字数
      textValue: value
    });
  },
  getData(){
    var that = this;
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    that.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });

    var setwode = app.globalData.setwode;
    if (setwode != '') {
      that.setData({
        setwode: setwode
      });
    }

    var single = app.globalData.single;
    if (single != ''){
      that.setData({
        duifang:single,
        estimated_time: single.estimated_time,
        distribution_price: single.distribution_price,
        youPrice: parseFloat(single.distribution_price) + 5
      });
    }else{
      var uid = wx.getStorageSync('uid');
      var params = {
        uid:uid,
        type:0
      };
      app.HttpService.getUserAddress(params)
        .then(data => {
          if (data.code == 1) {
            var address= data.data[0];
            var setwode1 = {
              user_name: address.send_username,
              address: address.send_address,
              user_tel: address.send_phone
            };
            var duifang1 = {
              city_id: address.get_region_tow,
              city : address.city,
              province_id : address.get_region_one,
              province : address.province,
              county : address.county,
              county_id : address.get_region_three,
              address : address.get_address,
              user_name : address.get_username,
              user_tel : address.get_phone
            };
            that.setData({
              setwode: setwode1,
              duifang: duifang1,
              estimated_time: address.estimate_time,
              distribution_price: address.order_total_price,
              youPrice: parseFloat(address.order_total_price) + 5,
              multiIndex: address.cid
            })
          }else{
            that.setData({
              youPrice: parseFloat(this.data.distribution_price) + 5
            })
          }
        })
      
    }
    
    //获取物品分类
    app.HttpService.getCargo({})
      .then(data => {
        if (data.code == 1) {
          if (data.data[0] === undefined || data.data[0].length == 0) {
            wx.showToast({
              title: '没有更多数据了！'
            })
          } else {
            var multiArrays = [{ id: 0, name: '中件' }, { id: 0, name: '小件' }];
            var multiArray = [...data.data[0], ...multiArrays]
            that.setData({
              multiArray: multiArray
            })
          }
        }
      })
  },
  showModal: function () {
    var uid = wx.getStorageSync('uid')
    var dateTimeArray1 = this.data.dateTimeArray1;
    var dateTime1 = this.data.dateTime1;
     var params = {
       uid:uid,
       send_address: this.data.setwode.address,
       send_username: this.data.setwode.user_name,
       send_phone: this.data.setwode.user_tel,
       get_region_one: this.data.duifang.province_id,
       get_region_tow: this.data.duifang.city_id,
       get_region_three: this.data.duifang.county_id,
       get_address: this.data.duifang.address,
       get_username:this.data.duifang.user_name,
       get_phone:this.data.duifang.user_tel,
       cid: this.data.multiArray[this.data.multiIndex].id,
       estimate_time: this.data.estimated_time,
       remarks: this.data.textValue,
       order_total_price: this.data.distribution_price
     };
    var len = parseInt(params.remarks.length);
    if(params.send_address==''){
      wx.showModal({
        title: '提示信息',
        content: "请填写发件人信息",
        showCancel: false
      })
    }else if(params.get_address==''){
      wx.showModal({
        title: '提示信息',
        content: "请填写收件人信息",
        showCancel: false
      })
    }else if (len < this.data.min){
      wx.showModal({
        title: '提示信息',
        content: this.data.texts,
        showCancel: false
      })
    }else{
      app.HttpService.postAddOrder(params)
        .then(data => {
          console.log(data)
          if (data.code == 0) {
            this.setData({
              textValue:''
            })
            wx.showModal({
              title: '提示信息',
              content: data.msg,
              showCancel: false,
              confirmColor: '#479de6',
              success: function (res) {
                wx.navigateTo({
                  url: '/pages/order/index'
                })
              }
            })
            // 发起支付
            // wx.requestPayment({
            //   appId: data.data.appId,
            //   timeStamp: data.data.timeStamp.toString(),
            //   nonceStr: data.data.nonceStr,
            //   package: data.data.package,
            //   signType: data.data.signType,
            //   paySign: data.data.paySign,
            //   fail: function (aaa) {
            //     if (aaa.errMsg == "requestPayment:fail cancel") {
            //       // console.log(data.data.sorder_sn)
            //       // App.HttpService.setSeedsDel({ sorder_sn: data.data.sorder_sn })
            //       //   .then(data => {
            //       //     //  console.log(data)
            //       //   })
            //     }
            //   },
            //   success: function () {
            //     wx.showModal({
            //       title: '提示信息',
            //       content: "支付成功",
            //       showCancel: false,
            //       confirmColor: '#479de6',
            //       success: function (res) {
            //         wx.redirectTo({
            //           url: '/pages/order/index',
            //         });
            //       }
            //     })
            //   }
            // })
          }else{
            wx.showModal({
              title: '提示信息',
              content: data.msg,
              showCancel: false,
              confirmColor: '#479de6',
              success: function (res) {

              }
            })
          }
        })
    } 

  },
  setWoDe:function(){
    wx.navigateTo({
      url: '/pages/index/setwode'
    })
  },
  setduif: function () {
    wx.navigateTo({
      url: '/pages/index/duifang'
    })
  },
  setCoupon:function(){
    wx.navigateTo({
      url: '/pages/coupon/index'
    })
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr
    });
  },
  changeMultiPicker(e) {
    this.setData({ multiIndex: e.detail.value })
  },
  translate2: function (e) {
    var that = this;
    if (t == 0) {
      moveY = 0;
      show = false;
      t = 1;
    } else {
      moveY = 200;
      show = true;
      t = 0;
    }
    animationEvents2(that, moveY, show);
  },
  hiddenFloatView2(e) {
    var xiaofei = e.currentTarget.dataset.xiaofei;
    if (xiaofei != undefined){
      this.setData({
        xiaofei_text: xiaofei
      });
    }
    moveY = 200;
    show = true;
    t = 0;
    animationEvents2(this, moveY, show);
  },
  bindChange2: function (e) {
    var that = this;
    var val = e.detail.value
    var xiao = that.data.xiao;
    that.setData({
      xiaofei: '+'+xiao[val[0]]+'元'
    });
  }
  
})

function animationEvents2(that, moveY, show) {
  that.animation2 = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  }
  )
  that.animation2.translateY(moveY + 'vh').step()

  that.setData({
    animation2: that.animation2.export(),
    m_show2: show
  })

}
