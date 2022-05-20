//text.js
var util = require('../../utils/util.js')
var myurl = getApp().globalData.url;

Page({
  data: {
      //属性值
    collectionList:[],
    
  },

  onLoad: function () {
    var username = getApp().globalData.userInfo.nickName
    wx.request({
      url: myurl + "getmycollection/",
      dataType: "json",
      method: 'GET',
      data: { nickname: username },
      responseType: "text",
      success: (res) => {
        console.log(res.data);
        this.setData({
          collectionList: res.data
        })
      },
      fail: (res) =>{
        wx.showToast({
          title: '没有找到您的收藏....',
          duration: 1500,
          icon: "none"
        })
      }
    })


  },
  // contentLimit: function(content) {
  //   return content.substr(20)
  // }

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var username = getApp().globalData.userInfo.nickName
    wx.request({
      url: myurl + "getmycollection/",
      dataType: "json",
      method: 'GET',
      data: { nickname: username },
      responseType: "text",
      success: (res) => {
        console.log(res.data);
        this.setData({
          collectionList: res.data
        })
      },
      fail: (res) =>{
        wx.showToast({
          title: '没有找到您的收藏....',
          duration: 1500,
          icon: "none"
        })
      }
    })
  },
})
