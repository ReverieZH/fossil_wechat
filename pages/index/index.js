// pages/index/index.js
import {request} from "../../request/index.js"
var myurl = getApp().globalData.url;
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorization:false,
    news:[],
  },

  getUserInfo: function(e){
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户信息
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
                }
              ) 
            },
          })
        }
      },
    })
    // 获取系统通知
    request({
        url: '/getnews',
        dataType: "json",
        method: 'GET',
    })
    .then(result=> {
        this.setData({
                    news: result.data,
            })
        }
    ) 
  },
  takePhoto: function(){	
    wx.navigateTo({
      url: '/template/pages/photo/photo',	//跳转到自定义的一个拍照页面
    })
  },
  tiaozhuan:function(){
    wx.navigateTo({
        url: '/pkgA/pages/cat/cat'
      });
  }
})