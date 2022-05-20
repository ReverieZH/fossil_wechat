// template/pages/mypublish/mypublish.js
import {request} from "../../../request/index.js"
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      id: "",
      nickname: "",
      usericon: "",
      status: "",
      institution: "",
    },
    everyfossilList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(app.globalData.userId==''){
        wx.switchTab({
          url: '/pages/index/index',
        })
    }else{
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
        url: '/UserPublish/'+app.globalData.userId,
        dataType: "json",
        method: 'GET',
      })
      .then(result=> {
          this.setData({
            everyfossilList: result.data,
              })
          }
      )  
    }
  

  },
  deletePublish(e){
    var this_=this
      wx.showModal({
        title: '提示',
        content: '您确定删除吗',
        success (res) {
          if (res.confirm) {
            let publishId= e.currentTarget.dataset.id
            let everyfossilList=this_.data.everyfossilList
            
            request({
              url: '/OnePublish/'+publishId+'/',
              dataType: "json",
              method: 'DELETE',
            })
            .then(result=> {
                if(result.data.status==200){
                  wx.showToast({
                    title: result.data.msg,
                    icon: 'success',
                    duration: 2000
                  })
                  for (var i = 0; i < everyfossilList.length; i++) {
                    if (everyfossilList[i].id == publishId) {
                      everyfossilList.splice(i, 1);
                    }
                  }
                  this_.setData({
                    everyfossilList
                  })
                }else{
                  wx.showToast({
                    title: result.data.msg,
                    icon: 'error',
                    duration: 2000
                  })
                }
              }
            )  
          } else if (res.cancel) {
          }
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})