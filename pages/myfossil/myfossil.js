// pages/myfossil/myfossil.js
import {request} from "../../request/index.js"
var myurl = getApp().globalData.url;

Page({

  data: {
    //修改描述
    isShowRecesive: false,
    change: "",
    changeid: 0,
    fossilid: 0,
    //轮播图设置
    hidden: false,
    xinwen_list: [],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    indicatordots: true,
    duration: 1000,
    //卡片数据
    myfossilList:[],

  },

  getchange:function(e){
    this.setData({
      isShowRecesive: true,
      changeid: e.currentTarget.dataset.id
    })
  },

  close:function(){
    this.setData({
      isShowRecesive: false,
      change: ""
    })
  },

  delete:function(e){
    var changedid = e.currentTarget.dataset.id
    var fundid = this.data.myfossilList[0].id
    var targetid = fundid-changedid
    wx.request({
      url: myurl + 'deletepicture/',
      data: {
        pictureid: e.currentTarget.dataset.id
      },
      dataType: "json",
      method: 'GET',
      responseType: "text",
      success: (result) => {
        console.log('sucess')
      },
    })
    wx.showToast({
      title: '删除成功',
      duration: 500,
      icon: "none"
    })
    this.onShow()
    /*
    var arr = this.data.myfossilList
    arr.splice(targetid, targetid); 
    this.setData({
      myfossilList: arr
    })*/
  },

  changeinput:function(e){
    var changeinput = e.detail.value
    this.setData({
      change: changeinput
    })

  },

  insertchange:function(){
    var changedid = this.data.changeid
    var fundid = this.data.myfossilList[0].id
    var targetid = fundid-changedid
    
    this.setData({
      ["myfossilList["+ targetid +"].fossil.document"]: this.data.change
    })
    var fossilid = this.data.myfossilList[targetid].fossil.fossilid
    //向后端发送修改内容
    wx.request({
      url: myurl + 'setdocumentchange/',
      data: {
        changecontent: this.data.change,
        changeid: fossilid
      },
      dataType: "json",
      method: 'POST',
      responseType: "text",
      success: (res) => {
        if(res.data.status == true){
          this.setData({
            change: '',
            isShowRecesive: false,
            change: ""
          })
          wx.showToast({
            title: '修改成功',
            duration: 500,
            icon: "none"
          })
        }
        else{
          console.log('false')
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var username = getApp().globalData.userInfo.nickName
    if(username==null){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }else{
      request({
          url: '/getmyfossil',
          dataType: "json",
          method: 'GET',
          data:  {user: username},
          responseType: "text",
      })
      .then(result=> {
          this.setData({
              myfossilList: result.data
            })
          }
      ).catch(err=>{
          wx.showToast({
              title: '没有找到您的化石....',
              duration: 1500,
              icon: "none"
            })
      })
    }
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