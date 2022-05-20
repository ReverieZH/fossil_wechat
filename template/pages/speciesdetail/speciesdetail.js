// pages/speciesdetail/speciesdetail.js
var myurl = getApp().globalData.url;
import {request} from "../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    name:'',
    speciescover:'',
    pedigree:'',
    period:'',
    pictureList: [],
    detail: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var fossilId = options.fossilId;
    request({
      url: '/getspeciesdetail/'+fossilId+ '/',
      dataType: 'json',
      method: 'GET',
    })
    .then(res=> {
      this.setData({
          id: res.data.id,
          name: res.data.speciesname,
          pedigree: res.data.specieslocation,
          period: res.data.epoch,
          pictureList: res.data.picture,
          detail: res.data.describe,
          speciescover: res.data.speciescover
      })
      }
    ).catch(function(err){ //状态为rejected时执行
      
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})