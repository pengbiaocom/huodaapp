//index.js
//获取应用实例
var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp()
var t = 0;
var show = false;
var moveY = 200;
Page({
  data: {
    region: ['文件', '证件', '食品','蛋糕','生活用品'],
    zhong: ['<5公斤','6公斤','7公斤','8公斤','9公斤','10公斤'],
    value:[0,0],
    wupin_text:'请设置物品类型',
    wupin:'',
    is_wupin:false,
    xiaofei_text:'可以快速被抢单哦',
    xiaofei:'',
    xiao:['0','5','10','15','20','50','100'],
    value2: [0],
    m_show: show,
    m_show1: show,
    m_show2: show,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    multiArray: [['文件', '证件', '食品', '蛋糕', '生活用品'], ['<5公斤', '6公斤', '7公斤', '8公斤', '9公斤', '10公斤']],
    multiIndex: [0, 0],
    mingxi:"价格明细价格明细"
  },
  onLoad: function () {
    if (wx.getStorageSync('token')) {
      // app.editTabBar();
      // 获取完整的年月日 时分秒，以及默认显示的数组
      var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
      var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
      // 精确到分的处理，将数组的秒去掉
      var lastArray = obj1.dateTimeArray.pop();
      var lastTime = obj1.dateTime.pop();

      this.setData({
        dateTimeArray1: obj1.dateTimeArray,
        dateTime1: obj1.dateTime
      });
    } else {
      app.goLogin()
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
  showPrice(){

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
  translate: function (e) {
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
    animationEvents(that, moveY, show);
  },
  translate1: function (e) {
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
    animationEvents1(that, moveY, show);
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
  hiddenFloatView(e) {
    var wupin = e.currentTarget.dataset.wupin;
    var is_wupin = false;
    if (wupin != undefined) {
      var is_wupin = true;
      this.setData({
        wupin_text: wupin,
        is_wupin: is_wupin
      });
    }
    moveY = 200;
    show = true;
    t = 0;
    animationEvents(this, moveY, show);
  },
  hiddenFloatView1(e) {
    var shijian = e.currentTarget.dataset.shijian;
    if (shijian != undefined){
      this.setData({
        shijian_text: shijian
      });
    }
    
    moveY = 200;
    show = true;
    t = 0;
    animationEvents1(this, moveY, show);
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
  bindChange:function(e){
    var that = this;
    var val = e.detail.value
    var region = that.data.region;
    var zhong = that.data.zhong;
    var wupin = region[val[0]] + '/' + zhong[val[1]];
    that.setData({
      wupin: region[val[0]] + '/' + zhong[val[1]]
    });
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

function animationEvents(that, moveY, show) {
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  }
  )
  that.animation.translateY(moveY + 'vh').step()

  that.setData({
    animation: that.animation.export(),
    m_show: show
  })

}

function animationEvents1(that, moveY, show) {
  that.animation1 = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  }
  )
  that.animation1.translateY(moveY + 'vh').step()

  that.setData({
    animation1: that.animation1.export(),
    m_show1: show
  })

}

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
