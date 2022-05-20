// pages/user/user.js
import {request} from "../../request/index.js"
var myurl = getApp().globalData.url;
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {

    phoneHeight:400,

    extension: [
      "/static/qq.png",
      "/static/rr.png",
      "/static/steam.png",
      "/static/vx.png",
    ],
    study:[
      "/static/qq.png",
      "/static/rr.png",
      "/static/steam.png",
      "/static/vx.png",
    ],
    userInfo:{
      id: "",
      nickname: "",
      usericon: "",
      status: "",
      institution: "",
    },
    activeIndex: 0,
  },

  onLoad: function () {
    var username=app.globalData.userInfo.nickname
    var usericon=app.globalData.userInfo.avatarUrl
    if(username==null){
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            this.setData({
              authorization: true
            })
            wx.getUserInfo({
              success: (res) => {
                app.globalData.userInfo = res.userInfo
                request({
                  url: '/getuser',
                  dataType: "json",
                  method: 'GET',
                  data:  {
                    user: res.userInfo.nickName,
                    icon: res.userInfo.avatarUrl
                  }
                })
                .then(result=> {
                    app.globalData.userId = result.data[0].id
                    this.request()
                  }
                ) 
              },
            })
          }
        },
      })
    }else{
      this.request()
    }
  },
  onReady:function(){
  },
  phoneLogin: function () {
    wx.navigateTo({
      url: '../phoneLogin/phoneLogin',
    });
  },
  gotoLogin() {
    wx.navigateTo({
      url: '../phoneLogin/phoneLogin',
    });
  },
  //跳转 我的收藏
  openSwitch: function () {
    wx.navigateTo({
      url: '../mycollection/mycollection',
    });
  },
  close: function () {
    var that = this;
    that.setData({
      show: false
    })
  },
  request:function(){
    request({
      url: '/user/'+app.globalData.userId,
      dataType: "json",
      method: 'GET',
    })
    .then(result=> {
      var data = result.data.data
      this.setData({
        nickname: data.nickname,
        usericon: data.usericon,
      })
      }
    ) 
    request({
      url: '/getstudyAdverstation/',
      dataType: "json",
      method: 'GET',
    })
    .then(result=> {
        this.setData({
          study: result.data
        })
      }
    ) 
    request({
      url: '/getAdverstation/',
      dataType: "json",
      method: 'GET',
    })
    .then(result=> {
      this.setData({
        extension: result.data
      })
      }
    ) 
  }
})