// template/pages/publish/publish.js
var COS = require('../../utils/cos-wx-sdk-v5.js')
var app = getApp()
import {request} from "../../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'',
    imageList:[],
    length:0,
    edit:false,
    publishId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      let id = options.id
      if(id!=null){
        console.log("id不为空")
        request({
          url: '/OnePublish/'+options.id,
          dataType: 'json',
          method: 'GET',
        })
        .then(result=> {
          // console.log(result.data)
          this.setData({
            imageList:result.data[0].picture,
            length:result.data[0].picture.length,
            text:result.data[0].content,
            edit:true,
            publishId:options.id
          })
          }
        ).catch(function(err){ //状态为rejected时执行
          
        });
      }
  },
  chooseImage: function () {
    var _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        console.log(res);
        var tempFilePaths = res.tempFilePaths;
        var imageList = _this.data.imageList;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imageList.length >= 9) {
            _this.setData({
              imageList: imageList
            });
            return false;
          } else {
            imageList.push(tempFilePaths[i]);
          }
        }
        _this.setData({
          imageList: imageList
        })
      }
    })
  },
  published() {
    console.log("text",this.data.text);
    var _this = this;
    var imageList = this.data.imageList;
    var uploads = [];
    var uploadspath='';
    var cos = new COS({
      SecretId: 'AKIDqRmroiy1HBozve6pBJBDzVpysX0DQy0r',
      SecretKey: 'rmS6oHThgWBZhusa03C8NuBLFsMjrqys',
    });
    var username = getApp().globalData.userInfo.nickName
    for (let i = 0; i < imageList.length; i++) {
      var filePath = imageList[i]
      uploads[i]=new Promise((resolve, reject) => {
        cos.postObject({
          Bucket: 'wx-miniprogram-picture-1302593558',
          Region: 'ap-chengdu',
          Key: username + filePath.substring(filePath.length-10,filePath.length-5) +'.png',
          FilePath: filePath,
          onProgress: function (info) {
              console.log(JSON.stringify(info));
          }
        }, function (err, data) {
          var photopath = data.Location
          uploadspath += 'https://'+photopath+','
          resolve(data.Location)
          });
      })
    }
    Promise.all(uploads).then((res)=>{
      uploadspath= uploadspath.substring(0,uploadspath.length - 1)
      let params={
        content:this.data.text,
        user_id:app.globalData.userId,
        picturepath:uploadspath
      }
      console.log(params)
      request({
        url: '/EveryonePublish/',
        dataType: "json",
        method: 'POST',
        data:params
      })
      .then(result=> {
          console.log(result)
          if(result.data.status==200){
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '/template/pages/everyonedetail/everyonedetail?id='+result.data.data.id,
            })
          }else{
            wx.showToast({
              title: '发布失败',
              icon: 'error',
              duration: 2000
            })
          }
      }
      ) 
    })
  },
  editPublished() {
    console.log("text",this.data.text);
    var _this = this;
    var imageList = this.data.imageList;
    var length= this.data.length
    var uploads = [];
    var uploadspath='';
    var cos = new COS({
      SecretId: 'AKIDqRmroiy1HBozve6pBJBDzVpysX0DQy0r',
      SecretKey: 'rmS6oHThgWBZhusa03C8NuBLFsMjrqys',
    });
    var username = getApp().globalData.userInfo.nickName
    for (let i = 0; i < imageList.length; i++) {
      if(i<length){
        uploadspath += imageList[i]+","
      }else{
        console.log("新增图片")
        var filePath = imageList[i]
        uploads[i]=new Promise((resolve, reject) => {
        cos.postObject({
          Bucket: 'wx-miniprogram-picture-1302593558',
          Region: 'ap-chengdu',
          Key: username + filePath.substring(filePath.length-10,filePath.length-5) +'.png',
          FilePath: filePath,
          onProgress: function (info) {
              console.log(JSON.stringify(info));
          }
        }, function (err, data) {
          var photopath = data.Location
          uploadspath += 'https://'+photopath+','
          resolve(data.Location)
          });
      })
      }
      
    }
    Promise.all(uploads).then((res)=>{
      uploadspath= uploadspath.substring(0,uploadspath.length - 1)
      let params={
        publishId:this.data.publishId,
        content:this.data.text,
        user_id:app.globalData.userId,
        picturepath:uploadspath
      }
      console.log(params)
      let publishId=this.data.publishId
      request({
        url: '/OnePublish/'+publishId+"/",
        dataType: "json",
        method: 'PUT',
        data:params
      })
      .then(result=> {
          console.log(result)
          if(result.data.status==200){
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack({
              delta: 1
            });
          }else{
            wx.showToast({
              title: '修改失败',
              icon: 'error',
              duration: 2000
            })
          }
      }
      ) 
    })
  },
  delImg: function (e) {
    let index = e.currentTarget.dataset.index;
    let length = this.data.length;
    if(index<length){
      this.setData({
        length: length-1,
      });
    }
    let imageList = this.data.imageList;
    imageList.splice(index, 1);
    this.setData({
      imageList: imageList,
    });
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  bindTextAreaBlur: function(e) {
    var text=e.detail.value
    console.log("t",text)
    this.setData({
      text
    })
  }
})