import {request} from "../../request/index.js"
// pages/speciesguide/speciesguide.js
var myurl = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    index: 0,
    tabList:[{
        id:1,
        name:'化石百科',
        isActivate:true,
        url:'baike'
    },
    {
        id:2,
        name:'化石咨询',
        isActivate:false,
        url:'baike'
    },
    {
        id:3,
        name:'化石地图',
        isActivate:false,
        url:'map'
    },
    {
        id:4,
        name:'化石博物馆',
        isActivate:false,
        url:'map'
    }],
    contentUrl:'baike',
    provinceData:[]
  },

  searchinput: function(e){
    this.setData({search: e.detail.value});
  },

  Search:function(){
    wx.request({
      url: myurl+"setsearch",
      data: {search: this.data.search},
      method: 'POST',
      success: (res) => {
        if(res.data.length !=0){  
          wx.navigateTo({
            url: '/pages/speciesdetail/speciesdetail?fossilId=' + res.data[0].id,
          })
        }
        else{
          wx.showToast({
            title: '搜索失败',
            duration: 1500,
            icon: "none"
          })
        } 
      },
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: myurl + 'getspeciesguide',
    //   dataType: 'json',
    //   method: 'GET',
    //   success: (res) =>{
    //     console.log(res.data)
    //     this.setData({
    //       guideList: res.data,
    //     })
    //   },
    // })
    request({
      url: '/getspeciesguide',
      dataType: "json",
      method: 'GET',
    })
    .then(result=> {
         this.setData({
              guideList: result.data,
            })
        }
    ) 
  },
  handleItemTap:function(e){
    const {index,url}=e.currentTarget.dataset
    let {tabList}=this.data
    tabList.forEach((v,i)=>i===index?v.isActivate=true:v.isActivate=false);
    this.setData({
        tabList,
        contentUrl:url,
        index
    })

  },
  handleNews:function(){
      wx.navigateTo({
        url: '/pages/webview/webview?url='+'https://mp.weixin.qq.com/s/cYvuAmzVb-JlYyYc_mPnxw',
      })
  }
})