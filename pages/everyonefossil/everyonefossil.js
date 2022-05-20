import {request} from "../../request/index.js"
// pages/everyonefossil/everyonefossil.js
var util = require('../../utils/util.js')
const everyfossilLis_json= require("../../data/everyfossil_data")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //data: root.globalData.news.data,    //获取数据,后面部分改成路径
    everyfossilList:[],
    icontype: ["info_circle", "info"],
    images:[
        "https://thirdwx.qlogo.cn/mmhead/zB34mkOxrkPSjKghibAX0ZPoQ93Z2ZRR7z6b3mVhB7O4/132",
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erMgmcaSXhxkxjDiaIPfia94ZVvV0hiaib7J24rcIuptgmIX2eAdPUogUc8221qicj8GKldpXu8cCkxOMg/132",
        "https://thirdwx.qlogo.cn/mmhead/cYNYds6gbO1AJFXSYXCEsa1hYqHGA9n4Qvzs3WavsCU/132",
    ]
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var username = "";
    // wx.request({
    //   url: getApp().globalData.url + "geteveryfossil",
    //   fail: (res) => { },
    //   dataType: "json",
    //   method: 'GET',
    //   responseType: "text",
    //   success: (res) => {
    //     console.log(res.data);
    //     this.setData({
    //       everyfossilList: res.data
    //     })
    //   },
    // })
    request({
      url: '/EveryonePublish',
      dataType: "json",
      method: 'GET',
    })
    .then(result=> {
        this.setData({
          everyfossilList: result.data,
            })
        }
    ) 
    // this.setData({
    //     everyfossilList:everyfossilLis_json.everyfossilList,
    // })
    var date1=new Date(everyfossilLis_json.everyfossilList[0].fossil.picturetime)
    var date2=new Date(everyfossilLis_json.everyfossilList[1].fossil.picturetime)
    console.log("时间1",new Date(everyfossilLis_json.everyfossilList[0].fossil.picturetime))
    console.log("相差",date1.getTime()-date2.getTime())
  },

  collect: function(e){
    console.log(e.currentTarget.dataset.id)
    var username = getApp().globalData.userInfo.nickName
    wx.request({
      url: getApp().globalData.url + "setcollection/",
      dataType: "json",
      method: 'POST',
      data: { nickname: username,
              collectionid: e.currentTarget.dataset.id
            },
      responseType: "text",
      success: (res) => {
        console.log(res.data);
        wx.showToast({
          title: '收藏成功',
          duration: 500,
          icon: "none"
        })
      },
    })
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
    request({
      url: '/EveryonePublish',
      dataType: "json",
      method: 'GET',
    })
    .then(result=> {
        this.setData({
          everyfossilList: result.data,
            })
        }
    ) 
  },
  handleIdentify:function(){
    wx.navigateTo({
      url: '/template/pages/publish/publish',
    })
  }
})