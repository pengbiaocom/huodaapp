import __config from '../etc/config'
var provinces = [];//省
var citys = [{ id: 0, name: '请选择', level: 1, upid: 0, is_show: 1 }];//城市
var countys = [{ id: 0, name: '请选择', level: 1, upid: 0, is_show: 1 }];//区县
var value = [0, 0, 0];//数据位置下标

var xuanz = [{id:0,name:'请选择',level:1,upid:0,is_show:1}];

var info = {};

function updateAreaData( that, status, e){
    //获取省份数据
    var getProvinceData = function (){
      provinces = [];
      wx.request({
        url: `${__config.basePath}wxapp/address/get_provinces`,
        success: function (res) {
          provinces = [...xuanz, ...res.data];
          if (provinces){
            //获取地级市数据
            //getCityArr(provinces[0].id);
          }
        }
      })
      //模型赋值
      info = {
        item: {
          provinces: provinces,
          value: value
        }
      }
      
      animationEvents(that, 200, false, 0);
    }

    // 获取地级市数据
    var getCityArr = function (count = 0) {
      citys = [];
      wx.request({
        url: `${__config.basePath}wxapp/address/get_citys`,
        data:{
          upid: count
        },
        success: function (res) {
          citys = [...xuanz, ...res.data];
          if (citys){
            //获取区县数据
            //getCountyInfo(citys[0].id);
          }else{
            citys[0] = { name: '' };
          }
        }
      })
      info = {
        item: {
          citys: citys
        }
      }
    }

    // 获取区县数据
    var getCountyInfo = function (column0 = 0) {
      countys = [];
      wx.request({
        url: `${__config.basePath}wxapp/address/get_countys`,
        data: {
          upid: column0
        },
        success: function (res) {
          countys = [...xuanz, ...res.data];
          if (countys.length == 0) {
            countys[0] = { name: '' };
          }
          value = [0, 0, 0];
        }
      })
      info = {
        item: {
          countys: countys
        }
      }
    }
    
    //滑动事件
    var valueChange = function(e,that){
      var val = e.detail.value
      citys = [];
      wx.request({
        url: `${__config.basePath}wxapp/address/get_citys`,
        data: {
          upid: provinces[val[0]].id
        },
        success: function (res) {
          citys = [...xuanz, ...res.data];
          if (citys) {
            //获取区县数据
            countys = [];
            wx.request({
              url: `${__config.basePath}wxapp/address/get_countys`,
              data: {
                upid: citys[val[1]].id
              },
              success: function (res) {
                countys = [...xuanz, ...res.data];
                if (countys.length == 0) {
                  countys[0] = { name: '' };
                }
                
                value = val;
                that.setData({
                  areaSelectedStr: '',
                  province: provinces[value[0]].name,
                  province_id: provinces[value[0]].id,
                  city: citys[value[1]].name,
                  city_id: citys[value[1]].id,
                  county: countys[value[2]].name,
                  county_id: countys[value[2]].id,
                  street_id: 0,
                  street: '',
                  jieSelectedStr:'请选择街道',
                });
                assignmentData(that, that.data.item.show)
              }
            })
          } else {
            citys[0] = { name: '' };
          }
        }
      })

    }
   
    if (status == 0){
      getProvinceData();
    }
    //滑动事件
    else{
      valueChange(e,that);
    }
    
}

//动画事件
function animationEvents(that, moveY, show, duration) {
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: duration,
    timingFunction: "ease",
    delay: 0
  })
  that.animation.translateY(moveY + 'vh').step()
  //赋值
  assignmentData(that,show)

}

//赋值
function assignmentData(that, show) {
  that.setData({
    item: {
      animation: that.animation.export(),
      show: show,
      provinces: provinces,
      citys: citys,
      countys: countys,
      value: value
    }
  })
}

module.exports = {
  updateAreaData: updateAreaData,
  animationEvents: animationEvents
}
